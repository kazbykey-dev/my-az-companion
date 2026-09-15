import type { ReactNode } from "react";
import { AzCharacter } from "./AzCharacter";
import { StaffAura } from "./StaffAura";
import type { Activity, AzState } from "@/lib/az/types";

/**
 * アズの部屋 — a tiny digital room inside the iPhone.
 * A soft back wall, a light grid floor, a pool of light AZ stands in and the
 * staff motes working around it. Everything here is ambience; state comes in
 * from outside.
 */
export function AzRoom({
  state,
  activities,
  children,
}: {
  state: AzState;
  activities: Activity[];
  children?: ReactNode;
}) {
  const dim = state === "sleeping";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
      {/* back wall light */}
      <div
        className="anim-halo pointer-events-none absolute inset-x-0 top-0 h-[62%]"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 25%, color-mix(in oklab, var(--az-glow) 16%, transparent), transparent 70%)",
          opacity: dim ? 0.3 : 1,
        }}
      />
      {/* floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] overflow-hidden">
        <div
          className="absolute inset-x-[-30%] bottom-0 top-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--az) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--az) 45%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 30px",
            transform: "perspective(240px) rotateX(62deg)",
            transformOrigin: "bottom center",
            maskImage: "linear-gradient(to top, black, transparent 85%)",
          }}
        />
      </div>
      {/* pool of light under アズ */}
      <div
        className="anim-halo pointer-events-none absolute bottom-[19%] h-10 w-52 rounded-[50%] blur-xl"
        style={{
          background: "radial-gradient(closest-side, oklch(1 0 0 / 22%), transparent)",
          opacity: dim ? 0.25 : 0.7,
        }}
      />

      <StaffAura activities={activities} />

      <div className="relative flex flex-col items-center">
        <AzCharacter state={state} size="min(17rem, 56vw)" />
        {children}
      </div>
    </div>
  );
}
