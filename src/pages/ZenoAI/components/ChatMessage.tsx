import {memo} from 'react'

import {agentDefinitions} from '../data/agents'

export interface TradeScore {
  score: number
  supporting: string[]
  concerns: string[]
  recommendation: string
  agentInsights: {agentId: string; message: string}[]
}

export interface ChatMessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  tradeScore?: TradeScore
  tradeAction?: {
    symbol: string
    side: 'long' | 'short'
    entry: number
    tp: number
    sl: number
  }
  status?: 'pending' | 'approved' | 'rejected' | 'executed'
  agentsWorking?: string[]
}

const ScoreRing = ({score}: {score: number}) => {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const progress = (score / 10) * circumference
  const color = score >= 7 ? '#00C076' : score >= 5 ? '#EAB308' : '#FF6838'

  return (
    <div className="relative w-[72px] h-[72px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          fill="none"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          fill="none"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          strokeWidth="4"
          style={{transition: 'stroke-dashoffset 1s ease-out'}}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{color}}>
          {score}
        </span>
        <span className="text-[10px] text-text-hint-color">/10</span>
      </div>
    </div>
  )
}

const TradeScoreCard = ({
  tradeScore,
  tradeAction,
  status,
  onApprove,
  onReject,
}: {
  tradeScore: TradeScore
  tradeAction?: ChatMessageData['tradeAction']
  status?: string
  onApprove: () => void
  onReject: () => void
}) => (
  <div className="rounded-xl border border-primary-border-color bg-tertiary-bg-color overflow-hidden mt-3">
    {/* Trade header */}
    {tradeAction && (
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary-border-color bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-md ${tradeAction.side === 'long' ? 'bg-[rgba(0,192,118,0.15)] text-[#00C076]' : 'bg-[rgba(255,104,56,0.15)] text-[#FF6838]'}`}
          >
            {tradeAction.side.toUpperCase()}
          </span>
          <span className="text-sm font-bold text-primary-color">
            {tradeAction.symbol}
          </span>
        </div>
        {status && (
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase
            ${status === 'executed' ? 'bg-[rgba(0,192,118,0.15)] text-[#00C076]' : status === 'rejected' ? 'bg-[rgba(255,104,56,0.15)] text-[#FF6838]' : 'bg-[rgba(234,179,8,0.15)] text-[#EAB308]'}`}
          >
            {status}
          </span>
        )}
      </div>
    )}

    {/* Score + details */}
    <div className="px-4 py-4">
      <div className="flex items-start gap-4">
        <ScoreRing score={tradeScore.score} />
        <div className="flex-1 min-w-0">
          {/* Trade params */}
          {tradeAction && (
            <div className="flex gap-4 mb-3 text-xs">
              <div>
                <span className="text-text-hint-color">Entry </span>
                <span className="text-primary-color font-medium">
                  ${tradeAction.entry.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-text-hint-color">TP </span>
                <span className="text-[#00C076] font-medium">
                  ${tradeAction.tp.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-text-hint-color">SL </span>
                <span className="text-[#FF6838] font-medium">
                  ${tradeAction.sl.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Supporting */}
          {tradeScore.supporting.length > 0 && (
            <div className="mb-2">
              <div className="text-[10px] text-[#00C076] font-bold uppercase mb-1">
                Supporting
              </div>
              {tradeScore.supporting.map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-1.5 text-xs text-tertiary-color mb-0.5"
                >
                  <span className="text-[#00C076] mt-0.5">+</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}

          {/* Concerns */}
          {tradeScore.concerns.length > 0 && (
            <div className="mb-2">
              <div className="text-[10px] text-[#FF6838] font-bold uppercase mb-1">
                Concerns
              </div>
              {tradeScore.concerns.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-1.5 text-xs text-tertiary-color mb-0.5"
                >
                  <span className="text-[#FF6838] mt-0.5">-</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent insights */}
      {tradeScore.agentInsights.length > 0 && (
        <div className="mt-3 pt-3 border-t border-primary-border-color">
          <div className="flex flex-wrap gap-2">
            {tradeScore.agentInsights.map((insight) => {
              const agent = agentDefinitions.find(
                (a) => a.id === insight.agentId
              )
              if (!agent) return null
              return (
                <div
                  key={insight.agentId}
                  className="flex items-start gap-1.5 text-xs px-2 py-1.5 rounded-lg"
                  style={{backgroundColor: agent.bgColor}}
                >
                  <span
                    className="font-bold shrink-0"
                    style={{color: agent.color}}
                  >
                    {agent.name}:
                  </span>
                  <span className="text-tertiary-color">{insight.message}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {tradeScore.recommendation && (
        <div className="mt-3 p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-primary-border-color">
          <div className="text-[10px] text-[#7B61FF] font-bold uppercase mb-1">
            Zeno Recommendation
          </div>
          <div className="text-xs text-tertiary-color leading-relaxed">
            {tradeScore.recommendation}
          </div>
        </div>
      )}
    </div>

    {/* Action buttons */}
    {(!status || status === 'pending') && (
      <div className="flex border-t border-primary-border-color">
        <button
          className="flex-1 py-3 text-sm font-bold text-[#FF6838] hover:bg-[rgba(255,104,56,0.05)] transition-colors cursor-pointer border-r border-primary-border-color"
          onClick={onReject}
          type="button"
        >
          Reject
        </button>
        <button
          className="flex-1 py-3 text-sm font-bold text-primary-color hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer border-r border-primary-border-color"
          type="button"
        >
          Modify
        </button>
        <button
          className="flex-1 py-3 text-sm font-bold text-[#00C076] hover:bg-[rgba(0,192,118,0.05)] transition-colors cursor-pointer"
          onClick={onApprove}
          type="button"
        >
          Approve
        </button>
      </div>
    )}
  </div>
)

const ChatMessage = ({
  message,
  onApprove,
  onReject,
}: {
  message: ChatMessageData
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-2 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
        ${isUser ? 'bg-[rgba(255,255,255,0.1)] text-primary-color' : 'bg-[rgba(0,192,118,0.15)] text-[#00C076]'}`}
      >
        {isUser ? 'Y' : 'Z'}
      </div>

      {/* Message */}
      <div
        className={`flex-1 max-w-[90%] sm:max-w-[85%] ${isUser ? 'text-right' : ''}`}
      >
        <div
          className={`inline-block text-left rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser ? 'bg-[rgba(255,255,255,0.08)] text-primary-color rounded-tr-md' : 'bg-tertiary-bg-color text-tertiary-color border border-primary-border-color rounded-tl-md'}`}
        >
          {message.content}
        </div>

        {/* Trade score card */}
        {message.tradeScore && (
          <TradeScoreCard
            onApprove={() => onApprove(message.id)}
            onReject={() => onReject(message.id)}
            status={message.status}
            tradeAction={message.tradeAction}
            tradeScore={message.tradeScore}
          />
        )}

        {/* Timestamp */}
        <div
          className={`text-[10px] text-text-hint-color mt-1 ${isUser ? 'text-right' : ''}`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(ChatMessage)
