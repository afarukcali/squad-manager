import type { TeamId, TeamSize } from '@/types'
import type { FieldPosition } from '@/types'

export interface FormationSlot extends FieldPosition {
  id: string
  label: string
}

export interface FormationPreset {
  id: string
  lines: number[]
}

/** Kaleci hariç saha dizilişi — sayılar toplamı = teamSize - 1 */
export const FORMATION_OPTIONS: Record<TeamSize, FormationPreset[]> = {
  6: [
    { id: '3-2-1', lines: [3, 2, 1] },
    { id: '2-2-1', lines: [2, 2, 1] },
    { id: '2-1-2', lines: [2, 1, 2] },
  ],
  7: [
    { id: '3-2-1', lines: [3, 2, 1] },
    { id: '2-2-2', lines: [2, 2, 2] },
    { id: '2-3-1', lines: [2, 3, 1] },
  ],
  8: [
    { id: '3-2-2', lines: [3, 2, 2] },
    { id: '3-3-1', lines: [3, 3, 1] },
    { id: '2-3-2', lines: [2, 3, 2] },
  ],
}

const BLACK_GK_Y = 88
const BLACK_LINE_MIN = 57
const BLACK_LINE_MAX = 78

function mirrorY(y: number): number {
  return 100 - y
}

function getLineLabel(lineIndex: number, totalLines: number): string {
  if (totalLines === 1) return 'OS'
  if (lineIndex === 0) return 'DF'
  if (lineIndex === totalLines - 1) return 'FV'
  return 'OS'
}

function getLineYPositions(lineCount: number): number[] {
  if (lineCount === 1) return [62]
  if (lineCount === 2) return [76, 58]
  if (lineCount === 3) return [76, 66, 57]
  if (lineCount === 4) return [78, 70, 62, 57]

  return Array.from({ length: lineCount }, (_, i) => {
    const t = i / (lineCount - 1)
    return BLACK_LINE_MAX - t * (BLACK_LINE_MAX - BLACK_LINE_MIN)
  })
}

function getLineXPositions(count: number, _presetId: string, lineIndex: number): number[] {
  // İki defans: kanat yerine ortada stoper çifti
  if (lineIndex === 0 && count === 2) {
    return [40, 60]
  }

  if (count === 1) return [50]

  const margin = count >= 4 ? 14 : 18
  const span = 100 - margin * 2

  return Array.from({ length: count }, (_, i) =>
    count === 1 ? 50 : margin + (span * i) / (count - 1),
  )
}

function buildBlackFormation(preset: FormationPreset): FormationSlot[] {
  const slots: FormationSlot[] = [
    { id: 'gk', label: 'KL', x: 50, y: BLACK_GK_Y },
  ]

  const yPositions = getLineYPositions(preset.lines.length)

  preset.lines.forEach((playerCount, lineIndex) => {
    const y = yPositions[lineIndex]
    const label = getLineLabel(lineIndex, preset.lines.length)
    const xPositions = getLineXPositions(playerCount, preset.id, lineIndex)

    xPositions.forEach((x, i) => {
      slots.push({
        id: `L${lineIndex}-${i}`,
        label,
        x,
        y,
      })
    })
  })

  return slots
}

export function getFormationOptions(teamSize: TeamSize): FormationPreset[] {
  return FORMATION_OPTIONS[teamSize]
}

export function getDefaultFormationId(teamSize: TeamSize): string {
  return FORMATION_OPTIONS[teamSize][0].id
}

export function getFormationPreset(teamSize: TeamSize, formationId: string): FormationPreset {
  const preset = FORMATION_OPTIONS[teamSize].find((f) => f.id === formationId)
  return preset ?? FORMATION_OPTIONS[teamSize][0]
}

export function getTeamFormation(
  teamSize: TeamSize,
  teamId: TeamId,
  formationId: string,
): FormationSlot[] {
  const preset = getFormationPreset(teamSize, formationId)
  const base = buildBlackFormation(preset)

  if (teamId === 'black') return base

  return base.map((slot) => ({
    ...slot,
    id: `w-${slot.id}`,
    y: mirrorY(slot.y),
  }))
}

export function getSlotDropId(teamId: TeamId, slotIndex: number): string {
  return `${teamId}-slot-${slotIndex}`
}

export function parseSlotDropId(id: string): { teamId: TeamId; slotIndex: number } | null {
  const match = id.match(/^(black|white)-slot-(\d+)$/)
  if (!match) return null
  return { teamId: match[1] as TeamId, slotIndex: parseInt(match[2], 10) }
}

export function formatFormationLabel(formationId: string): string {
  return formationId
}

export function getMatchFormationSummary(
  teamSize: TeamSize,
  blackFormation: string,
  whiteFormation: string,
): string {
  return `${getFormationPreset(teamSize, blackFormation).id} vs ${getFormationPreset(teamSize, whiteFormation).id}`
}
