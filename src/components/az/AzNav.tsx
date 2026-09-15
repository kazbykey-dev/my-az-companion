import { Link } from "@tanstack/react-router";
import { Sparkles, ListChecks, Users, ScrollText, Settings } from "lucide-react";

const ITEMS = [
  { to: "/", label: "アズ", Icon: Sparkles },
  { to: "/work", label: "仕事", Icon: ListChecks },
  { to: "/staff", label: "スタッフ", Icon: Users },
  { to: "/log", label: "記録", Icon: ScrollText },
  { to: "/settings", label: "設定", Icon: Settings },
] as const;

/** Deliberately quiet: the home screen should never read as a menu. */
export function AzNav() {
  return (
    <nav className="safe-bottom flex justify-center px-4 pt-2">
      <div className="glass-panel flex items-center gap-1 rounded-full px-1.5 py-1.5 opacity-70 transition-opacity hover:opacity-100 focus-within:opacity-100">
        {ITEMS.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            aria-label={label}
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors"
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "bg-secondary/80 text-foreground" }}
          >
            <Icon className="size-4" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
