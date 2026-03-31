'use client'

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts'

const sans = 'var(--font-geist-sans), system-ui, sans-serif'

interface DataPoint { subject: string; full: number }

export default function RadarChartInner({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#E8E5E0" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B6860', fontFamily: sans }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="full" stroke="#1A1A1A" fill="#1A1A1A" fillOpacity={0.08} strokeWidth={1.5} dot={false} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
