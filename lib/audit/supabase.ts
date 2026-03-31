import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Support both Supabase's legacy name and the newer "publishable" naming
const supabaseAnon = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

/** Anon client — safe for client-side use, respects RLS */
export function createAnonClient() {
  return createClient(supabaseUrl, supabaseAnon)
}

/** Service-role client — server-side only, bypasses RLS */
export function createServiceClient() {
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
