import Link from "next/link"

interface StyledNavLinkProps {
  href: string
  children: React.ReactNode
}

export function StyledNavLink({ href, children }: StyledNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-base font-light tracking-[0.3px] transition-colors hover:text-foreground/80 text-foreground"
    >
      {children}
    </Link>
  )
}
