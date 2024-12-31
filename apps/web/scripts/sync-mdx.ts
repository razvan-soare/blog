import { createClient } from "@supabase/supabase-js"
import { serialize } from "next-mdx-remote/serialize"

import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials")
}

const supabase = createClient(supabaseUrl, supabaseKey)

const CONTENT_DIR = path.join(process.cwd(), "content")

interface MdxDocument {
  title: string
  date: string
  tags: string[]
  type: string
  excerpt: string
  draft?: boolean
}

// Add this helper function to recursively get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(fullPath)
    }
  })

  return arrayOfFiles
}

async function syncMdx() {
  try {
    // Replace the single directory read with recursive function
    const allFiles = getAllFiles(CONTENT_DIR)
    const markdownFiles = allFiles.filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md")
    )

    const existingPosts = await supabase.from("posts").select("title")

    for (const filePath of markdownFiles) {
      const fileName = path.basename(filePath)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const mdxSource = await serialize(fileContent, {
        parseFrontmatter: true,
      })

      const frontmatter = mdxSource.frontmatter as unknown as MdxDocument

      // Skip the draft posts
      if (frontmatter.draft) {
        continue
      }
      // Skip the existing posts
      if (
        existingPosts.data?.some((post) => post.title === frontmatter.title)
      ) {
        console.log(`Skipping ${fileName} because it already exists`)
        continue
      }

      const post = {
        slug: frontmatter.title.toLowerCase().replace(/\s+/g, "-"),
        title: frontmatter.title || "Untitled",
        excerpt: frontmatter.excerpt || "",
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : new Date().toISOString(),
        tags: frontmatter.tags || [],
        type: frontmatter.type,
      }

      // Insert the post to Supabase
      const { error } = await supabase.from("posts").insert(post)

      if (error) {
        console.error(`Error syncing ${fileName}:`, error)
      } else {
        console.log(`Successfully synced ${fileName}`)
      }
    }

    console.log("Sync completed!")
  } catch (error) {
    console.error("Error during sync:", error)
    process.exit(1)
  }
}

// Run the sync
syncMdx()
