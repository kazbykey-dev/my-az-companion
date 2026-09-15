import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AzNav } from "./AzNav";

export function SubScreen({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="star-field flex min-h-dvh flex-col">
      <header className="safe-top flex items-center gap-2 px-4 pb-2">
        <Link
          to="/"
          aria-label="アズに戻る"
          className="glass-panel grid size-9 place-items-center rounded-full text-muted-foreground active:scale-95"
        >
          <ChevronLeft className="size-4.5" />
        </Link>
        <div>
          <h1 className="font-display text-lg font-bold text-foreground">{title}</h1>
          {lead && <p className="text-[12px] text-muted-foreground">{lead}</p>}
        </div>
      </header>

      <main className="flex-1 space-y-3 px-4 pb-4">{children}</main>
      <AzNav />
    </div>
  );
}
