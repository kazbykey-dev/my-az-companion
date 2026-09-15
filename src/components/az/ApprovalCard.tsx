import { useState } from "react";
import { StaffChip } from "./StaffChip";
import { cn } from "@/lib/utils";
import type { ApprovalRequest } from "@/lib/az/types";

export function ApprovalCard({
  request,
  ownerName,
  onDecide,
}: {
  request: ApprovalRequest;
  ownerName: string;
  onDecide: (d: "ok" | "later" | "reject") => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="glass-panel anim-rise relative overflow-hidden rounded-3xl border-warning/30 px-4 py-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(90% 70% at 10% 0%, color-mix(in oklab, var(--warning) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <p className="font-display text-[15px] font-bold text-foreground">
          {ownerName}、これだけ確認して
        </p>

        <div className="mt-2.5 flex items-start gap-2.5">
          <StaffChip id={request.staffId} />
          <div className="min-w-0">
            <p className="text-[13.5px] leading-relaxed text-foreground">{request.headline}</p>
            <p
              className={cn(
                "mt-1 text-[12.5px] leading-relaxed text-muted-foreground transition-all",
                open ? "opacity-100" : "line-clamp-1 opacity-70",
              )}
            >
              {request.detail}
            </p>
            {open && (
              <p className="anim-rise mt-2 rounded-xl bg-secondary/60 px-3 py-2 text-[12px] text-muted-foreground">
                {request.impact}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-[1.4fr_1fr_1fr] gap-2">
          <button
            onClick={() => onDecide("ok")}
            className="h-11 rounded-2xl bg-primary text-[14px] font-semibold text-primary-foreground transition active:scale-95"
          >
            OK
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-11 rounded-2xl border border-glass-border bg-glass text-[13px] font-medium text-foreground transition active:scale-95"
          >
            詳しく
          </button>
          <button
            onClick={() => onDecide("reject")}
            className="h-11 rounded-2xl border border-glass-border text-[13px] font-medium text-muted-foreground transition active:scale-95"
          >
            却下
          </button>
        </div>
        <button
          onClick={() => onDecide("later")}
          className="mt-2 w-full text-[12px] text-muted-foreground/80"
        >
          あとで
        </button>
      </div>
    </section>
  );
}
