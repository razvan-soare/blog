"use client"
import React, { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { useTheme } from "next-themes"

type CodeBlockProps = {
  language: string
  filename: string
  highlightLines?: number[]
  showLineNumbers?: boolean
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: Array<{
        name: string
        code: string
        language?: string
        highlightLines?: number[]
      }>
    }
)

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  showLineNumbers = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const tabsExist = tabs.length > 0

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab]?.code : code
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeCode = tabsExist ? tabs[activeTab]?.code : code
  const activeLanguage = tabsExist
    ? tabs[activeTab]?.language || language
    : language
  const activeHighlightLines = tabsExist
    ? tabs[activeTab]?.highlightLines || []
    : highlightLines

  return (
    <div className="bg-syntaxBg relative w-full rounded-lg p-4 font-mono text-sm">
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`!py-2 px-3 font-sans text-xs transition-colors ${
                  activeTab === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex items-center justify-between py-2">
            <div className="text-xs text-zinc-400">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 font-sans text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={mounted ? (isDarkMode ? atomDark : oneLight) : oneLight}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem", // text-sm equivalent
        }}
        wrapLines={true}
        showLineNumbers={showLineNumbers}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  )
}
