'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

const sans = 'var(--font-geist-sans), system-ui, sans-serif'

interface DataPoint { name: string; you: number; avg: number }

export default function BenchmarkChartInner({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={14} barGap={3}>
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#AEAAA4', fontFamily: sans }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#AEAAA4', fontFamily: sans }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #E8E5E0', fontSize: '12px', fontFamily: sans }}
          formatter={(v: number) => [`${v}%`]}
        />
        <Bar dataKey="avg" fill="#E8E5E0" radius={[3, 3, 0, 0]} name="Industry avg" />
        <Bar dataKey="you" fill="#1A1A1A" radius={[3, 3, 0, 0]} name="You" />
      </BarChart>
    </ResponsiveContainer>
  )
}
