import { cn } from "@/lib/utils";
import { STATE_PRESENTATION } from "@/lib/az/mockData";
import type { AzState } from "@/lib/az/types";

const DOT: Record<AzState, string> = {
  idle: "bg-az",
  listening: "bg-accent",
  thinking: "bg-azn",
  working: "bg-az",
  researching: "bg-azm",
  awaiting_approval: "bg-warning",
  completed: "bg-success",
  error: "bg-destructive",
  sleeping: "bg-azm",
};

export function StateBadge({ state, className }: { state: AzState; className?: string }) {
  const p = STATE_PRESENTATION[state];
  return (
    <div
      className={cn(
        "glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs tracking-wide",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full anim-twinkle", DOT[state])} />
      <span className="font-medium text-foreground">{p.label}</span>
      <span className="text-muted-foreground">{p.subtle}</span>
    </div>
  );
}
