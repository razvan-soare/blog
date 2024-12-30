import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import "@workspace/ui/globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased bg-background"}>
        <Providers>
          <div className="relative ">
            <Header />

            <div className="pt-8 px-4 sm:p-12">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
