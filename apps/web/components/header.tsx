"use client"

import Link from "next/link"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { StyledNavLink } from "./styled-nav-link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering the theme toggle until mounted
  const renderThemeToggle = ({ isMobile = false }: { isMobile: boolean }) => {
    if (!mounted)
      return (
        <Button variant="ghost" size="icon">
          <Sun className="h-7 w-7 -motion-rotate-in-180 motion-blur-in-sm" />
        </Button>
      )

    return (
      <Button
        variant="ghost"
        size={isMobile ? "default" : "icon"}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark")
        }}
      >
        {theme === "dark" ? (
          <Sun className="h-7 w-7 -motion-rotate-in-180" />
        ) : (
          <Moon className="h-7 w-7 motion-rotate-in-180" />
        )}
        {isMobile && <span>Toggle theme</span>}
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <header className="sticky top-5 z-50 px-8 py-2 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-screen-xl mx-auto">
      <div className="container flex items-center px-4 w-full mx-auto gap-12">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl tracking-wider text-[#e60067]">
            Razvan Soare
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-6 text-sm font-medium">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center space-x-6">
              <StyledNavLink href="/">Home</StyledNavLink>
              <StyledNavLink href="/about">About</StyledNavLink>
              <StyledNavLink href="/snippets">Snippets</StyledNavLink>
              <StyledNavLink href="/projects">Projects</StyledNavLink>
            </div>

            <div className="flex items-center space-x-2">
              {renderThemeToggle({ isMobile: false })}
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-end w-full">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle></DrawerTitle>
                <DrawerHeader className="space-y-4">
                  <div className="flex flex-col space-y-3">
                    <StyledNavLink href="/">
                      <DrawerClose asChild>
                        <Button variant="ghost">Home</Button>
                      </DrawerClose>
                    </StyledNavLink>

                    <StyledNavLink href="/about">
                      <DrawerClose asChild>
                        <Button variant="ghost">About</Button>
                      </DrawerClose>
                    </StyledNavLink>
                    <StyledNavLink href="/snippets">
                      <DrawerClose asChild>
                        <Button variant="ghost">Snippets</Button>
                      </DrawerClose>
                    </StyledNavLink>
                    <StyledNavLink href="/projects">
                      <DrawerClose asChild>
                        <Button variant="ghost">Projects</Button>
                      </DrawerClose>
                    </StyledNavLink>
                    <div>{renderThemeToggle({ isMobile: true })}</div>
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
      </div>
    </header>
  )
}
