import { cn } from "@/lib/utils";
import type { StaffId } from "@/lib/az/types";

const TONE: Record<StaffId, string> = {
  AZr: "text-azr border-azr/40 bg-azr/12",
  AZa: "text-aza border-aza/40 bg-aza/12",
  AZm: "text-azm border-azm/40 bg-azm/12",
  AZn: "text-azn border-azn/40 bg-azn/12",
};

export function StaffChip({
  id,
  className,
  size = "sm",
}: {
  id: StaffId;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border font-semibold tabular-nums",
        TONE[id],
        size === "sm" ? "h-6 px-2 text-[11px]" : "h-9 w-9 text-xs",
        className,
      )}
    >
      {id}
    </span>
  );
}
