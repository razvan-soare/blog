import { StickMan } from "@/components/stickMan"

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-40 flex w-full flex-col-reverse gap-2 sm:flex-row sm:gap-8">
        <div className="flex w-full sm:w-[60%]">1</div>
        <div className="flex min-h-96 w-full sm:w-[40%]">
          <StickMan />
        </div>
      </div>
    </div>
  )
}
