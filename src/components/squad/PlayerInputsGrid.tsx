import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSquadStore } from "@/store/squadStore";
import { TEAMS, type TeamId } from "@/types";
import { cn } from "@/lib/utils";

function JerseyNumberInput({ id, value, onChange, className }: { id: string; value: number; onChange: (number: number) => void; className?: string }) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={draft}
      onChange={(e) => {
        const next = e.target.value;
        if (next !== "" && !/^\d{1,2}$/.test(next)) return;

        setDraft(next);

        if (next === "") return;

        const num = parseInt(next, 10);
        if (num >= 1 && num <= 99) onChange(num);
      }}
      onBlur={() => {
        if (draft === "") {
          setDraft(String(value));
          return;
        }

        const num = parseInt(draft, 10);
        if (num < 1 || num > 99) {
          setDraft(String(value));
        }
      }}
      className={className}
    />
  );
}

function TeamPlayerInputs({
  teamId,
  teamLabel,
  players,
  onUpdateName,
  onUpdateNumber,
}: {
  teamId: TeamId;
  teamLabel: string;
  players: { id: string; name: string; number: number }[];
  onUpdateName: (playerId: string, name: string) => void;
  onUpdateNumber: (playerId: string, number: number) => void;
}) {
  const isBlack = teamId === "black";

  return (
    <div className={cn("min-w-0 flex-1 rounded-sm border p-3", isBlack ? "border-white/5 bg-black/30" : "border-[#00e5bc]/10 bg-[#00e5bc]/5")}>
      <h3 className="font-broadcast mb-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <span className={cn("size-2 rounded-full", isBlack ? "bg-zinc-900 ring-1 ring-white/20" : "border border-white/40 bg-white")} />
        {teamLabel}
      </h3>
      <div className="space-y-1">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: isBlack ? -6 : 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.025 }}
            className="group flex items-center gap-1.5 rounded-sm border border-white/5 bg-[#0a1018]/80 p-1 transition-all focus-within:border-[#00e5bc]/40 focus-within:shadow-[0_0_12px_rgba(0,229,188,0.15)]"
          >
            <Label htmlFor={`num-${player.id}`} className="sr-only">
              {teamLabel} numara
            </Label>
            <JerseyNumberInput
              id={`num-${player.id}`}
              value={player.number}
              onChange={(number) => onUpdateNumber(player.id, number)}
              className={cn(
                "font-display h-8 w-11 shrink-0 rounded-sm border-0 px-0 text-center text-base tracking-wider",
                isBlack ? "bg-zinc-800 text-white" : "bg-[#00e5bc] text-[#021510]",
              )}
            />
            <Label htmlFor={`player-${player.id}`} className="sr-only">
              {teamLabel} {player.number}
            </Label>
            <Input
              id={`player-${player.id}`}
              placeholder="OYUNCU"
              value={player.name}
              onChange={(e) => onUpdateName(player.id, e.target.value)}
              className="h-8 min-w-0 flex-1 border-0 bg-transparent px-1 text-xs font-semibold uppercase tracking-wide text-white shadow-none placeholder:text-zinc-600 focus-visible:ring-0"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function PlayerInputsGrid() {
  const { blackPlayers, whitePlayers, updatePlayer } = useSquadStore();

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="fifa-panel mb-5 rounded-sm p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-[#00e5bc]/10 pb-3">
        <UserRound className="size-4 text-[#00e5bc]" />
        <div>
          <h2 className="section-title text-sm leading-none">Kadro Listesi</h2>
          <p className="text-muted-foreground text-[9px] uppercase tracking-wide">İsimler sahada anında güncellenir</p>
        </div>
      </div>
      <div className="flex gap-3">
        {TEAMS.map((team) => (
          <TeamPlayerInputs
            key={team.id}
            teamId={team.id}
            teamLabel={team.label}
            players={team.id === "black" ? blackPlayers : whitePlayers}
            onUpdateName={(playerId, name) => updatePlayer(team.id, playerId, { name })}
            onUpdateNumber={(playerId, number) => updatePlayer(team.id, playerId, { number })}
          />
        ))}
      </div>
    </motion.section>
  );
}
