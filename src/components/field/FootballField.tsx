import { cn } from '@/lib/utils'

interface FootballFieldProps {
  children?: React.ReactNode
  className?: string
}

export function FootballField({ children, className }: FootballFieldProps) {
  return (
    <div
      className={cn(
        'pitch-pattern relative aspect-[3/4] w-full overflow-hidden rounded-xl border-2 border-white/20 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      {/* Köşe projektörleri */}
      <div className="pointer-events-none absolute -top-8 -left-8 size-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 size-24 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 -bottom-8 size-24 rounded-full bg-white/5 blur-2xl" />

      {/* Vignette + scanline */}
      <div className="pitch-scanlines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      {/* Saha çizgileri */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-white/40" />
      <div className="pointer-events-none absolute top-1/2 right-3 left-3 h-px -translate-y-1/2 bg-white/40" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/35" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />

      {/* Kale alanları */}
      <div className="pointer-events-none absolute top-3 right-1/2 left-1/2 h-16 w-[55%] translate-x-[-50%] border-2 border-t-0 border-white/35" />
      <div className="pointer-events-none absolute top-3 right-1/2 left-1/2 h-8 w-[30%] translate-x-[-50%] border-2 border-t-0 border-white/25" />
      <div className="pointer-events-none absolute bottom-3 right-1/2 left-1/2 h-16 w-[55%] translate-x-[-50%] border-2 border-b-0 border-white/35" />
      <div className="pointer-events-none absolute bottom-3 right-1/2 left-1/2 h-8 w-[30%] translate-x-[-50%] border-2 border-b-0 border-white/25" />

      {/* Köşe yayları */}
      <div className="pointer-events-none absolute top-3 left-3 size-4 rounded-br-full border-r-2 border-b-2 border-white/30" />
      <div className="pointer-events-none absolute top-3 right-3 size-4 rounded-bl-full border-b-2 border-l-2 border-white/30" />
      <div className="pointer-events-none absolute bottom-3 left-3 size-4 rounded-tr-full border-t-2 border-r-2 border-white/30" />
      <div className="pointer-events-none absolute right-3 bottom-3 size-4 rounded-tl-full border-t-2 border-l-2 border-white/30" />

      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
