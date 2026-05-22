import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GripVertical, RotateCcw, Tv2 } from 'lucide-react'
import { FootballField } from '@/components/field/FootballField'
import { FormationSlotZone } from '@/components/field/FormationSlotZone'
import { PlayerToken } from '@/components/field/PlayerToken'
import { Button } from '@/components/ui/button'
import { getMatchFormationSummary, getTeamFormation, parseSlotDropId } from '@/lib/formations'
import { findPlayerById, getPlayerAtSlot, useSquadStore } from '@/store/squadStore'
import { getKitColor, TEAMS, type Player } from '@/types'

function MatchScoreboard({
  whiteName,
  blackName,
  whiteFormation,
  blackFormation,
  teamSize,
}: {
  whiteName: string
  blackName: string
  whiteFormation: string
  blackFormation: string
  teamSize: number
}) {
  return (
    <div className="broadcast-bar mb-3 overflow-hidden rounded-sm">
      <div className="flex items-stretch">
        {/* Beyaz takım */}
        <div className="flex min-w-0 flex-1 flex-col items-end justify-center bg-white/95 px-3 py-2">
          <span className="font-broadcast truncate text-[10px] text-zinc-500">{whiteFormation}</span>
          <span className="font-display truncate text-base tracking-wider text-zinc-900">
            {whiteName.toUpperCase()}
          </span>
        </div>

        {/* Skor alanı */}
        <div className="flex shrink-0 flex-col items-center justify-center bg-[#0a1018] px-4 py-1.5">
          <span className="font-broadcast text-[8px] text-[#00e5bc]">{teamSize}v{teamSize}</span>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-white/30">—</span>
            <span className="vs-badge font-display px-2 py-0.5 text-xs tracking-[0.2em] text-[#1a1200]">
              VS
            </span>
            <span className="font-display text-2xl text-white/30">—</span>
          </div>
        </div>

        {/* Siyah takım */}
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center bg-zinc-900 px-3 py-2">
          <span className="font-broadcast truncate text-[10px] text-zinc-500">{blackFormation}</span>
          <span className="font-display truncate text-base tracking-wider text-white">
            {blackName.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}

export function FormationBoard() {
  const {
    settings,
    blackPlayers,
    whitePlayers,
    assignPlayerToSlot,
    resetFormationPositions,
  } = useSquadStore()
  const [activePlayer, setActivePlayer] = useState<Player | null>(null)

  const blackFormation = useMemo(
    () => getTeamFormation(settings.teamSize, 'black', settings.blackFormation),
    [settings.teamSize, settings.blackFormation],
  )
  const whiteFormation = useMemo(
    () => getTeamFormation(settings.teamSize, 'white', settings.whiteFormation),
    [settings.teamSize, settings.whiteFormation],
  )

  const activeSlotLabel = useMemo(() => {
    if (!activePlayer) return 'OS'
    const formation = activePlayer.teamId === 'black' ? blackFormation : whiteFormation
    return formation[activePlayer.slotIndex]?.label ?? 'OS'
  }, [activePlayer, blackFormation, whiteFormation])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const player = findPlayerById(blackPlayers, whitePlayers, event.active.id as string)
    setActivePlayer(player ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActivePlayer(null)
    const { active, over } = event
    if (!over) return

    const parsed = parseSlotDropId(over.id as string)
    if (!parsed) return

    assignPlayerToSlot(parsed.teamId, active.id as string, parsed.slotIndex)
  }

  const whiteName = settings.whiteTeamName || 'Beyaz'
  const blackName = settings.blackTeamName || 'Siyah'

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv2 className="size-4 text-[#00e5bc]" />
          <div>
            <h2 className="section-title text-sm leading-none">Taktik Ekranı</h2>
            <p className="text-muted-foreground flex items-center gap-1 text-[9px] uppercase tracking-wide">
              <GripVertical className="size-3" />
              Sürükle & bırak
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetFormationPositions}
          aria-label="Sıfırla"
          className="text-muted-foreground hover:bg-[#00e5bc]/10 hover:text-[#00e5bc]"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      <MatchScoreboard
        whiteName={whiteName}
        blackName={blackName}
        whiteFormation={settings.whiteFormation}
        blackFormation={settings.blackFormation}
        teamSize={settings.teamSize}
      />

      <p className="text-muted-foreground mb-2 text-center text-[9px] uppercase tracking-widest">
        {getMatchFormationSummary(
          settings.teamSize,
          settings.blackFormation,
          settings.whiteFormation,
        )}
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="tactical-frame rounded-sm p-1.5"
        >
          <FootballField>
            {TEAMS.map((team) => {
              const formation = team.id === 'black' ? blackFormation : whiteFormation
              const players = team.id === 'black' ? blackPlayers : whitePlayers

              return formation.map((slot, index) => (
                <FormationSlotZone
                  key={`${team.id}-${slot.id}`}
                  teamId={team.id}
                  slotIndex={index}
                  slot={slot}
                  player={getPlayerAtSlot(players, index)}
                  kitColor={getKitColor(team.id)}
                  isDragActive={!!activePlayer}
                />
              ))
            })}
          </FootballField>
        </motion.div>

        <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
          {activePlayer ? (
            <PlayerToken
              name={activePlayer.name}
              number={activePlayer.number}
              kitColor={getKitColor(activePlayer.teamId)}
              positionLabel={activeSlotLabel}
              size="sm"
              isGoalkeeper={activePlayer.slotIndex === 0}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  )
}
