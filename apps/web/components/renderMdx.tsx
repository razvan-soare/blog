"use client"

import { components } from "@/lib/mdxComponents"
import { MDXRemote } from "next-mdx-remote"

import { MDXRemoteSerializeResult } from "next-mdx-remote"

export const RenderMDX = ({ source }: { source: MDXRemoteSerializeResult }) => {
  return <MDXRemote {...source} components={components} />
}
