import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import type { FormationSlot } from '@/lib/formations'
import { getSlotDropId } from '@/lib/formations'
import { getPositionStyle } from '@/lib/positionColors'
import type { KitColor, Player, TeamId } from '@/types'
import { DraggablePlayer } from '@/components/field/DraggablePlayer'
import { cn } from '@/lib/utils'

interface FormationSlotZoneProps {
  teamId: TeamId
  slotIndex: number
  slot: FormationSlot
  player?: Player
  kitColor: KitColor
  isDragActive: boolean
}

export function FormationSlotZone({
  teamId,
  slotIndex,
  slot,
  player,
  kitColor,
  isDragActive,
}: FormationSlotZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: getSlotDropId(teamId, slotIndex),
  })

  const pos = getPositionStyle(slot.label)

  return (
    <div
      ref={setNodeRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
    >
      {player ? (
        <motion.div
          key={player.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          <DraggablePlayer
            id={player.id}
            name={player.name}
            number={player.number}
            kitColor={kitColor}
            positionLabel={slot.label}
            size="sm"
            isGoalkeeper={slotIndex === 0}
          />
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isOver ? 1.2 : 1,
            opacity: isDragActive ? 0.9 : 0.45,
          }}
          className={cn(
            'flex size-11 flex-col items-center justify-center rounded-full border-2 border-dashed transition-all',
            isOver && 'border-[#00e5bc] bg-[#00e5bc]/20 shadow-[0_0_16px_rgba(0,229,188,0.5)]',
            !isOver && 'border-white/30 bg-black/30',
          )}
          style={
            isOver
              ? undefined
              : { boxShadow: `0 0 8px ${pos.glow}` }
          }
        >
          <span
            className="font-broadcast rounded-sm px-1 text-[8px] leading-none"
            style={{ backgroundColor: pos.bg, color: pos.text }}
          >
            {slot.label}
          </span>
        </motion.div>
      )}

      {player && isOver && (
        <motion.div
          layoutId={`slot-highlight-${teamId}-${slotIndex}`}
          className="pointer-events-none absolute inset-0 -m-2 rounded-full border-2 border-[#00e5bc] ring-2 ring-[#00e5bc]/40"
        />
      )}
    </div>
  )
}
