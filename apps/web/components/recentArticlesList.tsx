import { getSupabase } from "@/lib/supabase"
import { MdxDocument } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const RecentArticlesList = async () => {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "articles")

  const articles = data as unknown as MdxDocument[]

  if (error) {
    console.error(error)
    return <div>Error fetching articles</div>
  }
  if (articles.length === 0) {
    return <div>No articles found</div>
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-10">
      {articles.map((article) => (
        <Link
          href={`/articles/${article.slug}`}
          key={article.slug}
          className="text-secondary group flex flex-col gap-2"
        >
          <h2 className="text-primary group-hover:text-highlight text-xl tracking-wide transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-muted-foreground">{article.excerpt}</p>
          <div className="flex items-center gap-2">
            <p className="text-primary text-md font-bold tracking-wide">
              Read more
            </p>
            <ArrowRight className="group-hover:motion-preset-slide-right-lg motion-ease-spring-bouncier h-4 w-4 opacity-0 group-hover:opacity-100 motion-safe:motion-reduce:hidden" />
          </div>
        </Link>
      ))}
    </div>
  )
}
