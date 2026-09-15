import { createFileRoute } from "@tanstack/react-router";
import { SubScreen } from "@/components/az/SubScreen";
import { StaffChip } from "@/components/az/StaffChip";
import { initialSnapshot } from "@/lib/az/mockData";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "仕事 — アズ (AZ)" },
      { name: "description", content: "アズとAIスタッフが進めている仕事の一覧と進捗。" },
      { property: "og:title", content: "仕事 — アズ (AZ)" },
      { property: "og:description", content: "アズが抱えている仕事の進み具合をひと目で。" },
    ],
  }),
  component: WorkScreen,
});

function WorkScreen() {
  return (
    <SubScreen title="仕事" lead="アズが抱えている案件">
      {initialSnapshot.jobs.map((job, i) => (
        <article
          key={job.id}
          className="glass-panel anim-rise rounded-3xl px-4 py-3.5"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14.5px] font-medium text-foreground">{job.title}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">{job.note}</p>
            </div>
            <StaffChip id={job.staffId} />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary/80"
                style={{ width: `${job.progress}%` }}
              />
            </div>
            <span className="text-[11px] text-muted-foreground">{job.status}</span>
          </div>
        </article>
      ))}
    </SubScreen>
  );
}
