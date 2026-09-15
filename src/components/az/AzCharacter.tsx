import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { AzState } from "@/lib/az/types";

/**
 * アズ v0.2 — an original CSS/SVG character.
 * Purely presentational: give it a state, it acts alive.
 * Idle life (breathing, blinking, gaze drift, body float) runs continuously and
 * is independent of the state machine, so real backend events can drive `state`
 * later without touching any of the animation code.
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

/** Where AZ is looking. Awaiting approval → locked on the owner (center, slightly down). */
function useGaze(state: AzState) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (state === "sleeping") {
      setGaze({ x: 0, y: 0 });
      return;
    }
    if (state === "awaiting_approval" || state === "listening") {
      setGaze({ x: 0, y: 1.5 });
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const look = () => {
      setGaze({
        x: (Math.random() - 0.5) * 7,
        y: (Math.random() - 0.35) * 4,
      });
      timer = setTimeout(look, 1400 + Math.random() * 2600);
    };
    timer = setTimeout(look, 900);
    return () => clearTimeout(timer);
  }, [state]);

  return gaze;
}

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
  const wide = state === "awaiting_approval";
  return (
    <g className="anim-blink origin-center" fill="currentColor">
      <ellipse cx="47" cy="59" rx={wide ? 5.6 : 5} ry={wide ? 7.2 : 6.4} />
      <ellipse cx="73" cy="59" rx={wide ? 5.6 : 5} ry={wide ? 7.2 : 6.4} />
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
          {/* tiny computer AZ is actually typing on */}
          <g className="anim-bob">
            <rect x="44" y="112" width="32" height="4" rx="2" fill="currentColor" opacity="0.75" />
            <path d="M48 112 L52 96 h16 l4 16 z" fill="currentColor" opacity="0.35" />
            <rect x="53" y="98" width="14" height="11" rx="1.6" fill="var(--background)" />
            <rect
              x="55"
              y="101"
              width="9"
              height="1.6"
              rx="0.8"
              fill="currentColor"
              className="anim-type"
            />
            <rect
              x="55"
              y="104.5"
              width="6"
              height="1.6"
              rx="0.8"
              fill="currentColor"
              className="anim-type"
              style={{ animationDelay: ".45s" }}
            />
          </g>
          {/* little hands tapping */}
          <g fill="currentColor" opacity="0.85">
            <circle cx="47" cy="96" r="3.6" className="anim-tap" />
            <circle cx="73" cy="96" r="3.6" className="anim-tap" style={{ animationDelay: ".3s" }} />
          </g>
        </g>
      );
    case "researching":
      return (
        <g>
          {/* magnifier sweeping across a floating sheet of data */}
          <g className="anim-scan" opacity="0.9">
            <circle cx="92" cy="92" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M99 99 l7 7" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
          </g>
          <g opacity="0.5" fill="currentColor">
            <rect x="74" y="84" width="26" height="2" rx="1" />
            <rect x="74" y="90" width="20" height="2" rx="1" />
            <rect x="74" y="96" width="24" height="2" rx="1" />
          </g>
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
          <text x="86" y="40" fontSize="13" className="anim-zzz">
            Z
          </text>
          <text x="98" y="28" fontSize="9" className="anim-zzz" style={{ animationDelay: "1.2s" }}>
            z
          </text>
        </g>
      );
    case "awaiting_approval":
      return (
        <g>
          {/* raised hand, trying to catch the owner's attention */}
          <g className="anim-wave" style={{ transformOrigin: "26px 78px" }}>
            <circle cx="22" cy="66" r="5" fill="currentColor" />
            <path
              d="M26 78 q-4 -6 -4 -12"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
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
        </g>
      );
    case "completed":
      return (
        <g fill="currentColor">
          <path
            d="M96 26 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z"
            className="anim-twinkle"
          />
          <path
            d="M28 44 l1.8 4.4 4.4 1.8 -4.4 1.8 -1.8 4.4 -1.8 -4.4 -4.4 -1.8 4.4 -1.8z"
            className="anim-twinkle"
            style={{ animationDelay: ".5s" }}
          />
          <g opacity="0.9">
            <circle cx="22" cy="62" r="4.6" className="anim-wave" />
            <circle cx="98" cy="62" r="4.6" className="anim-wave" style={{ animationDelay: ".2s" }} />
          </g>
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

export function AzCharacter({
  state,
  className,
  size = "16rem",
}: {
  state: AzState;
  className?: string;
  /** rendered character size; the halo scales with it */
  size?: string;
}) {
  const tone = TONE[state];
  const isAsleep = state === "sleeping";
  const gaze = useGaze(state);

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ color: tone, width: size, height: size }}
      aria-hidden
    >
      {/* halo */}
      <div
        className="anim-halo pointer-events-none absolute inset-[-8%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${tone} 0%, transparent 66%)`,
          opacity: isAsleep ? 0.28 : 0.55,
        }}
      />
      {/* orbit ring */}
      <div
        className="anim-spin-slow pointer-events-none absolute inset-[3%] rounded-full border border-dashed opacity-20"
        style={{ borderColor: tone }}
      />
      {state === "listening" && (
        <>
          <span
            className="pointer-events-none absolute inset-[10%] rounded-full border-2"
            style={{ borderColor: tone, animation: "az-pulse-ring 2s ease-out infinite" }}
          />
          <span
            className="pointer-events-none absolute inset-[10%] rounded-full border-2"
            style={{ borderColor: tone, animation: "az-pulse-ring 2s ease-out 1s infinite" }}
          />
        </>
      )}
      {state === "awaiting_approval" && (
        <span
          className="pointer-events-none absolute inset-[6%] rounded-full border-2"
          style={{ borderColor: tone, animation: "az-pulse-ring 2.4s ease-out infinite" }}
        />
      )}

      <svg
        viewBox="-6 -22 132 156"
        className={cn(
          "relative size-full drop-shadow-[0_18px_40px_rgba(0,0,0,.45)] transition-[filter] duration-500",
          isAsleep ? "anim-breathe" : "anim-float",
          state === "error" && "anim-shake",
          state === "completed" && "anim-hop",
          state === "awaiting_approval" && "anim-lean",
        )}
      >
        <defs>
          <radialGradient id="azBody" cx="38%" cy="28%" r="80%">
            <stop offset="0%" stopColor="oklch(1 0 0 / 0.95)" />
            <stop offset="45%" stopColor={tone} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tone} stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* body: soft droplet blob, gently breathing */}
        <g className="anim-breathe-soft" style={{ transformOrigin: "60px 62px" }}>
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
        </g>

        {/* antenna */}
        <g className={isAsleep ? "" : "anim-twinkle"}>
          <path d="M60 14 q2 -12 -2 -16" stroke="currentColor" strokeWidth="2.6" fill="none" />
          <circle cx="57" cy="-3" r="4.4" fill="currentColor" />
        </g>

        {/* face — follows the gaze */}
        <g
          style={{
            transform: `translate(${gaze.x}px, ${gaze.y}px)`,
            transition: "transform 700ms cubic-bezier(.22,1,.36,1)",
          }}
        >
          <Eyes state={state} />
          {state !== "sleeping" && state !== "error" && (
            <path
              d={state === "completed" ? "M51 70 q9 10 18 0" : "M53 72 q7 6 14 0"}
              stroke="currentColor"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          )}
        </g>

        <Props state={state} />
      </svg>
    </div>
  );
}
