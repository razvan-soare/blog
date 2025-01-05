import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme.js"
// @ts-expect-error Tailwind motion does not have a type definition
import tailwindcssMotion from "tailwindcss-motion"
import tailwindcssTypography from "@tailwindcss/typography"
// @ts-expect-error Missing type definitions for internal tailwind utility
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js"

const config = {
  darkMode: ["class"],
  content: [
    "../../apps/web/lib/**/*.{ts,tsx}",
    "../../apps/web/components/**/*.{ts,tsx}",
    "../../apps/web/content/**/*.{ts,tsx}",
    "../../apps/web/app/**/*.{ts,tsx}",
    "../../packages/ui/src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(10px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        sriracha: ["Sriracha", ...fontFamily.sans],
        reenie: ["Reenie", ...fontFamily.sans],
        wotfard: ["Wotfard", ...fontFamily.sans],
        league: ["LeagueMono", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        homeBg: "var(--home-bg)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: "var(--tertiary)",
        highlight: "var(--highlight)",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssMotion,
    tailwindcssTypography,
    addVariablesForColors,
  ],
} satisfies Config

export default config

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}
