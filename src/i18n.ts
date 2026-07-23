// Bilingual copy for Continuum. Tech terms (SDK, API, Memory, Graph, etc.)
// stay in English on both sides — that reads more native to developers.
// Use [c]...[/c] inline to render a code-inline span.
// Use [h]...[/h] inline to render an accent (brand color) word.
export type Lang = "en" | "zh";

type Dict = {
  nav: Record<string, string>;
  promo: {
    text: string;
    link?: { label: string; href: string };
  } | null;
  hero: {
    tag: string;
    title: string;
    body: string;
    body2: string;
    cta1: string;
    cta2: string;
    hint: string;
    demoCaption: string;
  };
  pain: {
    tag: string;
    line1: string;
    line2: string;
    line3: string;
  };
  features: {
    tag: string;
    title: string;
    body: string;
    items: { emoji: string; name: string; tag: string; body: string }[];
  };
  howItWorks: {
    tag: string;
    title: string;
    body: string;
    steps: { name: string; body: string }[];
  };
  whyExists: {
    kicker: string;
    title: string;
    paragraphs: string[];
    signature: string;
    ctaLabel: string;
  };
  roadmap: {
    tag: string;
    title: string;
    body: string;
    items: { when: string; what: string }[];
    footnote: string;
  };
  whyNot: {
    tag: string;
    title: string;
    items: string[];
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
  security: {
    tag: string;
    titleA: string;
    titleB: string;
    body: string;
    checks: { title: string; body: string }[];
  };
  pricing: {
    tag: string;
    title: string;
    highlight: string;
    tiers: { name: string; price: string; cadence: string; features: string[]; cta: string }[];
  };
  faq: {
    tag: string;
    title: string;
    items: { q: string; a: string }[];
  };
  pricingFaq: {
    title: string;
    items: { q: string; a: string }[];
  };
  changelog: {
    tag: string;
    title: string;
    items: { version: string; date: string; points: string[] }[];
    cta: string;
  };
  manifesto: {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
    footer: string;
  };
  finalCta: {
    titleA: string;
    titleB: string;
    body: string;
    cta1: string;
    cta2: string;
    etymology: string;
  };
  cookie: { body: string; accept: string; decline: string };
  notFound: { title: string; body: string; cta: string };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    legal: string[];
    copyright: string;
  };
};

