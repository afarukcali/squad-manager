import { motion } from 'framer-motion'
import { Check, Settings2 } from 'lucide-react'
import { FormationPicker } from '@/components/squad/FormationPicker'
import { Input } from '@/components/ui/input'
import { useSquadStore } from '@/store/squadStore'
import { TEAM_SIZE_OPTIONS } from '@/types'
import { cn } from '@/lib/utils'

export function SquadToolbar() {
  const { settings, setTeamSize, setTeamName } = useSquadStore()

  return (
    <motion.section
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="fifa-panel mb-5 space-y-4 rounded-sm p-4"
    >
      <div className="flex items-center gap-2 border-b border-[#00e5bc]/10 pb-3">
        <Settings2 className="size-4 text-[#00e5bc]" />
        <div>
          <h2 className="section-title text-sm leading-none">Maç Kurulumu</h2>
          <p className="text-muted-foreground text-[9px] tracking-wide uppercase">
            Format & takım ayarları
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {TEAM_SIZE_OPTIONS.map((size) => {
          const selected = settings.teamSize === size
          return (
            <button
              key={size}
              type="button"
              onClick={() => setTeamSize(size)}
              className={cn(
                'relative flex h-16 flex-1 flex-col items-center justify-center rounded-sm border-2 transition-all touch-manipulation',
                selected
                  ? 'size-pill-active border-[#00e5bc]/80'
                  : 'border-border bg-[#0a1018] text-muted-foreground hover:border-[#00e5bc]/30 hover:text-foreground',
              )}
            >
              <span className="font-display text-3xl leading-none">{size}</span>
              <span className="font-broadcast text-[8px] opacity-70">VS {size}</span>
              {selected && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#ffd700] text-[#1a1200] shadow-lg">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-sm border border-white/5 bg-black/30 p-3">
          <label
            htmlFor="blackTeamName"
            className="font-broadcast flex items-center gap-1.5 text-[10px] text-zinc-300"
          >
            <span className="size-2 rounded-full bg-zinc-900 ring-1 ring-white/20" />
            Siyah
          </label>
          <Input
            id="blackTeamName"
            placeholder="TAKIM ADI"
            value={settings.blackTeamName}
            onChange={(e) => setTeamName('black', e.target.value)}
            maxLength={20}
            className="h-10 border-white/10 bg-[#0a1018] text-sm font-bold uppercase tracking-wide text-white placeholder:text-zinc-600"
          />
          <FormationPicker teamId="black" label="Siyah" variant="dark" />
        </div>
        <div className="space-y-2 rounded-sm border border-[#00e5bc]/10 bg-[#00e5bc]/5 p-3">
          <label
            htmlFor="whiteTeamName"
            className="font-broadcast flex items-center gap-1.5 text-[10px] text-zinc-400"
          >
            <span className="size-2 rounded-full border border-white/40 bg-white" />
            Beyaz
          </label>
          <Input
            id="whiteTeamName"
            placeholder="TAKIM ADI"
            value={settings.whiteTeamName}
            onChange={(e) => setTeamName('white', e.target.value)}
            maxLength={20}
            className="h-10 border-white/10 bg-[#0a1018] text-sm font-bold uppercase tracking-wide text-white placeholder:text-zinc-600"
          />
          <FormationPicker teamId="white" label="Beyaz" variant="light" />
        </div>
      </div>
    </motion.section>
  )
}
