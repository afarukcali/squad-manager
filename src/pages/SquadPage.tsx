import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ExportCard } from "@/components/squad/ExportCard";
import { FormationBoard } from "@/components/squad/FormationBoard";
import { PlayerInputsGrid } from "@/components/squad/PlayerInputsGrid";
import { SquadToolbar } from "@/components/squad/SquadToolbar";
import { Button } from "@/components/ui/button";
import { captureElementAsPng } from "@/lib/exportImage";
import { useSquadStore } from "@/store/squadStore";

export function SquadPage() {
    const exportRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const { settings, blackPlayers, whitePlayers, bootstrapSquad } =
        useSquadStore();

    useEffect(() => {
        bootstrapSquad();
    }, [bootstrapSquad]);

    const handleDownload = async () => {
        if (!exportRef.current) return;

        setIsExporting(true);
        try {
            const black = settings.blackTeamName || "siyah";
            const white = settings.whiteTeamName || "beyaz";
            await captureElementAsPng(
                exportRef.current,
                `kadro-${black}-vs-${white}.png`,
            );
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <AppLayout
                headerAction={
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={isExporting}
                        className="shrink-0 border-[#00e5bc]/30 bg-[#00e5bc]/10 text-[#00e5bc] hover:bg-[#00e5bc]/20"
                    >
                        <Download className="size-4" />
                        {isExporting ? "..." : "İndir"}
                    </Button>
                }
            >
                <SquadToolbar />
                <PlayerInputsGrid />
                <FormationBoard />
            </AppLayout>

            <div
                ref={exportRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: -9999,
                    width: 400,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                <ExportCard
                    settings={settings}
                    blackPlayers={blackPlayers}
                    whitePlayers={whitePlayers}
                />
            </div>

            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#00e5bc]/20 bg-[#070b10]/95 px-4 py-3 backdrop-blur-xl safe-bottom"
            >
                <div className="mx-auto max-w-lg space-y-1.5">
                    <Button
                        size="lg"
                        className="cta-fifa relative w-full border-0 font-broadcast text-[#021510] hover:opacity-95"
                        onClick={handleDownload}
                        disabled={isExporting}
                    >
                        <Download className="relative z-10 size-5" />
                        <span className="relative z-10 text-base tracking-[0.15em]">
                            {isExporting ? "HAZIRLANIYOR..." : "KADROYU İNDİR"}
                        </span>
                    </Button>
                </div>
            </motion.div>
        </>
    );
}
