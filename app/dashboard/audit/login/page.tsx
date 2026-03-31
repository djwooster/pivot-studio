'use client'

import { useState } from 'react'
import { createAnonClient } from '@/lib/audit/supabase'

const sans  = 'var(--font-geist-sans), system-ui, sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, serif'

export default function AuditLoginPage() {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState<string | null>(null)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    setError(null)
    try {
      const supabase = createAnonClient()
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard/audit` },
      })
      if (err) throw err
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: sans }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ width: '24px', height: '24px', background: '#1A1A1A', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>Audit Dashboard</span>
        </div>

        {sent ? (
          <div>
            <h1 style={{ fontFamily: serif, fontSize: '1.8rem', fontWeight: 400, color: '#1A1A1A', marginBottom: '12px', letterSpacing: '-0.02em' }}>Check your email</h1>
            <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.7 }}>
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <div>
            <h1 style={{ fontFamily: serif, fontSize: '1.8rem', fontWeight: 400, color: '#1A1A1A', marginBottom: '8px', letterSpacing: '-0.02em' }}>Sign in</h1>
            <p style={{ fontSize: '14px', color: '#6B6860', lineHeight: 1.7, marginBottom: '32px' }}>Enter your email to receive a magic link.</p>
            <form onSubmit={handleSend}>
              <input
                type="email"
                placeholder="you@agency.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #E8E5E0', borderRadius: '8px', fontSize: '14px', color: '#1A1A1A', background: '#FAFAF9', outline: 'none', fontFamily: sans, marginBottom: '12px', boxSizing: 'border-box' }}
              />
              {error && <p style={{ fontSize: '12px', color: '#6B1E1E', marginBottom: '12px' }}>{error}</p>}
              <button
                type="submit"
                disabled={loading || !email.includes('@')}
                style={{ width: '100%', padding: '12px', background: '#1A1A1A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: sans }}
              >
                {loading ? 'Sending…' : 'Send magic link →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