export const dict: Record<Lang, Dict> = {
  en: {
    promo: {
      text: "Public preview · Q4 2026 launch ·",
      link: { label: "read the manifesto", href: "/manifesto" },
    },
    nav: {
      features: "What it does",
      how: "How it works",
      manifesto: "Manifesto",
      pricing: "Pricing",
      faq: "FAQ",
      changelog: "Changelog",
      docs: "Docs",
      signIn: "Sign in",
      getKey: "Get started",
    },
    hero: {
      tag: "Public preview",
      title: "An [h]AI[/h] that knows you.",
      body: "Your preferences. Your projects. The people you mentioned last week. [c]Install once — every AI app remembers you.[/c]",
      body2: "Works in Claude, Cursor, Cline, Zed, and 10+ MCP-compatible apps. ChatGPT needs a one-line bridge.",
      cta1: "Get started on GitHub",
      cta2: "See what it looks like",
      hint: "5 minutes. Free forever. No credit card.",
      demoCaption: "↑ A real conversation. Continuum quietly pulls the relevant context from your past week.",
    },
    pain: {
      tag: "The problem",
      line1: "Last Tuesday, you spent 40 minutes explaining your project to ChatGPT. Wednesday, you spent 30 explaining it again to Claude.",
      line2: "By Thursday the project had moved on, and the AI hadn't. The preferences you typed once, the deadline you mentioned once, the context you built up over a week — all gone, every app, every chat.",
      line3: "This isn't an AI problem. It's a memory problem.",
    },
    features: {
      tag: "What it does",
      title: "Five things it quietly does for you.",
      body: "One memory. Every AI app. No copy-paste between them.",
      items: [
        {
          emoji: "💭",
          name: "It knows what you've been working on",
          tag: "Layered Memory · long-term",
          body: "Your role, your voice, your preferences. Three layers — working (this task), short-term (this week), long-term (who you are). Old layers fade; recent layers surface. The same memory in Claude, Cursor, anywhere with MCP.",
        },
        {
          emoji: "🗂️",
          name: "Pick up where you left off",
          tag: "The Map · people, projects, deadlines",
          body: "Your world, as a structured graph — the people you mention, the projects you're on, the things you care about. Any AI can query it. None of them have to build it.",
        },
        {
          emoji: "🧠",
          name: "It picks up your style",
          tag: "The Tell · your patterns",
          body: "Continuum notices what works for you — the rephrasings, the corrections, the formats that land. Patterns become memory automatically. You never have to say \"I prefer short answers\" twice.",
        },
        {
          emoji: "🧹",
          name: "It forgets what doesn't matter",
          tag: "Fade · less is more",
          body: "Last week's debugging rabbit hole doesn't follow you into today's standup. Old, wrong, irrelevant context fades on its own. Your memory stays clean.",
        },
        {
          emoji: "⚡",
          name: "Your next answer is already on its way",
          tag: "Anticipation · right context, right moment",
          body: "Switch to Cursor mid-thought? Your AI already knows what you're building. Switch to ChatGPT? Same. Continuum pre-loads the right context before you ask.",
        },
      ],
    },
    howItWorks: {
      tag: "How it works",
      title: "Three quiet steps.",
      body: "Continuum runs in the background, between you and your AI apps.",
      steps: [
        {
          name: "Capture",
          body: "Continuum watches your conversations across every AI app. When something is worth remembering — a preference, a deadline, a fact about you — the AI proposes it as a memory. You never have to type \"please remember\" ever again.",
        },
        {
          name: "Curate",
          body: "A lightweight toast pops up when a new memory is proposed: \"Continuum wants to remember: 'You prefer concise answers.' [✓] [✎] [✗]\" You stay in control. The default is yes; the friction is one click.",
        },
        {
          name: "Recall",
          body: "When you open a new chat in any AI app, Continuum quietly pulls the relevant context. Claude knows what you told Cursor yesterday. Cursor knows your deadline from ChatGPT. The memory is yours — it just follows you.",
        },
      ],
    },
    whyExists: {
      kicker: "Why we built this",
      title: "Every AI team we talked to was rebuilding the same thing.",
      paragraphs: [
        "Six months building a memory layer. A reorg that lost half of it. Then a rewrite. The model kept getting smarter — and the prompt kept forgetting the user.",
        "Continuum exists because \"context engineering\" shouldn't be a full-time job. It should be five lines of JSON. We made it five lines.",
        "We run on the same primitives the big labs do — embeddings, vector search, decay-based memory. We just package them so you don't have to. The hard part of memory isn't the storage; it's deciding what to forget.",
      ],
      signature: "— The team at Continuum Labs",
      ctaLabel: "Read the full manifesto →",
    },
    roadmap: {
      tag: "What's next",
      title: "Where we're going.",
      body: "We're a small team. We ship in public, slowly, on purpose.",
      items: [
        { when: "2026 · Q3", what: "Pro & Family launch. Cloud sync. Cross-app pattern detection (The Tell) at scale." },
        { when: "2026 · Q4", what: "Native Claude Desktop integration. Mobile companion app. Self-hosted option for power users." },
        { when: "2027 · Q1", what: "Open-source the local memory engine. The cloud stays proprietary; the local engine becomes a public good." },
        { when: "2027 · and beyond", what: "A personal assistant that knows you well enough to start the conversation for you." },
      ],
      footnote: "Dates are honest estimates, not promises. We move when the work is ready.",
    },
    whyNot: {
      tag: "What we don't do",
      title: "Things Continuum will never be.",
      items: [
        "We don't sell your data. There is no version of this product where we make money from your memory.",
        "We don't build another chatbot. Continuum is the layer underneath your AI apps, not another one.",
        "We don't make you maintain memory by hand. Capture is automatic; you just confirm.",
        "We don't train models on your conversations. Not our models, not anyone's. Written in.",
        "We don't build a dashboard for you to manage memory. Memory is invisible. That's the point.",
      ],
    },
    isForMe: {
      tag: "Is this for you?",
      titleA: "You might not need us.",
      titleB: "And that's okay.",
      body: "Pick the column that sounds like you.",
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
    security: {
      tag: "Security & privacy",
      titleA: "Your memory is yours.",
      titleB: "We just remember it for you.",
      body: "Privacy isn't a feature we added — it's the default. Here's what we actually do, in plain language.",
      checks: [
        { title: "Your memory starts on your machine", body: "Hobby tier: 100% local. Your data never leaves your computer. We can't read it because it never reaches us." },
        { title: "We never sell your data", body: "There is no version of Continuum where we make money from your memory. We make money from subscriptions. That's it." },
        { title: "Export, delete, port — anytime", body: "One click to export everything as a zip. One click to wipe. Your data is yours, in formats you can actually open." },
        { title: "Full technical details for the audit-minded", body: "Encryption, regions, compliance docs — all available. We won't bore you with them here. Ask, and we'll send." },
      ],
    },
    pricing: {
      tag: "Pricing",
      title: "Pay for memory. Not for a seat.",
      highlight: "Saves you 20–40% on the AI bill",
      tiers: [
        {
          name: "Hobby", price: "$0", cadence: "free forever",
          features: ["1,000 memories", "1 device", "Local-only (data never leaves your machine)", "All 5 capabilities", "Community support"],
          cta: "Install free",
        },
        {
          name: "Pro", price: "$9", cadence: "per month",
          features: ["Unlimited memories", "Unlimited devices", "Cloud sync across all your machines", "Cross-app pattern detection (The Tell)", "Email support"],
          cta: "Get notified when Pro ships",
        },
        {
          name: "Family", price: "$19", cadence: "per month",
          features: ["Everything in Pro", "Up to 5 separate memories (you + family / team)", "Per-person privacy boundaries", "Priority support"],
          cta: "Get notified when Family ships",
        },
      ],
    },
    faq: {
      tag: "FAQ",
      title: "Questions, asked and answered.",
      items: [
        { q: "Will it slow down my AI?", a: "No. Continuum runs as a local MCP server. Median overhead in our tests: under 100ms per turn. The heavy work (extracting memories) happens in the background, not in your request path." },
        { q: "Does it cost anything on top of my Claude / Cursor / ChatGPT subscriptions?", a: "No. Continuum is a separate product. It doesn't sit between you and your AI provider, and it doesn't meter your existing API usage. Pay for Continuum on its own, or stay on the free Hobby tier." },
        { q: "Is my data safe?", a: "On Hobby: everything stays on your machine. On Pro: encrypted in transit and at rest, never used for training, deletable on demand. See the Security section above for the plain-language version." },
        { q: "What about ChatGPT?", a: "Not natively — ChatGPT doesn't support MCP. For ChatGPT users, we offer a small bridge script that exposes Continuum as OpenAI function calls. It's one extra config line. Full ChatGPT support is on the roadmap." },
        { q: "How is this different from ChatGPT's built-in memory?", a: "ChatGPT's memory is locked inside ChatGPT. Switch to Claude, Cursor, or any other AI — and you're a stranger again. Continuum is the *cross-app* layer: one memory that follows you everywhere, controlled by you." },
        { q: "Do I need to \"teach\" Continuum about myself?", a: "No. Continuum watches what you say and do across your AI apps, extracts the meaningful patterns, and proposes memory for your review. You confirm with one click. Most users add fewer than 5 manual memories in their first month." },
        { q: "What's MCP and why does this use it?", a: "MCP (Model Context Protocol) is the open standard Anthropic launched for AI apps to call external tools. By running as an MCP server, Continuum works in any client that speaks the standard — Claude Desktop, Cursor, Cline, Zed, and any new tool that adopts MCP. No plugin, no extension, no per-app integration." },
        { q: "Does Continuum reduce my AI bill?", a: "Yes — by pre-filtering which memories surface into a prompt, Continuum cuts the redundant context you'd otherwise paste in yourself. Most users see 20-40% less prompt repetition across a week." },
        { q: "Will my memory leak between people on the same device?", a: "No. Memories are tied to a user profile, not a device. If you and your partner share a Mac, Continuum keeps your memories separate. Family tier adds explicit per-person boundaries with their own encryption keys." },
        { q: "What happens if Continuum goes down or shuts off?", a: "On Hobby, your memory lives on your machine — if we disappear tomorrow, your data is still there. On Pro, we ship a one-command export tool that gives you everything in a portable format. We will never hold your memory hostage." },
        { q: "When will it be GA?", a: "Public preview is open now. Pro launches Q4 2026. Pricing is locked for early users through GA." },
        { q: "Can I self-host Continuum?", a: "Self-hosting is on the Q4 2026 roadmap. Until then, the closest you can get is the Hobby tier, which is fully local already — your data never leaves your machine either way." },
      ],
    },
    pricingFaq: {
      title: "Pricing questions, briefly answered.",
      items: [
        { q: "Can I upgrade or downgrade anytime?", a: "Yes. Pro ↔ Family is a one-click change. Downgrades take effect at the next billing cycle, never mid-cycle." },
        { q: "Is there an annual discount?", a: "20% off Pro when you pay yearly. Drop us a line for Family." },
        { q: "What happens to my memories if I downgrade to Hobby?", a: "Memories above the Hobby cap (1,000) get frozen, not deleted. Upgrade and they unfreeze instantly." },
        { q: "Will the free tier change?", a: "Existing Hobby users keep their plan. Only new signups see changes." },
      ],
    },
    changelog: {
      tag: "What's new",
      title: "Shipping every week.",
      items: [
        { version: "v0.1.0 · MCP launch", date: "Jul 20, 2026", points: ["MCP server ships — one command, every AI client that speaks MCP works out of the box", "Continuum re-anchored as a personal memory layer (was: developer SDK)", "Capture / Curate / Recall: 3-step flow replaces the dashboard-heavy v0", "Privacy-first: Hobby tier is 100% local, data never leaves your machine"] },
        { version: "v0.0.3 · Preview", date: "Jul 04, 2026", points: ["Closed preview with 200+ testers (Cursor power users, founders, researchers)", "Layered Memory, The Tell, The Map, Fade, Anticipation — 5 capabilities", "Daily memory digest at 9 PM, per-app review toast"] },
        { version: "v0.0.1 · Seed", date: "Jun 12, 2026", points: ["First prototype: a single-user local memory store + Claude Desktop plugin", "Validated with 11 founder interviews in 3 weeks"] },
      ],
      cta: "See full changelog",
    },
    finalCta: {
      titleA: "Go meet your AI.",
      titleB: "It already knows you.",
      body: "Five minutes to install. One memory across every AI app. Free forever for the first 1,000 memories — no credit card, no trial, no catch.",
      cta1: "Start being remembered",
      cta2: "Read the docs first",
      etymology: "Continuum — Latin for “uninterrupted.” A continuous thread, only yours.",
    },
    manifesto: {
      title: "Why we're building Continuum.",
      intro: "A small note on what we're doing, and what we won't do.",
      sections: [
        {
          heading: "The thing we keep seeing",
          body: "Every team building an AI product — ourselves included, when we started — hits the same wall around month three: the model is great, but it forgets the user. So someone has to build a memory layer. They do. It works. Then the team ships something else, and the memory layer gets half-orphaned. Six months later, a reorg, and half of it is gone. A rewrite happens. The new layer is slightly different. The user, who had carefully trained the old one, has to start over.\n\nWe've watched this happen at three different companies. We've lived it once.",
        },
        {
          heading: "What we're trying to be",
          body: "Continuum is a small thing: a personal memory layer that follows you across the AI apps you use. It runs as an MCP server, so any AI app that speaks the open standard can read from and write to it. We're not building a model, not building a chatbot, not building a UI you'll stare at. We're building the thing underneath.\n\nThe hard part of memory isn't storing. It's forgetting. A system that remembers everything becomes useless fast. So most of the work in Continuum is about deciding what to keep, what to fade, what to surface. It's a smaller, more careful product than it looks.",
        },
        {
          heading: "What we got wrong, briefly",
          body: "We spent our first month trying to be a developer SDK — an API you call, with a fancy dashboard. A round of founder interviews later, the pattern was clear: nobody wanted to call our API. They wanted their AI to just know things. So we threw out the dashboard, threw out the SDK, kept the memory engine, and rebuilt the surface as an MCP server. The Hobby tier is fully local. The cloud sync is opt-in. The dashboard, if you need it, is a single config file.\n\nWe will get more things wrong. This is the first one we're comfortable admitting on the homepage.",
        },
        {
          heading: "What we won't compromise on",
          body: "Your memory is yours — always exportable, always deletable. We will never hold your data hostage, even if we shut down. The free Hobby tier never sends your data to a server, even ours. We never train models on your conversations — written into our terms, verifiable by source. And we won't ship viral features, growth hacks, or reposition the product as something it isn't. Memory is a utility. We treat it like one.",
        },
        {
          heading: "What we are",
          body: "A small team. Three people. Most of us have shipped developer tools before. We're not a research lab, we're not backed by anyone notable, and we're not trying to be the next platform. We're trying to ship one thing — a memory layer that works — and earn the right to keep shipping.",
        },
      ],
      footer: "Continuum — Latin for “uninterrupted.” A continuous thread, only yours.",
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
    footer: {
      tagline: "Your AI should remember you. Continuum is the context layer that makes it happen — across every MCP-compatible app.",
      columns: [
        { title: "Product", links: ["Install", "How it works", "Pricing", "Changelog"] },
        { title: "Resources", links: ["Docs", "MCP setup", "Examples", "Manifesto"] },
        { title: "Company", links: ["About", "Blog", "Privacy", "Contact"] },
      ],
      legal: ["Privacy", "Terms", "Security"],
      copyright: "© 2026 Continuum Labs, Inc.",
    },
  },
  zh: {
    promo: {
      text: "公测中 · 2026 Q4 上线 ·",
      link: { label: "读宣言", href: "/manifesto" },
    },
    nav: {
      features: "它能做什么",
      how: "怎么用",
      manifesto: "宣言",
      pricing: "定价",
      faq: "常见问题",
      changelog: "更新",
      docs: "文档",
      signIn: "登录",
      getKey: "开始用",
    },
    hero: {
      tag: "公测中",
      title: "让 [h]AI[/h] 认得你。",
      body: "你的偏好、你的项目、你提过的人。[c]装一次,所有 AI app 都认得你。[/c]",
      body2: "原生支持 Claude、Cursor、Cline、Zed,以及 10+ 个支持 MCP 的 AI app。ChatGPT 走一行 bridge 配置。",
      cta1: "去 GitHub 装上",
      cta2: "看个示例",
      hint: "5 分钟装好。永久免费。不要信用卡。",
      demoCaption: "↑ 一段真实对话。Continuum 默默从你过去一周里把相关 context 拉过来。",
    },
    pain: {
      tag: "问题",
      line1: "上周二,你花了 40 分钟跟 ChatGPT 讲项目背景。上周三,你又花了 30 分钟跟 Claude 重新讲一遍。",
      line2: "到周四,项目已经往前走了,AI 还在原地。你敲过一次的偏好、提过一次的 deadline、攒了一周的 context —— 每个 app、每次开新对话,清零。",
      line3: "这不是 AI 的问题。是记忆的问题。",
    },
    features: {
      tag: "它能做什么",
      title: "五件事,安静地替你在做。",
      body: "一份记忆,所有 AI app,不用互相复制粘贴。",
      items: [
        {
          emoji: "💭",
          name: "你最近在忙什么,它都知道",
          tag: "Layered Memory · 长期",
          body: "你的角色、你的语气、你的偏好。三层 —— working(当前任务)、short-term(本周)、long-term(你是谁)。老层自动 fade,新层自动 surface。同一份 memory 在 Claude、Cursor 跟所有支持 MCP 的客户端里。",
        },
        {
          emoji: "🗂️",
          name: "上次那个项目,接着说就行",
          tag: "The Map · 关系图",
          body: "你的世界是一张结构化的图:你提到的人、你做的项目、你在意的事。任何 AI 都能查,没人需要自己搭。",
        },
        {
          emoji: "🧠",
          name: "它会懂你的说话方式",
          tag: "The Tell · 你的模式",
          body: "Continuum 看你什么表达对你有效 —— 改口、修正、用得顺的格式。模式自动变成 memory,你不用说。",
        },
        {
          emoji: "🧹",
          name: "不重要的,它会自己忘掉",
          tag: "Fade · 越用越干净",
          body: "上周的 debug rabbit hole,不该跟着你进今天的 standup。旧、错、不相关的 context 自动 fade 掉。",
        },
        {
          emoji: "⚡",
          name: "你还没问,答案已经在路上了",
          tag: "Anticipation · 主动 surface",
          body: "切到 Cursor 接着干?AI 已经知道你在做什么。切到 ChatGPT?也一样。背景不用你再说一次。",
        },
      ],
    },
    howItWorks: {
      tag: "工作流程",
      title: "三步,安静发生。",
      body: "Continuum 在后台跑,在你和你的 AI app 之间。",
      steps: [
        {
          name: "Capture · 捕获",
          body: "Continuum 看你跟所有 AI app 的对话。当 AI 注意到值得记住的事 —— 一个偏好、一个 deadline、一个关于你的事实 —— 它提议一条 memory。你再也不用输入「请记住」。",
        },
        {
          name: "Curate · 整理",
          body: "新 memory 弹出时,你的 AI app 里冒一个轻量 toast:「Continuum 想记住:你偏好简洁回答。[✓] [✎] [✗]」你始终掌控 —— 默认是「同意」,操作就一键。",
        },
        {
          name: "Recall · 召回",
          body: "新开对话时,Continuum 悄悄把相关的 context 拉过来。Claude 知道昨天你在 Cursor 里讲什么。Cursor 知道你 ChatGPT 里的 deadline。memory 是你的 —— 它只是跟着你。",
        },
      ],
    },
    whyExists: {
      kicker: "为什么做这个",
      title: "每个做 AI 的团队,都在重复同一件事。",
      paragraphs: [
        "六个月的搭建,一次组织调整丢一半,再来一次重写。模型越来越聪明 —— prompt 却越来越记不住用户。",
        "Continuum 存在的原因是:「context engineering」不该是一份全职工作。它该是五行 JSON。我们做到了五行。",
        "底层用的是大厂同款的 primitives —— embedding、向量检索、decay-based memory。我们只是把它们打包成你不用自己搭的样子。记忆的难处不在存,在忘。",
      ],
      signature: "—— Continuum Labs 团队",
      ctaLabel: "读完整宣言 →",
    },
    roadmap: {
      tag: "下一步",
      title: "我们在往哪儿走。",
      body: "我们是个小团队。公开地、慢慢、按节奏地发版。",
      items: [
        { when: "2026 · Q3", what: "Pro 和 Family 正式上线。云同步。跨 app 模式识别(The Tell)规模化。" },
        { when: "2026 · Q4", what: "Claude Desktop 原生集成。移动端伴生 app。自托管选项给重度用户。" },
        { when: "2027 · Q1", what: "开源本地 memory 引擎。云端继续专有;本地引擎成为公共资源。" },
        { when: "2027 · 及以后", what: "一个足够了解你的 AI 助手,会替你先开口。" },
      ],
      footnote: "时间是我们诚实的估计,不是承诺。我们按工作完成的节奏走。",
    },
    whyNot: {
      tag: "我们不做什么",
      title: "Continuum 永远不会是这些。",
      items: [
        "我们不卖你的数据。Continuum 不存在「靠你 memory 赚钱」这回事。",
        "我们不做另一个 ChatGPT。Continuum 是底下的那层,不是又一个 chatbot。",
        "我们不让你手动维护 memory。Capture 是自动的,你只负责确认。",
        "我们不用你的对话训练模型。不训练我们的,也不训练别人的。写进合同。",
        "我们不做 dashboard 让你管理 memory。记忆应该看不见 —— 这才是目的。",
      ],
    },
    isForMe: {
      tag: "适合你吗?",
      titleA: "也许你不需要我们。",
      titleB: "那也没关系。",
      body: "挑你那列就行。",
      columns: [
        {
          persona: "你只用 1 个 AI app,而且只用 1 个。",
          verdict: "跳过。",
          body: "如果 ChatGPT memory(或者 Claude 自带的那个)够用,那就够用。没必要加一层。",
        },
        {
          persona: "你用 2 个 AI app,但它们之间基本不互通。",
          verdict: "以后再说。",
          body: "你会受益,但还不至于痛。等你一个月复制粘贴 10 次项目背景时再回来。",
        },
        {
          persona: "你每天用 2+ 个 AI app,摩擦已经很真实。",
          verdict: "现在就装。",
          emph: true,
          body: "你已经在读这个 site,你自己知道为什么。记忆不该散在 6 个不同的 silo 里。5 分钟装好,一周回本。",
        },
      ],
      closer: "如果你滚到这一段底,你在第 3 列。",
      cta: "装上 Continuum",
    },
    security: {
      tag: "安全与隐私",
      titleA: "你的 memory 是你的。",
      titleB: "我们只是替你记着。",
      body: "隐私不是我们加的功能 —— 它是默认设置。下面是我们实际做的事,用人话说。",
      checks: [
        { title: "你的记忆先存在你自己的机器上", body: "Hobby 套餐:100% 本地。数据从不出你的电脑。我们想读也读不到 —— 因为根本没到我们这。" },
        { title: "我们不卖你的数据", body: "Continuum 不存在「靠你 memory 赚钱」这回事。我们只靠订阅赚钱。就这样。" },
        { title: "随时导出、删除、迁移", body: "一键导出所有数据成 zip。一键全部删干净。你的数据是你的,格式你能直接打开。" },
        { title: "技术细节给那些想看的人", body: "加密方式、合规文档、区域选择 —— 想看随时问。就不在这里烦你了。" },
      ],
    },
    pricing: {
      tag: "定价",
      title: "为记忆付费,不为席位付费。",
      highlight: "能省 20–40% 的 AI 账单",
      tiers: [
        { name: "Hobby", price: "¥0", cadence: "永久免费", features: ["1,000 条 memory", "1 台设备", "100% 本地(数据不出你的机器)", "5 大能力全开", "社区支持"], cta: "免费装上" },
        { name: "Pro", price: "¥64", cadence: "每月", features: ["不限 memory", "不限设备", "云同步所有设备", "跨 app 模式识别(The Tell)", "邮件支持"], cta: "上线时通知我" },
        { name: "Family", price: "¥114", cadence: "每月", features: ["Pro 全部", "最多 5 份独立 memory(你 + 家人/团队)", "每人隐私隔离", "优先支持"], cta: "上线时通知我" },
      ],
    },
    faq: {
      tag: "常见问题",
      title: "问题,答了。",
      items: [
        { q: "会拖慢我的 AI 吗?", a: "不会。Continuum 跑成本地 MCP server。我们测过,每次对话中位开销 <100ms。重的活(抽取 memory)在后台跑,不在你的请求路径上。" },
        { q: "在我 Claude / Cursor / ChatGPT 订阅费之外还要另付吗?", a: "不用。Continuum 是独立产品,不在你和 AI 服务商之间插一脚,也不计量你现有的 API 用量。Continuum 单独计费,或者用免费的 Hobby 套餐。" },
        { q: "我的数据安全吗?", a: "Hobby 套餐:全部存在你自己的机器上。Pro 套餐:传输和静态都加密,不参与训练,可随时删除。看上面「安全与隐私」一段,用人话写的。" },
        { q: "ChatGPT 能用吗?", a: "原生不行(ChatGPT 不接 MCP)。给 ChatGPT 用户准备了一个 bridge script,把 Continuum 暴露成 OpenAI function calls。多加一行配置就行。完整 ChatGPT 支持在路线图里。" },
        { q: "跟 ChatGPT 自带的 memory 有什么不同?", a: "ChatGPT 的 memory 锁在 ChatGPT 里。换到 Claude、Cursor 或者别的 AI —— 你又是陌生人。Continuum 是「跨 app」那一层:一份 memory 跟着你走,控制权在你。" },
        { q: "需要我手动「教」Continuum 吗?", a: "不需要。Continuum 看你平时跟 AI 的对话,自动抽取有意义的模式,提议成 memory 让你确认。第一个月大多数用户手动加的 memory 不超过 5 条。" },
        { q: "MCP 是什么,为什么用这个?", a: "MCP(Model Context Protocol)是 Anthropic 推出的开放标准,让 AI app 调用外部工具。Continuum 跑成 MCP server,就能在所有支持这个标准的客户端里工作 —— Claude Desktop、Cursor、Cline、Zed,以及任何新接 MCP 的工具。不用插件、不用浏览器扩展、不用逐 app 集成。" },
        { q: "Continuum 能降我的 AI 账单吗?", a: "能。Continuum 预过滤哪些 memory surface 进 prompt,自动去掉你本来要手动粘贴的重复上下文。大多数用户一周下来 prompt 重复度降 20-40%。" },
        { q: "同设备上不同人用,memory 会串吗?", a: "不会。Memory 跟用户 profile 绑,不跟设备绑。你和家人共用一台 Mac,Continuum 把你们的 memory 分开。Family 套餐有显式的 per-person 边界,各自独立加密。" },
        { q: "Continuum 倒闭了或挂了我的 memory 怎么办?", a: "Hobby 套餐:memory 在你自己机器上,就算我们明天消失,你的数据还在。Pro 套餐:我们提供一个一键 export 工具,把全部数据给你一个 portable 格式。我们永远不会拿你的 memory 绑架你。" },
        { q: "什么时候 GA?", a: "公测现在开放。Pro 套餐 2026 Q4 上线。早鸟价格锁到 GA。" },
        { q: "能自托管吗?", a: "自托管在 2026 Q4 路线图里。在那之前,最接近的是 Hobby 套餐 —— 反正也是全本地的,数据本来就不出你机器。" },
      ],
    },
    pricingFaq: {
      title: "关于定价,简短回答。",
      items: [
        { q: "能随时升级或降级吗?", a: "可以。Pro ↔ Family 一键切换。降级在下一个计费周期生效,不会中间跳档。" },
        { q: "年付有折扣吗?", a: "Pro 年付 8 折。Family 单独聊。" },
        { q: "降级到 Hobby 后,我的 memory 怎么办?", a: "超过 Hobby 上限(1,000 条)的部分会被冻结,不会被删。升回去自动解冻。" },
        { q: "免费套餐会变吗?", a: "已注册 Hobby 用户不动。新注册的才看到新规则。" },
      ],
    },
    changelog: {
      tag: "更新",
      title: "每周发。",
      items: [
        { version: "v0.1.0 · MCP 上线", date: "2026 年 7 月 20 日", points: ["MCP server 上线 —— 一行命令,所有支持 MCP 的客户端开箱即用", "Continuum 重新定位为「个人 memory 层」(之前是面向开发者的 SDK)", "Capture / Curate / Recall 三步流替代了原来偏 dashboard 的 v0", "隐私优先:Hobby 100% 本地,数据不出你的机器"] },
        { version: "v0.0.3 · 预览", date: "2026 年 7 月 4 日", points: ["闭门预览,200+ 测试者(Cursor 重度用户、创始人、研究员)", "Layered Memory、The Tell、The Map、Fade、Anticipation 五大能力成型", "每天 9 PM 推送记忆 digest,每个 app 单独 review toast"] },
        { version: "v0.0.1 · 种子", date: "2026 年 6 月 12 日", points: ["第一个原型:单人本地 memory 存储 + Claude Desktop 插件", "3 周内完成 11 位创始人访谈,验证需求"] },
      ],
      cta: "看完整更新日志",
    },
    finalCta: {
      titleA: "去认识你的 AI。",
      titleB: "它已经认识你了。",
      body: "5 分钟装好。一份 memory,所有 AI app 通用。前 1,000 条永久免费 —— 不要信用卡,不要试用,没套路。",
      cta1: "开始被记住",
      cta2: "先看文档",
      etymology: "Continuum,拉丁文「不中断的连续」。一段只属于你的、不中断的记忆。",
    },
    manifesto: {
      title: "为什么做 Continuum。",
      intro: "一份小笔记,说清楚我们在做什么、不做什么。",
      sections: [
        {
          heading: "我们反复看到的同一件事",
          body: "每个做 AI 产品的团队 —— 包括我们自己在内,刚启动那会儿 —— 三个月左右都会撞同一堵墙:模型很好,但它不记得用户。于是得有人搭一层 memory。搭了。能用。然后团队去做别的,memory 层被半遗弃。六个月后一次组织调整,丢一半。再重写,新的稍微不一样。用户原来精心训练过的那份,得从头再来。\n\n我们在三家公司看过这事发生。我们自己经历过一次。",
        },
        {
          heading: "我们想成为什么",
          body: "Continuum 是个小东西:一份跟着你跨 AI app 走的个人 memory。它跑成 MCP server,所以任何支持这个开放标准的 AI app 都能读能写。我们不做模型,不做 chatbot,不做一个你要盯着的 UI。我们做底下那一层。\n\nmemory 的难处不在存,在忘。一个什么都记的系统很快变得没法用。所以 Continuum 大部分的工作是判断:留什么、fade 什么、surface 什么。这是个比看起来更小、更细心的产品。",
        },
        {
          heading: "早期走错的",
          body: "第一个月,我们试着做面向开发者的 SDK —— 一个能调用的 API,加一个花哨的 dashboard。一轮 founder 访谈做完,模式清楚了:没人想调我们的 API。他们想的是「让 AI 自己就记住」。所以我们把 dashboard 扔了,SDK 扔了,留着 memory 引擎,把入口重做成 MCP server。Hobby 套餐全本地,云同步默认关闭。如果非要看 dashboard,就是一个配置文件。\n\n我们以后会继续走错。这是第一个我们愿意放在首页承认的。",
        },
        {
          heading: "不让步的",
          body: "你的 memory 是你的 —— 永远能导出,永远能删。我们永远不会拿你的数据绑架你,哪怕我们关掉。免费 Hobby 套餐从不上传你的数据,连我们的都不上。我们不用你的对话训练模型 —— 写进合同,源代码里能查。我们也不会上病毒式功能、做增长 hack、把产品重新包装成它不是的东西。memory 是工具,我们按工具来对待。",
        },
        {
          heading: "我们是谁",
          body: "小团队。三个人。大多数人以前做过开发者工具。我们不是研究院,没拿到显赫的投资,也没想当下一个平台。我们只想把一件事做对 —— 一个能用的 memory 层 —— 然后挣到继续做下去的权利。",
        },
      ],
      footer: "Continuum —— 拉丁文「不中断的连续」。一段只属于你的、不中断的记忆。",
    },
    cookie: {
      body: "我们用一个 analytics cookie 数页面访问。不追踪,没第三方。",
      accept: "好",
      decline: "不了",
    },
    notFound: {
      title: "404. 这个页面不存在。",
      body: "要么我们删了它,要么这 URL 从来就是错的。怎么着 —— 回到首页。",
      cta: "回首页",
    },
    footer: {
      tagline: "你的 AI 该记得你。Continuum 是让它发生的上下文层 —— 跨所有支持 MCP 的 AI app。",
      columns: [
        { title: "产品", links: ["安装", "工作流程", "定价", "更新"] },
        { title: "资源", links: ["文档", "MCP 配置", "示例", "宣言"] },
        { title: "公司", links: ["关于", "博客", "隐私", "联系"] },
      ],
      legal: ["隐私", "条款", "安全"],
      copyright: "© 2026 Continuum Labs, Inc.",
    },
  },
};
