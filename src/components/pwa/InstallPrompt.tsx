import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSHint, setShowIOSHint] = useState(false)

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && (navigator as Navigator & { standalone?: boolean }).standalone)

    if (isStandalone) return

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)

    const dismissedAt = localStorage.getItem('sahakadrom-install-dismissed')
    if (dismissedAt) {
      const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24)
      if (daysSince < 7) setDismissed(true)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSHint(true)
      return
    }

    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    setShowIOSHint(false)
    localStorage.setItem('sahakadrom-install-dismissed', String(Date.now()))
  }

  const visible = !dismissed && (deferredPrompt || isIOS)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed right-4 bottom-4 left-4 z-[100] mx-auto max-w-lg safe-bottom"
        >
          <div className="bg-card flex flex-col gap-3 rounded-2xl border p-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">Kadro&apos;yu Yükle</p>
                <p className="text-muted-foreground text-sm">
                  {showIOSHint
                    ? 'Safari\'de Paylaş → Ana Ekrana Ekle\'ye dokun'
                    : 'Ana ekrana ekle, maç günü hızlıca kadro oluştur'}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={handleDismiss}>
                <X className="size-4" />
              </Button>
            </div>

            {!showIOSHint && (
              <Button variant="accent" className="w-full" onClick={handleInstall}>
                <Download className="size-4" />
                Ana Ekrana Ekle
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
