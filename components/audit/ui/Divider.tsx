interface DividerProps {
  style?: React.CSSProperties
}

export function Divider({ style }: DividerProps) {
  return <div style={{ height: '1px', background: '#E8E5E0', margin: '0', ...style }} />
}
