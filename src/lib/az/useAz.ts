import { useCallback, useEffect, useMemo, useState } from "react";
import { AZ_LINES, STATE_PRESENTATION, initialSnapshot } from "./mockData";
import type { AzSnapshot, AzState } from "./types";

/**
 * Single source of truth for AZ's live state.
 * Today it drives itself from mock data on a timer; later this hook can
 * subscribe to server events / websockets and keep the same return shape.
 */
function pickLine(state: AzState, fallback: string): string {
  const lines = AZ_LINES[state];
  if (!lines || lines.length === 0) return fallback;
  return lines[Math.floor(Math.random() * lines.length)] ?? fallback;
}

export function useAz() {
  const [snapshot, setSnapshot] = useState<AzSnapshot>(initialSnapshot);

  const setState = useCallback((state: AzState) => {
    setSnapshot((s) => ({ ...s, state, line: pickLine(state, s.line) }));
  }, []);

  // Ambient life: activities keep creeping forward, AZ drifts between
  // working / researching / thinking while nobody is interacting.
  useEffect(() => {
    const tick = setInterval(() => {
      setSnapshot((s) => ({
        ...s,
        activities: s.activities.map((a) => ({
          ...a,
          progress: Math.min(99, a.progress + Math.random() * 1.6),
        })),
      }));
    }, 2600);

    const drift = setInterval(() => {
      setSnapshot((s) => {
        if (s.state === "listening" || s.state === "awaiting_approval") return s;
        const cycle: AzState[] = ["working", "researching", "thinking", "working"];
        const next: AzState = cycle[Math.floor(Math.random() * cycle.length)] ?? "working";
        return { ...s, state: next, line: pickLine(next, s.line) };
      });
    }, 11000);

    return () => {
      clearInterval(tick);
      clearInterval(drift);
    };
  }, []);

  const resolveApproval = useCallback((decision: "ok" | "later" | "reject") => {
    setSnapshot((s) => {
      if (!s.approval) return s;
      const text =
        decision === "ok"
          ? "承認をもらった。すぐ動く。"
          : decision === "later"
            ? "了解、あとで聞くね。"
            : "却下ね。別の筋を探す。";
      return {
        ...s,
        approval: null,
        state: decision === "ok" ? "completed" : "idle",
        line: text,
        logs: [
          ...s.logs,
          {
            id: `l${s.logs.length + 1}`,
            time: new Date().toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            staffId: s.approval.staffId,
            text:
              decision === "ok"
                ? "営業先リストが承認された"
                : decision === "later"
                  ? "承認を保留した"
                  : "営業先リストは却下された",
            kind: decision === "ok" ? "done" : "info",
          },
        ],
      };
    });
  }, []);

  const requestApproval = useCallback(() => {
    setSnapshot((s) => ({
      ...s,
      approval: initialSnapshot.approval,
      state: "awaiting_approval",
      line: `${s.ownerName}、これだけ確認して。`,
    }));
  }, []);

  const presentation = useMemo(() => STATE_PRESENTATION[snapshot.state], [snapshot.state]);

  return { snapshot, presentation, setState, resolveApproval, requestApproval };
}
