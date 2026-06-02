export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductFAQItem {
  question: string;
  answer: string;
}

export interface ShopProduct {
  id: string;
  slug: string;
  tierLabel: string;
  name: string;
  price: string;
  tagline: string;
  heroSubtext: string;
  deliverable: string;
  buttonLabel: string;
  featured: boolean;
  features: ProductFeature[];
  whoItIsFor: string[];
  faq: ProductFAQItem[];
}

// To add a product to the shop, add its id here
const ACTIVE_PRODUCTS = ["ui_kit"];

const allProducts: ShopProduct[] = [
  {
    id: "notion_template",
    slug: "notion-template",
    tierLabel: "Starter",
    name: "[Notion Template Name]",
    price: "$37",
    tagline: "A structured system that pays for itself the first week.",
    heroSubtext:
      "Stop rebuilding your workflow from scratch every time. This Notion template gives you a proven system you can start using the same day — no setup rabbit holes, no figuring it out as you go.",
    deliverable: "Instant digital download",
    buttonLabel: "Get Instant Access",
    featured: false,
    features: [
      {
        title: "Project Tracker",
        description:
          "A clean kanban and list view for every project — with status, deadlines, and priority already built in. Nothing falls through the cracks.",
      },
      {
        title: "Content Calendar",
        description:
          "Plan and track every piece of content from idea to published. Covers scripts, blogs, social, and anything else you're shipping.",
      },
      {
        title: "Client Hub",
        description:
          "One place for every client relationship: contacts, deliverables, notes, invoices, and status. No more digging through emails.",
      },
      {
        title: "Weekly Review System",
        description:
          "A built-in ritual for reviewing your week, capturing what's unfinished, and setting clear intentions for what comes next.",
      },
    ],
    whoItIsFor: [
      "You're a solopreneur or creator juggling more than you can keep in your head",
      "You've tried building your own Notion setup and it falls apart after two weeks",
      "You want a system ready to use today — not another thing to customize from scratch",
      "You're done losing track of projects, deadlines, and client details",
    ],
    faq: [
      {
        question: "Do I need a paid Notion plan?",
        answer:
          "No. The template works on Notion's free plan. No upsell, no hidden requirements.",
      },
      {
        question: "How do I get it after buying?",
        answer:
          "You'll get an email immediately after checkout with a link to duplicate the template into your Notion workspace. Takes about 60 seconds to set up.",
      },
      {
        question: "Can I customize it?",
        answer:
          "It's yours — change anything. The structure is designed to be a solid starting point, not a locked-down system.",
      },
      {
        question: "What if it doesn't work for me?",
        answer:
          "Reach out within 7 days if there's a problem and I'll make it right.",
      },
    ],
  },
  {
    id: "ui_kit",
    slug: "ui-kit",
    tierLabel: "Most Popular",
    name: "Builder Kit",
    price: "$249",
    tagline: "Build better interfaces with AI, faster than you thought possible.",
    heroSubtext:
      "A hand-crafted component library and workflow system built specifically for Claude Code. Less time hunting for the right pattern, more time shipping. Everything you need to build clean, consistent UIs with AI — in one place.",
    deliverable: "Instant digital download",
    buttonLabel: "Buy the Kit",
    featured: true,
    features: [
      {
        title: "50+ Production-Ready Components",
        description:
          "Buttons, cards, forms, modals, tables, sidebars, and more — all built with Tailwind v4 and shadcn/ui patterns. Drop them in and move on.",
      },
      {
        title: "Prompt Templates That Actually Work",
        description:
          "Tested prompts that get Claude to generate clean, consistent code on the first try. No more re-running the same prompt five times to get usable output.",
      },
      {
        title: "Real-World Usage Examples",
        description:
          "Full page builds that show how the components fit together in practice — not just isolated demos. See exactly how to wire things up.",
      },
      {
        title: "Workflow Recipes",
        description:
          "Step-by-step patterns for the most common Claude Code tasks: scaffolding a new page, refactoring a component, debugging weird output, and more.",
      },
      {
        title: "Lifetime Updates",
        description:
          "Claude Code is moving fast. The kit moves with it. You pay once and get every update, improvement, and new component going forward.",
      },
    ],
    whoItIsFor: [
      "You're building with Claude Code and tired of inconsistent output",
      "You want production-ready components without starting from scratch every time",
      "You're spending more time wrangling AI output than actually shipping",
      "You know what you're trying to build — you just need the right raw materials",
    ],
    faq: [
      {
        question: "What tech stack does this use?",
        answer:
          "Next.js 15, Tailwind v4, and shadcn/ui — the same stack used to build this site. If you're using Claude Code seriously, you're probably already on this stack.",
      },
      {
        question: "Do I need to know React?",
        answer:
          "A working knowledge of React helps, but the components are built to be understandable. The prompt templates work regardless of your experience level.",
      },
      {
        question: "How is this different from shadcn/ui?",
        answer:
          "shadcn/ui gives you base components. This kit gives you those components already wired together into real patterns, plus the Claude-specific prompts that make AI-assisted development actually predictable.",
      },
      {
        question: "Will it stay up to date?",
        answer:
          "Yes. Claude Code is evolving fast and so is this kit. You get all updates forever for the same one-time price.",
      },
    ],
  },
  {
    id: "custom_site",
    slug: "custom-site",
    tierLabel: "Done For You",
    name: "[Custom Website Name]",
    price: "from $2,497",
    tagline: "A real website, built for your real business.",
    heroSubtext:
      "A fully custom-coded site or web app — built by hand, not assembled from a page builder. Fast, clean, and designed to convert. If you're ready to stop DIYing your web presence and want something that actually represents what you do, this is for you.",
    deliverable: "Project kicks off within 48 hours of strategy call",
    buttonLabel: "Start Your Project",
    featured: false,
    features: [
      {
        title: "Strategy Session",
        description:
          "A focused call to nail your goals, audience, and what the site needs to accomplish. Nothing gets built until we both agree on exactly what you're getting.",
      },
      {
        title: "Custom Design",
        description:
          "A site designed specifically for your brand — not a template with your logo pasted on top. Every decision is intentional.",
      },
      {
        title: "Clean, Custom Code",
        description:
          "Hand-coded in Next.js. No page builders, no plugin bloat. Fast out of the box, accessible by default, and actually yours.",
      },
      {
        title: "2-Week Delivery",
        description:
          "Most standard projects ship in 14 days. You'll see progress at every step — not a big reveal at the end.",
      },
      {
        title: "30 Days Post-Launch Support",
        description:
          "Fixes, tweaks, and minor changes are included for 30 days after launch. You're not on your own the moment it goes live.",
      },
    ],
    whoItIsFor: [
      "You need a website that actually represents what you do — not a template that screams DIY",
      "You've outgrown your current site and it's costing you credibility",
      "You want something fast, clean, and built to convert — not just look pretty",
      "You have a clear idea of what you need and you're ready to move",
    ],
    faq: [
      {
        question: "What does 'from $2,497' mean exactly?",
        answer:
          "The base price covers a strategy session, design, development, and 30 days of support. Final scope and pricing are confirmed after your strategy call — I don't take money until we've agreed on exactly what you're getting.",
      },
      {
        question: "How long does it take?",
        answer:
          "Most projects (5 pages or fewer) ship in 14 days. Larger or more complex projects take longer — we'll confirm your timeline on the strategy call.",
      },
      {
        question: "What if I need changes after launch?",
        answer:
          "The 30-day support period covers fixes and minor adjustments. For ongoing work, we can talk about a retainer.",
      },
      {
        question: "Do you build on Squarespace, Webflow, or WordPress?",
        answer:
          "No. Everything is custom-coded in Next.js. That's what makes it fast, flexible, and actually yours to own.",
      },
    ],
  },
];

export const products = allProducts.filter((p) => ACTIVE_PRODUCTS.includes(p.id));
