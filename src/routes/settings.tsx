import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SubScreen } from "@/components/az/SubScreen";
import { AzCharacter } from "@/components/az/AzCharacter";
import { STATE_PRESENTATION } from "@/lib/az/mockData";
import type { AzState } from "@/lib/az/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "設定 — アズ (AZ)" },
      { name: "description", content: "音声・通知の設定と、アズの状態プレビュー。" },
      { property: "og:title", content: "設定 — アズ (AZ)" },
      { property: "og:description", content: "アズとの付き合い方を整える。" },
    ],
  }),
  component: SettingsScreen,
});

const STATES = Object.keys(STATE_PRESENTATION) as AzState[];

const TOGGLES = [
  { label: "音声での会話", note: "AirPods接続時は自動でハンズフリー" },
  { label: "アズからの声かけ", note: "重要なときだけ、自分から話しかける" },
  { label: "プッシュ通知", note: "承認が必要なときに届く" },
  { label: "おやすみ時間", note: "23:00 – 7:00 は静かに待機" },
];

function SettingsScreen() {
  const [preview, setPreview] = useState<AzState>("idle");
  const [on, setOn] = useState<boolean[]>([true, true, true, false]);

  return (
    <SubScreen title="設定" lead="アズとの付き合い方">
      <section className="glass-panel rounded-3xl px-4 py-4">
        <p className="text-[12.5px] text-muted-foreground">アズの表情プレビュー</p>
        <div className="grid place-items-center py-2">
          <AzCharacter state={preview} className="scale-[0.62]" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STATES.map((s) => (
            <button
              key={s}
              onClick={() => setPreview(s)}
              className={cn(
                "rounded-full border border-glass-border px-3 py-1.5 text-[12px] transition active:scale-95",
                preview === s ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {STATE_PRESENTATION[s].label}
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel divide-y divide-border rounded-3xl px-4">
        {TOGGLES.map((t, i) => (
          <div key={t.label} className="flex items-center justify-between gap-3 py-3.5">
            <div>
              <p className="text-[14px] text-foreground">{t.label}</p>
              <p className="text-[11.5px] text-muted-foreground">{t.note}</p>
            </div>
            <button
              role="switch"
              aria-checked={on[i]}
              aria-label={t.label}
              onClick={() => setOn((v) => v.map((x, j) => (j === i ? !x : x)))}
              className={cn(
                "h-7 w-12 shrink-0 rounded-full p-0.5 transition-colors",
                on[i] ? "bg-primary" : "bg-secondary",
              )}
            >
              <span
                className={cn(
                  "block size-6 rounded-full bg-background transition-transform",
                  on[i] && "translate-x-5",
                )}
              />
            </button>
          </div>
        ))}
      </section>
    </SubScreen>
  );
}
