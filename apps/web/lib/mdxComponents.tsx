import { MarkdownLink } from "@/components/mdxComponents/MarkdownLink"
import * as mdx from "@mdx-js/react"
import { CodeBlock } from "@workspace/ui/components/codeblock"
import { LinkProps } from "next/link"
import { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react"

export const components: React.ComponentProps<
  typeof mdx.MDXProvider
>["components"] = {
  a: function a(
    props: DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  ) {
    const linkProps = {
      children: props.children,
      className:
        "text-highlight hover:[text-decoration-line:underline] hover:[text-underline-offset:4px] font-normal",
      ...props,
    } as LinkProps & { children: React.ReactNode }

    return <MarkdownLink {...linkProps} />
  },
  p: function p(
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >
  ) {
    return <p className="text-primary mb-8 text-lg" {...props} />
  },
  em: function em(
    props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  ) {
    return <span className="text-secondary font-sriracha" {...props} />
  },
  h2: function h2(
    props: DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) {
    return (
      <h2
        className="text-tertiary relative mb-8 mt-16 text-3xl font-normal"
        {...props}
      >
        {props.id && (
          <div
            id={props.id}
            className="pointer-events-none absolute -top-[100px] -z-10 opacity-0"
          />
        )}
        {props.children}
      </h2>
    )
  },
  VideoGifImg: () => {
    return null
  },
  CodeBlock,
  pre: function pre(preProps) {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }

    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
}

// // Customize markdown component
// const mdxComponents = {

//   'ul.li': function ulli({ children }) {
//     return (
//       <li>
//         <span className="icon-wrap">
//           <ChevronRightSvg className="icon-chevron-right" />
//         </span>
//         <span className="ul-children">{children}</span>
//       </li>
//     );
//   },
//   'ol.li': function olli({ children }) {
//     return (
//       <li>
//         <span>{children}</span>
//       </li>
//     );
//   },
//   hr: function hr() {
//     <Hr widthInPercent="100" verticalMargin="0.8rem" />;
//   },
//   // Use the below components without having to import in *.mdx
//   VideoGifImg,
//   List,
//   Primary,
//   Danger,
//   Warning,
//   Success,
//   Info,
//   U,
// };