import type { Question, Track } from '@/types/audit'

// Shared questions — all tracks, Q1–Q8
export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'current_state',
    label: 'Where You Are Today',
    question: 'How would you honestly describe the way your business runs day-to-day?',
    subtext: 'There\'s no wrong answer — this shapes everything that follows.',
    type: 'single',
    options: [
      { label: 'Mostly in my head',             sub: 'Processes exist, but they live with me or a key person — not in a system',          value: 1 },
      { label: 'Spreadsheets and manual steps', sub: 'We have a workflow, but it requires someone to actually execute each step',           value: 2 },
      { label: 'A few tools, loosely connected', sub: 'We use software but it doesn\'t talk to itself — there\'s still a lot of copy-paste', value: 3 },
      { label: 'Fairly systematized',           sub: 'Most things have a process — but I know there\'s a smarter way to run them',         value: 4 },
    ],
  },
  {
    id: 2,
    category: 'pain_intensity',
    label: 'The Time Cost',
    question: 'How many hours a week does your team spend on tasks that feel repetitive, manual, or beneath your pay grade?',
    subtext: 'Think: chasing follow-ups, copying data between tools, scheduling, sending the same messages, pulling reports manually.',
    type: 'slider',
    min: 0,
    max: 50,
    step: 1,
    unit: 'hours / week',
    bands: [
      { max: 5,  label: 'Not much — but even small leaks add up over time' },
      { max: 15, label: 'A real drain — roughly 2 full days a month gone' },
      { max: 25, label: 'Significant — that\'s a part-time employee\'s worth of effort' },
      { max: 35, label: 'Critical — you\'re funding a full-time role in wasted work' },
      { max: 50, label: 'Severe — this is actively capping what your business can do' },
    ],
  },
  {
    id: 3,
    category: 'biggest_bottleneck',
    label: 'The Biggest Drain',
    question: 'If you\'re honest, where does your business lose the most time and energy every single week?',
    subtext: 'Pick the one that makes you wince the most.',
    type: 'single',
    options: [
      { label: 'Following up with leads and clients', sub: 'Inquiries go cold, tasks fall through cracks, nothing gets chased unless someone remembers',       value: 1 },
      { label: 'Onboarding new clients',              sub: 'Every new client feels like starting from scratch — it takes too long and relies on too few people', value: 2 },
      { label: 'Reporting, admin, and internal ops',  sub: 'Too much time building reports, updating spreadsheets, and doing things a tool should handle',      value: 3 },
      { label: 'Scheduling, coordination, and communication', sub: 'Too many back-and-forth emails, missed handoffs, and things falling through due to human error', value: 4 },
    ],
  },
  {
    id: 4,
    category: 'cost_of_delay',
    label: 'What It\'s Costing You',
    question: 'When a potential client reaches out, how quickly does your business typically respond?',
    subtext: 'Businesses that respond within 5 minutes are 21x more likely to convert that lead than those who wait an hour. Where do you land?',
    type: 'single',
    options: [
      { label: 'Within minutes — we have a system for this',         sub: 'Inquiries get an immediate, personalized response automatically',                      value: 4 },
      { label: 'Same day — if someone remembers to check',           sub: 'We respond quickly when we\'re on top of it, but it relies on a person noticing',      value: 3 },
      { label: 'Within a day or two',                                sub: 'We get there — but by then the lead has often moved on or gone cold',                  value: 2 },
      { label: 'Honestly — it varies and sometimes things slip',     sub: 'There\'s no reliable system, and I know we\'re losing business because of it',         value: 1 },
    ],
  },
  {
    id: 5,
    category: 'growth_potential',
    label: 'The Upside',
    question: 'If the manual work disappeared tomorrow — what would you actually do with that time?',
    subtext: 'This isn\'t hypothetical. It\'s what your business looks like on the other side of this.',
    type: 'single',
    options: [
      { label: 'Take on more clients without burning out',      sub: 'Grow revenue without growing headcount or hours',                                      value: 4 },
      { label: 'Focus on the work only I can do',               sub: 'Get out of the weeds and back into the high-value work that actually moves the needle', value: 3 },
      { label: 'Build something more scalable and sellable',    sub: 'Create a business that doesn\'t depend entirely on me to function',                    value: 2 },
      { label: 'Honestly — I\'d just like to stop feeling behind', sub: 'Right now, keeping up is the goal. I\'d settle for breathing room.',               value: 1 },
    ],
  },
  {
    id: 6,
    category: 'ai_awareness',
    label: 'Your AI Starting Point',
    question: 'When it comes to AI and automation — where are you right now?',
    subtext: 'There\'s no right answer. Where you start determines what we\'d recommend first.',
    type: 'single',
    options: [
      { label: 'I know I should be doing something — I just don\'t know what', sub: 'AI feels relevant but overwhelming. I wouldn\'t know where to begin.',         value: 1 },
      { label: 'I\'ve experimented a little but nothing has stuck',             sub: 'I\'ve tried a few tools — ChatGPT, maybe Zapier — but haven\'t seen real results', value: 2 },
      { label: 'I have one or two things automated and want to go further',     sub: 'I\'ve seen what\'s possible in a small way — and I want more of it',            value: 3 },
      { label: 'I\'m actively looking for the right partner to build this out', sub: 'I know what I want — I just need the right team to execute it',                value: 4 },
    ],
  },
  {
    id: 7,
    category: 'decision_speed',
    label: 'Your Timeline',
    question: 'How urgently does solving this feel to you right now?',
    subtext: 'Be honest — every month this stays unsolved has a real cost attached to it.',
    type: 'single',
    options: [
      { label: 'It\'s a top priority — I want to move in the next 30 days',          sub: 'I\'ve been sitting on this long enough. I\'m ready to act.',                           value: 4 },
      { label: 'It\'s important — I\'m aiming for the next 90 days',                  sub: 'It\'s on my roadmap. I want to do this right, not just fast.',                        value: 3 },
      { label: 'It\'s on my radar — but I\'m still figuring out the right approach',  sub: 'I\'m in research mode. I want to understand what\'s possible before committing.',     value: 2 },
      { label: 'I\'m not sure yet — I\'m here to find out if this applies to me',     sub: 'Still weighing whether this is the right move for my business right now.',            value: 1 },
    ],
  },
  {
    id: 8,
    category: 'investment_readiness',
    label: 'Investment Readiness',
    question: 'If the right solution could provably recover that lost time and grow your revenue — what investment would make sense to get there?',
    subtext: 'Think of it as: what is one month of that wasted time actually worth to your business?',
    type: 'single',
    options: [
      { label: 'Under $5,000',       sub: 'Starting small — I need to see results before I go bigger',              value: 1 },
      { label: '$5,000 – $15,000',   sub: 'Serious about solving this — ready to invest if the case is clear',      value: 2 },
      { label: '$15,000 – $40,000',  sub: 'Ready for a real solution — I want it built properly, not patched together', value: 3 },
      { label: '$40,000+',           sub: 'I invest proportional to the opportunity — if the ROI is there, I\'m in', value: 4 },
    ],
  },
]

