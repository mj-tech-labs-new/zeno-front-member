import {useCallback, useEffect, useRef, useState} from 'react'

import ChatMessage, {ChatMessageData} from './components/ChatMessage'
import ChatSidebar from './components/ChatSidebar'

const DEMO_MESSAGES: ChatMessageData[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Welcome back. I'm Zeno, your AI trading companion. All 6 agents are active and monitoring. What trade are you looking at today?",
    timestamp: new Date(),
  },
]

const ZenoAIChat = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>(DEMO_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeAgents, setActiveAgents] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [agentStates, setAgentStates] = useState<Record<string, boolean>>({
    marcus: true,
    kai: true,
    atlas: true,
    elena: true,
    rex: true,
    aria: true,
  })

  const [connectors, setConnectors] = useState<Record<string, boolean>>({
    cmc: true,
    coingecko: true,
    blockscout: false,
    tradingview: true,
    economic_cal: true,
  })

  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([
    'rsi_divergence',
    'ema_crossover',
    'order_blocks',
  ])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const simulateAgentWork = useCallback(() => {
    const agents = ['marcus', 'kai', 'atlas', 'elena', 'rex', 'aria']
    let i = 0
    const interval = setInterval(() => {
      if (i < agents.length) {
        setActiveAgents((prev) => [...prev, agents[i]])
        i += 1
      } else {
        clearInterval(interval)
        setTimeout(() => setActiveAgents([]), 500)
      }
    }, 300)
  }, [])

  const handleSend = useCallback(() => {
    if (!input.trim()) return

    const userMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    simulateAgentWork()

    // Simulate AI response with trade scoring
    setTimeout(() => {
      const isTradeRequest =
        input.toLowerCase().includes('long') ||
        input.toLowerCase().includes('short') ||
        input.toLowerCase().includes('buy') ||
        input.toLowerCase().includes('sell') ||
        input.toLowerCase().includes('btc') ||
        input.toLowerCase().includes('entry')

      const aiMsg: ChatMessageData = isTradeRequest
        ? {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content:
              "I've analyzed your trade setup across all active agents. Here's the evaluation:",
            timestamp: new Date(),
            tradeAction: {
              symbol: 'BTC/USDT',
              side: input.toLowerCase().includes('short') ? 'short' : 'long',
              entry: 69500,
              tp: 71000,
              sl: 68000,
            },
            tradeScore: {
              score: 7.2,
              supporting: [
                'Entry above EMA 200, confirming trend alignment',
                'RSI at 48 — neutral zone, not overbought',
                'Risk-reward ratio 2.5:1, above your 2:1 minimum',
              ],
              concerns: [
                'Volume below average on this timeframe',
                'No clear Order Block at entry level',
              ],
              recommendation:
                'Solid setup overall. Consider waiting for a pullback to the nearest Order Block at $69,200 for stronger confluence. Your winning trades average 7.8 — this is close.',
              agentInsights: [
                {
                  agentId: 'marcus',
                  message: 'Risk parameters OK. 2 of 3 daily trades used.',
                },
                {
                  agentId: 'atlas',
                  message: 'Market trending bullish. No macro events today.',
                },
                {
                  agentId: 'elena',
                  message:
                    'No emotional flags detected. Normal trading pattern.',
                },
                {
                  agentId: 'rex',
                  message: 'Entry style matches your breakout configuration.',
                },
              ],
            },
            status: 'pending',
          }
        : {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content:
              "I understand. Let me know when you're ready to evaluate a trade setup, or if you'd like me to analyze current market conditions for your configured strategies. I'm here to help you trade with discipline.",
            timestamp: new Date(),
          }

      setIsTyping(false)
      setMessages((prev) => [...prev, aiMsg])
    }, 2500)
  }, [input, simulateAgentWork])

  const handleApprove = useCallback((msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? {...m, status: 'executed'} : m))
    )
    const executedMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: 'assistant',
      content:
        "Trade executed successfully. BTC/USDT Long position opened at $69,500. TP: $71,000 | SL: $68,000. Aria is logging this trade. I'll monitor your position and alert you if conditions change.",
      timestamp: new Date(),
    }
    setTimeout(() => setMessages((prev) => [...prev, executedMsg]), 500)
  }, [])

  const handleReject = useCallback((msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? {...m, status: 'rejected'} : m))
    )
    const rejectedMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: 'assistant',
      content:
        'Trade rejected. Good discipline — not every setup deserves your capital. Let me know when you see the next opportunity.',
      timestamp: new Date(),
    }
    setTimeout(() => setMessages((prev) => [...prev, rejectedMsg]), 500)
  }, [])

  const [showRightPanel, setShowRightPanel] = useState(false)

  return (
    <div className="flex h-full bg-primary-bg-color overflow-hidden relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-primary-border-color">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,192,118,0.15)] flex items-center justify-center shrink-0">
              <svg
