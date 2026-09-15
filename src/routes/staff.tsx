import { createFileRoute } from "@tanstack/react-router";
import { SubScreen } from "@/components/az/SubScreen";
import { StaffChip } from "@/components/az/StaffChip";
import { initialSnapshot } from "@/lib/az/mockData";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "スタッフ — アズ (AZ)" },
      { name: "description", content: "アズが束ねる専門AIスタッフ AZr / AZa / AZm / AZn。" },
      { property: "og:title", content: "スタッフ — アズ (AZ)" },
      { property: "og:description", content: "それぞれの担当領域と稼働状況。" },
    ],
  }),
  component: StaffScreen,
});

function StaffScreen() {
  const { staff, activities } = initialSnapshot;
  return (
    <SubScreen title="スタッフ" lead="アズが指揮する専門AI">
      {staff.map((s, i) => {
        const now = activities.find((a) => a.staffId === s.id);
        return (
          <article
            key={s.id}
            className="glass-panel anim-rise flex items-center gap-3 rounded-3xl px-4 py-3.5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <StaffChip id={s.id} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-medium text-foreground">{s.name}</p>
              <p className="text-[12px] text-muted-foreground">{s.role}</p>
              {now && <p className="mt-1 text-[12px] text-foreground/80">今：{now.text}</p>}
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success anim-twinkle" />
              稼働中
            </span>
          </article>
        );
      })}
    </SubScreen>
  );
}
