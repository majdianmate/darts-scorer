import '#/lib/load-env.ts'
import { createClient } from '@supabase/supabase-js'

function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL
  const anonKey = process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables')
  }

  return { url, anonKey }
}

export function createSupabaseServerClient() {
  const { url, anonKey } = getSupabaseEnv()
  return createClient(url, anonKey)
}
