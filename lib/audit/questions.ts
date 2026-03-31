import type { Question, Track } from '@/types/audit'

// Shared questions — all tracks, Q1–Q5
export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'pain_intensity',
    label: 'Time Leakage',
    question: 'How many hours per week does your team spend on work that should happen automatically?',
    subtext: 'Include admin, reporting, follow-ups, data entry, client communication, scheduling.',
    type: 'slider',
    min: 0,
    max: 50,
    step: 1,
    unit: 'hours / week',
    bands: [
      { max: 5,  label: 'Minimal — mostly under control' },
      { max: 15, label: 'Moderate — a real but manageable drain' },
      { max: 30, label: 'Significant — it\'s affecting your output' },
      { max: 50, label: 'Critical — this is a growth ceiling' },
    ],
  },
  {
    id: 2,
    category: 'growth_trajectory',
    label: 'Growth Stage',
    question: 'Which best describes your business right now?',
    subtext: 'Your stage determines which solutions deliver the fastest payback.',
    type: 'single',
    options: [
      { label: 'Stabilizing',         sub: 'Chaotic — I need more control before I can think about growth', value: 1 },
      { label: 'Maintaining',         sub: 'Steady — consistent but not accelerating',                     value: 2 },
      { label: 'Scaling under strain', sub: 'Growing — but operational friction is rising fast',            value: 3 },
      { label: 'Aggressive expansion', sub: 'Full speed — every bottleneck is costing us money',            value: 4 },
    ],
  },
  {
    id: 3,
    category: 'tech_readiness',
    label: 'Tech Infrastructure',
    question: 'How would you describe the technology your business runs on today?',
    subtext: 'Your stack determines how fast we can build and how deep we can go.',
    type: 'single',
    options: [
      { label: 'Email, spreadsheets, and gut instinct', sub: 'Low complexity — most things live in people\'s heads', value: 1 },
      { label: 'A CRM and a few SaaS tools',            sub: 'Tools exist but they don\'t talk to each other',      value: 2 },
      { label: 'Multiple platforms with some integrations', sub: 'Functional but fragmented — there are gaps',      value: 3 },
      { label: 'A sophisticated, API-ready stack',       sub: 'We can connect anything — we just need the right builds', value: 4 },
    ],
  },
  {
    id: 4,
    category: 'decision_speed',
    label: 'Execution Velocity',
    question: 'When you identify a significant inefficiency, how quickly does action follow?',
    subtext: 'Speed of execution is often the largest variable in ROI.',
    type: 'single',
    options: [
      { label: 'Months — internal friction is significant', sub: 'Many stakeholders, slow consensus, competing priorities', value: 1 },
      { label: 'Weeks — requires a clear business case',    sub: 'We move deliberately and carefully',                      value: 2 },
      { label: 'Days — once the case is clear, we act',     sub: 'Streamlined decisions with a small, aligned team',        value: 3 },
      { label: 'Same day — I make the call',                sub: 'I own the decision and move immediately',                  value: 4 },
    ],
  },
  {
    id: 5,
    category: 'investment_readiness',
    label: 'Investment Readiness',
    question: 'What investment range aligns with solving this — assuming a documented 10x ROI case?',
    subtext: 'This calibrates the scope and architecture of what we\'d recommend.',
    type: 'single',
    options: [
      { label: 'Under $5,000',        sub: 'Starting small — need to validate before committing',    value: 1 },
      { label: '$5,000 – $20,000',    sub: 'Serious about solving this in the next 90 days',          value: 2 },
      { label: '$20,000 – $50,000',   sub: 'Ready for a complete, custom-built solution',             value: 3 },
      { label: '$50,000+',            sub: 'We invest proportional to the opportunity',                value: 4 },
    ],
  },
]

// Track-specific questions — Q6–Q8
export const TRACK_QUESTIONS: Record<'automate' | 'see_clearly' | 'build_better', Question[]> = {
  automate: [
    {
      id: 6,
      category: 'current_state',
      label: 'Automation Maturity',
      question: 'How would you describe your team\'s current relationship with automation?',
      subtext: 'Be honest — this shapes the entire recommendation.',
      type: 'single',
      options: [
        { label: 'Almost everything is manual',             sub: 'Spreadsheets, email chains, human memory',                value: 1 },
        { label: 'We use a few tools',                      sub: 'Zapier, Airtable, basic SaaS — mostly disconnected',      value: 2 },
        { label: 'Some workflows are automated',            sub: 'A few key processes run without us touching them',         value: 3 },
        { label: 'Automation is core to how we operate',   sub: 'Systems run in the background — we focus on strategy',     value: 4 },
      ],
    },
    {
      id: 7,
      category: 'ai_awareness',
      label: 'AI Sophistication',
      question: 'How actively are you using AI tools in your business — beyond ChatGPT for writing?',
      subtext: 'Your current fluency determines your starting point, not your ceiling.',
      type: 'single',
      options: [
        { label: 'Exploring for the first time',         sub: 'I know it matters but haven\'t committed yet',                     value: 1 },
        { label: 'Occasional ChatGPT user',              sub: 'Mostly drafting, summarizing, quick questions',                    value: 2 },
        { label: 'Testing tools across workflows',       sub: 'Actively piloting AI in specific parts of the business',           value: 3 },
        { label: 'AI is embedded in how we operate',    sub: 'Multiple AI workflows running — always researching more',           value: 4 },
      ],
    },
    {
      id: 8,
      category: 'revenue_impact',
      label: 'Revenue Constraint',
      question: 'If your biggest manual bottleneck disappeared tomorrow, what would be the realistic business impact?',
      subtext: 'Think capacity, conversion rate, and revenue — not just hours saved.',
      type: 'single',
      options: [
        { label: 'Mostly peace of mind',           sub: 'It\'s more about sanity than dollars',                               value: 1 },
        { label: 'Meaningful efficiency gains',    sub: 'We\'d close faster and reduce operational churn',                    value: 2 },
        { label: '10–25% capacity unlock',         sub: 'We could take on significantly more without hiring',                 value: 3 },
        { label: 'It\'s actively capping our revenue', sub: 'This bottleneck is the ceiling on our growth',                  value: 4 },
      ],
    },
  ],

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
  current_state:       'Automation Maturity',
  pain_intensity:      'Time Efficiency',
  growth_trajectory:   'Growth Velocity',
  tech_readiness:      'Tech Infrastructure',
  decision_speed:      'Execution Speed',
  ai_awareness:        'AI Sophistication',
  revenue_impact:      'Revenue Leverage',
  investment_readiness:'Investment Clarity',
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
