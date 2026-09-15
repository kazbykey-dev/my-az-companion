# My AZ Companion

Create the first working prototype of “アズ (AZ)”, a personal AI partner that feels like it lives inside the user’s iPhone.

This is NOT a generic AI dashboard or chatbot. The core concept is:

“A highly capable AI partner that lives on the iPhone like a Tamagotchi, works autonomously in the background, manages specialist AI staff, talks naturally with the owner, and visibly lives/works even when the owner is not interacting with it.”

PRIMARY DEVICE:

iPhone. Design mobile-first for an iPhone home-screen/PWA experience.

LANGUAGE:

Japanese UI.

VISUAL DIRECTION:

Premium, playful, futuristic but warm.

Not corporate SaaS.

Not a typical ChatGPT clone.

Dark atmospheric background with subtle depth, glass effects, soft lighting and restrained animation.

The main focus should always be the character アズ.

HOME SCREEN:

Place アズ as a living animated character in the center of the screen.

For prototype v0.1, create a charming original character/avatar using CSS/SVG/available assets that can later be replaced with our final AZ character.

アズ should visually change state:

- 暇 / idle

- 聞いてる / listening

- 考え中 / thinking

- 仕事中 / working

- 調査中 / researching

- 承認待ち / waiting for approval

- 完了 / completed

- エラー / needs attention

- sleeping/resting

Use subtle animation so アズ feels alive even when idle.

PRIMARY INTERACTION:

Large microphone button: 「アズに話す」

Secondary contextual action button that changes depending on state.

Example:

「聞いて」

「詳しく」

「承認する」

「あとで」

「任せる」

Include a text input as a secondary option, not the main interaction.

AUTONOMOUS ACTIVITY:

Show a compact live activity area such as:

「アズは今…」

・AZrが営業先を調査中

・AZaが収益案を検証中

・AZmが市場データを検証中

・AZnがnote記事を作成中

Staff:

AZr = AZriver shop growth / sales

AZa = affiliate revenue

AZm = market research

AZn = note/content business

Do NOT make this look like project-management software.

The owner should understand what is happening in a glance.

MONEY:

Display:

「アズが生み出した実収益」

Current value: ¥0

Never show theoretical or target revenue as actual revenue.

APPROVAL:

Create an elegant approval card when アズ needs the owner.

Example:

「恭平、これだけ確認して」

AZr found a promising sales action.

Buttons:

「OK」

「詳しく」

「却下」

DAILY FEEL:

Make アズ feel like it has its own life.

Possible visual behaviors:

- typing on a tiny computer while staff are working

- reading while researching

- thinking animation

- sleeping when nothing is happening

- running toward the user when something important happens

- celebrating when real revenue is generated

VOICE FUTURE-READY:

Design the interface anticipating:

- voice conversation

- AirPods/earphone interaction

- proactive voice notifications

- push notifications

- quick actions from iPhone

NAVIGATION:

Keep it extremely simple.

Main:

アズ

Secondary screens accessible subtly:

仕事

スタッフ

記録

設定

The main screen must NOT feel like a menu.

PROTOTYPE DATA:

Use realistic mock state/data for now.

Clearly structure the code so mock data can later be replaced with real APIs and live AZ state.

TECHNICAL:

Build a working responsive web app/PWA-style prototype.

Prioritize iPhone Safari.

Use clean component architecture.

Make states easy to connect to backend events later.

Use polished transitions and microinteractions.

Do not over-engineer authentication/backend in v0.1.

MOST IMPORTANT:

The first screen should make the owner immediately feel:

“アズがここにいる。そして今も何か仕事してる。”

Build the actual prototype now rather than only describing it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2fd15b6d-163a-427f-a3e6-d6a537ce29ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
