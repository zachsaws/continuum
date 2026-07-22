import { useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";

/* --------------------------------- helpers -------------------------------- */

function renderInline(s: string) {
  // [c]...[/c] → <span class="code-inline">
  const parts = s.split(/\[c\](.*?)\[\/c\]/);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <span key={i} className="code-inline">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5eead4" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path
          d="M16 3a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm0 4a9 9 0 0 1 8.485 12L13 13.515A4 4 0 0 1 16 11.515V7Zm-3.515 9.515L23.485 23.5A9 9 0 0 1 12.485 16.515Z"
          fill="url(#logoGrad)"
        />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-fg">Continuum</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-md border border-border bg-bg-soft/60 p-0.5 text-[11px] font-mono">
      <button
        onClick={() => setLang("en")}
        className={`rounded px-2 py-0.5 transition ${
          lang === "en" ? "bg-bg-elev text-fg" : "text-fg-muted hover:text-fg"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`rounded px-2 py-0.5 transition ${
          lang === "zh" ? "bg-bg-elev text-fg" : "text-fg-muted hover:text-fg"
        }`}
      >
        中
      </button>
    </div>
  );
}

function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = dict[lang].nav;
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/90 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70">
      <div className="container-page flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-fg-muted md:flex">
            <a href="#features" className="transition hover:text-fg">{t.features}</a>
            <a href="#architecture" className="transition hover:text-fg">{t.architecture}</a>
            <a href="#usecases" className="transition hover:text-fg">{t.useCases}</a>
            <a href="#pricing" className="transition hover:text-fg">{t.pricing}</a>
            <a href="#faq" className="transition hover:text-fg">{t.faq}</a>
            <a href="#apps" className="transition hover:text-fg">{lang === "zh" ? "兼容" : "Apps"}</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} setLang={setLang} />
          <a href="#" className="hidden text-sm text-fg-muted transition hover:text-fg lg:inline-block">
            {t.docs}
          </a>
          <a href="#pricing" className="hidden btn-ghost text-xs sm:inline-flex">
            {t.signIn}
          </a>
          <a href="#pricing" className="btn-primary text-xs">
            {t.getKey}
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroMagicMoment({ lang }: { lang: Lang }) {
  const isZh = lang === "zh";
  const userPrompt = isZh
    ? "帮我写 v3 发布的文案。"
    : "Help me write the launch copy for v3.";
  const claudeReply = isZh
    ? "好。根据你之前告诉我的——周五截稿、简短、不用 emoji——我先按你的口吻写了一版：\n\n「v3 上线。产品没换，摩擦减半。改的是 7 个你大概率会撞上的坎……」\n\n要我接着打磨，还是先换个方向？"
    : "Sure. Picking up from last week — Friday deadline, concise tone, no emojis — here's a draft that reads like you, not like marketing:\n\n\"v3 is out. Same product. Half the friction. We fixed the seven things you were going to hit anyway. …\"\n\nWant me to push it further, or try a different angle?";
  const memories = isZh
    ? [
        { tag: "偏好", text: "简短回答，不用 emoji", from: "Claude · 3 天前" },
        { tag: "截止", text: "v3 周五截稿", from: "Cursor · 周一" },
        { tag: "风格", text: "文案偏干燥，不要营销腔", from: "Claude · 上周" },
      ]
    : [
        { tag: "pref", text: "concise answers · no emojis", from: "Claude · 3 days ago" },
        { tag: "due", text: "design v3 due Friday", from: "Cursor · Monday" },
        { tag: "voice", text: "dry tone · not marketing-speak", from: "Claude · last week" },
      ];

  return (
    <div className="card !p-0 overflow-hidden text-left">
      {/* Title bar — fake Claude Desktop */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-bg-soft/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-fg-dim">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Claude Desktop · Continuum active
        </div>
        <div className="flex items-center gap-2 text-fg-dim">
          <span className="font-mono text-[10px]">T</span>
          <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-accent to-accent-violet" />
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_220px]">
        {/* Chat column */}
        <div className="space-y-5 p-5 md:p-6">
          {/* User message */}
          <div>
            <div className="mb-1.5 text-[10px] uppercase tracking-wider text-fg-dim">
              {isZh ? "你" : "You"}
            </div>
            <div className="text-[13.5px] leading-relaxed text-fg">{userPrompt}</div>
          </div>

          {/* Claude reply */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-fg-dim">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Claude
            </div>
            <div className="whitespace-pre-line text-[13.5px] leading-relaxed text-fg-muted">
              {claudeReply}
            </div>
          </div>
        </div>

        {/* Continuum memory card column */}
        <div className="border-t border-border-subtle bg-bg-soft/30 p-4 md:border-l md:border-t-0">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-violet text-[8px] font-bold text-bg">
              C
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
              Continuum
            </span>
            <span className="ml-auto text-[9px] text-fg-dim">
              {isZh ? "它认得你" : "it knows you"}
            </span>
          </div>
          <div className="mb-2 text-[10px] text-fg-dim">
            {isZh ? "根据过去 7 天的对话：" : "Pulled from your last 7 days:"}
          </div>
          <div className="space-y-2">
            {memories.map((m, i) => (
              <div
                key={i}
                className="rounded-md border border-border-subtle bg-bg/60 p-2.5 text-[11px]"
              >
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-accent">
                    {m.tag}
                  </span>
                  <span className="text-fg-dim">· {m.from}</span>
                </div>
                <div className="leading-snug text-fg">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[9px] text-fg-dim">
            {isZh ? "Claude 自动看到了" : "Claude saw all of this automatically"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-hero-glow" />
      <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft/60 px-3 py-1 text-[11px] uppercase tracking-wider text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(94,234,212,0.7)]" />
            {t.tag}
          </div>
          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
            {t.titleA} <br className="hidden md:block" />
            <span className="gradient-accent">{t.titleB}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-fg-muted md:text-lg">
            {renderInline(t.body)}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pricing" className="btn-primary h-10 px-5">
              {t.cta1}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#code" className="btn-ghost h-10 px-5">
              {t.cta2}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl md:mt-20">
          <HeroMagicMoment lang={lang} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[12px] text-fg-muted">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M8 2 3 4v4c0 3 2 5.5 5 6 3-.5 5-3 5-6V4l-5-2Z" strokeLinejoin="round" />
            <path d="m5.5 8 2 2 3-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.privacy}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-xs text-fg-dim md:mt-20">
          <span className="uppercase tracking-[0.2em]">{t.socialProof}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            {t.logos.map((name) => (
              <span key={name} className="font-mono text-[13px] tracking-tight text-fg-muted/80">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ supported apps ----------------------------- */

function SupportedApps({ lang }: { lang: Lang }) {
  const t = dict[lang].supportedApps;
  return (
    <section id="apps" className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {t.apps.map((app) => {
            const isGhost = app.status === "mcp";
            return (
              <div
                key={app.name}
                className={`group relative flex items-center gap-3 rounded-2xl border p-4 transition-all ${
                  isGhost
                    ? "border-dashed border-accent/40 bg-accent/[0.04] hover:bg-accent/[0.07]"
                    : "border-border-subtle bg-bg-card/60 hover:-translate-y-0.5 hover:border-border hover:bg-bg-card"
                }`}
              >
                <div
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-xl font-semibold"
                  style={{ color: app.fg, backgroundColor: app.bg }}
                >
                  {isGhost ? "+" : app.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold text-fg">{app.name}</div>
                  <div className="truncate text-[11px] text-fg-dim">{app.sub}</div>
                </div>
                {!isGhost && (
                  <div
                    className={`flex-none text-[9px] font-semibold uppercase tracking-wider ${
                      app.status === "experimental" ? "text-fg-dim" : "text-accent"
                    }`}
                  >
                    {app.status === "experimental"
                      ? lang === "zh"
                        ? "实验"
                        : "beta"
                      : lang === "zh"
                        ? "原生"
                        : "native"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition hover:text-accent"
          >
            {t.cta}
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem({ lang }: { lang: Lang }) {
  const t = dict[lang].problem;
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative space-y-3">
            {/* vertical timeline line */}
            <div className="absolute left-[80px] top-3 bottom-3 hidden w-px bg-border md:block" />
            {t.events.map((e, i) => (
              <div key={i} className="relative grid grid-cols-[60px_1fr_auto] items-center gap-3 rounded-lg border border-border-subtle bg-bg-card/60 px-4 py-3 md:grid-cols-[80px_1fr_80px]">
                <span className="font-mono text-[12px] text-fg-dim">{e.time}</span>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent md:relative md:left-[-22px]" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-fg-dim">{e.app}</div>
                    <div className="truncate text-[13.5px] text-fg-muted">{e.action}</div>
                  </div>
                </div>
                <span className="text-right font-mono text-[11px] text-accent/80">{e.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-[14px] text-fg-muted">{t.totalLine}</p>
          <p className="mt-3 text-2xl font-semibold text-fg md:text-3xl">
            {t.totalResult}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- features -------------------------------- */

function MemoryVisual() {
  return (
    <div className="space-y-2 font-mono text-[11px]">
      {[
        { k: "working", tone: "hours", v: "current task: writing v3 launch copy", a: 0.95, color: "bg-accent" },
        { k: "short-term", tone: "~7 days", v: "this week: prefers concise · deadline Friday", a: 0.75, color: "bg-accent/70" },
        { k: "long-term", tone: "always", v: "founder · B2B SaaS · dry tone · no marketing-speak", a: 0.55, color: "bg-[#a78bfa]" },
      ].map((row) => (
        <div key={row.k} className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{row.k}</span>
            <span className="text-[9px] text-fg-dim">{row.tone}</span>
          </div>
          <div className="text-fg-muted">{row.v}</div>
          <div className="mt-1.5 h-1 overflow-hidden rounded bg-border-subtle">
            <div className={`h-full ${row.color}`} style={{ width: `${row.a * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BehaviorVisual() {
  return (
    <div className="space-y-2 text-[12px]">
      {[
        { t: "13:42", e: "user hesitated 1.8s", s: "↓patience" },
        { t: "13:42", e: "user rephrased 2×", s: "↓clarity_needed" },
        { t: "13:43", e: "user accepted first answer", s: "↑trust" },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-3 rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono">
          <span className="text-fg-dim">{row.t}</span>
          <span className="flex-1 text-fg-muted">{row.e}</span>
          <span className="text-accent">{row.s}</span>
        </div>
      ))}
    </div>
  );
}

function GraphVisual() {
  return (
    <svg viewBox="0 0 280 140" className="h-32 w-full">
      <defs>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#5eead4" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {[
        [40, 70, 110, 30],
        [40, 70, 110, 110],
        [110, 30, 180, 30],
        [110, 30, 180, 110],
        [110, 110, 180, 110],
        [180, 30, 240, 70],
        [180, 110, 240, 70],
        [40, 70, 180, 110],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#edge)" strokeWidth="1" />
      ))}
      {(
        [
          { x: 40, y: 70, label: "user" },
          { x: 110, y: 30, label: "task" },
          { x: 110, y: 110, label: "intent" },
          { x: 180, y: 30, label: "entity" },
          { x: 180, y: 110, label: "event" },
          { x: 240, y: 70, label: "ctx" },
        ] as const
      ).map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="#0d0d0d" stroke="#5eead4" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="ui-monospace">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ForgettingVisual() {
  return (
    <div className="space-y-1.5 font-mono text-[11.5px]">
      {[
        { t: "turn 1", a: 1, color: "bg-accent" },
        { t: "turn 4", a: 0.85, color: "bg-accent" },
        { t: "turn 11", a: 0.5, color: "bg-accent/60" },
        { t: "turn 19 (stale)", a: 0.15, color: "bg-fg-dim" },
        { t: "turn 22 (corrected)", a: 0.05, color: "bg-red-400/50" },
      ].map((row) => (
        <div key={row.t} className="flex items-center gap-3">
          <span className="w-32 text-fg-dim">{row.t}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded bg-border-subtle">
            <div className={`h-full ${row.color}`} style={{ width: `${row.a * 100}%` }} />
          </div>
          <span className="w-10 text-right text-fg-muted">{(row.a * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}

function PredictVisual() {
  return (
    <div className="space-y-2 text-[12px]">
      <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono">
        <span className="text-fg-dim">user.draft:</span>{" "}
        <span className="text-fg-muted">&quot;what about the pricing for the team plan and...&quot;</span>
      </div>
      <div className="ml-4 flex items-center gap-2 text-[11px] text-accent">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
        </svg>
        pre-loading context
      </div>
      <div className="rounded border border-accent/30 bg-accent/[0.04] px-3 py-2 font-mono text-[11.5px]">
        <span className="text-accent">→ injected:</span>{" "}
        <span className="text-fg-muted">team_plan.pricing · user.org_size · 3 related questions</span>
      </div>
    </div>
  );
}

const featureVisuals = [<MemoryVisual key="m" />, <BehaviorVisual key="b" />, <GraphVisual key="g" />, <ForgettingVisual key="f" />, <PredictVisual key="p" />];

/* --------------------------------- why exists ----------------------------- */

function WhyExists({ lang }: { lang: Lang }) {
  const t = dict[lang].whyExists;
  return (
    <section id="why-exists" className="relative overflow-hidden border-t border-border-subtle py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
      <div className="container-page max-w-3xl text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.kicker}</span>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
          {t.titleA} <br />
          <span className="text-fg-muted">{t.titleB}</span>
        </h2>
        <div className="mt-8 space-y-5 text-left text-[15.5px] leading-[1.75] text-fg-muted">
          {t.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-7 text-sm text-fg-dim">{t.signature}</p>
      </div>
    </section>
  );
}

/* ---------------------------------- security ------------------------------ */

function Security({ lang }: { lang: Lang }) {
  const t = dict[lang].security;
  return (
    <section id="security" className="border-t border-border-subtle py-20 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-2">
          {t.checks.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-lg border border-border bg-bg-card p-5 transition hover:border-border-strong"
            >
              <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-fg">{c.title}</div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IsForMe({ lang }: { lang: Lang }) {
  const t = dict[lang].isForMe;
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-accent">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-4 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {t.columns.map((c, i) => (
            <div
              key={i}
              className={`relative rounded-3xl border p-6 ${
                c.emph
                  ? "border-accent/40 bg-gradient-to-b from-accent/[0.04] to-transparent"
                  : "border-border bg-bg-card"
              }`}
            >
              {c.emph && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-bg">
                  <span className="h-1.5 w-1.5 rounded-full bg-bg" />
                  {lang === "zh" ? "选这列" : "This one"}
                </span>
              )}
              <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-3 text-[15px] font-semibold leading-snug text-fg">
                {c.persona}
              </div>
              <div
                className={`mb-4 inline-block rounded-md px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider ${
                  c.emph
                    ? "bg-accent/15 text-accent"
                    : "bg-bg-soft text-fg-muted"
                }`}
              >
                {c.verdict}
              </div>
              <p className="text-[13.5px] leading-relaxed text-fg-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[14px] text-fg-muted">{t.closer}</p>
          <a
            href="#pricing"
            className="btn-primary mt-5 h-10 px-5"
          >
            {t.cta}
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ lang }: { lang: Lang }) {
  const t = dict[lang].beforeAfter;
  const isZh = lang === "zh";
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            { side: t.before, isAfter: false },
            { side: t.after, isAfter: true },
          ].map(({ side, isAfter }) => (
            <div
              key={side.label}
              className={`relative rounded-3xl border p-5 md:p-6 ${
                isAfter
                  ? "border-accent/40 bg-gradient-to-b from-accent/[0.06] to-transparent"
                  : "border-border bg-bg-card/60"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isAfter ? "text-accent" : "text-fg-dim"
                  }`}
                >
                  {side.label}
                </span>
                {isAfter && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-bg">
                    {isZh ? "现在" : "now"}
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                {side.apps.map((app) => (
                  <div
                    key={app.name}
                    className={`rounded-md border px-3 py-2.5 ${
                      isAfter
                        ? "border-accent/30 bg-bg/60"
                        : "border-border-subtle bg-bg/40"
                    }`}
                  >
                    <div
                      className={`mb-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isAfter ? "text-accent" : "text-fg-dim"
                      }`}
                    >
                      {app.name}
                    </div>
                    <div className="text-[13px] text-fg-muted">{app.line}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[12px] italic text-fg-dim">{side.footer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ByTheNumbers({ lang }: { lang: Lang }) {
  const t = dict[lang].byNumbers;
  const [apps, setApps] = useState(3);
  const [msgs, setMsgs] = useState(15);

  // Re-state context: ~30% of new messages need a context reset, each costs ~1 min
  const resetsPerWeek = Math.round(apps * msgs * 5 * 0.3);
  const hoursLostPerYear = Math.round((resetsPerWeek * 52 * 1) / 60);

  return (
    <section className="border-t border-border-subtle bg-bg-card/30 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 md:grid-cols-5">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border-subtle bg-bg-card/60 p-5 text-center"
            >
              <div className="bg-gradient-to-br from-accent to-[#a78bfa] bg-clip-text text-3xl font-semibold leading-none tracking-tight text-transparent md:text-4xl">
                {s.value}
              </div>
              <div className="mt-3 text-[12.5px] leading-snug text-fg-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Calculator */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/[0.04] to-transparent p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.calc.title}</h3>
            <p className="mt-2 text-fg-muted">{t.calc.body}</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label className="text-[12px] font-medium uppercase tracking-wider text-fg-muted">
                  {t.calc.appsLabel}
                </label>
                <span className="font-mono text-2xl font-semibold text-accent">{apps}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={apps}
                onChange={(e) => setApps(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between text-[10px] text-fg-dim">
                <span>1</span>
                <span>6</span>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label className="text-[12px] font-medium uppercase tracking-wider text-fg-muted">
                  {t.calc.msgsLabel}
                </label>
                <span className="font-mono text-2xl font-semibold text-accent">{msgs}</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={msgs}
                onChange={(e) => setMsgs(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="mt-1 flex justify-between text-[10px] text-fg-dim">
                <span>5</span>
                <span>30</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border-subtle pt-6">
            <div className="text-center">
              <div className="font-mono text-3xl font-semibold text-fg md:text-4xl">
                {resetsPerWeek}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-fg-dim">
                {t.calc.resetsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-accent to-[#a78bfa] bg-clip-text font-mono text-3xl font-semibold text-transparent md:text-4xl">
                {hoursLostPerYear}h
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-fg-dim">
                {t.calc.hoursLabel}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="#pricing" className="btn-primary inline-flex h-10 items-center gap-1.5 px-5">
              {t.calc.cta}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features({ lang }: { lang: Lang }) {
  const t = dict[lang].features;
  return (
    <section id="features" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {t.items.map((f, i) => {
            const isFeatured = i === 0;
            return (
              <div
                key={f.name}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-bg-card ${
                  isFeatured ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                  <span className="font-mono text-accent">0{i + 1}</span>
                  <span>{f.tag}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                  {f.name}
                </h3>
                <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-fg-muted">
                  {f.body}
                </p>
                <div className={`mt-5 rounded-2xl border border-border-subtle bg-bg-soft/40 p-4 ${isFeatured ? "" : "grow"}`}>
                  {featureVisuals[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- architecture ------------------------------ */

function Architecture({ lang }: { lang: Lang }) {
  const t = dict[lang].architecture;
  return (
    <section id="architecture" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mt-14">
          <svg viewBox="0 0 900 280" className="h-auto w-full">
            <defs>
              <linearGradient id="box" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#161616" />
                <stop offset="1" stopColor="#0d0d0d" />
              </linearGradient>
              <linearGradient id="center" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#5eead4" stopOpacity="0.10" />
                <stop offset="1" stopColor="#a78bfa" stopOpacity="0.10" />
              </linearGradient>
            </defs>

            <g>
              <rect x="20" y="100" width="180" height="80" rx="10" fill="url(#box)" stroke="rgba(255,255,255,0.10)" />
              <text x="110" y="135" textAnchor="middle" fontSize="13" fill="#ededed" fontWeight="500">
                {t.app}
              </text>
              <text x="110" y="155" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-monospace">
                {t.appSub}
              </text>
            </g>

            <line x1="200" y1="140" x2="320" y2="140" stroke="rgba(94,234,212,0.5)" strokeWidth="1.5" />
            <text x="260" y="130" textAnchor="middle" fontSize="9" fill="#5eead4" fontFamily="ui-monospace">
              {t.arrowIn}
            </text>
            <line x1="320" y1="160" x2="200" y2="160" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
            <text x="260" y="180" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="ui-monospace">
              {t.arrowOut}
            </text>

            <g>
              <rect x="320" y="40" width="260" height="200" rx="12" fill="url(#center)" stroke="rgba(94,234,212,0.30)" strokeWidth="1.5" />
              <text x="450" y="68" textAnchor="middle" fontSize="14" fill="#ededed" fontWeight="600">
                {t.center}
              </text>
              <text x="450" y="84" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-monospace">
                {t.centerSub}
              </text>

              {(
                [
                  { name: t.layers[0], y: 110 },
                  { name: t.layers[1], y: 138 },
                  { name: t.layers[2], y: 166 },
                  { name: t.layers[3], y: 194 },
                  { name: t.layers[4], y: 222 },
                ] as const
              ).map((row, i) => (
                <g key={row.name}>
                  <rect x="345" y={row.y - 11} width="210" height="22" rx="5" fill="#0d0d0d" stroke="rgba(255,255,255,0.06)" />
                  <circle cx="360" cy={row.y} r="3" fill={i % 2 ? "#a78bfa" : "#5eead4"} />
                  <text x="375" y={row.y + 4} fontSize="11" fill="#9ca3af" fontFamily="ui-monospace">
                    {row.name}
                  </text>
                </g>
              ))}
            </g>

            <line x1="580" y1="140" x2="700" y2="140" stroke="rgba(94,234,212,0.5)" strokeWidth="1.5" />
            <text x="640" y="130" textAnchor="middle" fontSize="9" fill="#5eead4" fontFamily="ui-monospace">
              {t.arrowLLM}
            </text>
            <line x1="700" y1="160" x2="580" y2="160" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
            <text x="640" y="180" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="ui-monospace">
              {t.arrowResp}
            </text>

            <g>
              <rect x="700" y="100" width="180" height="80" rx="10" fill="url(#box)" stroke="rgba(255,255,255,0.10)" />
              <text x="790" y="135" textAnchor="middle" fontSize="13" fill="#ededed" fontWeight="500">
                {t.model}
              </text>
              <text x="790" y="155" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="ui-monospace">
                {t.modelSub}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- code ---------------------------------- */

function CodeBlock({ lang }: { lang: Lang }) {
  const t = dict[lang].code;
  const [tab, setTab] = useState(1);

  const installCode = (
    <div>
      <div>
        <span className="text-fg-dim">{"# Run the MCP server (no install needed — npx pulls it)"}</span>
        {"\n"}$ <span className="text-accent">npx -y @continuum/mcp-server</span>
      </div>
      <div className="mt-3">
        <span className="text-fg-dim">{"# Or with cloud sync (Pro)"}</span>
        {"\n"}$ <span className="text-accent">npx -y @continuum/mcp-server --api-key=ck_live_...</span>
      </div>
      <div className="mt-3 text-fg-muted text-[12.5px]">
        {"That's it. No npm install, no build, no server to run. The MCP server is a tiny binary that talks to your AI clients over stdio."}
      </div>
    </div>
  );

  const useCode = (
    <div>
      <div>
        <span className="text-fg-dim">{"# Claude Desktop — ~/Library/Application Support/Claude/claude_desktop_config.json"}</span>
      </div>
      <pre className="mt-2 text-fg-muted text-[12.5px] leading-[1.7]">
{`{
  "mcpServers": {`}
        <span className="text-yellow-300">{`\n    "continuum": {`}</span>
        {`\n      "command": "npx",`}
        {`\n      "args": ["-y", "@continuum/mcp-server"]`}
        <span className="text-yellow-300">{`\n    }`}</span>
        {`\n  }\n}`}
      </pre>
      <div className="mt-4 text-fg-dim text-[12px]">{`# That's the whole install. Restart Claude Desktop.`}</div>
      <div className="mt-3 text-fg-dim text-[12px]">{`# Cursor — Settings → MCP → Add server (same JSON)`}</div>
      <div className="mt-1 text-fg-dim text-[12px]">{`# Cline / Continue / Zed — same config, different file`}</div>
    </div>
  );

  const graphCode = (
    <div>
      <div>
        <span className="text-fg-dim">{"// ask any AI to dump what Continuum knows about you"}</span>
        {"\n"}$ <span className="text-accent">Ask Claude: "What do you remember about me?"</span>
      </div>
      <pre className="mt-3 text-fg-muted text-[12.5px] leading-[1.7]">
{`  I checked your Continuum memory. Here's what I found:

  user
  ├─ role           founder, B2B SaaS · HR
  ├─ preferences    concise answers, no emojis, code-first
  └─ projects       acme-pricing-v3 (deadline: Fri)
                    onboarding-redesign (paused)

  recent
  ├─ Mon  Claude    "replied to 3 emails, design review at 4"
  ├─ Tue  Cursor    "shipped billing fix, opens PR #482"
  └─ Wed  ChatGPT   "sketched tagline variants, no commit"

  patterns (from The Tell)
  ├─ you ask short follow-ups when stuck
  ├─ you switch tools when frustrated (Claude → Cursor)
  └─ you like code before prose

  confidence
  high: 14  medium: 6  low: 2
  pending review: 3 →  http://continuum.app/memories`}
      </pre>
    </div>
  );

  const codes = [installCode, useCode, graphCode];

  return (
    <section id="code" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="card !p-0 overflow-hidden">
            <div className="flex items-center gap-1 border-b border-border-subtle bg-bg-soft/40 px-2 py-1.5">
              {t.tabs.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setTab(i)}
                  className={`rounded-md px-3 py-1.5 text-[12px] font-mono transition ${
                    tab === i ? "bg-bg-elev text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {label}
                </button>
              ))}
              <span className="flex-1" />
              <span className="pr-2 text-[11px] text-fg-dim">{t.copy}</span>
            </div>
            <div className="overflow-x-auto px-6 py-5 font-mono text-[13px] leading-[1.75] text-fg-muted">
              {codes[tab]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- use cases -------------------------------- */

const useCaseIcons = [
  <svg key="u1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <path d="M12 6V3M8 19v2M16 19v2M9 12h.01M15 12h.01M9 15h6" />
  </svg>,
  <svg key="u2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M21 12c0 4.4-4 8-9 8a9.9 9.9 0 0 1-4-.8L3 21l1.8-4.5A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" />
  </svg>,
  <svg key="u3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M22 10 12 4 2 10l10 6 10-6Z" />
    <path d="M6 12v5a6 6 0 0 0 12 0v-5" />
  </svg>,
  <svg key="u4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>,
];

/* --------------------------------- how it works ---------------------------- */

function HowItWorksCaptureVisual() {
  return (
    <div className="space-y-2 text-[12.5px]">
      <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono">
        <span className="text-fg-dim">user:</span>{" "}
        <span className="text-fg-muted">"下周要交设计稿, 顺便我更喜欢简短回答"</span>
      </div>
      <div className="ml-4 flex items-center gap-2 text-[11px] text-accent">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
        </svg>
        AI notices 2 things worth remembering
      </div>
      <div className="space-y-1">
        <div className="rounded border border-accent/30 bg-accent/[0.04] px-3 py-2 font-mono text-[11.5px]">
          <span className="text-accent">propose_memory ·</span>{" "}
          <span className="text-fg-muted">"deadline: design v3, Friday"</span>
        </div>
        <div className="rounded border border-accent/30 bg-accent/[0.04] px-3 py-2 font-mono text-[11.5px]">
          <span className="text-accent">propose_memory ·</span>{" "}
          <span className="text-fg-muted">"preference: concise answers"</span>
        </div>
      </div>
    </div>
  );
}

function HowItWorksCurateVisual() {
  return (
    <div className="space-y-3 text-[12.5px]">
      <div className="rounded-lg border border-border-subtle bg-bg-soft/50 p-3">
        <div className="mb-1.5 text-[10px] uppercase tracking-wider text-fg-dim">in-app toast</div>
        <div className="font-mono text-fg-muted">
          <span className="text-fg-dim">▸ </span>
          <span className="text-fg">Continuum wants to remember:</span>
          <br />
          <span className="ml-3 text-fg-muted">"deadline: design v3, Friday"</span>
        </div>
        <div className="mt-2 flex gap-1.5 font-mono text-[11px]">
          <span className="rounded bg-accent px-2 py-0.5 text-bg">✓</span>
          <span className="rounded border border-border px-2 py-0.5 text-fg-muted">✎ edit</span>
          <span className="rounded border border-border px-2 py-0.5 text-fg-dim">✗</span>
        </div>
      </div>
      <div className="rounded-lg border border-border-subtle bg-bg-soft/50 p-3">
        <div className="mb-1.5 text-[10px] uppercase tracking-wider text-fg-dim">9 PM digest</div>
        <div className="font-mono text-fg-muted text-[11.5px]">
          3 proposed · 1 edited · 0 rejected
        </div>
      </div>
    </div>
  );
}

function HowItWorksRecallVisual() {
  return (
    <div className="space-y-2 text-[12.5px]">
      <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono text-fg-dim">
        <span className="text-fg-muted">[</span> Claude Desktop <span className="text-fg-dim">→</span> Cursor <span className="text-fg-muted">→</span> ChatGPT <span className="text-fg-muted">]</span>
      </div>
      <div className="rounded border border-accent/30 bg-accent/[0.04] px-3 py-2 font-mono text-[11.5px]">
        <span className="text-accent">continuum.get_context</span>
        <span className="text-fg-muted">(query="current task")</span>
      </div>
      <div className="space-y-1">
        <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono text-[11px]">
          <span className="text-fg-dim">→ </span>
          <span className="text-fg-muted">user.preference = concise</span>{" "}
          <span className="text-fg-dim">· from Claude</span>
        </div>
        <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono text-[11px]">
          <span className="text-fg-dim">→ </span>
          <span className="text-fg-muted">deadline = Fri · design v3</span>{" "}
          <span className="text-fg-dim">· from ChatGPT</span>
        </div>
        <div className="rounded border border-border-subtle bg-bg-soft/40 px-3 py-2 font-mono text-[11px]">
          <span className="text-fg-dim">→ </span>
          <span className="text-fg-muted">project = acme-pricing</span>{" "}
          <span className="text-fg-dim">· from Cursor</span>
        </div>
      </div>
    </div>
  );
}

const howItWorksVisuals = {
  capture: <HowItWorksCaptureVisual />,
  curate: <HowItWorksCurateVisual />,
  recall: <HowItWorksRecallVisual />,
};

function HowItWorks({ lang }: { lang: Lang }) {
  const t = dict[lang].howItWorks;
  return (
    <section id="how" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
        </div>

        <div className="mt-14 space-y-4">
          {t.steps.map((s, i) => (
            <div
              key={s.name}
              className={`card card-hover grid gap-6 md:grid-cols-[1.1fr_1fr] ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-dim">
                  <span className="font-mono text-accent">0{i + 1}</span>
                  <span>{s.tag}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-soft/50 p-5">
                {howItWorksVisuals[s.visual]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#code" className="text-sm text-fg-muted transition hover:text-fg">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function UseCases({ lang }: { lang: Lang }) {
  const t = dict[lang].useCases;
  return (
    <section id="usecases" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            {t.titleB && <span className="text-fg-muted">{t.titleB}</span>}
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map((u, i) => (
            <div key={u.title} className="card card-hover">
              <div className="mb-4 text-accent">{useCaseIcons[i]}</div>
              <h3 className="text-base font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{u.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- testimonials ----------------------------- */

function Testimonials({ lang }: { lang: Lang }) {
  const t = dict[lang].testimonials;
  const gradients = [
    "from-accent/30 to-purple-accent/30",
    "from-purple-accent/30 to-accent/30",
    "from-accent/20 to-fg-dim/20",
  ];
  return (
    <section id="testimonials" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.items.map((q, i) => (
            <figure
              key={q.name}
              className="card card-hover flex flex-col"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent/40" fill="currentColor" aria-hidden>
                <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
              </svg>
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-fg-muted">
                {q.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % 3]} font-mono text-[12px] font-semibold text-bg`}
                >
                  {q.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-fg">{q.name}</div>
                  <div className="text-xs text-fg-dim">
                    {q.role} · {q.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- pricing -------------------------------- */

function Pricing({ lang }: { lang: Lang }) {
  const t = dict[lang].pricing;
  return (
    <section id="pricing" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`card relative ${
                idx === 1
                  ? "border-accent/40 bg-gradient-to-b from-accent/[0.04] to-transparent shadow-glow-accent"
                  : "card-hover"
              }`}
            >
              {idx === 1 && (
                <div className="mb-4 -mt-1 flex justify-center">
                  <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-bg">
                    {t.highlight}
                  </span>
                </div>
              )}
              <div className="text-sm text-fg-muted">{tier.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-xs text-fg-dim">{tier.cadence}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-fg-muted">
                    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`mt-7 w-full ${idx === 1 ? "btn-primary" : "btn-ghost"}`}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- pricing faq ------------------------------ */

function PricingFaq({ lang }: { lang: Lang }) {
  const t = dict[lang].pricingFaq;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="border-t border-border-subtle py-20">
      <div className="container-page max-w-3xl">
        <h3 className="text-center text-xl font-semibold tracking-tight md:text-2xl">{t.title}</h3>
        <div className="mt-8 space-y-2">
          {t.items.map((f, i) => (
            <div
              key={f.q}
              className="rounded-lg border border-border bg-bg-card transition hover:border-border-strong"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
              >
                <span className="text-[14.5px] font-medium">{f.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 flex-none text-fg-muted transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-fg-muted">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- changelog -------------------------------- */

function Changelog({ lang }: { lang: Lang }) {
  const t = dict[lang].changelog;
  return (
    <section id="changelog" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {t.items.map((item) => (
            <article
              key={item.version}
              className="card card-hover"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-accent">{item.version}</span>
                  <span className="text-xs text-fg-dim">{item.date}</span>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
                {item.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-fg-dim" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <div className="pt-2 text-center">
            <a href="#" className="text-sm text-fg-muted transition hover:text-fg">
              {t.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function FAQ({ lang }: { lang: Lang }) {
  const t = dict[lang].faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border-subtle py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent">{t.tag}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-2">
          {t.items.map((f, i) => (
            <div
              key={f.q}
              className="rounded-lg border border-border bg-bg-card transition hover:border-border-strong"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-medium">{f.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 flex-none text-fg-muted transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                </svg>
              </button>
              {open === i && <div className="px-5 pb-5 text-sm leading-relaxed text-fg-muted">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- final cta --------------------------------- */

function FinalCTA({ lang }: { lang: Lang }) {
  const t = dict[lang].finalCta;
  return (
    <section className="relative overflow-hidden border-t border-border-subtle py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-mesh opacity-60" />
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.titleA} <br />
            <span className="gradient-accent">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-fg-muted">{t.body}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#" className="btn-primary h-11 px-6 text-sm">
              {t.cta1}
            </a>
            <a href="#" className="btn-ghost h-11 px-6 text-sm">
              {t.cta2}
            </a>
          </div>
          <p className="mt-8 text-[12.5px] italic leading-relaxed text-fg-dim">
            {t.etymology}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang].footer;
  return (
    <footer className="border-t border-border-subtle py-12">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-fg-muted">{t.tagline}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            {t.columns.map((col) => (
              <div key={col.title}>
                <div className="mb-3 text-xs uppercase tracking-wider text-fg-dim">{col.title}</div>
                <ul className="space-y-2 text-fg-muted">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-fg">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-xs text-fg-dim md:flex-row md:items-center">
          <span>{t.copyright}</span>
          <div className="flex gap-5">
            {t.legal.map((l) => (
              <a key={l} href="#" className="hover:text-fg">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- cookie banner ----------------------------- */

function CookieBanner({ lang }: { lang: Lang }) {
  const t = dict[lang].cookie;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("continuum-cookie");
    if (!accepted) setShow(true);
  }, []);

  if (!show) return null;

  const accept = (val: "yes" | "no") => {
    localStorage.setItem("continuum-cookie", val);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-lg border border-border bg-bg-elev/95 p-4 shadow-glow-accent backdrop-blur-xl">
      <p className="text-sm text-fg-muted">{t.body}</p>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={() => accept("no")}
          className="rounded-md px-3 py-1.5 text-xs text-fg-muted transition hover:text-fg"
        >
          {t.decline}
        </button>
        <button
          onClick={() => accept("yes")}
          className="rounded-md bg-fg px-3 py-1.5 text-xs font-medium text-bg transition hover:bg-white"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- 404 ----------------------------------- */

function NotFound({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = dict[lang].notFound;
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="absolute right-4 top-4 z-50">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div className="m-auto flex max-w-md flex-col items-center px-6 text-center">
        <div className="font-mono text-7xl font-bold tracking-tighter text-accent">404</div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h1>
        <p className="mt-3 text-fg-muted">{t.body}</p>
        <a href="/" className="btn-primary mt-6 h-10 px-5">
          {t.cta}
        </a>
      </div>
    </div>
  );
}

/* --------------------------------- root app -------------------------------- */

export default function App() {
  const [lang, setLang] = useState<Lang>("zh");
  // GitHub Pages serves this site at /continuum/ — strip the base before 404-checking.
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const [path, setPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const bar = document.getElementById("scrollbar");
      if (bar) bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intercept link clicks for SPA-style navigation so 404 catches unknown paths
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      setPath(href);
      window.scrollTo(0, 0);
    };
    const onPop = () => setPath(window.location.pathname);
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const normalized = path.replace(/\/$/, "") || "/";
  const isHome = normalized === "/" || normalized === base;
  if (!isHome && !path.startsWith("/#")) {
    return <NotFound lang={lang} setLang={setLang} />;
  }

  return (
    <div className="min-h-screen">
      <div
        id="scrollbar"
        className="fixed left-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent to-purple-accent"
        style={{ width: "0%" }}
      />
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <SupportedApps lang={lang} />
        <Problem lang={lang} />
        <BeforeAfter lang={lang} />
        <ByTheNumbers lang={lang} />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <UseCases lang={lang} />
        <WhyExists lang={lang} />
        <IsForMe lang={lang} />
        <Architecture lang={lang} />
        <CodeBlock lang={lang} />
        <Testimonials lang={lang} />
        <Pricing lang={lang} />
        <Security lang={lang} />
        <PricingFaq lang={lang} />
        <Changelog lang={lang} />
        <FAQ lang={lang} />
        <FinalCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <CookieBanner lang={lang} />
    </div>
  );
}
