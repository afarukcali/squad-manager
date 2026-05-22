import type { Player, SquadSettings, TeamId, TeamSize } from '@/types'
import { getDefaultFormationId, getTeamFormation } from '@/lib/formations'
import { generateId } from '@/lib/utils'
import { create } from 'zustand'

interface SquadStore {
  settings: SquadSettings
  blackPlayers: Player[]
  whitePlayers: Player[]
  bootstrapSquad: () => void
  setTeamSize: (size: TeamSize) => void
  setTeamName: (teamId: TeamId, name: string) => void
  setTeamFormation: (teamId: TeamId, formationId: string) => void
  updatePlayer: (teamId: TeamId, playerId: string, updates: Partial<Pick<Player, 'name' | 'number'>>) => void
  assignPlayerToSlot: (teamId: TeamId, playerId: string, slotIndex: number) => void
  resetFormationPositions: () => void
  resetSquad: () => void
}

const DEFAULT_SETTINGS: SquadSettings = {
  teamSize: 7,
  blackTeamName: '',
  whiteTeamName: '',
  blackFormation: getDefaultFormationId(7),
  whiteFormation: getDefaultFormationId(7),
}

function getFormationId(settings: SquadSettings, teamId: TeamId): string {
  return teamId === 'black' ? settings.blackFormation : settings.whiteFormation
}

function createTeamPlayers(teamId: TeamId, settings: SquadSettings): Player[] {
  const formationId = getFormationId(settings, teamId)
  const formation = getTeamFormation(settings.teamSize, teamId, formationId)

  return formation.map((slot, index) => ({
    id: generateId(),
    name: '',
    number: index + 1,
    teamId,
    slotIndex: index,
    fieldPosition: { x: slot.x, y: slot.y },
  }))
}

function createBothTeams(settings: SquadSettings): { black: Player[]; white: Player[] } {
  return {
    black: createTeamPlayers('black', settings),
    white: createTeamPlayers('white', settings),
  }
}

function applyFormationToTeam(
  players: Player[],
  teamId: TeamId,
  settings: SquadSettings,
): Player[] {
  const formationId = getFormationId(settings, teamId)
  const formation = getTeamFormation(settings.teamSize, teamId, formationId)
  const sorted = [...players].sort((a, b) => a.slotIndex - b.slotIndex)

  return sorted.slice(0, formation.length).map((player, index) => {
    const slot = formation[index]
    return {
      ...player,
      teamId,
      slotIndex: index,
      fieldPosition: { x: slot.x, y: slot.y },
    }
  })
}

export const useSquadStore = create<SquadStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  blackPlayers: [],
  whitePlayers: [],

  bootstrapSquad: () => {
    const { blackPlayers, whitePlayers, settings } = get()

    if (blackPlayers.length === 0) {
      const teams = createBothTeams(settings)
      set({ blackPlayers: teams.black, whitePlayers: teams.white })
      return
    }

    set({
      blackPlayers: applyFormationToTeam(blackPlayers, 'black', settings),
      whitePlayers: applyFormationToTeam(whitePlayers, 'white', settings),
    })
  },

  setTeamSize: (teamSize) => {
    const { settings } = get()
    const newSettings: SquadSettings = {
      ...settings,
      teamSize,
      blackFormation: getDefaultFormationId(teamSize),
      whiteFormation: getDefaultFormationId(teamSize),
    }
    const teams = createBothTeams(newSettings)
    set({
      settings: newSettings,
      blackPlayers: teams.black,
      whitePlayers: teams.white,
    })
  },

  setTeamName: (teamId, name) => {
    set((state) => ({
      settings:
        teamId === 'black'
          ? { ...state.settings, blackTeamName: name }
          : { ...state.settings, whiteTeamName: name },
    }))
  },

  setTeamFormation: (teamId, formationId) => {
    const { settings, blackPlayers, whitePlayers } = get()
    const newSettings: SquadSettings =
      teamId === 'black'
        ? { ...settings, blackFormation: formationId }
        : { ...settings, whiteFormation: formationId }

    const key = teamId === 'black' ? 'blackPlayers' : 'whitePlayers'
    const players = teamId === 'black' ? blackPlayers : whitePlayers

    set({
      settings: newSettings,
      [key]: applyFormationToTeam(players, teamId, newSettings),
    })
  },

  updatePlayer: (teamId, playerId, updates) => {
    const key = teamId === 'black' ? 'blackPlayers' : 'whitePlayers'
    set((state) => {
      const players = state[key]

      if (updates.number !== undefined) {
        const taken = players.some(
          (p) => p.id !== playerId && p.number === updates.number,
        )
        if (taken) return state
      }

      return {
        [key]: players.map((player) =>
          player.id === playerId ? { ...player, ...updates } : player,
        ),
      }
    })
  },

  assignPlayerToSlot: (teamId, playerId, slotIndex) => {
    const key = teamId === 'black' ? 'blackPlayers' : 'whitePlayers'
    const { settings } = get()
    const formationId = getFormationId(settings, teamId)
    const formation = getTeamFormation(settings.teamSize, teamId, formationId)
    const slot = formation[slotIndex]
    if (!slot) return

    const players = get()[key]
    const dragged = players.find((p) => p.id === playerId)
    if (!dragged || dragged.teamId !== teamId) return

    const occupant = players.find((p) => p.slotIndex === slotIndex && p.id !== playerId)
    const sourceSlotIndex = dragged.slotIndex

    set({
      [key]: players.map((player) => {
        if (player.id === playerId) {
          return {
            ...player,
            slotIndex,
            fieldPosition: { x: slot.x, y: slot.y },
          }
        }

        if (occupant && player.id === occupant.id && sourceSlotIndex !== undefined) {
          const sourceSlot = formation[sourceSlotIndex]
          return {
            ...player,
            slotIndex: sourceSlotIndex,
            fieldPosition: { x: sourceSlot.x, y: sourceSlot.y },
          }
        }

        return player
      }),
    })
  },

  resetFormationPositions: () => {
    const { settings, blackPlayers, whitePlayers } = get()
    set({
      blackPlayers: applyFormationToTeam(blackPlayers, 'black', settings),
      whitePlayers: applyFormationToTeam(whitePlayers, 'white', settings),
    })
  },

  resetSquad: () => {
    const teams = createBothTeams(DEFAULT_SETTINGS)
    set({
      settings: DEFAULT_SETTINGS,
      blackPlayers: teams.black,
      whitePlayers: teams.white,
    })
  },
}))

export function getTeamPlayers(store: Pick<SquadStore, 'blackPlayers' | 'whitePlayers'>, teamId: TeamId): Player[] {
  return teamId === 'black' ? store.blackPlayers : store.whitePlayers
}

export function getAllPlayers(store: Pick<SquadStore, 'blackPlayers' | 'whitePlayers'>): Player[] {
  return [...store.blackPlayers, ...store.whitePlayers]
}

export function getPlayerAtSlot(players: Player[], slotIndex: number): Player | undefined {
  return players.find((p) => p.slotIndex === slotIndex)
}

export function findPlayerById(
  blackPlayers: Player[],
  whitePlayers: Player[],
  id: string,
): Player | undefined {
  return blackPlayers.find((p) => p.id === id) ?? whitePlayers.find((p) => p.id === id)
}
