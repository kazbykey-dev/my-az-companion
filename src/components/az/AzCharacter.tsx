import { cn } from "@/lib/utils";
import type { AzState } from "@/lib/az/types";

/**
 * アズ v0.1 — an original CSS/SVG character.
 * Purely presentational: give it a state, it acts alive.
 * Swap the SVG internals later for the final AZ artwork; the state contract stays.
 */

const TONE: Record<AzState, string> = {
  idle: "var(--az)",
  listening: "var(--accent)",
  thinking: "var(--azn)",
  working: "var(--az)",
  researching: "var(--azm)",
  awaiting_approval: "var(--warning)",
  completed: "var(--success)",
  error: "var(--destructive)",
  sleeping: "var(--azm)",
};

function Eyes({ state }: { state: AzState }) {
  if (state === "sleeping") {
    return (
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M40 60 q7 7 14 0" />
        <path d="M66 60 q7 7 14 0" />
      </g>
    );
  }
  if (state === "thinking") {
    return (
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="47" cy="58" rx="4.6" ry="3" />
        <ellipse cx="73" cy="58" rx="4.6" ry="3" />
      </g>
    );
  }
  if (state === "completed") {
    return (
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M40 62 q7 -9 14 0" />
        <path d="M66 62 q7 -9 14 0" />
      </g>
    );
  }
  if (state === "error") {
    return (
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M41 56 l12 6 M41 62 l12 -6" />
        <path d="M67 56 l12 6 M67 62 l12 -6" />
      </g>
    );
  }
  return (
    <g className="anim-blink origin-center" fill="currentColor">
      <ellipse cx="47" cy="59" rx="5" ry="6.4" />
      <ellipse cx="73" cy="59" rx="5" ry="6.4" />
      <circle cx="48.8" cy="56.6" r="1.8" fill="var(--background)" opacity="0.9" />
      <circle cx="74.8" cy="56.6" r="1.8" fill="var(--background)" opacity="0.9" />
    </g>
  );
}

function Props({ state }: { state: AzState }) {
  switch (state) {
    case "working":
      return (
        <g>
          {/* tiny laptop */}
          <g className="anim-bob">
            <rect x="44" y="112" width="32" height="4" rx="2" fill="currentColor" opacity="0.75" />
            <path d="M48 112 L52 96 h16 l4 16 z" fill="currentColor" opacity="0.35" />
            <rect x="53" y="98" width="14" height="11" rx="1.6" fill="var(--background)" />
            <rect x="55" y="101" width="9" height="1.6" rx="0.8" fill="currentColor" opacity="0.8" />
            <rect x="55" y="104.5" width="6" height="1.6" rx="0.8" fill="currentColor" opacity="0.5" />
          </g>
        </g>
      );
    case "researching":
      return (
        <g className="anim-bob" opacity="0.85">
          {/* magnifier */}
          <circle
            cx="92"
            cy="96"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.9"
          />
          <path d="M99 103 l7 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      );
    case "thinking":
      return (
        <g fill="currentColor">
          <circle cx="86" cy="36" r="3" style={{ animation: "az-dot 1.3s ease-in-out infinite" }} />
          <circle
            cx="95"
            cy="30"
            r="4"
            style={{ animation: "az-dot 1.3s ease-in-out .2s infinite" }}
          />
          <circle
            cx="106"
            cy="23"
            r="5.2"
            style={{ animation: "az-dot 1.3s ease-in-out .4s infinite" }}
          />
        </g>
      );
    case "sleeping":
      return (
        <g fill="currentColor" fontFamily="var(--font-display)" opacity="0.75">
          <text x="86" y="40" fontSize="13" className="anim-twinkle">
            Z
          </text>
          <text x="98" y="28" fontSize="9" className="anim-twinkle" style={{ animationDelay: ".6s" }}>
            z
          </text>
        </g>
      );
    case "awaiting_approval":
      return (
        <g className="anim-bob">
          <circle cx="96" cy="30" r="12" fill="currentColor" opacity="0.18" />
          <text
            x="96"
            y="36"
            fontSize="18"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-display)"
          >
            !
          </text>
        </g>
      );
    case "completed":
      return (
        <g fill="currentColor">
          <path d="M96 26 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z" className="anim-twinkle" />
          <path
            d="M28 44 l1.8 4.4 4.4 1.8 -4.4 1.8 -1.8 4.4 -1.8 -4.4 -4.4 -1.8 4.4 -1.8z"
            className="anim-twinkle"
            style={{ animationDelay: ".5s" }}
          />
        </g>
      );
    case "listening":
      return (
        <g stroke="currentColor" fill="none" strokeLinecap="round" strokeWidth="3">
          <path d="M98 50 q8 10 0 20" opacity="0.7" className="anim-twinkle" />
          <path
            d="M106 44 q13 16 0 32"
            opacity="0.45"
            className="anim-twinkle"
            style={{ animationDelay: ".4s" }}
          />
        </g>
      );
    default:
      return null;
  }
}

export function AzCharacter({ state, className }: { state: AzState; className?: string }) {
  const tone = TONE[state];
  const isAsleep = state === "sleeping";

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ color: tone }}
      aria-hidden
    >
      {/* halo */}
      <div
        className="anim-halo pointer-events-none absolute size-[11.5rem] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${tone} 0%, transparent 68%)`,
          opacity: isAsleep ? 0.3 : 0.6,
        }}
      />
      {/* orbit ring */}
      <div
        className="anim-spin-slow pointer-events-none absolute size-[10.5rem] rounded-full border border-dashed opacity-25"
        style={{ borderColor: tone }}
      />
      {state === "listening" && (
        <>
          <span
            className="pointer-events-none absolute size-[9rem] rounded-full border-2"
            style={{ borderColor: tone, animation: "az-pulse-ring 2s ease-out infinite" }}
          />
          <span
            className="pointer-events-none absolute size-[9rem] rounded-full border-2"
            style={{ borderColor: tone, animation: "az-pulse-ring 2s ease-out 1s infinite" }}
          />
        </>
      )}

      <svg
        viewBox="-6 -22 132 156"
        className={cn(
          "relative size-[10.5rem] drop-shadow-[0_18px_40px_rgba(0,0,0,.45)]",
          isAsleep ? "anim-breathe" : "anim-float",
          state === "error" && "anim-shake",
        )}
      >
        <defs>
          <radialGradient id="azBody" cx="38%" cy="28%" r="80%">
            <stop offset="0%" stopColor="oklch(1 0 0 / 0.95)" />
            <stop offset="45%" stopColor={tone} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tone} stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* body: soft droplet blob */}
        <path
          d="M60 14
             C 88 14 102 34 102 56
             C 102 82 84 98 60 98
             C 36 98 18 82 18 56
             C 18 34 32 14 60 14 Z"
          fill="url(#azBody)"
          stroke="oklch(1 0 0 / .35)"
          strokeWidth="1.2"
        />
        {/* cheek light */}
        <ellipse cx="42" cy="34" rx="13" ry="9" fill="oklch(1 0 0 / .35)" />
        {/* antenna */}
        <g className={isAsleep ? "" : "anim-twinkle"}>
          <path d="M60 14 q2 -12 -2 -16" stroke="currentColor" strokeWidth="2.6" fill="none" />
          <circle cx="57" cy="-3" r="4.4" fill="currentColor" />
        </g>

        <Eyes state={state} />
        {/* mouth */}
        {state !== "sleeping" && state !== "error" && (
          <path
            d="M53 72 q7 6 14 0"
            stroke="currentColor"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}

        <Props state={state} />
      </svg>
    </div>
  );
}
