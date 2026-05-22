import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
    children: ReactNode;
    headerAction?: ReactNode;
    className?: string;
}

export function AppLayout({
    children,
    headerAction,
    className,
}: AppLayoutProps) {
    return (
        <div className="flex min-h-dvh flex-col">
            <header className="broadcast-header sticky top-0 z-50 text-white">
                <div className="mx-auto flex h-[4.25rem] max-w-lg items-center gap-3 px-4">
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-lg bg-[#00e5bc]/20 blur-lg" />
                        <div className="relative flex size-11 items-center justify-center rounded-lg border border-[#00e5bc]/30 bg-[#0a1418]">
                            <span className="text-xl leading-none">⚽</span>
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="font-display text-[1.65rem] leading-none tracking-widest text-white">
                                Kadro
                            </h1>
                        </div>
                    </div>
                    {headerAction}
                </div>
            </header>

            <main
                className={cn(
                    "mx-auto w-full max-w-lg flex-1 px-4 pt-4 pb-32",
                    className,
                )}
            >
                {children}
            </main>
        </div>
    );
}
