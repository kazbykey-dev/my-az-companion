import type { AzSnapshot, AzState, StatePresentation, StaffId } from "./types";

/** Swap this module for real API data later — shapes stay identical. */

export const STATE_PRESENTATION: Record<AzState, StatePresentation> = {
  idle: { label: "暇", contextAction: "任せる", subtle: "いつでも話しかけて" },
  listening: { label: "聞いてる", contextAction: "聞いて", subtle: "うん、続けて" },
  thinking: { label: "考え中", contextAction: "詳しく", subtle: "ちょっと整理してる" },
  working: { label: "仕事中", contextAction: "詳しく", subtle: "スタッフと動いてる" },
  researching: { label: "調査中", contextAction: "詳しく", subtle: "情報を集めてる" },
  awaiting_approval: { label: "承認待ち", contextAction: "承認する", subtle: "確認だけお願い" },
  completed: { label: "完了", contextAction: "見る", subtle: "ひとつ終わったよ" },
  error: { label: "要対応", contextAction: "確認する", subtle: "止まってる案件がある" },
  sleeping: { label: "おやすみ中", contextAction: "起こす", subtle: "静かに待機してる" },
};

export const STAFF_LABEL: Record<StaffId, string> = {
  AZr: "AZr",
  AZa: "AZa",
  AZm: "AZm",
  AZn: "AZn",
};

export const initialSnapshot: AzSnapshot = {
  ownerName: "恭平",
  state: "working",
  line: "恭平、おかえり。今も4人で動いてるよ。",
  realizedRevenueJpy: 0,
  staff: [
    { id: "AZr", name: "AZriver", role: "ショップ成長・営業", tone: "azr", online: true },
    { id: "AZa", name: "AZaffiliate", role: "アフィリエイト収益", tone: "aza", online: true },
    { id: "AZm", name: "AZmarket", role: "市場リサーチ", tone: "azm", online: true },
    { id: "AZn", name: "AZnote", role: "note・コンテンツ", tone: "azn", online: true },
  ],
  activities: [
    {
      id: "a1",
      staffId: "AZr",
      text: "営業先を調査中",
      startedMinutesAgo: 12,
      progress: 62,
    },
    { id: "a2", staffId: "AZa", text: "収益案を検証中", startedMinutesAgo: 34, progress: 41 },
    { id: "a3", staffId: "AZm", text: "市場データを検証中", startedMinutesAgo: 7, progress: 78 },
    { id: "a4", staffId: "AZn", text: "note記事を作成中", startedMinutesAgo: 51, progress: 25 },
  ],
  approval: {
    id: "ap1",
    staffId: "AZr",
    headline: "有望な営業先を3件みつけた",
    detail:
      "AZrが川沿いエリアの小規模ショップ3件を抽出。初回メッセージの下書きまで用意してある。送っていい？",
    impact: "想定作業 5分 / 返信率の高い時間帯に送信",
  },
  logs: [
    { id: "l1", time: "09:12", staffId: "AZ", text: "おはよう。今日の段取りを組んだ", kind: "info" },
    { id: "l2", time: "09:40", staffId: "AZm", text: "競合3社の価格改定を検知", kind: "info" },
    { id: "l3", time: "10:05", staffId: "AZn", text: "note記事の構成案が完成", kind: "done" },
    { id: "l4", time: "10:31", staffId: "AZa", text: "低品質な案件2件を自動で除外", kind: "done" },
    { id: "l5", time: "11:02", staffId: "AZr", text: "営業先リストの承認を依頼", kind: "alert" },
  ],
  jobs: [
    {
      id: "j1",
      title: "ショップ営業リストの構築",
      staffId: "AZr",
      status: "承認待ち",
      progress: 80,
      note: "3件抽出済み。送信の承認待ち",
    },
    {
      id: "j2",
      title: "アフィリエイト収益ラインの検証",
      staffId: "AZa",
      status: "進行中",
      progress: 41,
      note: "実収益が立つまで数字は0のまま扱う",
    },
    {
      id: "j3",
      title: "市場データの定点観測",
      staffId: "AZm",
      status: "進行中",
      progress: 78,
      note: "毎朝9時に差分を報告",
    },
    {
      id: "j4",
      title: "note記事の作成",
      staffId: "AZn",
      status: "進行中",
      progress: 25,
      note: "初稿は今日中",
    },
  ],
};

export const AZ_LINES: Partial<Record<AzState, string[]>> = {
  idle: ["手は空いてる。何かやる？", "静かだね。次の一手、考えとこうか"],
  listening: ["うん、聞いてる。", "どうぞ、続けて。"],
  thinking: ["ちょっと考えさせて…", "筋道を立ててる。もう少し。"],
  working: ["今も4人で動いてるよ。", "手を動かしてる。任せて。"],
  researching: ["データ読んでる。面白いのが出てきそう。", "情報集め中。"],
  awaiting_approval: ["恭平、これだけ確認して。", "ここだけは判断がほしい。"],
  completed: ["ひとつ片付いた。", "終わったよ、見てみる？"],
  error: ["止まってる案件がある。", "ここ、僕だけじゃ進めない。"],
  sleeping: ["…すぅ…", "おやすみモード。呼べば起きる。"],
};

export function formatJpy(value: number): string {
  return `¥${value.toLocaleString("ja-JP")}`;
}
