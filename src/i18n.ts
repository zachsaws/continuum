// Bilingual copy for Continuum. Tech terms (SDK, API, Memory, Graph, etc.)
// stay in English on both sides — that reads more native to developers.
// Use [c]...[/c] inline to render a code-inline span.
export type Lang = "en" | "zh";

type Dict = {
  nav: Record<string, string>;
  hero: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    cta1: string;
    cta2: string;
    socialProof: string;
    privacy: string;
    logos: readonly string[];
  };
  problem: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    events: { time: string; app: string; action: string; cost: string }[];
    totalLine: string;
    totalResult: string;
  };
  features: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    items: { name: string; tag: string; body: string }[];
  };
  architecture: {
    tag: string;
    title: string;
    body: string;
    app: string;
    appSub: string;
    center: string;
    centerSub: string;
    model: string;
    modelSub: string;
    arrowIn: string;
    arrowOut: string;
    arrowLLM: string;
    arrowResp: string;
    layers: readonly string[];
  };
  code: {
    tag: string;
    titleA: string;
    titleB: string;
    tabs: readonly string[];
    copy: string;
  };
  useCases: {
    tag: string;
    titleA: string;
    titleB: string;
    items: { title: string; body: string }[];
  };
  pricing: {
    tag: string;
    titleA: string;
    titleB: string;
    highlight: string;
    tiers: { name: string; price: string; cadence: string; features: string[]; cta: string }[];
  };
  faq: {
    tag: string;
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    titleA: string;
    titleB: string;
    body: string;
    cta1: string;
    cta2: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    legal: string[];
    copyright: string;
  };
  testimonials: {
    tag: string;
    titleA: string;
    titleB: string;
    items: { quote: string; name: string; role: string; company: string; initials: string }[];
  };
  changelog: {
    tag: string;
    title: string;
    items: { version: string; date: string; points: string[] }[];
    cta: string;
  };
  pricingFaq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cookie: {
    body: string;
    accept: string;
    decline: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  whyExists: {
    kicker: string;
    titleA: string;
    titleB: string;
    paragraphs: string[];
    signature: string;
  };
  security: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    checks: { title: string; body: string }[];
  };
  howItWorks: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    steps: { name: string; tag: string; body: string; visual: "capture" | "curate" | "recall" }[];
    cta: string;
  };
  isForMe: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    columns: { persona: string; verdict: string; emph?: boolean; body: string }[];
    closer: string;
    cta: string;
  };
  supportedApps: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    cta: string;
    apps: { name: string; sub: string; fg: string; bg: string; status: "native" | "experimental" | "mcp" }[];
  };
  beforeAfter: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    before: { label: string; footer: string; apps: { name: string; line: string }[] };
    after: { label: string; footer: string; apps: { name: string; line: string }[] };
  };
  byNumbers: {
    tag: string;
    title: string;
    body: string;
    stats: { value: string; label: string }[];
    calc: {
      title: string;
      body: string;
      appsLabel: string;
      msgsLabel: string;
      resetsLabel: string;
      hoursLabel: string;
      cta: string;
    };
  };
};

