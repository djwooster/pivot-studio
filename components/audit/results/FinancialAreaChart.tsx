'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

import { sans, fmtDollar } from '@/lib/audit/tokens'

const COLOR_AI   = '#2D6A4F'
const COLOR_SQUO = '#dc2626'

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
        <Area type="monotone" dataKey="withoutAI" stroke={COLOR_SQUO} strokeWidth={1.5} fill="#fef2f2" strokeDasharray="4 3" name="Status quo" fillOpacity={0.3} />
        <Area type="monotone" dataKey="withAI"    stroke={COLOR_AI}   strokeWidth={2}   fill="#d8f3dc" name="With AI"    fillOpacity={0.4} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
