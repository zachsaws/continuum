import { useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";

const GITHUB_URL = "https://github.com/zachsaws/continuum";

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
        <circle cx="16" cy="16" r="13" stroke="#1f1a14" strokeWidth="1.4" />
        <path
          d="M16 3a13 13 0 0 0-13 13"
          stroke="#d97a5c"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="16" cy="16" r="2.5" fill="#d97a5c" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-fg">Continuum</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-md border border-border p-0.5 text-[11px] font-mono">
      <button
        onClick={() => setLang("en")}
        className={`rounded px-2 py-0.5 transition ${
          lang === "en" ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`rounded px-2 py-0.5 transition ${
          lang === "zh" ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
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
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/90 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-fg-muted md:flex">
            <a href="#features" className="transition hover:text-fg">{t.features}</a>
            <a href="#how" className="transition hover:text-fg">{t.how}</a>
            <a href="#pricing" className="transition hover:text-fg">{t.pricing}</a>
            <a href="#faq" className="transition hover:text-fg">{t.faq}</a>
            <a href="#changelog" className="transition hover:text-fg">{t.changelog}</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <a href="#" className="hidden text-sm text-fg-muted transition hover:text-fg lg:inline-block">
            {t.docs}
          </a>
          <a href={GITHUB_URL} className="btn-primary-sm">
            {t.getKey}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------- hero --------------------------------- */

function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  const isZh = lang === "zh";
  // Sample memory card — single product visual. Real copy, not a fake screenshot.
  const memories = isZh
    ? [
        { tag: "preference", text: "Concise answers · no emojis", source: "Claude · 3 days ago" },
        { tag: "project", text: "v3 launches Friday", source: "Cursor · Monday" },
      ]
    : [
        { tag: "preference", text: "Concise answers · no emojis", source: "Claude · 3 days ago" },
        { tag: "project", text: "v3 launches Friday", source: "Cursor · Monday" },
      ];
  const aiReply = isZh
    ? "Sure. Picking up from last week — Friday deadline, concise, no emojis. Here's a draft…"
    : "Sure. Picking up from last week — Friday deadline, concise, no emojis. Here's a draft…";
  const userPrompt = isZh ? "帮我写 v3 发布的文案。" : "Help me write the launch copy for v3.";

  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.tag}
          </div>
          <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-balance text-[16px] leading-[1.7] text-fg-muted md:text-[17px]">
            {renderInline(t.body)}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[12.5px] leading-[1.6] text-fg-dim">
            {t.body2}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={GITHUB_URL} className="btn-primary">
              {t.cta1}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#features" className="btn-ghost">
              {t.cta2}
            </a>
          </div>
          <p className="mt-5 text-[12.5px] text-fg-dim">{t.hint}</p>
        </div>

        {/* Single live-looking memory card — proof, not a fake screenshot */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="overflow-hidden rounded-md border border-border bg-bg-soft/40">
            {/* Claude-style chrome */}
            <div className="flex items-center justify-between border-b border-border-subtle bg-bg-soft/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
                <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
                <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
              </div>
              <div className="font-mono text-[10.5px] text-fg-dim">
                {isZh ? "Claude Desktop · Continuum 已连接" : "Claude Desktop · Continuum connected"}
              </div>
              <div className="font-mono text-[10.5px] text-fg-dim">~</div>
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_240px]">
              {/* Chat column */}
              <div className="space-y-5 p-5 md:p-6">
                <div>
                  <div className="mb-1.5 text-[10px] uppercase tracking-wider text-fg-dim">
                    {isZh ? "你" : "You"}
                  </div>
                  <div className="text-[13.5px] leading-relaxed text-fg">{userPrompt}</div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-fg-dim">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    Claude
                  </div>
                  <div className="text-[13.5px] leading-relaxed text-fg-muted">{aiReply}</div>
                </div>
              </div>

              {/* Continuum memory column */}
              <div className="border-t border-border-subtle bg-bg/60 p-4 md:border-l md:border-t-0">
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent text-[8px] font-bold text-accent">
                    C
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
                    Continuum
                  </span>
                </div>
                <div className="mb-2 text-[10px] text-fg-dim">
                  {isZh ? "从过去 7 天自动提取:" : "Pulled from the last 7 days:"}
                </div>
                <div className="space-y-2">
                  {memories.map((m, i) => (
                    <div
                      key={i}
                      className="rounded border border-border-subtle bg-bg p-2.5 text-[11px]"
                    >
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-accent">
                          {m.tag}
                        </span>
                        <span className="text-fg-dim">· {m.source}</span>
                      </div>
                      <div className="leading-snug text-fg">{m.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[12px] italic text-fg-dim">
            {t.demoCaption}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- pain ---------------------------------- */

function Pain({ lang }: { lang: Lang }) {
  const t = dict[lang].pain;
  return (
    <section className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-[1.25] tracking-tight md:text-[2.5rem]">
            {t.line1}
          </h2>
          <p className="mt-7 text-[16px] leading-[1.85] text-fg-muted md:text-[17px]">
            {t.line2}
          </p>
          <p className="mt-5 text-[15px] font-medium text-fg md:text-[16px]">
            {t.line3}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- features -------------------------------- */

function Features({ lang }: { lang: Lang }) {
  const t = dict[lang].features;
  return (
    <section id="features" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          {t.items.map((f, i) => (
            <div
              key={f.name}
              className={`grid gap-4 py-10 md:grid-cols-[60px_1fr] md:gap-8 ${
                i !== 0 ? "border-t border-border-subtle" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl" aria-hidden>
                {f.emoji}
              </div>
              <div>
                <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-dim">
                  {f.tag}
                </div>
                <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-tight md:text-[24px]">
                  {f.name}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-fg-muted md:text-[15.5px]">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ how it works ------------------------------ */

function HowItWorks({ lang }: { lang: Lang }) {
  const t = dict[lang].howItWorks;
  return (
    <section id="how" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-12 md:grid-cols-3 md:gap-8">
          {t.steps.map((s, i) => (
            <div key={s.name} className="relative">
              <div className="mb-4 font-mono text-[11px] text-fg-dim">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[18px] font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-fg-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- why exists ------------------------------ */

function WhyExists({ lang }: { lang: Lang }) {
  const t = dict[lang].whyExists;
  return (
    <section className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.kicker}
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-[1.25] tracking-tight md:text-[2rem]">
            {t.title}
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-[1.85] text-fg-muted">
            {t.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-[14px] italic text-fg-dim">{t.signature}</p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- why not -------------------------------- */

function WhyNot({ lang }: { lang: Lang }) {
  const t = dict[lang].whyNot;
  return (
    <section className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.title}
          </h2>
          <ul className="mt-10 space-y-5">
            {t.items.map((line, i) => (
              <li key={i} className="flex gap-4 text-[16px] leading-[1.7] text-fg-muted">
                <span className="mt-0.5 select-none font-mono text-[15px] text-fg-dim" aria-hidden>
                  ✕
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- is for me ------------------------------ */

function IsForMe({ lang }: { lang: Lang }) {
  const t = dict[lang].isForMe;
  return (
    <section className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-[1.25] tracking-tight md:text-[2.5rem]">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {t.columns.map((c, i) => (
            <div
              key={i}
              className={`relative rounded-md border p-6 ${
                c.emph ? "border-accent/40 bg-accent/[0.04]" : "border-border bg-bg"
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
                  c.emph ? "bg-accent/15 text-accent" : "bg-bg-soft text-fg-muted"
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
            href={GITHUB_URL}
            className="btn-primary mt-5 h-10 px-5"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- security ------------------------------- */

function Security({ lang }: { lang: Lang }) {
  const t = dict[lang].security;
  return (
    <section id="security" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-10">
          {t.checks.map((c) => (
            <div key={c.title} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <h3 className="text-[16px] font-semibold leading-snug text-fg">
                {c.title}
              </h3>
              <p className="text-[15px] leading-[1.75] text-fg-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- pricing -------------------------------- */

function Pricing({ lang }: { lang: Lang }) {
  const t = dict[lang].pricing;
  return (
    <section id="pricing" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.title}
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {t.tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col bg-bg p-7"
            >
              {tier.name === "Pro" && (
                <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t.highlight}
                </div>
              )}
              <div className="text-[14px] font-semibold text-fg">{tier.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[2.5rem] font-semibold tracking-tight text-fg">
                  {tier.price}
                </span>
                <span className="text-[12px] text-fg-dim">{tier.cadence}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-[14px] text-fg-muted">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-[10px] inline-block h-1 w-1 flex-none rounded-full bg-fg-dim" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={GITHUB_URL}
                className={`mt-7 h-10 rounded-md text-[14px] font-medium transition inline-flex items-center justify-center ${
                  tier.name === "Hobby"
                    ? "bg-fg text-bg hover:bg-fg/90"
                    : "border border-border text-fg hover:bg-bg-soft"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ pricing faq ------------------------------- */

function PricingFaq({ lang }: { lang: Lang }) {
  const t = dict[lang].pricingFaq;
  return (
    <section className="border-b border-border-subtle py-20 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight md:text-3xl">
            {t.title}
          </h2>
          <div className="space-y-6">
            {t.items.map((item, i) => (
              <div key={i} className="border-t border-border-subtle pt-5">
                <h3 className="text-[15px] font-semibold text-fg">{item.q}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.7] text-fg-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- changelog ------------------------------- */

function Changelog({ lang }: { lang: Lang }) {
  const t = dict[lang].changelog;
  return (
    <section id="changelog" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h2>

          <div className="mt-12 space-y-12">
            {t.items.map((item, i) => (
              <article key={i}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[14px] font-semibold text-fg">
                    {item.version}
                  </span>
                  <span className="text-[12px] text-fg-dim">{item.date}</span>
                </div>
                <ul className="space-y-2 text-[14.5px] leading-[1.7] text-fg-muted">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span className="mt-[10px] inline-block h-1 w-1 flex-none rounded-full bg-fg-dim" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- roadmap ------------------------------- */

function Roadmap({ lang }: { lang: Lang }) {
  const t = dict[lang].roadmap;
  return (
    <section className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-[15px] text-fg-muted">{t.body}</p>
          <ol className="mt-12 space-y-8">
            {t.items.map((it, i) => (
              <li key={i} className="grid gap-2 border-t border-border-subtle pt-6 md:grid-cols-[160px_1fr] md:gap-10">
                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-dim">
                  {it.when}
                </div>
                <p className="text-[16px] leading-[1.7] text-fg">{it.what}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[13px] italic text-fg-dim">{t.footnote}</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq({ lang }: { lang: Lang }) {
  const t = dict[lang].faq;
  return (
    <section id="faq" className="border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h2>
          <div className="mt-12 space-y-8">
            {t.items.map((item, i) => (
              <div key={i} className="border-t border-border-subtle pt-6">
                <h3 className="text-[16px] font-semibold leading-snug text-fg">{item.q}</h3>
                <p className="mt-3 text-[15px] leading-[1.8] text-fg-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- final cta ------------------------------- */

function FinalCTA({ lang }: { lang: Lang }) {
  const t = dict[lang].finalCta;
  return (
    <section className="relative overflow-hidden border-b border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight md:text-[2.75rem]">
            {t.titleA} <br />
            <span className="text-accent">{t.titleB}</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] text-fg-muted">{t.body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={GITHUB_URL} className="btn-primary h-11 px-6 text-sm">
              {t.cta1}
            </a>
            <a href="#features" className="btn-ghost h-11 px-6 text-sm">
              {t.cta2}
            </a>
          </div>
          <p className="mt-10 text-[12.5px] italic leading-relaxed text-fg-dim">
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
    <footer className="py-14">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[13.5px] leading-[1.7] text-fg-muted">
              {t.tagline}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-[13.5px]">
            {t.columns.map((col) => (
              <div key={col.title}>
                <div className="mb-3 text-[11px] uppercase tracking-wider text-fg-dim">
                  {col.title}
                </div>
                <ul className="space-y-2 text-fg-muted">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition hover:text-fg">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-[12px] text-fg-dim md:flex-row md:items-center">
          <span>{t.copyright}</span>
          <div className="flex gap-5">
            {t.legal.map((l) => (
              <a key={l} href="#" className="transition hover:text-fg">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- cookie banner ---------------------------- */

function CookieBanner({ lang }: { lang: Lang }) {
  const t = dict[lang].cookie;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!localStorage.getItem("c-v1")) setShow(true);
    } catch {}
  }, []);

  if (!show) return null;

  const accept = () => {
    try { localStorage.setItem("c-v1", "1"); } catch {}
    setShow(false);
  };
  const decline = () => {
    try { localStorage.setItem("c-v1", "1"); } catch {}
    setShow(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-md border border-border bg-bg p-4 text-[13px] text-fg-muted shadow-[0_4px_20px_rgba(31,26,20,0.08)]">
      <p>{t.body}</p>
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={decline} className="rounded-md border border-border px-3 py-1 text-[12px] text-fg-muted hover:bg-bg-soft">
          {t.decline}
        </button>
        <button onClick={accept} className="rounded-md bg-fg px-3 py-1 text-[12px] text-bg hover:bg-fg/90">
          {t.accept}
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- manifesto ------------------------------ */

function Manifesto({ lang }: { lang: Lang }) {
  const t = dict[lang].manifesto;
  return (
    <article className="border-b border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-fg-dim">
              Manifesto
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem]">
              {t.title}
            </h1>
            <p className="mt-5 text-[16px] italic text-fg-muted">{t.intro}</p>
          </div>

          <div className="mt-12 space-y-12">
            {t.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-[20px] font-semibold leading-snug tracking-tight text-fg">
                  {s.heading}
                </h2>
                {s.body.split("\n\n").map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 text-[16px] leading-[1.85] text-fg-muted"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-16 text-center text-[13.5px] italic text-fg-dim">
            {t.footer}
          </p>

          <div className="mt-10 text-center">
            <a href="/" className="btn-ghost h-10 px-5">
              ← {lang === "zh" ? "回到首页" : "Back home"}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------- 404 ----------------------------------- */

function NotFound({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = dict[lang].notFound;
  const suggestions = [
    { label: lang === "zh" ? "看产品" : "What it does", href: "/" },
    { label: lang === "zh" ? "看价格" : "Pricing", href: "/#pricing" },
    { label: lang === "zh" ? "读宣言" : "Read the manifesto", href: "/manifesto" },
    { label: lang === "zh" ? "看 FAQ" : "FAQ", href: "/#faq" },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="absolute right-4 top-4 z-50">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div className="m-auto flex max-w-md flex-col items-center px-6 text-center">
        <div className="font-mono text-7xl font-bold tracking-tighter text-fg">404</div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h1>
        <p className="mt-3 text-fg-muted">{t.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-md border border-border px-3.5 py-1.5 text-[13px] text-fg transition hover:bg-bg-soft"
            >
              {s.label}
            </a>
          ))}
        </div>
        <a href="/" className="btn-primary mt-8 h-10 px-5">
          {t.cta}
        </a>
      </div>
    </div>
  );
}

/* --------------------------------- root app ------------------------------- */

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "zh";
  // Honor explicit ?lang= override
  const params = new URLSearchParams(window.location.search);
  const override = params.get("lang");
  if (override === "en" || override === "zh") return override;
  // Try localStorage
  try {
    const saved = localStorage.getItem("c-lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch {}
  // Detect from navigator
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(detectInitialLang);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const [path, setPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    try { localStorage.setItem("c-lang", lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) {
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Internal SPA navigation: same-origin non-http(s) anchors
      if (href.startsWith("/") && !href.startsWith("//") && a.origin === window.location.origin) {
        e.preventDefault();
        window.history.pushState({}, "", href);
        setPath(href);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const normalized = path.replace(/\/$/, "") || "/";
  const isHome = normalized === "/" || normalized === base;
  const isManifesto =
    normalized === base + "/manifesto" ||
    normalized === base + "/manifesto/";
  if (!isHome && !isManifesto && !path.startsWith("/#")) {
    return <NotFound lang={lang} setLang={setLang} />;
  }

  if (isManifesto) {
    return (
      <div className="min-h-screen bg-bg text-fg">
        <Nav lang={lang} setLang={setLang} />
        <Manifesto lang={lang} />
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Pain lang={lang} />
      <Features lang={lang} />
      <HowItWorks lang={lang} />
      <WhyExists lang={lang} />
      <WhyNot lang={lang} />
      <IsForMe lang={lang} />
      <Security lang={lang} />
      <Pricing lang={lang} />
      <PricingFaq lang={lang} />
      <Changelog lang={lang} />
      <Roadmap lang={lang} />
      <Faq lang={lang} />
      <FinalCTA lang={lang} />
      <Footer lang={lang} />
      <CookieBanner lang={lang} />
    </div>
  );
}
