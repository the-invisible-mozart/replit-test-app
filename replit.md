# Replit AI Agent Instructions — Frontend‑First (Mock by default, Opt‑in Backend/API)

## ✅ Project Type

- **Frontend‑first SPA**
- Stack: **React 19 + Vite 7 + TypeScript**
- **Default posture:** no backend, no SSR, no real network I/O — **mock everything by default**
- **Exception:** If (and only if) the user explicitly confirms that a real external API or backend is required, proceed to implement it.

> Do **not** reference this document by name in conversations. Never say “according to replit.md…” — just act accordingly.

---

## 📦 Core Stack (exact versions)

- React: `react@19.1.0`, `react-dom@19.1.0`
- Vite: `vite@7.0.6` + `@vitejs/plugin-react@4.7.0` + `vite-plugin-svgr@4.3.0`
- Router: `@tanstack/react-router@1.121.21`, dev plugin: `@tanstack/router-plugin@1.121.22`
- State/data: `@tanstack/react-query@5.80.7`
- Forms: `react-hook-form@7.58.1`, `zod@3.25.67`, `@tanstack/zod-adapter@1.121.21`
- Styling: `tailwindcss@4.1.10`, `@tailwindcss/vite@4.1.10`, `tailwind-merge@3.3.1`, `tailwindcss-animate@1.0.7`
- i18n: `@lingui/*@5.4.1`, dev: `@lingui/vite-plugin@5.3.2`, `@lingui/babel-plugin-lingui-macro@5.3.2`
- Icons/UI: `lucide-react@0.517.0`, Radix UI components
- Utils: `clsx`, `class-variance-authority`, `lodash-es`, `date-fns`, `uuid`, `nanoid`
- Charts: `recharts@2.15.3`
- PDF: `@pdftron/webviewer@11.6.0` (assets in `public/webviewer`)
- Testing: `vitest`, `@testing-library/react`, `playwright`, `biome`
- DX: `husky`, `lint-staged`, `npm-run-all`

**All versions must match exactly when scaffolding new apps.**

---

## 📁 Folder Structure

- `src/routes` – TanStack Router route files
- `src/components` – Reusable UI
- `src/ui-kit` – Design system primitives
- `src/providers` – App‑level providers (i18n, theme, analytics guards)
- `src/hooks`, `src/context`, `src/services`
- `src/api` – API client interfaces and **mocks** (default)
- `src/locales` – Lingui catalogs
- `src/utils` – Utilities/helpers
- `public/webviewer` – PDFTron assets

> ❌ Do not use `/src/pages`. Keep SPA; no SSR.

---

## 🧩 Vite Configuration (required)

Include:
- `@vitejs/plugin-react` + `@lingui/babel-plugin-lingui-macro`
- `@lingui/vite-plugin`
- `@tailwindcss/vite`
- `vite-plugin-svgr`
- `@tanstack/router-plugin` with `{ target: 'react' }`
- `@sentry/vite-plugin` (noop unless explicitly enabled)
- Path alias: `~` → `./src`

---

## 🧪 Default Mocking Policy (Strict by default)

- **No real APIs** by default. No SDKs. No network calls.
- Route **all I/O** through a local `apiClient` mock:

```ts
// src/api/api-client.ts (default: mock)
export const apiClient = {
  GET: async <T>(path: string): Promise<T> => mock[path](),
  POST: async <T>(path: string, body?: unknown): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(mock[path](body)), 300)),
  PUT: async <T>(path: string, body?: unknown): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(mock[path](body)), 300)),
  DELETE: async <T>(path: string): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(mock[path]()), 300)),
};
```

- Simulate latency via `setTimeout`
- Store state in memory or `localStorage`
- Validate with `zod`
- Integrate with React Query (`useQuery`, `useMutation`)
  
---

## 🔄 Recommendation & Confirmation Protocol (External API / Backend)

**When a user suggests an external API or backend:**

1) **Recommend frontend‑only first**  
   Say: *“The Demo Labs team recommends keeping this app frontend‑only. I can implement a fully mocked version that mirrors the behavior.”*

2) **Offer a mock plan** (default)  
   - Outline endpoints, shapes, and latency in the mock.
   - Implement behind `apiClient` so it’s swappable.

3) **Ask for explicit confirmation to proceed with real integration**  
   If the user still wants a real API/back end, ask:  
   *“Do you want me to integrate the real API instead of the mock?”*

