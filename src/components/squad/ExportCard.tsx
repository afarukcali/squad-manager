import type { CSSProperties, ReactNode } from 'react'
import { GloveIcon } from '@/components/field/GloveIcon'
import { getMatchFormationSummary, getTeamFormation } from '@/lib/formations'
import { getPositionStyle } from '@/lib/positionColors'
import type { KitColor, Player, SquadSettings } from '@/types'
import { getKitColor } from '@/types'

interface ExportCardProps {
  settings: SquadSettings
  blackPlayers: Player[]
  whitePlayers: Player[]
}

const PITCH_LIGHT = '#2d8f4e'
const PITCH_DARK = '#1f7340'

function ExportPlayerToken({
  name,
  number,
  kitColor,
  positionLabel,
  isGoalkeeper,
}: {
  name: string
  number: number
  kitColor: KitColor
  positionLabel: string
  isGoalkeeper: boolean
}) {
  const displayName = name.trim()
  const pos = getPositionStyle(positionLabel)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <div style={{ position: 'relative' }}>
        {isGoalkeeper && (
          <span
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              zIndex: 1,
              display: 'flex',
              width: 15,
              height: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9999,
              backgroundColor: '#ffd700',
              border: '1.5px solid #ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            }}
          >
            <GloveIcon size={8} color="#422006" />
          </span>
        )}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            padding: 3,
            background: `linear-gradient(135deg, ${pos.bg} 0%, ${pos.border} 100%)`,
            boxShadow: `0 0 10px ${pos.glow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: '0.06em',
              background: kitColor === 'black'
                ? 'linear-gradient(135deg, #52525b 0%, #18181b 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
              color: kitColor === 'black' ? '#ffffff' : '#18181b',
              fontFamily: '"Bebas Neue", Inter, Arial, sans-serif',
            }}
          >
            {number}
          </div>
        </div>
        <span
          style={{
            position: 'absolute',
            bottom: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 7,
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '1px 4px',
            borderRadius: 2,
            backgroundColor: pos.bg,
            color: pos.text,
            fontFamily: 'Oswald, Inter, Arial, sans-serif',
          }}
        >
          {positionLabel}
        </span>
      </div>
      {displayName && (
        <span
          style={{
            maxWidth: 72,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.75)',
            borderLeft: '2px solid #00e5bc',
            borderRadius: 2,
            padding: '2px 6px',
          }}
        >
          {displayName}
        </span>
      )}
    </div>
  )
}

const LINE = 'rgba(255, 255, 255, 0.58)'
const LINE_SOFT = 'rgba(255, 255, 255, 0.42)'

function ExportPitchLines() {
  const cornerStyle = (top?: string, bottom?: string, left?: string, right?: string, radius?: string): CSSProperties => ({
    position: 'absolute',
    top,
    bottom,
    left,
    right,
    width: 14,
    height: 14,
    borderRadius: radius,
    border: `1.5px solid ${LINE_SOFT}`,
    pointerEvents: 'none',
    zIndex: 0,
  })

  return (
    <>
      {/* Dış saha */}
      <div
        style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: 4,
          border: `1.5px solid ${LINE}`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Orta çizgi */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '3%',
          right: '3%',
          height: 1.5,
          backgroundColor: LINE,
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Orta saha */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '22%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: `1.5px solid ${LINE_SOFT}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Orta nokta */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: LINE,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Üst ceza sahası */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          width: '55%',
          height: '14%',
          transform: 'translateX(-50%)',
          border: `1.5px solid ${LINE_SOFT}`,
          borderTop: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Üst kale alanı */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          width: '30%',
          height: '7%',
          transform: 'translateX(-50%)',
          border: `1.5px solid ${LINE_SOFT}`,
          borderTop: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Alt ceza sahası */}
      <div
        style={{
          position: 'absolute',
          bottom: '3%',
          left: '50%',
          width: '55%',
          height: '14%',
          transform: 'translateX(-50%)',
          border: `1.5px solid ${LINE_SOFT}`,
          borderBottom: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Alt kale alanı */}
      <div
        style={{
          position: 'absolute',
          bottom: '3%',
          left: '50%',
          width: '30%',
          height: '7%',
          transform: 'translateX(-50%)',
          border: `1.5px solid ${LINE_SOFT}`,
          borderBottom: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Köşe yayları */}
      <div style={cornerStyle('3%', undefined, '3%', undefined, '0 0 12px 0')} />
      <div style={cornerStyle('3%', undefined, undefined, '3%', '0 0 0 12px')} />
      <div style={cornerStyle(undefined, '3%', '3%', undefined, '0 12px 0 0')} />
      <div style={cornerStyle(undefined, '3%', undefined, '3%', '12px 0 0 0')} />
    </>
  )
}

