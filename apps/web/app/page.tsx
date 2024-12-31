"use client"

import { Button } from "@workspace/ui/components/button"
import { useTheme } from "next-themes"

export default function Page() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button
          size="sm"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
          }}
        >
          Button
        </Button>
      </div>
    </div>
  )
}
