import { createFileRoute } from "@tanstack/react-router";
import { SubScreen } from "@/components/az/SubScreen";
import { initialSnapshot } from "@/lib/az/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/log")({
  head: () => ({
    meta: [
      { title: "記録 — アズ (AZ)" },
      { name: "description", content: "アズとスタッフが今日やったことの記録。" },
      { property: "og:title", content: "記録 — アズ (AZ)" },
      { property: "og:description", content: "アズの一日をあとから静かに振り返る。" },
    ],
  }),
  component: LogScreen,
});

const KIND: Record<string, string> = {
  info: "bg-muted-foreground/50",
  done: "bg-success",
  money: "bg-primary",
  alert: "bg-warning",
};

function LogScreen() {
  return (
    <SubScreen title="記録" lead="今日のアズ">
      <div className="glass-panel rounded-3xl px-4 py-4">
        <ol className="relative space-y-4 border-l border-border pl-4">
          {initialSnapshot.logs.map((l) => (
            <li key={l.id} className="anim-rise relative">
              <span
                className={cn("absolute -left-[21px] top-1.5 size-2 rounded-full", KIND[l.kind])}
              />
              <p className="text-[13.5px] text-foreground">{l.text}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {l.time} ・ {l.staffId}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SubScreen>
  );
}
