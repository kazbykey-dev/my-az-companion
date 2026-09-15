import { StaffChip } from "./StaffChip";
import type { Activity } from "@/lib/az/types";

/** 「アズは今…」 — a glanceable pulse of what the team is doing. Not a task board. */
export function LiveActivity({ activities }: { activities: Activity[] }) {
  return (
    <section className="glass-panel anim-rise rounded-3xl px-4 py-3.5">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="size-1.5 animate-pulse rounded-full bg-success" />
        <h2 className="text-[13px] font-medium text-muted-foreground">アズは今…</h2>
      </div>

      <ul className="space-y-2.5">
        {activities.map((a, i) => (
          <li
            key={a.id}
            className="anim-rise flex items-center gap-2.5"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <StaffChip id={a.staffId} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] text-foreground">{a.text}</p>
              <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary/80 transition-all duration-1000 ease-out"
                  style={{ width: `${a.progress}%` }}
                />
              </div>
            </div>
            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {a.startedMinutesAgo}分
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