fill="none" height="16"
viewBox="0 0 24 24" width="16">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#00C076"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#00C076"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#00C076"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-primary-color">
                Zeno AI
              </span>
              <span className="text-xs text-text-hint-color ml-2 hidden sm:inline">
                {Object.values(agentStates).filter(Boolean).length + 1} agents
                active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeAgents.length > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(0,192,118,0.1)] animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C076]" />
                <span className="text-[10px] text-[#00C076] font-medium">
                  Analyzing...
                </span>
              </div>
            )}
            <div className="w-2 h-2 rounded-full bg-[#00C076] animate-pulse hidden lg:block" />
            {/* Mobile: toggle right panel */}
            <button
              aria-label="Toggle agent panel"
              className="lg:hidden w-9 h-9 rounded-lg bg-secondary-bg-color border border-primary-border-color flex items-center justify-center cursor-pointer"
              onClick={() => setShowRightPanel((p) => !p)}
              type="button"
            >
              <svg
                className="w-4 h-4 text-tertiary-color"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 5v14M5 12h14"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,192,118,0.15)] flex items-center justify-center text-xs font-bold text-[#00C076] shrink-0">
                  Z
                </div>
                <div className="bg-tertiary-bg-color border border-primary-border-color rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full bg-text-hint-color animate-bounce"
                      style={{animationDelay: '0ms'}}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-text-hint-color animate-bounce"
                      style={{animationDelay: '150ms'}}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-text-hint-color animate-bounce"
                      style={{animationDelay: '300ms'}}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="px-3 sm:px-6 pb-3 sm:pb-4 pt-2">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3 p-3 rounded-2xl border border-primary-border-color bg-secondary-bg-color focus-within:border-[rgba(0,192,118,0.4)] transition-colors">
              <textarea
                aria-label="Trade setup message"
                className="flex-1 bg-transparent text-sm text-primary-color placeholder:text-text-hint-color resize-none outline-none min-h-[24px] max-h-[120px] leading-6"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell Zeno about your trade setup..."
                rows={1}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <button
                aria-label="Send message"
                disabled={!input.trim()}
                onClick={handleSend}
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
                  ${input.trim() ? 'bg-[#00C076] cursor-pointer hover:bg-[#00a866]' : 'bg-neutral-active-color cursor-not-allowed'}`}
              >
                <svg
fill="none" height="16"
viewBox="0 0 24 24" width="16">
                  <path
                    d="M22 2L11 13"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-text-hint-color">
                Zeno evaluates every trade against your configured strategy.
                Your rules, your accountability.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {showRightPanel && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setShowRightPanel(false)}
        />
      )}

      {/* Right Sidebar — Agents, Connectors, Strategies */}
      <div
        className={`
        lg:relative lg:block
        fixed top-0 right-0 h-full z-50
        transition-transform duration-300 ease-in-out
        ${showRightPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}
      >
        <ChatSidebar
          activeAgents={activeAgents}
          agentStates={agentStates}
          connectors={connectors}
          selectedStrategies={selectedStrategies}
          onToggleAgent={(id) =>
            setAgentStates((prev) => ({...prev, [id]: !prev[id]}))
          }
          onToggleConnector={(id) =>
            setConnectors((prev) => ({...prev, [id]: !prev[id]}))
          }
          onToggleStrategy={(id) =>
            setSelectedStrategies((prev) =>
              prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
            )
          }
        />
      </div>
    </div>
  )
}

export default ZenoAIChat
