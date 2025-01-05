import { createClient } from "@supabase/supabase-js"

import dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
// Singleton instance
let instance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!instance) {
    instance = createClient(supabaseUrl, supabaseKey)
  }
  return instance
}
