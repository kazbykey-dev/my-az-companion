/**
 * Core domain types for アズ (AZ).
 * Everything the UI renders flows through these shapes, so the mock layer in
 * `mockData.ts` can be swapped for real API / realtime events without touching
 * components.
 */

export type AzState =
  | "idle"
  | "listening"
  | "thinking"
  | "working"
  | "researching"
  | "awaiting_approval"
  | "completed"
  | "error"
  | "sleeping";

export type StaffId = "AZr" | "AZa" | "AZm" | "AZn";

export interface Staff {
  id: StaffId;
  name: string;
  role: string;
  /** design token name: azr / aza / azm / azn */
  tone: "azr" | "aza" | "azm" | "azn";
  online: boolean;
}

export interface Activity {
  id: string;
  staffId: StaffId;
  text: string;
  /** minutes since the activity started */
  startedMinutesAgo: number;
  progress: number; // 0-100
}

export interface ApprovalRequest {
  id: string;
  staffId: StaffId;
  headline: string;
  detail: string;
  impact: string;
}

export interface LogEntry {
  id: string;
  time: string;
  staffId: StaffId | "AZ";
  text: string;
  kind: "info" | "done" | "money" | "alert";
}

export interface Job {
  id: string;
  title: string;
  staffId: StaffId;
  status: "進行中" | "承認待ち" | "完了" | "停止中";
  progress: number;
  note: string;
}

export interface AzSnapshot {
  ownerName: string;
  state: AzState;
  /** アズ's own words on the home screen */
  line: string;
  /** realized revenue in JPY — never a target or projection */
  realizedRevenueJpy: number;
  activities: Activity[];
  approval: ApprovalRequest | null;
  staff: Staff[];
  logs: LogEntry[];
  jobs: Job[];
}

export interface StatePresentation {
  label: string;
  contextAction: string;
  subtle: string;
}