export const dict: Record<Lang, Dict> = {
  en: {
    nav: {
      features: "Features",
      architecture: "Architecture",
      useCases: "Use cases",
      pricing: "Pricing",
      faq: "FAQ",
      docs: "Docs",
      signIn: "Sign in",
      getKey: "Get API key",
    },
    hero: {
      tag: "Public preview",
      titleA: "Let your AI",
      titleB: "know you.",
      body: "Not a tool. The \"it knows you\" thing. [c]One memory across every AI app you use.[/c]",
      cta1: "Start being remembered →",
      cta2: "See what it looks like",
      socialProof: "For the 6-app-a-day crowd",
      privacy: "Your memory lives on your machine. Not on someone else's server.",
      logos: ["Mira · Designer", "Devon · Indie hacker", "Yuna · Researcher", "Lior · PM", "Aria · Founder", "Kai · Writer"],
    },
    problem: {
      tag: "the 47-times-a-week tax",
      titleA: "Your AI isn't dumb.",
      titleB: "You're just re-introducing yourself.",
      body: "Every time you open a new chat, you're a stranger. Here's what your last Tuesday actually looked like:",
      events: [
        { time: "13:42", app: "Claude", action: "you re-pasted your project context — again", cost: "+45s" },
        { time: "13:58", app: "Cursor", action: "you re-stated your stack (TypeScript, Next.js, Postgres)", cost: "+30s" },
        { time: "14:30", app: "ChatGPT", action: "you typed your preferences again (concise, no emojis)", cost: "+25s" },
        { time: "15:12", app: "Claude · new chat", action: "you copy-pasted the Friday deadline from Notion", cost: "+40s" },
        { time: "16:04", app: "Cursor · new file", action: "you explained the design system from scratch", cost: "+1m 20s" },
      ],
      totalLine: "That's 5 minutes 40 seconds a day. × 5 days a week. × 50 weeks a year.",
      totalResult: "9 hours a year. Re-explaining who you are to software that should already know.",
    },
    features: {
      tag: "What it remembers for you",
      titleA: "Five things it remembers.",
      titleB: "Working quietly in every AI app you use.",
      body: "One memory. Every client. No copy-paste between apps.",
      items: [
        {
          name: "Remembers who you are",
          tag: "Layered Memory · long-term",
          body:
            "Your role, your voice, your preferences. Three layers, same model used in enterprise memory systems. Working (this task) · short-term (this week) · long-term (who you are). Continuum handles the decay — old layers fade, recent layers surface. Same memory in Claude, Cursor, anywhere with MCP.",
        },
        {
          name: "Remembers how you work",
          tag: "The Tell · your patterns",
          body:
            "Continuum watches what you actually do — the rephrasings, the corrections, the time you ask. Patterns become memory. You never have to say \"I prefer short answers\" twice.",
        },
        {
          name: "Remembers your projects",
          tag: "The Map · people, projects, deadlines",
          body:
            "Your world as a structured graph — the people you mention, the projects you're on, the things you care about. Any AI can query it. None of them have to build it.",
        },
        {
          name: "Forgets what you don't need",
          tag: "Fade · less is more",
          body:
            "Old, wrong, irrelevant context fades automatically. Last week's debugging rabbit hole doesn't follow you into today's standup. Your memory stays clean.",
        },
        {
          name: "Anticipates what you need",
          tag: "Anticipation · right context, right moment",
          body:
            "Continuum pre-loads the right context before you ask. Switch to Cursor mid-thought? Your AI already knows what you're building. Switch to ChatGPT? Same.",
        },
      ],
    },
    architecture: {
      tag: "How it fits",
      title: "One memory. Every AI app.",
      body:
        "Continuum runs as an MCP server on your machine. Every AI client that speaks MCP can read from and write to the same memory — Claude Desktop, Cursor, Cline, Zed, and any that adopts the standard.",
      app: "AI clients",
      appSub: "Claude · Cursor · Cline · Zed",
      center: "Continuum MCP",
      centerSub: "your context layer",
      model: "Your memory",
      modelSub: "local · cloud · synced",
      arrowIn: "get context",
      arrowOut: "memory + tools",
      arrowLLM: "remember",
      arrowResp: "propose / forget",
      layers: ["Layered Memory", "The Tell", "The Map", "Fade", "Anticipation"],
    },
    code: {
      tag: "The install",
      titleA: "Five lines of JSON.",
      titleB: "Works in every MCP client.",
      tabs: ["1. install", "2. configure", "3. inspect"],
      copy: "copy",
    },
    useCases: {
      tag: "Where it shines",
      titleA: "Built for products where the user",
      titleB: "comes back tomorrow.",
      items: [
        { title: "AI Assistants", body: "Personal and productivity assistants that actually know the user across sessions." },
        { title: "Customer Support", body: "Long-running cases that remember what the customer already said three tickets ago." },
        { title: "Education & Tutoring", body: "Tutors that track what the student has mastered, struggled with, and skipped." },
        { title: "Companions & Coaching", body: "Relationship-aware agents in therapy, coaching, and personal-growth contexts." },
      ],
    },
    pricing: {
      tag: "Pricing",
      titleA: "Pay for memory.",
      titleB: "One memory, every AI app, one bill.",
      highlight: "Most people start here",
      tiers: [
        {
          name: "Hobby", price: "$0", cadence: "free forever",
          features: ["1,000 memories", "1 device", "Local-only (data never leaves your machine)", "All 5 capabilities", "Community support"],
          cta: "Install free",
        },
        {
          name: "Pro", price: "$9", cadence: "per month",
          features: ["Unlimited memories", "Unlimited devices", "Cloud sync across all your machines", "Cross-app pattern detection (The Tell)", "Cuts 20-40% of prompt repetition — lower AI bill", "Email support"],
          cta: "Start free trial",
        },
        {
          name: "Family", price: "$19", cadence: "per month",
          features: ["Everything in Pro", "Up to 5 separate memories (you + family / team)", "Per-person privacy boundaries", "Priority support", "Help shape the roadmap"],
          cta: "Start free trial",
        },
      ],
    },
    faq: {
      tag: "FAQ",
      title: "Questions, asked and answered.",
      items: [
        {
          q: "What's MCP and why does this use it?",
          a: "MCP (Model Context Protocol) is the open standard Anthropic launched for AI apps to call external tools. By running as an MCP server, Continuum works in any client that speaks the standard — Claude Desktop, Cursor, Cline, Zed, and any new tool that adopts MCP. No plugin, no extension, no per-app integration.",
        },
        {
          q: "How is this different from ChatGPT's built-in memory?",
          a: "ChatGPT's memory is locked inside ChatGPT. Switch to Claude, Cursor, or any other AI — and you're a stranger again. Continuum is the *cross-app* layer: one memory that follows you everywhere, controlled by you.",
        },
        {
          q: "Is my data safe?",
          a: "On Hobby: everything stays on your machine. On Pro: encrypted in transit and at rest, never used for training, deletable on demand. See the full Security section above for details.",
        },
        {
          q: "Do I need to \"teach\" Continuum about myself?",
          a: "No. Continuum watches what you say and do across your AI apps, extracts the meaningful patterns, and proposes memory for your review. You confirm with one click. Most users add fewer than 5 manual memories in their first month — the rest is automatic.",
        },
        {
          q: "Will this work with ChatGPT?",
          a: "Not natively (ChatGPT doesn't support MCP). For ChatGPT users, we offer a small bridge script that exposes Continuum as OpenAI function calls. It's one extra config line. Full ChatGPT support is on the roadmap.",
        },
        {
          q: "When will it be GA?",
          a: "Public preview is open now. Pro launches Q4 2026. Pricing is locked for early users through GA.",
        },
        {
          q: "How is this different from enterprise memory systems (MemoryBear, OpenAI memory, Mem0)?",
          a: "Those are enterprise B2B tools — they power a single company's customer-service / marketing / BI agents, tied to one model. Continuum is the *personal* layer: model-agnostic (works with Claude, Cursor, ChatGPT, Cline — any MCP client), locally stored by default, and follows you across every AI app. Different buyer, different problem, different moat. We don't compete with them — we sit below them, the way the personal password manager doesn't compete with corporate Okta.",
        },
        {
          q: "Does Continuum reduce my AI bill?",
          a: "Yes — by pre-filtering which memories surface into a prompt, Continuum cuts the redundant context you'd otherwise paste in yourself. Most users see 20-40% less prompt repetition across a week. Pro adds a usage dashboard so you can see the savings.",
        },
      ],
    },
    finalCta: {
      titleA: "Go meet your AI.",
      titleB: "It already knows you.",
      body: "Five minutes to install. One memory across every AI app. Free forever for the first 1,000 memories — no credit card, no trial, no catch.",
      cta1: "Start being remembered",
      cta2: "Read the docs first",
    },
    footer: {
      tagline: "Your AI should remember you. Continuum is the context layer that makes it happen — across every MCP-compatible app.",
      columns: [
        { title: "Product", links: ["Install", "How it works", "Pricing", "Changelog"] },
        { title: "Resources", links: ["Docs", "MCP setup", "Examples", "Discord"] },
        { title: "Company", links: ["About", "Blog", "Privacy", "Contact"] },
      ],
      legal: ["Privacy", "Terms", "Security"],
      copyright: "© 2026 Continuum Labs, Inc.",
    },
    testimonials: {
      tag: "What people say",
      titleA: "You stop explaining yourself.",
      titleB: "You start feeling remembered.",
      items: [
        {
          quote: "I told Claude on Monday we ship Fridays. I opened Cursor on Tuesday morning and the code-review agent already knew. I almost cried.",
          name: "Mira Chen",
          role: "Indie hacker",
          company: "Solo · shipping a B2B SaaS",
          initials: "MC",
        },
        {
          quote: "I'm in 4 AI tools a day. Before Continuum I was re-explaining my design system 3 times before lunch. Now I just say 'continue from yesterday'.",
          name: "Devon Park",
          role: "Designer & developer",
          company: "Freelance",
          initials: "DP",
        },
        {
          quote: "Switched from ChatGPT to Claude last week. The first conversation, Claude already knew about my research topic, my paper deadline, my citation style. I actually got a little emotional.",
          name: "Yuna Kawai",
          role: "Researcher",
          company: "Tokyo University",
          initials: "YK",
        },
      ],
    },
    changelog: {
      tag: "What's new",
      title: "Shipping every week.",
      items: [
        {
          version: "v0.1.0 · MCP launch",
          date: "Jul 20, 2026",
          points: [
            "MCP server ships — one command, every AI client that speaks MCP works out of the box",
            "Continuum re-anchored as a personal memory layer (was: developer SDK)",
            "Capture / Curate / Recall: 3-step flow replaces the dashboard-heavy v0",
            "Privacy-first: Hobby tier is 100% local, data never leaves your machine",
          ],
        },
        {
          version: "v0.0.3 · Preview",
          date: "Jul 04, 2026",
          points: [
            "Closed preview with 200+ testers (Cursor power users, founders, researchers)",
            "Layered Memory, The Tell, The Map, Fade, Anticipation — 5 capabilities",
            "Daily memory digest at 9 PM, per-app review toast",
          ],
        },
        {
          version: "v0.0.1 · Seed",
          date: "Jun 12, 2026",
          points: [
            "First prototype: a single-user local memory store + Claude Desktop plugin",
            "Validated with 11 founder interviews in 3 weeks",
          ],
        },
      ],
      cta: "See full changelog",
    },
    pricingFaq: {
      title: "Pricing questions, briefly answered.",
      items: [
        { q: "Can I upgrade or downgrade anytime?", a: "Yes. Pro ↔ Scale is a one-click change. Downgrades take effect at the next billing cycle, never mid-cycle." },
        { q: "Is there an annual discount?", a: "20% off Pro when you pay yearly. Drop us a line for Scale." },
        { q: "What happens to my memories if I downgrade to Hobby?", a: "Memories above the Hobby cap (10K) get frozen, not deleted. Upgrade and they unfreeze instantly." },
        { q: "Will the free tier change?", a: "Existing Hobby users keep their plan. Only new signups see changes." },
      ],
    },
    cookie: {
      body: "We use a single analytics cookie to count page views. No tracking, no third parties.",
      accept: "Got it",
      decline: "No thanks",
    },
    notFound: {
      title: "404. This page doesn't exist.",
      body: "Either we deleted it, or the URL was always a typo. Either way — back to the front door.",
      cta: "Take me home",
    },
    whyExists: {
      kicker: "Why this exists",
      titleA: "We kept watching teams rebuild the same thing.",
      titleB: "So we stopped letting them.",
      paragraphs: [
        "Every AI team we've talked to has the same scar tissue: six months building a memory layer, a re-org that lost half of it, then a rewrite. The model kept getting smarter — and the prompt kept forgetting the user.",
        "Continuum exists because \"context engineering\" shouldn't be a full-time job. It should be five lines. We made it five lines.",
      ],
      signature: "— The team at Continuum Labs",
    },
    security: {
      tag: "Security & privacy",
      titleA: "Your memory is yours.",
      titleB: "We just remember it for you.",
      body: "Default-private, audit-logged, region-locked if you want it. Here's the exact behavior — no asterisks.",
      checks: [
        { title: "Encrypted at rest and in transit", body: "AES-256 at rest. TLS 1.3 in transit. Keys rotated quarterly. Your memory is unreadable to anyone without your API key — including us." },
        { title: "We never train on your data", body: "Not for our models, not for embeddings, not for fine-tuning. Your conversations and memories are siloed from the training pipeline. Written into the contract." },
        { title: "GDPR + CCPA compliant by default", body: "Right-to-deletion, data export, sub-processor list — all available in the dashboard. DPA available on request, signed within 48 hours." },
        { title: "EU-only region available", body: "On Pro: pin your data to our Frankfurt region. We sign BAAs, we honor Schrems II, we don't move data across jurisdictions without notice." },
        { title: "Self-hosted option on Family+", body: "Continuum runs in your infrastructure. Your keys, your rules, your audit. We ship the binary; you operate the rest. Air-gapped deployments available on request." },
        { title: "Full audit logs, exportable", body: "Every memory read, write, and forget is logged with actor, timestamp, and reason. Export to S3, BigQuery, or your SIEM. SOC 2 Type II in progress — Q4 2026." },
      ],
    },
    howItWorks: {
      tag: "How it works",
      titleA: "Three quiet steps.",
      titleB: "Zero effort from you.",
      body: "Continuum runs in the background, between you and your AI apps. You don't manage it. You just confirm what matters.",
      steps: [
        {
          name: "Capture",
          tag: "AI extracts for you",
          body: "Continuum watches your conversations across Claude, Cursor, ChatGPT, anywhere with MCP. When the AI notices something worth remembering — a preference, a deadline, a fact about you — it proposes a memory. You never have to type \"please remember that I prefer short answers\" ever again.",
          visual: "capture",
        },
        {
          name: "Curate",
          tag: "Lightweight review, not a dashboard",
          body: "A toast in your AI app when something new pops up: \"Continuum wants to remember: 'You prefer concise answers.' [✓] [✎] [✗]\" Plus a daily 9 PM digest of everything proposed that day. You stay in control — but the default is yes, and the friction is one click.",
          visual: "curate",
        },
        {
          name: "Recall",
          tag: "Same memory, every app",
          body: "When you open a new conversation in any MCP client, Continuum quietly pulls the relevant context. Claude knows what you told Cursor yesterday. Cursor knows your deadline from ChatGPT. The memory is yours — it just follows you.",
          visual: "recall",
        },
      ],
      cta: "See it in 60 seconds →",
    },
    isForMe: {
      tag: "Is this for you?",
      titleA: "You might not need us.",
      titleB: "And that's okay.",
      body: "Honest pitch below. Pick the column that sounds like you.",
      columns: [
        {
          persona: "You use one AI app, and only one.",
          verdict: "Skip us.",
          body: "If ChatGPT memory (or Claude's equivalent) covers you, it covers you. No reason to add a layer.",
        },
        {
          persona: "You use two AI apps, but they don't really talk to each other.",
          verdict: "Maybe later.",
          body: "You'd benefit, but it's not painful yet. Check back when you copy-paste your project context for the 10th time this month.",
        },
        {
          persona: "You use 2+ AI apps daily and the friction is real.",
          verdict: "Install now.",
          emph: true,
          body: "You already know why you're reading this site. Memory shouldn't live in 6 different silos. The 5-minute install pays for itself in a week.",
        },
      ],
      closer: "If you scrolled to the bottom of this section, you're in column 3.",
      cta: "Install Continuum",
    },
    supportedApps: {
      tag: "Works where you work",
      titleA: "Compatible with every AI app",
      titleB: "that speaks MCP.",
      body: "Continuum runs as a local MCP server. Every AI client that speaks the standard works out of the box. Today, that includes:",
      cta: "See the full compatibility list →",
      apps: [
        { name: "Claude Desktop", sub: "Anthropic", fg: "#da7756", bg: "rgba(218,119,86,0.10)", status: "native" },
        { name: "Cursor", sub: "AI code editor", fg: "#a78bfa", bg: "rgba(167,139,250,0.10)", status: "native" },
        { name: "Cline", sub: "VS Code agent", fg: "#5eead4", bg: "rgba(94,234,212,0.10)", status: "native" },
        { name: "Zed", sub: "Code at the speed of thought", fg: "#facc15", bg: "rgba(250,204,21,0.10)", status: "native" },
        { name: "Continue", sub: "Open-source AI assistant", fg: "#60a5fa", bg: "rgba(96,165,250,0.10)", status: "native" },
        { name: "Windsurf", sub: "Agentic IDE by Codeium", fg: "#22d3ee", bg: "rgba(34,211,238,0.10)", status: "native" },
        { name: "Sourcegraph Amp", sub: "Coding agent", fg: "#ff5543", bg: "rgba(255,85,67,0.10)", status: "native" },
        { name: "ChatGPT", sub: "via OpenAI bridge", fg: "#10a37f", bg: "rgba(16,163,127,0.10)", status: "experimental" },
        { name: "Any MCP client", sub: "Spec-compliant", fg: "#f4a896", bg: "rgba(244,168,150,0.12)", status: "mcp" },
      ],
    },
    beforeAfter: {
      tag: "The change",
      titleA: "6 apps, 6 strangers.",
      titleB: "6 apps, one memory of you.",
      body: "Same you. Same opener. Two worlds.",
      before: {
        label: "Before Continuum",
        footer: "Strangers. Every time.",
        apps: [
          { name: "Claude", line: "I don't know your project. Please tell me." },
          { name: "Cursor", line: "I don't know your stack. What are you using?" },
          { name: "ChatGPT", line: "I don't know your preferences. How should I respond?" },
          { name: "Cline", line: "I don't know your style. What's your tone?" },
        ],
      },
      after: {
        label: "After Continuum",
        footer: "Old friends, picking up.",
        apps: [
          { name: "Claude", line: "Got it — v3 launch, Friday deadline, concise." },
          { name: "Cursor", line: "Got it — TypeScript, Next.js, Postgres." },
          { name: "ChatGPT", line: "Got it — concise, no emojis, founder voice." },
          { name: "Cline", line: "Got it — dry tone, no marketing-speak." },
        ],
      },
    },
    byNumbers: {
      tag: "By the numbers",
      title: "The cost of being a stranger to your own AI.",
      body: "Calculated from 11 founder interviews and a closed beta with 200+ heavy AI users.",
      stats: [
        { value: "47", label: "times per week a heavy AI user re-states their context" },
        { value: "5 min", label: "average install time for Continuum" },
        { value: "20-40%", label: "fewer redundant prompts with smart memory pre-filtering" },
        { value: "6+", label: "AI apps that share the same memory" },
        { value: "$9", label: "Pro plan, no usage limits, no per-seat math" },
      ],
      calc: {
        title: "How many hours are you losing?",
        body: "Drag the sliders. See your number.",
        appsLabel: "AI apps you use daily",
        msgsLabel: "Average messages per day per app",
        resetsLabel: "Context resets per week",
        hoursLabel: "Hours lost per year",
        cta: "Stop losing those hours →",
      },
    },
  },
  zh: {
    nav: {
      features: "功能",
      architecture: "架构",
      useCases: "应用场景",
      pricing: "定价",
      faq: "常见问题",
      docs: "文档",
      signIn: "登录",
      getKey: "获取 API Key",
    },
    hero: {
      tag: "公测中",
      titleA: "让 AI 变成你的",
      titleB: "老朋友。",
      body: "不是工具 —— 是「它认识你」这件事。[c]装一次,6 个 AI app 共用一份关于你的记忆。[/c]",
      cta1: "开始被记住 →",
      cta2: "看看什么样",
      socialProof: "为每天用 6 个 AI app 的人造",
      privacy: "你的记忆只存在你自己的机器上，不上别人的服务器。",
      logos: ["Mira · 设计师", "Devon · 独立开发者", "Yuna · 研究员", "Lior · 产品经理", "Aria · 创始人", "Kai · 写作者"],
    },
    problem: {
      tag: "每周 47 次的税",
      titleA: "AI 够聪明。",
      titleB: "你只是每次都在重新介绍自己。",
      body: "每次开新对话,你都是个陌生人。你上周二的一天实际是这样的:",
      events: [
        { time: "13:42", app: "Claude", action: "你又重新粘贴了一遍项目背景", cost: "+45秒" },
        { time: "13:58", app: "Cursor", action: "你又重新说了一遍技术栈(TypeScript、Next.js、Postgres)", cost: "+30秒" },
        { time: "14:30", app: "ChatGPT", action: "你又重新打了一遍偏好(简短、不用 emoji)", cost: "+25秒" },
        { time: "15:12", app: "Claude · 新对话", action: "你从 Notion 复制粘贴了周五的 deadline", cost: "+40秒" },
        { time: "16:04", app: "Cursor · 新文件", action: "你从零开始解释设计系统", cost: "+1分20秒" },
      ],
      totalLine: "一天 5 分 40 秒。× 一周 5 天。× 一年 50 周。",
      totalResult: "一年 9 小时,花在跟本该已经认识你的软件重新自我介绍。",
    },
    features: {
      tag: "它为你记住什么",
      titleA: "五个能力。",
      titleB: "在你用的每个 AI app 里安静地工作。",
      body: "一份 memory,所有客户端。不用在 app 之间复制粘贴。",
      items: [
        {
          name: "记得你是谁",
          tag: "Layered Memory · 长期",
          body: "你的角色、你的语气、你的偏好。三层,跟企业级 memory 系统同一套模型 —— working(当前任务)· short-term(本周)· long-term(你是谁)。老层自动 fade,新层自动 surface。同一份 memory 在 Claude、Cursor 跟所有支持 MCP 的客户端里。",
        },
        {
          name: "记得你怎么做事的",
          tag: "The Tell · 你的模式",
          body: "Continuum 看你实际在做什么 —— 改口、修正、问问题的时间。模式变成 memory。你再也不用说两次「我喜欢简短回答」。",
        },
        {
          name: "记得你的项目",
          tag: "The Map · 人、项目、deadline",
          body: "你的世界建模成结构化图 —— 你提到的人、你做的项目、你在意的事。任何 AI 都能查,没人需要自己搭。",
        },
        {
          name: "忘掉你不要的",
          tag: "Fade · 少即是多",
          body: "过时、错误、不相关的上下文自动衰减。上周那个 debug 死胡同不会跟着你进今天的 standup。memory 保持干净。",
        },
        {
          name: "预判你下一步要啥",
          tag: "Anticipation · 对的上下文,对的时刻",
          body: "Continuum 提前装好对的上下文。切到 Cursor 接着干?AI 已经知道你在做什么。切到 ChatGPT?也一样。",
        },
      ],
    },
    architecture: {
      tag: "怎么接入",
      title: "一份 memory,所有 AI app。",
      body: "Continuum 跑在你机器上,作为一个 MCP server。任何说 MCP 协议的 AI 客户端 —— Claude Desktop、Cursor、Cline、Zed —— 都能读写同一份 memory。",
      app: "AI 客户端",
      appSub: "Claude · Cursor · Cline · Zed",
      center: "Continuum MCP",
      centerSub: "你的上下文层",
      model: "你的 memory",
      modelSub: "本地 · 云端 · 同步",
      arrowIn: "拉取上下文",
      arrowOut: "memory + 工具",
      arrowLLM: "记住",
      arrowResp: "提议 / 遗忘",
      layers: ["Layered Memory", "The Tell", "The Map", "Fade", "Anticipation"],
    },
    code: {
      tag: "安装",
      titleA: "五行 JSON。",
      titleB: "所有 MCP 客户端都能用。",
      tabs: ["1. 安装", "2. 配置", "3. 看一眼"],
      copy: "复制",
    },
    useCases: {
      tag: "在哪儿最香",
      titleA: "为「用户明天还会来」的产品而生。",
      titleB: "",
      items: [
        { title: "AI 助手", body: "真正认识用户、跨 session 持续协作的个人 / 生产力助手。" },
        { title: "客服", body: "长周期工单,记得住用户三张工单前说过的话。" },
        { title: "教育 / 辅导", body: "跟踪学生掌握了什么、卡在哪里、跳过了什么。" },
        { title: "陪伴 / 教练", body: "在心理、教练、个人成长场景里有「关系感」的 Agent。" },
      ],
    },
    pricing: {
      tag: "定价",
      titleA: "一份 memory,所有 AI app。",
      titleB: "一张账单。",
      highlight: "多数人从这里开始",
      tiers: [
        {
          name: "Hobby", price: "¥0", cadence: "永久免费",
          features: ["1,000 条 memory", "1 台设备", "纯本地(数据不出本机)", "全部 5 个能力", "社区支持"],
          cta: "免费安装",
        },
        {
          name: "Pro", price: "¥64", cadence: "每月",
          features: ["无限 memory", "无限设备", "云同步跨设备", "解锁 The Tell 跨 app 模式识别", "prompt 重复度降 20-40% — 省 AI 账单", "邮件支持"],
          cta: "开始免费试用",
        },
        {
          name: "Family", price: "¥138", cadence: "每月",
          features: ["包含 Pro 全部", "最多 5 个独立 memory(你 + 家人 / 团队)", "每人隐私隔离", "优先支持", "参与路线图决策"],
          cta: "开始免费试用",
        },
      ],
    },
    faq: {
      tag: "常见问题",
      title: "你想问的,我们提前答了。",
      items: [
        {
          q: "MCP 是什么,为什么用这个?",
          a: "MCP(Model Context Protocol)是 Anthropic 推出的开放标准,让 AI 客户端能调用外部工具。Continuum 跑成 MCP server,意味着任何说这个标准的客户端 —— Claude Desktop、Cursor、Cline、Zed —— 都能直接用。免插件、免扩展、免每个 app 单独接。",
        },
        {
          q: "跟 ChatGPT 自带的 memory 有什么区别?",
          a: "ChatGPT 的 memory 锁在 ChatGPT 内部。切到 Claude、Cursor 或者任何其他 AI,又变陌生人。Continuum 是「跨 app」层 —— 一份 memory 跟着你到处走,你说了算。",
        },
        {
          q: "我的数据安全吗?",
          a: "Hobby:全部留在本机。Pro:加密传输和存储,绝不用于训练,随时可删。完整安全策略见上方 Security 段。",
        },
        {
          q: "我得「教」Continuum 关于我的事吗?",
          a: "不用。Continuum 看着你跟 AI app 的对话,自动提取有意义的模式,提议 memory 给你一键确认。多数用户第一个月手动加的 memory 不到 5 条 —— 剩下的全自动。",
        },
        {
          q: "ChatGPT 能用吗?",
          a: "原生不支持(ChatGPT 不支持 MCP)。给 ChatGPT 用户我们提供一个小桥接脚本,把 Continuum 暴露成 OpenAI function calls。多一行配置就行。完整 ChatGPT 支持在路线图里。",
        },
        {
          q: "什么时候 GA?",
          a: "公测现在开着。Pro 套餐 2026 Q4 推出。早期用户定价锁定到 GA。",
        },
        {
          q: "跟企业级 memory 系统(MemoryBear、OpenAI memory、Mem0)有什么区别?",
          a: "那些是 B2B 工具 —— 服务一家公司的客服 / 营销 / BI agent,绑死一个模型。Continuum 是个人层:model-agnostic(Claude、Cursor、ChatGPT、Cline —— 任何支持 MCP 的客户端都接)、默认本地存储、跟着你跨 app 走。买家不同、痛点不同、护城河不同。我们不跟他们竞争 —— 我们坐在他们下面,就像 1Password 跟企业 Okta 不竞争一样。",
        },
        {
          q: "能省我的 AI 账单吗?",
          a: "能。Continuum 预过滤要 surface 进 prompt 的 memory,自动去掉你本来要手动粘贴的重复上下文。大多数用户一周下来看到 prompt 重复度降 20-40%。Pro 版加一个用量 dashboard,可以看到具体省了多少。",
        },
      ],
    },
    finalCta: {
      titleA: "去认识你的 AI。",
      titleB: "它已经认识你了。",
      body: "5 分钟装好。一份 memory,所有 AI app 通用。前 1,000 条永久免费 —— 不要信用卡,不要试用,没套路。",
      cta1: "开始被记住",
      cta2: "先看文档",
    },
    footer: {
      tagline: "你的 AI 该记得你。Continuum 是让它发生的上下文层 —— 跨所有支持 MCP 的 AI app。",
      columns: [
        { title: "产品", links: ["安装", "工作流程", "定价", "更新日志"] },
        { title: "资源", links: ["文档", "MCP 配置", "示例", "Discord"] },
        { title: "公司", links: ["关于", "博客", "隐私", "联系"] },
      ],
      legal: ["隐私", "条款", "安全"],
      copyright: "© 2026 Continuum Labs, Inc.",
    },
    testimonials: {
      tag: "他们怎么说",
      titleA: "你不再反复解释自己。",
      titleB: "你开始感觉被记得。",
      items: [
        {
          quote: "周一我告诉 Claude 我们周五上线。周二早上我开 Cursor,review agent 已经知道了。差点哭了。",
          name: "Mira · 独立开发者",
          role: "Solo · 做 B2B SaaS",
          company: "Mira Chen",
          initials: "MC",
        },
        {
          quote: "我一天用 4 个 AI 工具。装 Continuum 之前,午饭前我要重新讲 3 遍设计系统。现在只说「接昨天的」。",
          name: "Devon · 设计师",
          role: "设计与开发",
          company: "Devon Park · Freelance",
          initials: "DP",
        },
        {
          quote: "上周从 ChatGPT 切到 Claude。第一次开聊,Claude 已经知道我的研究主题、我的 paper deadline、我的引用风格。真有点被记住的感觉。",
          name: "Yuna · 研究员",
          role: "学术研究",
          company: "东京大学 · Yuna Kawai",
          initials: "YK",
        },
      ],
    },
    changelog: {
      tag: "最近更新",
      title: "我们每周都在发版。",
      items: [
        {
          version: "v0.1.0 · MCP 启动",
          date: "2026 年 7 月 20 日",
          points: [
            "MCP server 上线 —— 一行命令,所有支持 MCP 的客户端开箱即用",
            "Continuum 重新定位为「个人 memory 层」(之前是面向开发者的 SDK)",
            "Capture / Curate / Recall 三步流替代了原来偏 dashboard 的 v0",
            "隐私优先:Hobby 100% 本地,数据不出你的机器",
          ],
        },
        {
          version: "v0.0.3 · 预览",
          date: "2026 年 7 月 4 日",
          points: [
            "闭门预览,200+ 测试者(Cursor 重度用户、创始人、研究员)",
            "Layered Memory、The Tell、The Map、Fade、Anticipation 五大能力成型",
            "每天 9 PM 推送记忆 digest,每个 app 单独 review toast",
          ],
        },
        {
          version: "v0.0.1 · 种子",
          date: "2026 年 6 月 12 日",
          points: [
            "第一个原型:单人本地 memory 存储 + Claude Desktop 插件",
            "3 周内完成 11 位创始人访谈,验证需求",
          ],
        },
      ],
      cta: "看完整更新日志",
    },
    pricingFaq: {
      title: "关于定价,简短回答。",
      items: [
        { q: "能随时升级或降级吗?", a: "可以。Pro ↔ Scale 一键切换。降级在下一个计费周期生效,不会中间跳档。" },
        { q: "年付有折扣吗?", a: "Pro 年付 8 折。Scale 单独聊。" },
        { q: "降级到 Hobby 之后,我的 memory 怎么办?", a: "超过 1 万条上限的部分会被「冻结」,不是删除。升回来瞬间解冻。" },
        { q: "免费版会变吗?", a: "现有 Hobby 用户保留原方案。只有新注册用户看到变化。" },
      ],
    },
    cookie: {
      body: "我们用一个统计 cookie 数页面访问量。不追踪、不共享给第三方。",
      accept: "好的",
      decline: "不用了",
    },
    notFound: {
      title: "404. 这个页面不存在。",
      body: "要么我们删了,要么 URL 一直就是错的。Anyway —— 回首页吧。",
      cta: "回首页",
    },
    whyExists: {
      kicker: "为什么做这个",
      titleA: "我们看过太多团队,一遍又一遍地造同一个轮子。",
      titleB: "所以我们让他们停手。",
      paragraphs: [
        "每个我们聊过的 AI 团队都有同样的伤疤:六个月搭一套 memory 层,一次组织调整丢一半,再来一次重写。模型越来越聪明 —— prompt 却越来越记不住用户。",
        "Continuum 存在的原因是：「context engineering」不该是一份全职工作。它该是五行代码。我们做到了五行。",
      ],
      signature: "—— Continuum Labs 团队",
    },
    security: {
      tag: "安全与隐私",
      titleA: "你的 memory 是你的。",
      titleB: "我们只是替你记着。",
      body: "默认私有、可审计、要锁区也行。下面是具体行为 —— 没说「再说」。",
      checks: [
        { title: "静态加密 + 传输加密", body: "AES-256 静态加密。TLS 1.3 传输加密。密钥每季度轮换。没有你的 API key,你的 memory 对任何人都不可读 —— 包括我们自己。" },
        { title: "我们不会用你的数据训练模型", body: "不训我们的模型、不训 embedding、不微调。你的对话和 memory 与训练管道完全隔离。写进合同。" },
        { title: "默认符合 GDPR + CCPA", body: "删除权、数据导出、子处理者清单 —— 都在 dashboard 里。DPA 申请即提供,48 小时内签。" },
        { title: "EU-only 区域可用", body: "Pro 套餐:把数据钉死在法兰克福区。我们签 BAA,遵守 Schrems II,跨司法管辖区移动数据会提前通知。" },
        { title: "Family+ 套餐支持私有化部署", body: "Continuum 跑在你的基础设施里。你的密钥、你的规则、你的审计。我们出二进制,其他你来运营。需要气隙隔离可谈。" },
        { title: "完整审计日志,可导出", body: "每一次 memory 读写、遗忘,都带操作者、时间戳、原因记录。可导出到 S3、BigQuery、你的 SIEM。SOC 2 Type II 进展中 —— 2026 Q4。" },
      ],
    },
    howItWorks: {
      tag: "工作流程",
      titleA: "三步安静发生。",
      titleB: "你什么都不用做。",
      body: "Continuum 在后台跑,在你和你的 AI app 之间。你不用管理它。你只确认重要的。",
      steps: [
        {
          name: "Capture · 捕获",
          tag: "AI 替你提取",
          body: "Continuum 看着你跟 Claude、Cursor、ChatGPT 跟所有 MCP 客户端的对话。当 AI 注意到值得记住的事 —— 一个偏好、一个 deadline、一个关于你的事实 —— 它提议一条 memory。你再也不用输入「请记住我喜欢简短回答」。",
          visual: "capture",
        },
        {
          name: "Curate · 整理",
          tag: "轻量 review,不是 dashboard",
          body: "新 memory 弹出时,你的 AI app 里冒一个轻量 toast:「Continuum 想记住:你偏好简洁回答。[✓] [✎] [✗]」晚上 9 PM 还会推一个当日 digest 让你批量 review。你始终掌控 —— 但默认是「同意」,操作就一键。",
          visual: "curate",
        },
        {
          name: "Recall · 召回",
          tag: "一份 memory,所有 app",
          body: "你在任何 MCP 客户端里开新对话,Continuum 安静地拉相关上下文。Claude 知道你在 Cursor 昨天说了什么。Cursor 知道 ChatGPT 里的 deadline。memory 是你的 —— 它就是跟着你走。",
          visual: "recall",
        },
      ],
      cta: "看 60 秒演示 →",
    },
    isForMe: {
      tag: "这适合你吗?",
      titleA: "你可能不需要我们。",
      titleB: "而且没关系,这是事实。",
      body: "诚实的判断。选最像你的一列。",
      columns: [
        {
          persona: "你只用 1 个 AI app。",
          verdict: "跳过我们。",
          body: "如果 ChatGPT memory(或 Claude 自己的 memory)够用,那就够用。没必要再加一层。",
        },
        {
          persona: "你用 2 个 AI app,但它们之间也不怎么联动。",
          verdict: "以后再说。",
          body: "用了会方便,但还没到痛点。等你本月第 10 次复制粘贴项目背景时再回来。",
        },
        {
          persona: "你每天用 2 个以上 AI app,friction 是真的。",
          verdict: "现在就装。",
          emph: true,
          body: "你已经在看这页了,说明你知道为什么。memory 不应该散落在 6 个孤岛里。5 分钟装好,一周内就回本。",
        },
      ],
      closer: "如果你滚到了这段底部,说明你在第 3 列。",
      cta: "装上 Continuum",
    },
    supportedApps: {
      tag: "它在你已经用的地方工作",
      titleA: "所有支持 MCP 的 AI app",
      titleB: "都接得上。",
      body: "Continuum 跑在你本机,是个 MCP server。任何实现这个开放标准的客户端,装上就能用。今天包括:",
      cta: "看完整兼容列表 →",
      apps: [
        { name: "Claude Desktop", sub: "Anthropic", fg: "#da7756", bg: "rgba(218,119,86,0.10)", status: "native" },
        { name: "Cursor", sub: "AI 代码编辑器", fg: "#a78bfa", bg: "rgba(167,139,250,0.10)", status: "native" },
        { name: "Cline", sub: "VS Code agent", fg: "#5eead4", bg: "rgba(94,234,212,0.10)", status: "native" },
        { name: "Zed", sub: "高速代码编辑器", fg: "#facc15", bg: "rgba(250,204,21,0.10)", status: "native" },
        { name: "Continue", sub: "开源 AI 助手", fg: "#60a5fa", bg: "rgba(96,165,250,0.10)", status: "native" },
        { name: "Windsurf", sub: "Codeium 的 agentic IDE", fg: "#22d3ee", bg: "rgba(34,211,238,0.10)", status: "native" },
        { name: "Sourcegraph Amp", sub: "Coding agent", fg: "#ff5543", bg: "rgba(255,85,67,0.10)", status: "native" },
        { name: "ChatGPT", sub: "通过 OpenAI bridge", fg: "#10a37f", bg: "rgba(16,163,127,0.10)", status: "experimental" },
        { name: "任意 MCP 客户端", sub: "符合规范即可", fg: "#f4a896", bg: "rgba(244,168,150,0.12)", status: "mcp" },
      ],
    },
    beforeAfter: {
      tag: "变化",
      titleA: "6 个 app,6 个陌生人。",
      titleB: "6 个 app,一份关于你的记忆。",
      body: "同一个你。同一个开场问法。两个世界。",
      before: {
        label: "装 Continuum 之前",
        footer: "陌生人,每次都是。",
        apps: [
          { name: "Claude", line: "我不知道你的项目,请告诉我。" },
          { name: "Cursor", line: "我不知道你的技术栈,你用什么?" },
          { name: "ChatGPT", line: "我不知道你的偏好,要怎么回答你?" },
          { name: "Cline", line: "我不知道你的风格,什么语气?" },
        ],
      },
      after: {
        label: "装 Continuum 之后",
        footer: "熟客了,接着聊。",
        apps: [
          { name: "Claude", line: "收到 —— v3 发布,周五截稿,简短回答。" },
          { name: "Cursor", line: "收到 —— TypeScript、Next.js、Postgres。" },
          { name: "ChatGPT", line: "收到 —— 简短、不用 emoji、创始人语气。" },
          { name: "Cline", line: "收到 —— 干燥语气,不要营销腔。" },
        ],
      },
    },
    byNumbers: {
      tag: "数字说话",
      title: "在自己的 AI 面前当陌生人的成本。",
      body: "基于 11 位创始人访谈 + 200+ 重度 AI 用户的闭门 beta。",
      stats: [
        { value: "47", label: "重度 AI 用户每周重新说项目背景的次数" },
        { value: "5 分钟", label: "Continuum 平均安装时间" },
        { value: "20-40%", label: "智能预过滤后减少的重复 prompt" },
        { value: "6+", label: "共用同一份 memory 的 AI app" },
        { value: "¥64", label: "Pro 套餐月费,无使用次数限制" },
      ],
      calc: {
        title: "你每周丢多少小时?",
        body: "拖动滑块,算你的数。",
        appsLabel: "你每天用的 AI app 数",
        msgsLabel: "每个 app 每天平均对话条数",
        resetsLabel: "每周重新解释次数",
        hoursLabel: "每年丢的小时数",
        cta: "别再丢了 →",
      },
    },
  },
};
