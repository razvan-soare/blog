import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

import fs from "fs"
import path from "path"

const CONTENT_DIR = path.join(process.cwd(), "content")

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

export async function getArticle(
  slug: string
): Promise<MDXRemoteSerializeResult | null> {
  try {
    const allFiles = getAllFiles(CONTENT_DIR)
    const selectedFile = allFiles.find((file) => {
      const fileName = path.basename(file).split(".")[0]
      return fileName === slug
    })

    if (!selectedFile) {
      return null
    }

    const fileContent = fs.readFileSync(selectedFile, "utf-8")
    const mdxSource = await serialize(fileContent, {
      parseFrontmatter: true,
    })

    return mdxSource
  } catch (error) {
    console.error("Error during sync:", error)
    return null
  }
}
