import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AzCharacter } from "@/components/az/AzCharacter";
import { StateBadge } from "@/components/az/StateBadge";
import { LiveActivity } from "@/components/az/LiveActivity";
import { RevenueCard } from "@/components/az/RevenueCard";
import { ApprovalCard } from "@/components/az/ApprovalCard";
import { TalkDock } from "@/components/az/TalkDock";
import { AzNav } from "@/components/az/AzNav";
import { useAz } from "@/lib/az/useAz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "アズ (AZ) — iPhoneに棲むAIパートナー" },
      {
        name: "description",
        content:
          "アズは、あなたのiPhoneの中で生きるAIパートナー。専門AIスタッフを束ね、あなたが見ていない間も自律的に仕事を進めます。",
      },
      { property: "og:title", content: "アズ (AZ) — iPhoneに棲むAIパートナー" },
      {
        property: "og:description",
        content: "話しかけるだけ。アズと4人のAIスタッフが、今日もあなたの事業を動かします。",
      },
    ],
  }),
  component: AzHome,
});

function AzHome() {
  const { snapshot, presentation, setState, resolveApproval, requestApproval } = useAz();
  const [holding, setHolding] = useState(false);

  const startListening = useCallback(() => {
    setHolding(true);
    setState("listening");
  }, [setState]);

  const stopListening = useCallback(() => {
    if (!holding) return;
    setHolding(false);
    setState("thinking");
    setTimeout(() => setState("working"), 1800);
  }, [holding, setState]);

  const handleContextAction = useCallback(() => {
    if (snapshot.state === "awaiting_approval") return resolveApproval("ok");
    if (snapshot.state === "sleeping") return setState("idle");
    requestApproval();
  }, [snapshot.state, resolveApproval, setState, requestApproval]);

  return (
    <div className="star-field flex min-h-dvh flex-col">
      <header className="safe-top flex items-center justify-between px-5">
        <p className="text-[12px] text-muted-foreground">
          {snapshot.ownerName}のアズ
          <span className="ml-1.5 text-muted-foreground/60">v0.1</span>
        </p>
        <span className="text-[11px] text-muted-foreground/70">
          スタッフ {snapshot.staff.filter((s) => s.online).length} / {snapshot.staff.length} 稼働中
        </span>
      </header>

      {/* ---- The stage: アズ is always the hero ---- */}
      <section className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-1">
        <AzCharacter state={snapshot.state} />

        <p
          key={snapshot.line}
          className="anim-rise mt-1 max-w-[19rem] text-center font-display text-[15.5px] leading-relaxed font-bold text-foreground"
        >
          {snapshot.line}
        </p>

        <StateBadge state={snapshot.state} className="mt-2.5" />
      </section>

      {/* ---- What's happening without me ---- */}
      <div className="space-y-2 px-4">
        {snapshot.approval && (
          <ApprovalCard
            request={snapshot.approval}
            ownerName={snapshot.ownerName}
            onDecide={resolveApproval}
          />
        )}
        <LiveActivity activities={snapshot.activities} />
        <RevenueCard amount={snapshot.realizedRevenueJpy} />
      </div>

      <div className="pt-2.5">
        <TalkDock
          contextAction={presentation.contextAction}
          listening={snapshot.state === "listening"}
          onHoldStart={startListening}
          onHoldEnd={stopListening}
          onContextAction={handleContextAction}
          onSend={() => {
            setState("thinking");
            setTimeout(() => setState("working"), 1600);
          }}
        />
        <AzNav />
      </div>
    </div>
  );
}
