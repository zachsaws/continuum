import { useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";

const GITHUB_URL = "https://github.com/zachsaws/continuum";

/* --------------------------------- helpers -------------------------------- */

function renderInline(s: string) {
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

/* Reveal-on-scroll using IntersectionObserver — gives every section a soft fade-up. */
function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* --------------------------------- brand ---------------------------------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="11.5" stroke="#1D1D1F" strokeWidth="1.3" />
        <path
          d="M14 2.5a11.5 11.5 0 0 0-11.5 11.5"
          stroke="#d97a5c"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="14" cy="14" r="2.2" fill="#d97a5c" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-fg">Continuum</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      role="tablist"
      className="flex items-center rounded-full border border-border-subtle bg-bg-soft/60 p-0.5 text-[11px] font-medium"
    >
      <button
        role="tab"
        aria-selected={lang === "en"}
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          lang === "en" ? "bg-fg text-bg shadow-sm" : "text-fg-muted hover:text-fg"
        }`}
      >
        EN
      </button>
      <button
        role="tab"
        aria-selected={lang === "zh"}
        onClick={() => setLang("zh")}
        className={`rounded-full px-2.5 py-1 transition-all ${
          lang === "zh" ? "bg-fg text-bg shadow-sm" : "text-fg-muted hover:text-fg"
        }`}
      >
        中
      </button>
    </div>
  );
}

/* ------------------------------------ nav ---------------------------------- */

function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = dict[lang].nav;
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/75 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60">
      <div className="container-page flex h-12 items-center justify-between">
        <div className="flex items-center gap-7">
          <Logo />
          <nav className="hidden items-center gap-5 text-[13px] text-fg-muted md:flex">
            <a href="#features" className="transition-colors hover:text-fg">{t.features}</a>
            <a href="#how" className="transition-colors hover:text-fg">{t.how}</a>
            <a href="/manifesto" className="transition-colors hover:text-fg">{t.manifesto}</a>
            <a href="#pricing" className="transition-colors hover:text-fg">{t.pricing}</a>
            <a href="#faq" className="transition-colors hover:text-fg">{t.faq}</a>
            <a href="#changelog" className="transition-colors hover:text-fg">{t.changelog}</a>
          </nav>
        </div>
        <div className="flex items-center gap-2.5">
          <LangToggle lang={lang} setLang={setLang} />
          <a
            href={GITHUB_URL}
            className="hidden text-[13px] text-fg-muted transition-colors hover:text-fg lg:inline-block"
          >
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
  const memories = [
    { tag: "preference", text: isZh ? "简短回答,不用 emoji" : "Concise answers · no emojis", source: isZh ? "Claude · 3 天前" : "Claude · 3 days ago" },
    { tag: "project", text: isZh ? "v3 周五截稿" : "v3 launches Friday", source: isZh ? "Cursor · 周一" : "Cursor · Monday" },
  ];
  const aiReply = isZh
    ? "好。根据你之前告诉我的 —— 周五截稿、简短、不用 emoji —— 先按你的口吻写了一版:「v3 上线。摩擦减半。改的是 7 个你大概率会撞上的坎……」"
    : "Sure. Picking up from last week — Friday deadline, concise tone, no emojis. Here's a draft that reads like you, not like marketing: \"v3 is out. Same product. Half the friction. We fixed the seven things you were going to hit anyway. …\"";
  const userPrompt = isZh ? "帮我写 v3 发布的文案。" : "Help me write the launch copy for v3.";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-hero-warm" />
      <div className="container-page pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="reveal mb-7 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.tag}
          </div>
          <h1 className="reveal text-balance text-display-1 text-fg">
            {t.title}
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-balance text-[17px] leading-[1.55] text-fg-muted">
            {renderInline(t.body)}
          </p>
          <p className="reveal mx-auto mt-3 max-w-md text-[13px] leading-[1.6] text-fg-dim">
            {t.body2}
          </p>
          <div className="reveal mt-9 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a href={GITHUB_URL} className="btn-primary h-11 px-6 text-[14px]">
              {t.cta1}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#features" className="btn-ghost h-11 px-5 text-[14px]">
              {t.cta2}
            </a>
          </div>
          <p className="reveal mt-4 text-[12.5px] text-fg-dim">{t.hint}</p>
        </div>

        {/* Memory card — Apple-clean: white card, soft shadow, no fake chrome */}
        <div className="reveal mx-auto mt-16 max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-apple-2">
            <div className="grid gap-0 md:grid-cols-[1fr_240px]">
              {/* Chat column */}
              <div className="space-y-5 p-6 md:p-7">
                <div>
                  <div className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-fg-dim">
                    {isZh ? "你" : "You"}
                  </div>
                  <div className="text-[14px] leading-[1.55] text-fg">{userPrompt}</div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-fg-dim">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    Claude
                  </div>
                  <div className="text-[14px] leading-[1.55] text-fg-muted">{aiReply}</div>
                </div>
              </div>

              {/* Continuum memory column */}
              <div className="border-t border-border-subtle bg-bg-soft/40 p-5 md:border-l md:border-t-0">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-accent text-[8px] font-bold text-accent">
                    C
                  </span>
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                    Continuum
                  </span>
                </div>
                <div className="mb-2.5 text-[10.5px] text-fg-dim">
                  {isZh ? "从过去 7 天自动提取" : "Pulled from the last 7 days"}
                </div>
                <div className="space-y-2">
                  {memories.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border-subtle bg-white p-2.5"
                    >
                      <div className="mb-0.5 flex items-center gap-1.5 text-[9.5px]">
                        <span className="font-semibold uppercase tracking-[0.12em] text-accent">
                          {m.tag}
                        </span>
                        <span className="text-fg-dim">· {m.source}</span>
                      </div>
                      <div className="text-[12px] leading-snug text-fg">{m.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3.5 text-center text-[12px] italic text-fg-dim">
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
    <section className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="reveal text-balance text-display-2 text-fg">
            {t.line1}
          </h2>
          <p className="reveal mt-7 text-[17px] leading-[1.7] text-fg-muted">
            {t.line2}
          </p>
          <p className="reveal mt-5 text-[15.5px] font-medium text-fg">
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
    <section id="features" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        </div>

        <div className="reveal mx-auto mt-20 max-w-3xl">
          {t.items.map((f, i) => (
            <div
              key={f.name}
              className={`grid gap-4 py-10 md:grid-cols-[56px_1fr] md:gap-8 ${
                i !== 0 ? "border-t border-border-subtle" : ""
              }`}
            >
              <div className="text-[32px] leading-none md:text-[36px]" aria-hidden>
                {f.emoji}
              </div>
              <div>
                <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-dim">
                  {f.tag}
                </div>
                <h3 className="text-balance text-[22px] font-semibold leading-[1.22] tracking-[-0.01em] text-fg">
                  {f.name}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.7] text-fg-muted">{f.body}</p>
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
    <section id="how" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        </div>

        <div className="reveal mx-auto mt-16 grid max-w-3xl gap-10 md:grid-cols-3 md:gap-8">
          {t.steps.map((s, i) => (
            <div key={s.name} className="relative">
              <div className="mb-3 font-mono text-[11px] tracking-[0.08em] text-fg-dim">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.005em] text-fg">{s.name}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-fg-muted">{s.body}</p>
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
    <section className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.kicker}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <div className="reveal mt-8 space-y-5 text-[16.5px] leading-[1.78] text-fg-muted">
            {t.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-[14px] italic text-fg-dim">{t.signature}</p>
          <div className="mt-7">
            <a
              href="/manifesto"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:text-accent-deep"
            >
              {t.ctaLabel}
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- why not -------------------------------- */

function WhyNot({ lang }: { lang: Lang }) {
  const t = dict[lang].whyNot;
  return (
    <section className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <ul className="reveal mt-10 space-y-5">
            {t.items.map((line, i) => (
              <li key={i} className="flex gap-4 text-[16px] leading-[1.65] text-fg-muted">
                <span
                  className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-fg/[0.04] font-mono text-[12px] text-fg-dim"
                  aria-hidden
                >
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
    <section className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        </div>

        <div className="reveal mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {t.columns.map((c, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 transition-colors ${
                c.emph
                  ? "border-accent/30 bg-accent/[0.04]"
                  : "border-border-subtle bg-bg"
              }`}
            >
              {c.emph && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-bg">
                  <span className="h-1.5 w-1.5 rounded-full bg-bg" />
                  {lang === "zh" ? "选这列" : "This one"}
                </span>
              )}
              <div className="mb-3 font-mono text-[10.5px] tracking-[0.12em] text-fg-dim">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-3 text-[15px] font-semibold leading-[1.35] text-fg">
                {c.persona}
              </div>
              <div
                className={`mb-4 inline-block rounded-md px-2 py-0.5 text-[11px] font-mono uppercase tracking-[0.1em] ${
                  c.emph ? "bg-accent/15 text-accent" : "bg-bg-soft text-fg-muted"
                }`}
              >
                {c.verdict}
              </div>
              <p className="text-[14px] leading-[1.65] text-fg-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-12 max-w-2xl text-center">
          <p className="text-[14px] text-fg-muted">{t.closer}</p>
          <a href={GITHUB_URL} className="btn-primary mt-5 h-10 px-5">
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
    <section id="security" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">
            {t.titleA} <br />
            <span className="text-fg-muted">{t.titleB}</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        </div>

        <div className="reveal mx-auto mt-16 max-w-3xl space-y-10">
          {t.checks.map((c) => (
            <div key={c.title} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <h3 className="text-[15.5px] font-semibold leading-[1.4] text-fg">
                {c.title}
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-fg-muted">{c.body}</p>
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
    <section id="pricing" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
        </div>

        <div className="reveal mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle md:grid-cols-3">
          {t.tiers.map((tier) => (
            <div key={tier.name} className="relative flex flex-col bg-bg p-7">
              {tier.name === "Pro" && (
                <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t.highlight}
                </div>
              )}
              <div className="text-[14px] font-semibold text-fg">{tier.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[40px] font-semibold tracking-[-0.02em] text-fg">
                  {tier.price}
                </span>
                <span className="text-[12.5px] text-fg-dim">{tier.cadence}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-[14px] text-fg-muted">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-[9px] inline-block h-1 w-1 flex-none rounded-full bg-fg-dim" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={GITHUB_URL}
                className={`mt-7 h-10 rounded-full text-[14px] font-medium transition-all inline-flex items-center justify-center active:scale-[0.97] ${
                  tier.name === "Hobby"
                    ? "bg-fg text-bg hover:bg-fg/90"
                    : "border border-border-subtle text-fg hover:bg-fg/[0.04]"
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
    <section className="border-t border-border-subtle py-20 md:py-24">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-[26px] font-semibold tracking-[-0.012em] md:text-[30px]">
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
    <section id="changelog" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-[26px] font-semibold tracking-[-0.012em] md:text-[30px]">{t.title}</h2>

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
                      <span className="mt-[9px] inline-block h-1 w-1 flex-none rounded-full bg-fg-dim" />
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
    <section className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
          <ol className="reveal mt-12 space-y-8">
            {t.items.map((it, i) => (
              <li
                key={i}
                className="grid gap-2 border-t border-border-subtle pt-6 md:grid-cols-[160px_1fr] md:gap-10"
              >
                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-dim">
                  {it.when}
                </div>
                <p className="text-[16px] leading-[1.65] text-fg">{it.what}</p>
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
    <section id="faq" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-[26px] font-semibold tracking-[-0.012em] md:text-[30px]">{t.title}</h2>
          <div className="mt-12 space-y-8">
            {t.items.map((item, i) => (
              <div key={i} className="border-t border-border-subtle pt-6">
                <h3 className="text-[16px] font-semibold leading-[1.4] text-fg">{item.q}</h3>
                <p className="mt-3 text-[15px] leading-[1.78] text-fg-muted">{item.a}</p>
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
    <section className="relative overflow-hidden border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-display-1 text-fg">
            {t.titleA} <br />
            <span className="text-accent">{t.titleB}</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-fg-muted">{t.body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a href={GITHUB_URL} className="btn-primary h-11 px-6 text-[14px]">
              {t.cta1}
            </a>
            <a href="#features" className="btn-ghost h-11 px-5 text-[14px]">
              {t.cta2}
            </a>
          </div>
          <p className="mt-10 text-[13px] italic leading-[1.6] text-fg-dim">
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
  // Smart link mapping — no more dead # hrefs.
  const linkHref = (label: string): string => {
    const l = label.toLowerCase();
    if (l === "manifesto" || l === "宣言") return "/manifesto";
    if (l === "changelog" || l === "更新") return "/#changelog";
    if (l === "pricing" || l === "定价") return "/#pricing";
    if (l === "how it works" || l === "工作流程") return "/#how";
    if (l === "install" || l === "安装") return GITHUB_URL;
    if (l === "blog" || l === "博客") return "#";
    if (l === "privacy" || l === "隐私") return "#";
    if (l === "contact" || l === "联系") return "#";
    if (l === "about" || l === "关于") return "#";
    if (l === "docs" || l === "文档") return GITHUB_URL;
    if (l === "mcp setup" || l === "mcp 配置") return GITHUB_URL + "#mcp-setup";
    if (l === "examples" || l === "示例") return GITHUB_URL + "#examples";
    if (l === "discord") return "#";
    return "#";
  };

  return (
    <footer className="border-t border-border-subtle py-14">
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
                <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-fg-dim">
                  {col.title}
                </div>
                <ul className="space-y-2.5 text-fg-muted">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href={linkHref(l)}
                        className="transition-colors hover:text-fg"
                      >
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
              <a
                key={l}
                href={linkHref(l)}
                className="transition-colors hover:text-fg"
              >
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
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-2xl border border-border-subtle bg-bg/95 p-4 text-[13px] text-fg-muted shadow-apple-3 backdrop-blur-xl">
      <p>{t.body}</p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={decline}
          className="rounded-full border border-border-subtle px-3.5 py-1 text-[12px] text-fg-muted transition-colors hover:bg-fg/[0.04]"
        >
          {t.decline}
        </button>
        <button
          onClick={accept}
          className="rounded-full bg-fg px-3.5 py-1 text-[12px] text-bg transition-all hover:bg-fg/90 active:scale-[0.97]"
        >
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
    <article className="border-t border-border-subtle py-20 md:py-28">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
              Manifesto
            </div>
            <h1 className="text-balance text-display-1 text-fg">{t.title}</h1>
            <p className="mt-5 text-[17px] italic text-fg-muted">{t.intro}</p>
          </div>

          <div className="reveal mt-14 space-y-12">
            {t.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.008em] text-fg">
                  {s.heading}
                </h2>
                {s.body.split("\n\n").map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 text-[16.5px] leading-[1.8] text-fg-muted"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-16 text-center text-[14px] italic text-fg-dim">
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
        <div className="text-[80px] font-semibold tracking-[-0.04em] text-fg">404</div>
        <h1 className="mt-3 text-[22px] font-semibold tracking-[-0.012em] md:text-[26px]">{t.title}</h1>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-full border border-border-subtle px-3.5 py-1.5 text-[13px] text-fg transition-all hover:bg-fg/[0.04] active:scale-[0.97]"
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
  const params = new URLSearchParams(window.location.search);
  const override = params.get("lang");
  if (override === "en" || override === "zh") return override;
  try {
    const saved = localStorage.getItem("c-lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch {}
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(detectInitialLang);
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const [path, setPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useReveal();

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
      if (href.startsWith("/") && !href.startsWith("//") && a.origin === window.location.origin) {
        e.preventDefault();
        const fullHref = (base ? base : "") + href;
        window.history.pushState({}, "", fullHref);
        setPath(fullHref);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [base]);

  // Reveal observer needs the elements to exist; re-run on path/lang change.
  useEffect(() => {
    // Re-trigger useReveal to re-observe after path/lang change
  }, [path, lang]);

  // Strip base from path so routing matches against relative paths.
  const stripped = base && path.startsWith(base) ? path.slice(base.length) || "/" : path;
  const normalized = stripped.replace(/\/$/, "") || "/";
  const isHome = normalized === "/" || normalized === base;
  const isManifesto = normalized === "/manifesto" || normalized === "/manifesto/";
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
