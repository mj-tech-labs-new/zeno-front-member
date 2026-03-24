export interface AgentDefinition {
  id: string
  name: string
  role: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  isSupervisor: boolean
  defaultEnabled: boolean
  skills: string[]
}

export const agentDefinitions: AgentDefinition[] = [
  {
    id: 'zeno_core',
    name: 'Zeno Core',
    role: 'Supervisor',
    description:
      'Routes, scores, and coordinates all agents. Combines their outputs into a unified trading response.',
    color: '#7B61FF',
    bgColor: 'rgba(123, 97, 255, 0.1)',
    borderColor: 'rgba(123, 97, 255, 0.3)',
    isSupervisor: true,
    defaultEnabled: true,
    skills: [
      'Orchestrates all sub-agents',
      'Produces final trade score (0-10)',
      'Generates unified guidance',
      'Manages agent priority and conflicts',
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Risk Guard',
    description:
      'Blocks bad trades before they happen. Enforces TP/SL, position sizing, daily drawdown limits, and max trades per day.',
    color: '#FF6838',
    bgColor: 'rgba(255, 104, 56, 0.1)',
    borderColor: 'rgba(255, 104, 56, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Enforces mandatory TP/SL on every trade',
      'Validates position size vs account balance',
      'Monitors daily drawdown usage',
      'Blocks trades exceeding daily trade limit',
      'Checks leverage against configured max',
    ],
  },
  {
    id: 'kai',
    name: 'Kai',
    role: 'Trade Scorer',
    description:
      'Scores every trade 0-10 before execution. Evaluates indicator alignment, entry quality, and risk-reward ratio.',
    color: '#00C076',
    bgColor: 'rgba(0, 192, 118, 0.1)',
    borderColor: 'rgba(0, 192, 118, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Scores trade setups 0-10',
      'Checks indicator alignment with strategy',
      'Evaluates entry style match',
      'Calculates risk-reward quality',
      'Compares to historical winning score average',
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Market Intel',
    description:
      'Researches the outside world. Analyzes market regime, news sentiment, and on-chain data via connected sources.',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Detects market regime (trending / ranging / volatile)',
      'Pulls data from CMC, CoinGecko, BlockScout',
      'Monitors funding rates and open interest',
      'Flags unfavorable market conditions',
      'Tracks macro events (FOMC, CPI)',
    ],
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Psych Monitor',
    description:
      'Watches your emotional patterns. Detects revenge trading, FOMO, tilt, and loss-chasing behavior in real time.',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Detects rapid consecutive trade placement',
      'Flags increasing position size after losses',
      'Identifies trading outside preferred sessions',
      'Monitors deviation from normal trade frequency',
      'Warns after consecutive loss streaks',
    ],
  },
  {
    id: 'rex',
    name: 'Rex',
    role: 'Strategy Guard',
    description:
      'Guards your trading plan. Flags when you deviate from the strategy you defined and tracks strategy drift over time.',
    color: '#EAB308',
    bgColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Compares each trade to configured strategy',
      'Detects entry style mismatch',
      'Flags ignored indicator signals',
      'Tracks strategy deviation percentage',
      'Reports drift in post-session debrief',
    ],
  },
  {
    id: 'aria',
    name: 'Aria',
    role: 'Memory & Journal',
    description:
      'Your trade journal and learning engine. Records every decision, generates session debriefs, and tracks improvement.',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    isSupervisor: false,
    defaultEnabled: true,
    skills: [
      'Auto-journals every trade with context',
      'Generates end-of-session debrief',
      'Tracks override history and outcomes',
      'Identifies best/worst performing sessions',
      'Calculates discipline reward points',
    ],
  },
]
