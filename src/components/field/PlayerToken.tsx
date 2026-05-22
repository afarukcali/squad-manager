import type { KitColor } from '@/types'
import { GloveIcon } from '@/components/field/GloveIcon'
import { getPositionStyle } from '@/lib/positionColors'
import { cn } from '@/lib/utils'

interface PlayerTokenProps {
  name: string
  number: number
  kitColor: KitColor
  positionLabel?: string
  size?: 'sm' | 'md' | 'lg'
  isDragging?: boolean
  isGoalkeeper?: boolean
  className?: string
}

const sizeMap = {
  sm: { outer: 44, inner: 36, text: 'text-sm', badge: 'text-[7px] w-4 h-3.5', name: 'text-[8px] max-w-[4rem]' },
  md: { outer: 52, inner: 42, text: 'text-base', badge: 'text-[8px] w-5 h-4', name: 'text-[9px] max-w-[4.5rem]' },
  lg: { outer: 60, inner: 48, text: 'text-lg', badge: 'text-[9px] w-5 h-4', name: 'text-[10px] max-w-[5rem]' },
}

export function PlayerToken({
  name,
  number,
  kitColor,
  positionLabel = 'OS',
  size = 'md',
  isDragging = false,
  isGoalkeeper = false,
  className,
}: PlayerTokenProps) {
  const displayName = name.trim()
  const hasName = displayName.length > 0
  const pos = getPositionStyle(positionLabel)
  const s = sizeMap[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 touch-none select-none',
        isDragging && 'z-50 scale-110',
        className,
      )}
    >
      <div
        className="relative transition-transform"
        style={{
          filter: hasName || isDragging ? `drop-shadow(0 0 8px ${pos.glow})` : undefined,
        }}
      >
        {isGoalkeeper && (
          <span
            className="absolute -top-1 -right-1 z-10 flex size-[17px] items-center justify-center rounded-full border border-white bg-[#ffd700] shadow-lg"
            title="Kaleci"
          >
            <GloveIcon size={9} color="#422006" />
          </span>
        )}

        {/* FIFA pozisyon halkası */}
        <div
          className="flex items-center justify-center rounded-full p-[3px]"
          style={{
            width: s.outer,
            height: s.outer,
            background: `linear-gradient(135deg, ${pos.bg} 0%, ${pos.border} 100%)`,
            boxShadow: isDragging
              ? `0 0 16px ${pos.glow}, 0 4px 12px rgba(0,0,0,0.5)`
              : `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          <div
            className={cn(
              'font-display flex items-center justify-center rounded-full tracking-wider',
              s.text,
              kitColor === 'black'
                ? 'bg-gradient-to-br from-zinc-700 to-zinc-950 text-white'
                : 'bg-gradient-to-br from-white to-zinc-200 text-zinc-900',
            )}
            style={{ width: s.inner, height: s.inner }}
          >
            {number}
          </div>
        </div>

        {/* Pozisyon rozeti */}
        <span
          className={cn(
            'font-broadcast absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-sm leading-none',
            s.badge,
          )}
          style={{
            backgroundColor: pos.bg,
            color: pos.text,
            boxShadow: `0 0 6px ${pos.glow}`,
          }}
        >
          {positionLabel}
        </span>
      </div>

      {/* FIFA yayın isim bandı */}
      <div
        className={cn(
          'fifa-name-tag rounded-sm px-2 py-0.5',
          s.name,
          !hasName && 'opacity-60',
        )}
      >
        <span className="block truncate font-bold text-white">
          {hasName ? displayName.toUpperCase() : 'İSİM GİR'}
        </span>
      </div>
    </div>
  )
}
