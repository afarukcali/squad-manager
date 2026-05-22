interface GloveIconProps {
  size?: number
  /** Eldiven rengi */
  color?: string
  className?: string
}

/** Kaleci eldiveni — sade SVG, export uyumlu */
export function GloveIcon({ size = 12, color = '#422006', className }: GloveIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Parmaklar */}
      <path
        d="M5.5 10.5V6.2C5.5 5.4 6.1 4.8 6.9 4.8C7.5 4.8 8 5.2 8.2 5.8V10.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.2 10.5V5.5C8.2 4.5 9 3.7 10 3.7C10.8 3.7 11.5 4.2 11.7 5V10.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.7 10.5V5.8C11.7 4.9 12.4 4.2 13.3 4.2C14 4.2 14.6 4.7 14.8 5.4V10.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14.8 10.5V6.5C14.8 5.8 15.3 5.2 16 5.2C16.7 5.2 17.2 5.7 17.4 6.3V10.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Avuç + bilek */}
      <path
        d="M4.5 10.5H18.5C19.3 10.5 20 11.2 20 12V14.5C20 17.4 17.7 19.7 14.8 19.7H8.2C5.3 19.7 3 17.4 3 14.5V12.5C3 11.4 3.9 10.5 4.5 10.5Z"
        fill={color}
      />
      {/* Dikiş detayı */}
      <path
        d="M7 14.5H16"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}
