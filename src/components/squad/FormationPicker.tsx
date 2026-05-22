import { getFormationOptions } from '@/lib/formations'
import { useSquadStore } from '@/store/squadStore'
import type { TeamId } from '@/types'
import { cn } from '@/lib/utils'

interface FormationPickerProps {
  teamId: TeamId
  label: string
  variant?: 'dark' | 'light'
}

export function FormationPicker({ teamId, label, variant = 'dark' }: FormationPickerProps) {
  const { settings, setTeamFormation } = useSquadStore()
  const options = getFormationOptions(settings.teamSize)
  const selected =
    teamId === 'black' ? settings.blackFormation : settings.whiteFormation

  return (
    <div className="space-y-1.5">
      <p className="font-broadcast text-[9px] text-muted-foreground">{label} Taktik</p>
      <div className="flex gap-1">
        {options.map((option) => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTeamFormation(teamId, option.id)}
              className={cn(
                'font-display flex-1 rounded-sm border px-1 py-1.5 text-sm tracking-wider transition-all touch-manipulation active:scale-95',
                isSelected
                  ? variant === 'dark'
                    ? 'team-chip-black border-[#00e5bc]/40 text-[#00e5bc] shadow-[0_0_12px_rgba(0,229,188,0.25)]'
                    : 'border-[#00e5bc] bg-[#00e5bc]/15 text-[#00e5bc] shadow-[0_0_12px_rgba(0,229,188,0.25)]'
                  : 'border-white/5 bg-black/20 text-muted-foreground hover:border-[#00e5bc]/20 hover:text-foreground',
              )}
            >
              {option.id}
            </button>
          )
        })}
      </div>
    </div>
  )
}
