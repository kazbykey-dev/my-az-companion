import { cn } from "@/lib/utils";
import type { Activity, StaffId } from "@/lib/az/types";

/**
 * Staff presence as part of AZ's world: four small glowing motes drifting around
 * the room, each carrying one line of what that staff member is doing right now.
 * Purely a view of `Activity[]` — swap the data source, the visuals stay.
 */

const TONE: Record<StaffId, string> = {
  AZr: "var(--azr)",
  AZa: "var(--aza)",
  AZm: "var(--azm)",
  AZn: "var(--azn)",
};

/** fixed anchor points around the character, tuned for iPhone portrait */
const SPOT: Record<StaffId, string> = {
  AZr: "left-1 top-[12%]",
  AZa: "right-1 top-[24%]",
  AZm: "left-2 top-[52%]",
  AZn: "right-2 top-[64%]",
};

export function StaffAura({ activities }: { activities: Activity[] }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {activities.map((a, i) => {
        const tone = TONE[a.staffId];
        const alignRight = a.staffId === "AZa" || a.staffId === "AZn";
        return (
          <div
            key={a.id}
            className={cn(
              "anim-drift absolute flex max-w-[45%] items-center gap-1.5",
              SPOT[a.staffId],
              alignRight && "flex-row-reverse",
            )}
            style={{ animationDelay: `${i * 900}ms`, color: tone }}
          >
            <span className="relative grid size-6 shrink-0 place-items-center">
              <span
                className="absolute inset-0 rounded-full blur-md opacity-70"
                style={{ background: tone }}
              />
              <span
                className="relative grid size-6 place-items-center rounded-full text-[8.5px] font-bold"
                style={{
                  background: "color-mix(in oklab, var(--background) 65%, transparent)",
                  border: `1px solid ${tone}`,
                  color: tone,
                }}
              >
                {a.staffId.slice(2).toUpperCase()}
              </span>
            </span>
            <span
              className={cn(
                "anim-twinkle truncate text-[10px] leading-tight text-muted-foreground",
                alignRight && "text-right",
              )}
              style={{ animationDelay: `${i * 400}ms` }}
            >
              {a.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
