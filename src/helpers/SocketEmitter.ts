const SocketEmitter = {
  Emitter: {
    '1m': 'current_1m_data',
    '3m': 'current_3m_data',
    '5m': 'current_5m_data',
    '15m': 'current_15m_data',
    '30m': 'current_30m_data',
    '1h': 'current_1h_data',
    '4h': 'current_4h_data',
    '1d': 'current_1d_data',
    '1w': 'current_1w_data',
    '1month': 'current_1month_data',
    live_prices: 'live_prices',
    // if below condition is touched it changes to open
    user_open_position: 'user_open_positions',
    // Limit Order and price less than Market (Buy) or greater than TickMarkType(Sell)
    user_pending_positions: 'user_pending_positions',
  },
  DashboardEmitter: {
    challenge_dashboard_socket: 'challenge_dashboard_socket',
  },
}

export default SocketEmitter
