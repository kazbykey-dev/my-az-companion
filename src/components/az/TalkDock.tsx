import { useState } from "react";
import { Mic, Keyboard, Send, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Primary interaction surface.
 * Voice first (designed for AirPods / hands-free), text is the quiet fallback.
 */
export function TalkDock({
  contextAction,
  listening,
  onHoldStart,
  onHoldEnd,
  onContextAction,
  onSend,
}: {
  contextAction: string;
  listening: boolean;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onContextAction: () => void;
  onSend: (text: string) => void;
}) {
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="safe-bottom px-4">
      {typing ? (
        <form
          className="glass-panel anim-rise flex items-center gap-2 rounded-3xl p-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            onSend(text.trim());
            setText("");
            setTyping(false);
          }}
        >
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="アズに伝える…"
            className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="送信"
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground active:scale-95"
          >
            <Send className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="閉じる"
            onClick={() => setTyping(false)}
            className="grid size-11 shrink-0 place-items-center rounded-2xl border border-glass-border text-muted-foreground active:scale-95"
          >
            <Mic className="size-4.5" />
          </button>
        </form>
      ) : (
        <div className="flex items-end justify-between gap-3">
          <button
            onClick={() => setTyping(true)}
            aria-label="文字で伝える"
            className="glass-panel mb-2 grid size-12 place-items-center rounded-2xl text-muted-foreground transition active:scale-95"
          >
            <Keyboard className="size-5" />
          </button>

          <button
            onPointerDown={onHoldStart}
            onPointerUp={onHoldEnd}
            onPointerLeave={onHoldEnd}
            className="group relative flex flex-col items-center"
          >
            <span
              className={cn(
                "relative grid size-[4.2rem] place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 active:scale-95",
                listening && "scale-105",
              )}
              style={{ boxShadow: "var(--shadow-az)" }}
            >
              {listening && (
                <span
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  style={{ animation: "az-pulse-ring 1.6s ease-out infinite" }}
                />
              )}
              <Mic className="size-7" />
            </span>
            <span className="mt-1.5 text-[12.5px] font-medium text-foreground">
              {listening ? "聞いてる…" : "アズに話す"}
            </span>
          </button>

          <button
            onClick={onContextAction}
            className="glass-panel mb-2 h-12 rounded-2xl px-4 text-[13px] font-medium text-foreground transition active:scale-95"
          >
            {contextAction}
          </button>
        </div>
      )}

      <p className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] text-muted-foreground/70">
        <Headphones className="size-3" />
        イヤホン接続中はハンズフリーで会話できます
      </p>
    </div>
  );
}
