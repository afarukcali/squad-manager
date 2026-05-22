import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { KitColor } from '@/types'
import { PlayerToken } from '@/components/field/PlayerToken'
import { cn } from '@/lib/utils'

interface DraggablePlayerProps {
  id: string
  name: string
  number: number
  kitColor: KitColor
  positionLabel?: string
  size?: 'sm' | 'md' | 'lg'
  isGoalkeeper?: boolean
  disabled?: boolean
  className?: string
}

export function DraggablePlayer({
  id,
  name,
  number,
  kitColor,
  positionLabel,
  size = 'md',
  isGoalkeeper = false,
  disabled = false,
  className,
}: DraggablePlayerProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  })

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn('cursor-grab touch-manipulation active:cursor-grabbing', className)}
    >
      <PlayerToken
        name={name}
        number={number}
        kitColor={kitColor}
        positionLabel={positionLabel}
        size={size}
        isGoalkeeper={isGoalkeeper}
        isDragging={isDragging}
        className={cn(isDragging && 'opacity-40')}
      />
    </div>
  )
}
