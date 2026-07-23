import { useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";

const GITHUB_URL = "https://github.com/zachsaws/continuum";

/* --------------------------------- helpers -------------------------------- */

function renderInline(s: string) {
  // Parse [c]code[/c] (inline code) and [h]word[/h] (highlight / brand-color) in one pass.
  // Order matters: split by [c] first, then within text parts split by [h].
  const codeParts = s.split(/\[c\](.*?)\[\/c\]/);
  return codeParts.map((segment, i) => {
    if (i % 2 === 1) {
      return (
        <span key={`c-${i}`} className="code-inline">
          {segment}
        </span>
      );
    }
    // Now split the text segment by [h]word[/h]
    const hlParts = segment.split(/\[h\](.*?)\[\/h\]/);
    return (
      <span key={`t-${i}`}>
        {hlParts.map((p, j) =>
          j % 2 === 1 ? (
            <span key={j} className="accent-word">
              {p}
            </span>
          ) : (
            <span key={j}>{p}</span>
          ),
        )}
      </span>
    );
  });
}

/* Reveal-on-scroll using IntersectionObserver — gives every section a soft fade-up. */
function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Track every .reveal element AND every child of .reveal-stagger (so staggered children animate together when container scrolls in)
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const staggerChildren = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-stagger > *"),
    );
    const all = [...reveals, ...staggerChildren];
    if (!("IntersectionObserver" in window) || all.length === 0) {
      all.forEach((el) => el.classList.add("is-visible"));
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
    all.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* --------------------------------- promo strip ----------------------------- */

function PromoStrip({ lang }: { lang: Lang }) {
  const t = dict[lang].promo;
  if (!t) return null;
  return (
    <div className="border-b border-border-subtle bg-bg-soft/70">
      <div className="container-page flex h-8 items-center justify-center text-[12px] text-fg-muted">
        <span className="opacity-90">
          {t.text}
          {t.link ? (
            <>
              {" "}
              <a href={t.link.href} className="text-accent transition-colors hover:text-accent-deep">
                {t.link.label} →
              </a>
            </>
          ) : null}
        </span>
      </div>
    </div>
  );
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
            <a href="#install" className="transition-colors hover:text-fg">{t.how}</a>
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

function StatsWall({ stats }: { stats: { num: string; label: string }[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-7 border-y border-border-subtle py-7 sm:grid-cols-4 sm:gap-y-0">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <div className="text-balance text-[28px] font-semibold tracking-[-0.018em] text-fg sm:text-[32px]">
            {s.num}
          </div>
          <div className="mt-1.5 text-[12.5px] leading-[1.35] text-fg-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

const LOGO_BAR_ITEMS = [
  { name: "Claude", color: "#D97757", letter: "C" },
  { name: "Cursor", color: "#000000", letter: "Cu" },
  { name: "Cline", color: "#3B82F6", letter: "Cl" },
  { name: "Zed", color: "#F59E0B", letter: "Z" },
  { name: "Continue", color: "#0D9488", letter: "Co" },
  { name: "OpenCode", color: "#7C3AED", letter: "OC" },
];

function LogoBar({ label }: { label: string }) {
  return (
    <div className="mt-9 flex flex-col items-center gap-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
        {label}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
        {LOGO_BAR_ITEMS.map((it) => (
          <div
            key={it.name}
            className="flex items-center gap-2 text-[14px] font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white"
              style={{ backgroundColor: it.color }}
            >
              {it.letter}
            </span>
            <span>{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BigProductMockup({ lang }: { lang: Lang }) {
  const m = dict[lang].hero.mockup;
  return (
    <div className="reveal mx-auto mt-16 max-w-5xl">
      <div className="overflow-hidden rounded-xl border border-border-subtle bg-white shadow-apple-3">
        {/* macOS window chrome */}
        <div className="flex items-center gap-2 border-b border-border-subtle bg-[#F5F5F4] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <div className="ml-3 flex-1 text-center text-[11.5px] font-medium text-fg-muted">
            {m.windowTitle}
          </div>
          <div className="w-12" />
        </div>
        {/* Two-column: chat | continuum sidebar */}
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          {/* Chat column */}
          <div className="space-y-6 p-7 md:p-9">
            <div>
              <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg-dim">
                {m.userLabel}
              </div>
              <div className="text-[15px] leading-[1.55] text-fg">{m.userPrompt}</div>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fg-dim">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {m.claudeLabel}
              </div>
              <p className="text-[15px] leading-[1.6] text-fg-muted">{m.claudeReply}</p>
              <div className="mt-3 rounded-lg border-l-2 border-accent bg-bg-soft/50 px-4 py-3 text-[14.5px] italic leading-[1.55] text-fg">
                &ldquo;{m.claudeDraft}&rdquo;
              </div>
            </div>
          </div>

          {/* Continuum memory sidebar */}
          <div className="border-t border-border-subtle bg-[#FAFAF7] p-5 md:border-l md:border-t-0">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-accent text-[9px] font-bold text-accent">
                C
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg">
                {m.continuumLabel}
              </span>
            </div>
            <div className="mb-3 text-[11px] text-fg-muted">{m.pullHint}</div>
            <div className="space-y-2.5">
              {m.memories.map((mem, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border-subtle bg-white p-3 transition-shadow hover:shadow-apple-1"
                >
                  <div className="mb-1 flex items-center gap-1.5 text-[10px]">
                    <span className="font-semibold uppercase tracking-[0.14em] text-accent">
                      {mem.tag}
                    </span>
                    <span className="text-fg-dim">· {mem.source}</span>
                  </div>
                  <div className="text-[12.5px] leading-[1.4] text-fg">{mem.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] italic text-fg-dim">{m.demoCaption}</p>
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-hero-warm" />
      <div className="container-page pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="reveal-stagger mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.tag}
          </div>
          <h1 className="text-balance text-display-1 text-fg">
            {renderInline(t.title)}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[17px] leading-[1.55] text-fg-muted">
            {renderInline(t.body)}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
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
          {/* Choose platform secondary CTA — like evomap's "Apple / Intel" choice */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] text-fg-muted">
            <span>{t.platformLabel}</span>
            <a
              href={`${GITHUB_URL}#macos`}
              className="text-accent underline decoration-accent/40 underline-offset-[3px] transition-colors hover:text-accent-deep hover:decoration-accent"
            >
              {t.platformMac}
            </a>
            <span className="text-fg-dim">·</span>
            <a
              href={`${GITHUB_URL}#windows`}
              className="text-accent underline decoration-accent/40 underline-offset-[3px] transition-colors hover:text-accent-deep hover:decoration-accent"
            >
              {t.platformWin}
            </a>
            <span className="text-fg-dim">·</span>
            <a
              href={`${GITHUB_URL}#linux`}
              className="text-accent underline decoration-accent/40 underline-offset-[3px] transition-colors hover:text-accent-deep hover:decoration-accent"
            >
              {t.platformLinux}
            </a>
          </div>
          <p className="mt-2 text-[12.5px] text-fg-dim">{t.hint}</p>
          <p className="mx-auto mt-3 max-w-md text-[12.5px] leading-[1.55] text-fg-dim">
            {t.body2}
          </p>
        </div>

        <StatsWall stats={t.stats} />
        <LogoBar label={t.worksIn} />
        <BigProductMockup lang={lang} />
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

        <div className="mx-auto mt-24 max-w-5xl space-y-28">
          {t.items.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={f.key}
                className={`reveal grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${
                  flip ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                    {f.kicker}
                  </div>
                  <h3 className="text-balance text-[24px] font-semibold leading-[1.22] tracking-[-0.012em] text-fg md:text-[28px]">
                    {f.name}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-fg-muted">{f.body}</p>
                </div>
                <div className={flip ? "lg:order-1" : ""}>
                  <FeatureViz kind={f.key} alt={f.alt} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- feature visualizations ------------------------- */

function FeatureViz({ kind, alt }: { kind: "memory" | "map" | "tell" | "fade"; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="overflow-hidden rounded-xl border border-border-subtle bg-bg-soft/50 p-5 shadow-apple-1"
    >
      {kind === "memory" && <MemoryTimelineViz />}
      {kind === "map" && <MapGraphViz />}
      {kind === "tell" && <TellRadarViz />}
      {kind === "fade" && <FadeViz />}
    </div>
  );
}

function MemoryTimelineViz() {
  const rows = ["Context", "Preferences", "Tasks", "Tools", "Models"];
  const cols = [
    { label: "Last wk", fills: [0.25, 0.3, 0.4, 0.2, 0.3] },
    { label: "This wk", fills: [0.55, 0.7, 0.65, 0.5, 0.45] },
    { label: "Now", fills: [0.95, 1.0, 0.9, 0.8, 0.85] },
  ];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-muted">
          LAYERED MEMORY
        </span>
        <div className="flex items-center gap-1.5 text-[9.5px] text-fg-dim">
          <span className="inline-block h-2 w-2 rounded-sm bg-fg-dim/30" />
          <span>fades</span>
          <span className="mx-1">→</span>
          <span className="inline-block h-2 w-2 rounded-sm bg-accent" />
          <span>active</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((row, ri) => (
          <div key={row} className="flex items-center gap-2">
            <div className="w-[88px] shrink-0 text-[10.5px] text-fg-muted">{row}</div>
            {cols.map((col, ci) => {
              const fill = col.fills[ri];
              return (
                <div
                  key={ci}
                  className="relative h-7 flex-1 overflow-hidden rounded border border-border-subtle bg-white"
                >
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${fill * 100}%`,
                      background:
                        fill > 0.6
                          ? "rgba(217,122,92,0.85)"
                          : fill > 0.3
                          ? "rgba(217,122,92,0.4)"
                          : "rgba(0,0,0,0.06)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-1.5 text-[8.5px] font-mono text-fg-muted">
                    {col.label}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function MapGraphViz() {
  // Center: You; satellites with thin lines
  const you = { x: 50, y: 50, label: "You", primary: true };
  const nodes = [
    { x: 50, y: 12, label: "v3 launch", note: "Project" },
    { x: 12, y: 38, label: "Mei", note: "Person" },
    { x: 88, y: 38, label: "Cursor", note: "Tool" },
    { x: 28, y: 84, label: "Friday", note: "Deadline" },
    { x: 72, y: 84, label: "P-2", note: "Person" },
  ];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-muted">
          THE MAP
        </span>
        <span className="text-[9.5px] text-fg-dim">9 entities · 14 relations</span>
      </div>
      <div className="relative aspect-[4/3] w-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {nodes.map((n, i) => (
            <line
              key={i}
              x1={you.x}
              y1={you.y}
              x2={n.x}
              y2={n.y}
              stroke="#d97a5c"
              strokeOpacity="0.35"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.2"
            />
          ))}
        </svg>
        {/* You (center) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${you.x}%`, top: `${you.y}%` }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="h-11 w-11 rounded-full border-2 border-accent bg-white shadow-sm" />
            <div className="text-[10px] font-semibold text-fg">{you.label}</div>
          </div>
        </div>
        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="rounded-md border border-border-subtle bg-white px-2 py-1 shadow-sm">
                <div className="text-[10.5px] font-medium text-fg">{n.label}</div>
              </div>
              <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-dim">
                {n.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TellRadarViz() {
  // 5 axes around a center
  const axes = [
    { name: "Concise", value: 0.92 },
    { name: "Direct", value: 0.85 },
    { name: "Casual", value: 0.7 },
    { name: "No-emoji", value: 0.95 },
    { name: "Long-form", value: 0.25 },
  ];
  const cx = 50;
  const cy = 50;
  const r = 38;
  const angle = (i: number) => (i / axes.length) * Math.PI * 2 - Math.PI / 2;
  const point = (i: number, v: number) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v] as const;
  };
  const polygon = axes.map((a, i) => point(i, a.value).join(",")).join(" ");
  // Concentric grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-muted">
          THE TELL
        </span>
        <span className="text-[9.5px] text-fg-dim">detected from 142 replies</span>
      </div>
      <div className="relative aspect-[4/3] w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {/* Grid rings */}
          {rings.map((ring) => (
            <polygon
              key={ring}
              points={axes
                .map((_, i) => point(i, ring).join(","))
                .join(" ")}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="0.3"
            />
          ))}
          {/* Axes */}
          {axes.map((_a, i) => {
            const [x, y] = point(i, 1);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="0.3"
              />
            );
          })}
          {/* Filled polygon */}
          <polygon
            points={polygon}
            fill="rgba(217,122,92,0.22)"
            stroke="#d97a5c"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </svg>
        {/* Labels */}
        {axes.map((a, i) => {
          const [x, y] = point(i, 1.15);
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-[9.5px] font-medium text-fg-muted"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {a.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FadeViz() {
  // 5 memory items with fading opacity
  const items = [
    { text: "Reviewed pull request with Mei", opacity: 1, age: "Now" },
    { text: "v3 launch copy draft", opacity: 0.7, age: "1 day" },
    { text: "Pricing tier for Pro", opacity: 0.45, age: "4 days" },
    { text: "Standup notes — Aug 12", opacity: 0.25, age: "2 weeks" },
    { text: "Old debug session", opacity: 0.1, age: "1 month" },
  ];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-muted">
          FADE
        </span>
        <span className="text-[9.5px] text-fg-dim">time →</span>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md border border-border-subtle bg-white px-3 py-2"
            style={{ opacity: 0.35 + it.opacity * 0.65 }}
          >
            <div
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: `rgba(217,122,92,${it.opacity})`,
              }}
            />
            <div className="flex-1 text-[11.5px] text-fg" style={{ opacity: it.opacity }}>
              {it.text}
            </div>
            <div className="font-mono text-[9.5px] text-fg-dim">{it.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- install --------------------------------- */

function Install({ lang }: { lang: Lang }) {
  const t = dict[lang].install;
  return (
    <section id="install" className="border-t border-border-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
            {t.tag}
          </div>
          <h2 className="text-balance text-display-2 text-fg">{t.title}</h2>
          <p className="mt-5 text-[15.5px] leading-[1.6] text-fg-muted">{t.body}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
          <InstallCard
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M3 8h18" />
                <circle cx="6" cy="6" r="0.6" fill="currentColor" />
                <circle cx="8" cy="6" r="0.6" fill="currentColor" />
              </svg>
            }
            title={t.claude.title}
            body={t.claude.body}
            steps={t.claude.steps}
            code={JSON.stringify(
              {
                mcpServers: {
                  continuum: {
                    command: "npx",
                    args: ["-y", "@continuum/mcp-server"],
                  },
                },
              },
              null,
              2,
            )}
            codeLabel={t.claude.codeLabel}
          />
          <InstallCard
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 9l-4 3 4 3" />
                <path d="M16 9l4 3-4 3" />
                <path d="M14 6l-4 12" />
              </svg>
            }
            title={t.others.title}
            body={t.others.body}
            steps={t.others.steps}
            code={JSON.stringify(
              {
                mcpServers: {
                  continuum: {
                    command: "npx",
                    args: ["-y", "@continuum/mcp-server"],
                  },
                },
              },
              null,
              2,
            )}
            codeLabel={t.others.codeLabel}
          />
        </div>
      </div>
    </section>
  );
}

function InstallCard({
  icon,
  title,
  body,
  steps,
  code,
  codeLabel,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  steps: string[];
  code: string;
  codeLabel: string;
}) {
  return (
    <div className="reveal flex flex-col rounded-2xl border border-border-subtle bg-white p-7 shadow-apple-1 md:p-8">
      <div className="mb-4 flex items-center gap-2.5 text-fg">
        <span className="text-accent">{icon}</span>
        <h3 className="text-[19px] font-semibold tracking-[-0.005em]">{title}</h3>
      </div>
      <p className="mb-5 text-[14.5px] leading-[1.65] text-fg-muted">{body}</p>
      <ol className="mb-6 space-y-2 text-[14px] leading-[1.55] text-fg">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-[11px] text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-auto">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
          {codeLabel}
        </div>
        <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-[#1A1B1E] p-4 font-mono text-[12px] leading-[1.55] text-[#E8E8EA]">
{code}
        </pre>
      </div>
    </div>
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

        <div className="reveal mx-auto mt-16 grid max-w-5xl items-stretch gap-5 md:grid-cols-3 md:gap-4">
          {t.tiers.map((tier) => {
            const isPro = tier.name === "Pro";
            return (
              <div
                key={tier.name}
                className={`reveal group relative flex flex-col rounded-2xl border bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-apple-3 ${
                  isPro
                    ? "border-accent/40 shadow-apple-2 md:scale-[1.03]"
                    : "border-border-subtle shadow-apple-1"
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
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
                      <span
                        className={`mt-[9px] inline-block h-1 w-1 flex-none rounded-full ${
                          isPro ? "bg-accent" : "bg-fg-dim"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={GITHUB_URL}
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-full text-[14px] font-medium transition-all active:scale-[0.97] ${
                    isPro
                      ? "bg-accent text-white hover:bg-accent-deep shadow-[0_2px_8px_rgba(217,122,92,0.25)]"
                      : tier.name === "Hobby"
                      ? "bg-fg text-bg hover:bg-fg/90"
                      : "border border-border-subtle text-fg hover:bg-fg/[0.04]"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
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
        <PromoStrip lang={lang} />
        <Nav lang={lang} setLang={setLang} />
        <Manifesto lang={lang} />
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <PromoStrip lang={lang} />
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Pain lang={lang} />
      <Features lang={lang} />
      <Install lang={lang} />
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