// Track-specific questions — Q6–Q8 (automate track uses QUESTIONS above; see_clearly and build_better extend with their own)
export const TRACK_QUESTIONS: Record<'automate' | 'see_clearly' | 'build_better', Question[]> = {
  automate: [],

  see_clearly: [
    {
      id: 6,
      category: 'current_state',
      label: 'Data Visibility',
      question: 'How clearly can you see what\'s actually driving performance in your business right now?',
      subtext: 'Not what you could theoretically pull — what\'s in front of you daily.',
      type: 'single',
      options: [
        { label: 'Mostly blind',                          sub: 'We make decisions based on gut feel and memory',                  value: 1 },
        { label: 'Partial visibility',                    sub: 'Some reports exist but they\'re manual, slow, or incomplete',    value: 2 },
        { label: 'Decent visibility with gaps',           sub: 'Good data in one or two areas but not across the business',      value: 3 },
        { label: 'Strong visibility with trust issues',  sub: 'Dashboards exist — but they\'re not quite right or fully trusted', value: 4 },
      ],
    },
    {
      id: 7,
      category: 'ai_awareness',
      label: 'Data Fragmentation',
      question: 'How many separate platforms hold data that should be informing your decisions?',
      subtext: 'CRM, ad platforms, analytics, spreadsheets, billing systems — count them all.',
      type: 'single',
      options: [
        { label: '1–2 sources', sub: 'Simple stack — reporting is relatively straightforward', value: 1 },
        { label: '3–4 sources', sub: 'Some fragmentation — pulling it together takes real effort', value: 2 },
        { label: '5–7 sources', sub: 'Real complexity — no single source of truth exists', value: 3 },
        { label: '8+ sources',  sub: 'Significant fragmentation — insights are buried', value: 4 },
      ],
    },
    {
      id: 8,
      category: 'revenue_impact',
      label: 'Decision Cost',
      question: 'What\'s the real cost of your current data blind spots?',
      subtext: 'Think about the decisions you\'ve made slowly, incorrectly, or not at all.',
      type: 'single',
      options: [
        { label: 'Mostly inconvenient',               sub: 'We get there eventually — just slower than it should be',                value: 1 },
        { label: 'Occasional bad calls',              sub: 'We\'ve made decisions we wouldn\'t have with better data',              value: 2 },
        { label: 'Real money left on the table',      sub: 'We know we\'re underperforming because we can\'t see clearly',         value: 3 },
        { label: 'A strategic liability',             sub: 'Competitors with better visibility are outmaneuvering us',               value: 4 },
      ],
    },
  ],

  build_better: [
    {
      id: 6,
      category: 'current_state',
      label: 'Current Workarounds',
      question: 'How would you describe the tools your team uses to get work done today?',
      subtext: 'Honest answers here produce the most useful recommendations.',
      type: 'single',
      options: [
        { label: 'Mostly spreadsheets and email',                sub: 'We\'ve duct-taped together a workflow that sort of works',        value: 1 },
        { label: 'Off-the-shelf tools, heavily customized',      sub: 'We\'ve stretched SaaS products past their intended use',         value: 2 },
        { label: 'A mix of custom and off-the-shelf',            sub: 'Some purpose-built pieces, some generic tools still in the gaps', value: 3 },
        { label: 'Mostly custom — we\'ve invested in this before', sub: 'We know what good looks like and want more of it',            value: 4 },
      ],
    },
    {
      id: 7,
      category: 'ai_awareness',
      label: 'User Experience',
      question: 'What\'s the experience like for the people who depend on your current systems?',
      subtext: 'This shapes whether we prioritize a client-facing or internal-facing build.',
      type: 'single',
      options: [
        { label: 'Frustrating — lots of manual back-and-forth', sub: 'People work around the system more than they use it', value: 1 },
        { label: 'Functional but clunky',                       sub: 'It works, but nobody would call it a good experience', value: 2 },
        { label: 'Acceptable with room to improve',             sub: 'Gets the job done — but it\'s not a competitive advantage', value: 3 },
        { label: 'Good in places, broken in others',            sub: 'Some workflows are solid — others are embarrassing', value: 4 },
      ],
    },
    {
      id: 8,
      category: 'revenue_impact',
      label: 'Business Impact',
      question: 'What would a purpose-built system unlock for your business?',
      subtext: 'The more specific your answer, the sharper our recommendation.',
      type: 'single',
      options: [
        { label: 'Time savings for my team',               sub: 'Fewer manual tasks, less confusion, more clarity', value: 1 },
        { label: 'Better client experience',               sub: 'Clients get a more professional, seamless interaction', value: 2 },
        { label: 'The ability to scale without hiring',    sub: 'Systems that handle volume without adding headcount', value: 3 },
        { label: 'A true competitive advantage',           sub: 'Something our competitors simply cannot replicate', value: 4 },
      ],
    },
  ],
}

export function getQuestionsForTrack(track: Track | null): Question[] {
  const trackKey = !track || track === 'combined' ? 'automate' : track
  return [...QUESTIONS, ...TRACK_QUESTIONS[trackKey]]
}

export const DIMENSION_LABELS: Record<string, string> = {
  current_state:        'Operational Maturity',
  pain_intensity:       'Time Efficiency',
  biggest_bottleneck:   'Primary Bottleneck',
  cost_of_delay:        'Lead Responsiveness',
  growth_potential:     'Growth Readiness',
  ai_awareness:         'AI Readiness',
  decision_speed:       'Execution Velocity',
  investment_readiness: 'Investment Clarity',
}

export const TRACK_LABELS: Record<Track, string> = {
  automate:    'AI Automation',
  see_clearly: 'Reporting & Analytics',
  build_better:'Custom Build',
  combined:    'Full Audit',
}

export const TRACK_BOOKING_LABELS: Record<Track, string> = {
  automate:    'Book an AI Automation Strategy Call',
  see_clearly: 'Book a Reporting & Analytics Call',
  build_better:'Book a Custom Build Strategy Call',
  combined:    'Book a Discovery Call',
}
