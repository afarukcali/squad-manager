export interface PositionStyle {
  bg: string
  border: string
  text: string
  glow: string
}

export function getPositionStyle(label: string): PositionStyle {
  switch (label) {
    case 'KL':
      return { bg: '#fbbf24', border: '#f59e0b', text: '#422006', glow: 'rgba(251,191,36,0.65)' }
    case 'DF':
      return { bg: '#3b82f6', border: '#2563eb', text: '#ffffff', glow: 'rgba(59,130,246,0.65)' }
    case 'OS':
      return { bg: '#22c55e', border: '#16a34a', text: '#ffffff', glow: 'rgba(34,197,94,0.65)' }
    case 'FV':
      return { bg: '#ef4444', border: '#dc2626', text: '#ffffff', glow: 'rgba(239,68,68,0.65)' }
    default:
      return { bg: '#64748b', border: '#475569', text: '#ffffff', glow: 'rgba(100,116,139,0.5)' }
  }
}
