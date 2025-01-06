import { RenderMDX } from "@/components/renderMdx"
import { getArticle } from "@/lib/getArticle"

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const article = await getArticle(slug)

  if (!article) {
    return <div>Article not found</div>
  }
  const title = article.frontmatter.title as string
  const tags = article.frontmatter.tags as string[]

  return (
    <div className="mx-auto max-w-screen-md px-4">
      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-highlight text-lg font-normal">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-primary mb-8 text-center text-4xl font-normal">
        {title}
      </h1>

      <RenderMDX source={article} />
    </div>
  )
}
