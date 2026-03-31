'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const sans = 'var(--font-geist-sans), system-ui, sans-serif'
const fmtDollar = (n: number) =>
  '$' + (n >= 1_000_000 ? (n/1_000_000).toFixed(1) + 'M' : n >= 1_000 ? Math.round(n/1_000) + 'K' : n.toLocaleString())

interface DataPoint { year: string; withAI: number; withoutAI: number }

export default function FinancialAreaChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E0" vertical={false} />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#AEAAA4', fontFamily: sans }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmtDollar} tick={{ fontSize: 10, fill: '#AEAAA4', fontFamily: sans }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(v: number) => [fmtDollar(v)]}
          contentStyle={{ borderRadius: '8px', border: '1px solid #E8E5E0', fontSize: '12px', fontFamily: sans, background: '#fff' }}
          labelStyle={{ color: '#1A1A1A', fontWeight: 500 }}
        />
        <Area type="monotone" dataKey="withoutAI" stroke="#D4D0C8" strokeWidth={1.5} fill="#FAFAF9" strokeDasharray="4 3" name="Status quo" />
        <Area type="monotone" dataKey="withAI"    stroke="#1A1A1A" strokeWidth={2}   fill="#F0EDE8" name="With AI" fillOpacity={0.5} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