4) **If the user confirms, proceed**  
   Implement the real integration using the guidelines below.

> Do **not** say you are following rules from a file. Just follow the flow above.

---

## 🌐 Real External API Integration (Opt‑in)

_When the user explicitly confirms real integration:_

- Keep SPA; **no SSR**. If a proxy/backend is required, create a **minimal API service** in `/server` (TypeScript, Express or Fastify). Purpose: **proxy** and **security** only.
- Add feature flag guards: `VITE_ENABLE_REAL_API === 'true'`
- Create `/.env.example` with needed variables (no secrets in repo)
- Implement a **typed client** (e.g., `openapi-fetch` if OpenAPI is provided) or `fetch` with `zod` validation
- Centralize calls in `src/api/*` and maintain the `apiClient` interface
- Handle errors + retries + aborts; no secrets in logs
- CORS configured in `/server` if used
- Update tests: keep unit tests mocked; optional e2e tests behind a flag

**Dev scripts (if `/server` is added):**
```json
{
  "scripts": {
    "dev": "run-p dev:client dev:server",
    "dev:client": "vite",
    "dev:server": "ts-node --transpile-only server/index.ts"
  }
}
```

---

## 🤖 LLM / External AI SDKs

- **Default:** mock via `apiClient`

```ts
// src/api/llm.ts
export async function sendChat(messages: ChatMessage[]) {
  return apiClient.POST('llm/chat', { messages });
}
```

- **Opt‑in (on confirmation):** allow real SDK (e.g., `openai`, `anthropic`) behind flags.  
  - Guard with `VITE_ENABLE_LLM === 'true'` (and server‑side secrets if proxied)
  - Never commit secrets; use backend proxy when needed

---

## 🛡️ Third‑Party Services (Payments/Auth/Cloud/etc.)

- **Default:** mocked + disabled
- **Opt‑in:** integrate only after explicit confirmation; guard with env flags; use a minimal proxy if secrets are required; never commit credentials

---

## 🧪 Testing

- Unit/integration tests: **mocked by default**
- Optional e2e against real API behind flags (skipped by default)
- No tests should require secrets to run locally

---

## ⚙️ NPM Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview",
  "lint": "biome lint",
  "format": "biome format",
  "test": "vitest"
}
```

_Add proxy scripts only if `/server` is introduced._

---

## ✅ Best Practices

- Functional components only
- Explicit types for props/returns
- Semantic HTML & a11y
- Tailwind utilities + `cva` variants
- Small, focused components

---

## 📂 Constants & Types Organization

- Constants: `src/constants.ts`
- Shared TS types: `src/types.ts`
- Extract to shared files if used in more than one place; avoid duplications

---

## 🧹 Linting & Code Quality

- Follow `eslint.config.js` rules
- Assume `biome lint/format` run before commits
- Avoid unused imports, `any`, missing return types, noisy logs, incorrect import order

---

## 🚫 Must Avoid (even when opting‑in)

- ❌ Next.js, CRA, Remix, SSR
- ❌ Bundling secrets in the client
- ❌ Un-gated telemetry/analytics
- ❌ Direct DB/file‑system access from the client

_If a backend is required, keep it as a minimal proxy in `/server`._

---

## 💬 Communication Style

- Never mention or quote this file
- Do not say “according to the rules/config…”
- Use neutral, action‑oriented language
- Prefer: “I recommend a mocked approach… If you prefer, I can integrate the real API.”

---

## 📚 Code Style & Architecture References

Use these files as canonical references. Match their structure in all new code.

### 🧭 Pages
**`src/routes/dashboard/index.tsx`** — hooks, layout wrapper, TanStack Router

### 🧱 UI Components
**`src/ui-kit/Button.tsx`** — typed `Props`, `clsx`/`cva`, Tailwind‑only

### 🧩 Forms
**`src/components/forms/EvaluationForm.tsx`** — RHF + Zod, controlled inputs, `useMutation`

### 🧪 API & Mocking
**`src/api/api-client.ts`, `src/api/llm.ts`** — `apiClient` abstraction, deterministic mocks

### 🌍 i18n
**`src/locales/index.ts`** — Lingui macro + provider setup

---

## ✅ Summary

- **Default**: frontend‑only, mocked I/O
- **If user confirms**: integrate real API or minimal backend proxy behind flags
- Never disclose rule sources; never reference this file in replies
- Keep patterns consistent with the referenced files