function ExportField({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        padding: 6,
        borderRadius: 8,
        background: 'linear-gradient(180deg, rgba(0,229,188,0.15) 0%, rgba(0,0,0,0.3) 50%, rgba(255,215,0,0.08) 100%)',
        boxShadow: '0 0 0 1px rgba(0,229,188,0.2), 0 16px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 6,
          border: '2px solid rgba(255,255,255,0.25)',
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.12), transparent 60%),
            radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%),
            linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.07) 49%, rgba(255,255,255,0.07) 51%, transparent 51%),
            repeating-linear-gradient(90deg, ${PITCH_LIGHT} 0, ${PITCH_LIGHT} 10%, ${PITCH_DARK} 10%, ${PITCH_DARK} 20%)
          `,
        }}
      >
        <ExportPitchLines />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>{children}</div>
      </div>
    </div>
  )
}

export function ExportCard({ settings, blackPlayers, whitePlayers }: ExportCardProps) {
  const blackName = settings.blackTeamName || 'Siyah'
  const whiteName = settings.whiteTeamName || 'Beyaz'
  const summary = getMatchFormationSummary(
    settings.teamSize,
    settings.blackFormation,
    settings.whiteFormation,
  )

  const blackFormation = getTeamFormation(settings.teamSize, 'black', settings.blackFormation)
  const whiteFormation = getTeamFormation(settings.teamSize, 'white', settings.whiteFormation)

  function getPositionLabel(player: Player) {
    const formation = player.teamId === 'black' ? blackFormation : whiteFormation
    return formation[player.slotIndex]?.label ?? 'OS'
  }

  return (
    <div
      style={{
        width: 400,
        padding: 20,
        background: 'linear-gradient(180deg, #050810 0%, #0a1018 50%, #070b10 100%)',
        borderRadius: 12,
        fontFamily: 'Inter, Arial, sans-serif',
        boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
        border: '1px solid rgba(0,229,188,0.2)',
      }}
    >
      {/* Skorboard */}
      <div style={{ display: 'flex', marginBottom: 14, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ flex: 1, background: '#f4f4f5', padding: '8px 12px', textAlign: 'right' }}>
          <div style={{ fontSize: 8, letterSpacing: '0.1em', color: '#71717a', fontFamily: 'Oswald, sans-serif' }}>{settings.whiteFormation}</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#18181b', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.06em' }}>{whiteName.toUpperCase()}</div>
        </div>
        <div style={{ background: '#0a1018', padding: '6px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 8, color: '#00e5bc', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>{settings.teamSize}V{settings.teamSize}</div>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#ffd700', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.15em' }}>VS</div>
        </div>
        <div style={{ flex: 1, background: '#18181b', padding: '8px 12px' }}>
          <div style={{ fontSize: 8, letterSpacing: '0.1em', color: '#71717a', fontFamily: 'Oswald, sans-serif' }}>{settings.blackFormation}</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.06em' }}>{blackName.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.12em', color: '#6b8494', fontFamily: 'Oswald, sans-serif' }}>
          {summary} · KADRO
        </span>
      </div>

      <ExportField>
        {[...whitePlayers, ...blackPlayers].map((player) => (
          <div
            key={player.id}
            style={{
              position: 'absolute',
              left: `${player.fieldPosition.x}%`,
              top: `${player.fieldPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ExportPlayerToken
              name={player.name}
              number={player.number}
              kitColor={getKitColor(player.teamId)}
              positionLabel={getPositionLabel(player)}
              isGoalkeeper={player.slotIndex === 0}
            />
          </div>
        ))}
      </ExportField>
    </div>
  )
}
