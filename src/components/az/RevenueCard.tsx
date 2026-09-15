import { formatJpy } from "@/lib/az/mockData";

/**
 * Realized revenue only. Targets and projections never appear here —
 * ¥0 until money actually lands.
 */
export function RevenueCard({ amount }: { amount: number }) {
  const hasMoney = amount > 0;
  return (
    <section className="glass-panel anim-rise relative overflow-hidden rounded-3xl px-4 py-3.5">
      {hasMoney && (
        <span className="anim-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-primary/15" />
      )}
      <p className="text-[12.5px] text-muted-foreground">アズが生み出した実収益</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums">
          {formatJpy(amount)}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {hasMoney ? "着金ベース" : "まだ実績なし・仕込み中"}
        </span>
      </div>
    </section>
  );
}
