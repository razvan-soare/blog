"use client"

import { Button } from "@workspace/ui/components/button"
import { useTheme } from "next-themes"

export default function Page() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
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
