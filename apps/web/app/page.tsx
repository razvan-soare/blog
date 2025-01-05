import { RecentArticlesList } from "@/components/recentArticlesList"
import { StickMan } from "@/components/stickMan"

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-40 flex w-full flex-col-reverse gap-2 sm:flex-row sm:gap-8">
        <div className="flex w-full flex-col gap-4 sm:w-[60%] sm:gap-8">
          <h2 className="text-secondary text-base font-normal tracking-widest">
            RECENTLY PUBLISHED
          </h2>
          <RecentArticlesList />
        </div>
        <div className="flex min-h-96 w-full sm:w-[40%]">
          <StickMan />
        </div>
      </div>
    </div>
  )
}
