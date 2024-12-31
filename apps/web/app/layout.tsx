import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import "@workspace/ui/globals.css"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"bg-background antialiased"}>
        <Providers>
          <div className="relative">
            <Header />

            <div className="px-4 pt-8 sm:p-12">{children}</div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
