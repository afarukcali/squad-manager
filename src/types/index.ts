export type TeamSize = 6 | 7 | 8
export type KitColor = 'black' | 'white'
export type TeamId = 'black' | 'white'

export interface FieldPosition {
  x: number
  y: number
}

export interface Player {
  id: string
  name: string
  number: number
  teamId: TeamId
  slotIndex: number
  fieldPosition: FieldPosition
}

export interface SquadSettings {
  teamSize: TeamSize
  blackTeamName: string
  whiteTeamName: string
  blackFormation: string
  whiteFormation: string
}

export const TEAM_SIZE_OPTIONS: TeamSize[] = [6, 7, 8]

export const TEAMS: { id: TeamId; label: string; kitColor: KitColor }[] = [
  { id: 'black', label: 'Siyah', kitColor: 'black' },
  { id: 'white', label: 'Beyaz', kitColor: 'white' },
]

export function getKitColor(teamId: TeamId): KitColor {
  return teamId === 'black' ? 'black' : 'white'
}
