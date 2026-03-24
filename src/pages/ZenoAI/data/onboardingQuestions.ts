export interface OnboardingOption {
  id: string
  label: string
  description?: string
  icon?: string
}

export interface OnboardingQuestion {
  id: string
  step: number
  title: string
  subtitle: string
  type: 'single' | 'multi' | 'slider'
  options?: OnboardingOption[]
  sliderConfig?: {
    min: number
    max: number
    step: number
    unit: string
    labels?: Record<number, string>
  }
}

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 'experience',
    step: 1,
    title: 'How long have you been trading crypto?',
    subtitle: 'This helps Zeno calibrate guidance to your level',
    type: 'single',
    options: [
      {
        id: 'beginner',
        label: 'Less than 6 months',
        description: 'Just getting started',
      },
      {
        id: 'intermediate',
        label: '6 - 12 months',
        description: 'Building experience',
      },
      {
        id: 'experienced',
        label: '1 - 3 years',
        description: 'Solid foundation',
      },
      {id: 'veteran', label: '3+ years', description: 'Battle-tested'},
    ],
  },
  {
    id: 'markets',
    step: 2,
    title: 'What markets have you traded?',
    subtitle: 'Select all that apply',
    type: 'multi',
    options: [
      {id: 'crypto_spot', label: 'Crypto Spot'},
      {id: 'crypto_perps', label: 'Crypto Perpetuals'},
      {id: 'forex', label: 'Forex'},
      {id: 'stocks', label: 'Stocks & Equities'},
      {id: 'gold_silver', label: 'Gold & Silver'},
      {id: 'options', label: 'Options / Derivatives'},
    ],
  },
  {
    id: 'prop_firm',
    step: 3,
    title: 'Have you attempted a prop firm challenge before?',
    subtitle: 'No judgement — this helps Zeno coach you better',
    type: 'single',
    options: [
      {
        id: 'passed',
        label: 'Yes, and I passed',
        description: 'Ready for the next level',
      },
      {
        id: 'failed',
        label: 'Yes, but I failed',
        description: 'Learning from experience',
      },
      {id: 'never', label: 'No, this is my first', description: 'Fresh start'},
    ],
  },
  {
    id: 'win_rate',
    step: 4,
    title: 'What is your approximate win rate?',
    subtitle: 'Over your last 30 trades — be honest, Zeno learns from this',
    type: 'slider',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      labels: {
        0: "I don't track",
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%',
      },
    },
  },
  {
    id: 'trading_style',
    step: 5,
    title: 'What is your trading style?',
    subtitle: 'How long do you typically hold positions?',
    type: 'single',
    options: [
      {
        id: 'scalper',
        label: 'Scalper',
        description: 'Seconds to minutes',
      },
      {
        id: 'day_trader',
        label: 'Day Trader',
        description: 'Minutes to hours',
      },
      {
        id: 'swing_trader',
        label: 'Swing Trader',
        description: 'Hours to days',
      },
      {
        id: 'position_trader',
        label: 'Position Trader',
        description: 'Days to weeks',
      },
    ],
  },
  {
    id: 'sessions',
    step: 6,
    title: 'Which trading sessions do you prefer?',
    subtitle: 'Select all that apply',
    type: 'multi',
    options: [
      {id: 'asian', label: 'Asian Session', description: '00:00 - 08:00 UTC'},
      {
        id: 'european',
        label: 'European Session',
        description: '08:00 - 16:00 UTC',
      },
      {id: 'us', label: 'US Session', description: '13:00 - 21:00 UTC'},
      {id: 'all', label: 'All Sessions', description: 'No preference'},
    ],
  },
  {
    id: 'trades_per_day',
    step: 7,
    title: 'How many trades do you take per day?',
    subtitle: 'On average',
    type: 'single',
    options: [
      {id: '1_3', label: '1 - 3 trades', description: 'Selective & patient'},
      {
        id: '4_10',
        label: '4 - 10 trades',
        description: 'Active but controlled',
      },
      {id: '11_20', label: '11 - 20 trades', description: 'Frequent trader'},
      {id: '20_plus', label: '20+ trades', description: 'High frequency'},
    ],
  },
  {
    id: 'weakness',
    step: 8,
    title: 'What is your biggest trading weakness?',
    subtitle: 'Select all that apply — this is where Zeno focuses most',
    type: 'multi',
    options: [
      {id: 'revenge', label: 'Revenge Trading'},
      {id: 'stop_loss', label: 'Moving Stop Loss'},
      {id: 'over_leverage', label: 'Over-leveraging'},
      {id: 'fomo', label: 'FOMO Entries'},
      {id: 'early_exit', label: 'Exiting Too Early'},
      {id: 'no_sl', label: 'Trading Without Stop Loss'},
      {id: 'overtrading', label: 'Over-trading'},
    ],
  },
  {
    id: 'after_loss',
    step: 9,
    title: 'After a losing trade, what do you typically do?',
    subtitle: 'Be honest — Zeno uses this to detect emotional patterns',
    type: 'single',
    options: [
      {
        id: 'stop',
        label: 'Stop trading for the day',
        description: 'Disciplined approach',
      },
      {
        id: 'quick_trade',
        label: 'Take another trade quickly',
        description: 'Possible revenge pattern',
      },
      {
        id: 'increase_size',
        label: 'Increase position size',
        description: 'Dangerous escalation',
      },
      {
        id: 'follow_plan',
        label: 'Follow my plan normally',
        description: 'Emotionally controlled',
      },
    ],
  },
  {
    id: 'journaling',
    step: 10,
    title: 'Do you journal your trades?',
    subtitle: 'Aria, your journaling agent, picks up where you left off',
    type: 'single',
    options: [
      {
        id: 'consistent',
        label: 'Yes, consistently',
        description: 'Great habit',
      },
      {
        id: 'sometimes',
        label: 'Sometimes',
        description: 'Room to improve',
      },
      {
        id: 'never',
        label: 'No, never',
        description: 'Aria will handle this for you',
      },
    ],
  },
]
