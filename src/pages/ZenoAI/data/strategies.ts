export interface Strategy {
  id: string
  name: string
  description: string
}

export interface StrategyCategory {
  id: string
  title: string
  description: string
  strategies: Strategy[]
}

export const strategyCategories: StrategyCategory[] = [
  {
    id: 'momentum',
    title: 'Momentum Indicators',
    description: 'Detect overbought/oversold and trend strength',
    strategies: [
      {
        id: 'rsi_divergence',
        name: 'RSI Divergence',
        description: 'RSI diverges from price for reversal signals',
      },
      {
        id: 'rsi_ob_os',
        name: 'RSI Overbought/Oversold',
        description: 'RSI >70 sell zones, <30 buy zones',
      },
      {
        id: 'macd_crossover',
        name: 'MACD Crossover',
        description: 'MACD line crosses signal line',
      },
      {
        id: 'macd_histogram',
        name: 'MACD Histogram Divergence',
        description: 'Histogram diverges from price action',
      },
      {
        id: 'stochastic_rsi',
        name: 'Stochastic RSI',
        description: 'Stochastic applied to RSI for momentum',
      },
    ],
  },
  {
    id: 'trend',
    title: 'Trend Following',
    description: 'Ride trends with moving averages and channels',
    strategies: [
      {
        id: 'ema_crossover',
        name: 'EMA Crossover (9/21)',
        description: 'Fast EMA crosses slow EMA for entry',
      },
      {
        id: 'ema_ribbon',
        name: 'EMA Ribbon (8/13/21/55)',
        description: 'Multiple EMAs stacked for trend strength',
      },
      {
        id: 'ichimoku',
        name: 'Ichimoku Cloud',
        description: 'Cloud-based support/resistance + trend signals',
      },
      {
        id: 'supertrend',
        name: 'Supertrend',
        description: 'ATR-based directional trend indicator',
      },
    ],
  },
  {
    id: 'volatility',
    title: 'Volatility Strategies',
    description: 'Trade expansions and contractions',
    strategies: [
      {
        id: 'bb_squeeze',
        name: 'Bollinger Band Squeeze',
        description: 'Bands narrow before major breakout',
      },
      {
        id: 'bb_bounce',
        name: 'Bollinger Band Bounce',
        description: 'Price touches band for mean reversion',
      },
      {
        id: 'atr_trailing',
        name: 'ATR Trailing Stop',
        description: 'Dynamic stop loss based on volatility',
      },
    ],
  },
  {
    id: 'volume',
    title: 'Volume-Based',
    description: 'Use volume for confirmation and levels',
    strategies: [
      {
        id: 'vwap',
        name: 'VWAP Deviation',
        description: 'Trade deviations from volume-weighted average',
      },
      {
        id: 'volume_profile',
        name: 'Volume Profile',
        description: 'High-volume nodes as support/resistance',
      },
    ],
  },
  {
    id: 'smart_money',
    title: 'Smart Money Concepts',
    description: 'Institutional order flow and liquidity',
    strategies: [
      {
        id: 'order_blocks',
        name: 'Order Block Entries',
        description: 'Enter at institutional accumulation zones',
      },
      {
        id: 'fvg',
        name: 'Fair Value Gap (FVG)',
        description: 'Trade into unfilled price imbalances',
      },
      {
        id: 'liquidity_sweep',
        name: 'Liquidity Sweep + Reversal',
        description: 'Stop hunt followed by direction change',
      },
      {
        id: 'bos',
        name: 'Break of Structure (BOS)',
        description: 'Continuation after structure break',
      },
      {
        id: 'choch',
        name: 'Change of Character (CHoCH)',
        description: 'Reversal on structural character change',
      },
    ],
  },
  {
    id: 'price_action',
    title: 'Price Action & Patterns',
    description: 'Pure chart reading — no indicators needed',
    strategies: [
      {
        id: 'support_resistance',
        name: 'Support / Resistance Bounces',
        description: 'Trade reactions at key horizontal levels',
      },
      {
        id: 'trendline_break',
        name: 'Trendline Break + Retest',
        description: 'Breakout from trendline with confirmation',
      },
      {
        id: 'double_top_bottom',
        name: 'Double Top / Bottom',
        description: 'Classic reversal patterns',
      },
      {
        id: 'head_shoulders',
        name: 'Head & Shoulders',
        description: 'Reversal with neckline break',
      },
      {
        id: 'engulfing',
        name: 'Engulfing Candle',
        description: 'Strong single-candle reversal signal',
      },
      {
        id: 'pin_bar',
        name: 'Pin Bar Rejection',
        description: 'Wick rejection at key levels',
      },
      {
        id: 'inside_bar',
        name: 'Inside Bar Breakout',
        description: 'Consolidation breakout pattern',
      },
    ],
  },
  {
    id: 'crypto_specific',
    title: 'Crypto-Specific',
    description: 'On-chain and derivatives-specific strategies',
    strategies: [
      {
        id: 'funding_rate',
        name: 'Funding Rate Signal',
        description: 'Directional bias from perpetual funding',
      },
      {
        id: 'oi_divergence',
        name: 'Open Interest Divergence',
        description: 'OI vs price for positioning signals',
      },
      {
        id: 'liquidation_heatmap',
        name: 'Liquidation Heatmap',
        description: 'Trade into liquidation cluster levels',
      },
      {
        id: 'whale_tracking',
        name: 'On-Chain Whale Tracking',
        description: 'Large wallet movements as signals',
      },
    ],
  },
]
