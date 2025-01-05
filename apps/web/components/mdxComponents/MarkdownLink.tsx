import Link, { LinkProps } from "next/link"

export const MarkdownLink = ({
  href,
  children,
  ...rest
}: LinkProps & { children: React.ReactNode }) => {
  const hrefString = typeof href === "string" ? href : href.toString()
  if (hrefString.startsWith("/")) {
    return <Link href={href} {...rest} />
  }
  if (!hrefString.startsWith("http")) {
    return <a href={hrefString} {...rest} />
  }

  return (
    <a
      data-link-external
      href={hrefString}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...rest}
    >
      {children}
    </a>
  )
}
