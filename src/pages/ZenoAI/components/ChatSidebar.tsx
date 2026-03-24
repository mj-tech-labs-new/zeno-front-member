import React, {memo, useCallback, useState} from 'react'

import {agentDefinitions} from '../data/agents'
import {strategyCategories} from '../data/strategies'

interface ChatSidebarProps {
  agentStates: Record<string, boolean>
  onToggleAgent: (id: string) => void
  activeAgents: string[]
  connectors: Record<string, boolean>
  onToggleConnector: (id: string) => void
  selectedStrategies: string[]
  onToggleStrategy: (id: string) => void
}

/* ─── Agent Avatar SVGs (distinct faces) ─── */
const AgentAvatar = ({
  agentId,
  color,
  size = 24,
}: {
  agentId: string
  color: string
  size?: number
}) => {
  const avatars: Record<string, JSX.Element> = {
    zeno_core: (
      // Robot / AI face
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <rect
          fill={color}
          height="18"
          opacity="0.2"
          rx="6"
          width="20"
          x="6"
          y="8"
        />
        <circle
cx="12" cy="16"
fill={color} r="2" />
        <circle
cx="20" cy="16"
fill={color} r="2" />
        <rect
fill={color} height="2"
rx="1" width="8"
x="12" y="21" />
        <rect
fill={color} height="4"
rx="1" width="2"
x="15" y="4" />
        <circle
cx="16" cy="4"
fill={color} r="2" />
      </svg>
    ),
    marcus: (
      // Older male — shield/guard face, stern
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="13"
fill={color} opacity="0.2"
r="8" />
        <path
          d="M10 12C10 12 12 9 16 9C20 9 22 12 22 12"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <circle
cx="13" cy="14"
fill={color} r="1.5" />
        <circle
cx="19" cy="14"
fill={color} r="1.5" />
        <path
          d="M13 18H19"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M9 10C9 10 10 7 16 7C22 7 23 10 23 10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M8 24C8 20 12 18 16 18C20 18 24 20 24 24"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    kai: (
      // Young male — energetic, sharp features
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="13"
fill={color} opacity="0.2"
r="8" />
        <circle
cx="13" cy="13"
fill={color} r="1.5" />
        <circle
cx="19" cy="13"
fill={color} r="1.5" />
        <path
          d="M13 17C13 17 14.5 19 16 19C17.5 19 19 17 19 17"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M10 9L14 10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M22 9L18 10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M12 6C12 6 14 5 16 5C18 5 20 6 20 6"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M8 24C8 20 12 18 16 18C20 18 24 20 24 24"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    atlas: (
      // Aged male — wise, globe/world explorer
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="13"
fill={color} opacity="0.2"
r="8" />
        <circle
cx="13" cy="13"
fill={color} r="1.2" />
        <circle
cx="19" cy="13"
fill={color} r="1.2" />
        <path
          d="M13 17.5H19"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M10 10C10 10 12 8 16 8C20 8 22 10 22 10"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M11 7L13 9"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.2"
        />
        <path
          d="M21 7L19 9"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.2"
        />
        <circle
          cx="16"
          cy="5"
          fill="none"
          r="2"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M8 24C8 20 12 18 16 18C20 18 24 20 24 24"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    elena: (
      // Female — long hair, eyelashes, soft smile
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="14"
fill={color} opacity="0.15"
r="9" />
        {/* Long flowing hair */}
        <path
          d="M7 10C7 5 11 3 16 3C21 3 25 5 25 10V16C25 16 24 18 23 19"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M7 10V16C7 16 8 18 9 19"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M7 12C5 14 5 18 6 21"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M25 12C27 14 27 18 26 21"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        {/* Eyes with lashes */}
        <circle
cx="13" cy="13"
fill={color} r="1.3" />
        <circle
cx="19" cy="13"
fill={color} r="1.3" />
        <path
          d="M11 11.5L12.5 12.5"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        <path
          d="M11.5 10.8L12.8 12"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        <path
          d="M20.5 11.5L19.5 12.5"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        <path
          d="M20.5 10.8L19.2 12"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        {/* Soft smile */}
        <path
          d="M13.5 17C13.5 17 14.8 19 16 19C17.2 19 18.5 17 18.5 17"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.3"
        />
        <path
          d="M9 22C9 20 12 18 16 18C20 18 23 20 23 22"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.2"
        />
      </svg>
    ),
    rex: (
      // Young male — watchful, alert eyes
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="13"
fill={color} opacity="0.2"
r="8" />
        <ellipse
cx="13" cy="13"
fill={color} rx="2"
ry="1.5" />
        <ellipse
cx="19" cy="13"
fill={color} rx="2"
ry="1.5" />
        <circle
cx="13" cy="13"
fill="#101010" r="0.8" />
        <circle
cx="19" cy="13"
fill="#101010" r="0.8" />
        <path
          d="M14 18H18"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M10 10L14 11"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M22 10L18 11"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M8 24C8 20 12 18 16 18C20 18 24 20 24 24"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    aria: (
      // Female — bob hair, gentle eyes, warm smile
      <svg
fill="none" height={size}
viewBox="0 0 32 32" width={size}>
        <circle
cx="16" cy="14"
fill={color} opacity="0.15"
r="9" />
        {/* Bob/shoulder-length hair */}
        <path
          d="M8 9C8 4 11 2 16 2C21 2 24 4 24 9V14"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M8 9V17C8 17 9 19 10 19.5"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M24 9V17C24 17 23 19 22 19.5"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="2"
        />
        {/* Eyes with lashes */}
        <circle
cx="13" cy="13"
fill={color} r="1.2" />
        <circle
cx="19" cy="13"
fill={color} r="1.2" />
        <path
          d="M11.2 11.5L12.5 12.3"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        <path
          d="M20.8 11.5L19.5 12.3"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="0.8"
        />
        {/* Warm gentle smile */}
        <path
          d="M13 17C13 17 14.5 18.5 16 18.5C17.5 18.5 19 17 19 17"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.3"
        />
        {/* Blush dots */}
        <circle
cx="11" cy="16"
fill={color} opacity="0.25"
r="1.2" />
        <circle
cx="21" cy="16"
fill={color} opacity="0.25"
r="1.2" />
        <path
          d="M10 22C10 20 12 19 16 19C20 19 22 20 22 22"
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.2"
        />
      </svg>
    ),
  }
  return (
    avatars[agentId] ?? (
      <span style={{color, fontSize: size * 0.45, fontWeight: 700}}>
        {agentId[0].toUpperCase()}
      </span>
    )
  )
}

/* ─── Connector Brand Icons ─── */
const ConnectorIcon = ({
  connectorId,
  enabled,
}: {
  connectorId: string
  enabled: boolean
}) => {
  const opacity = enabled ? 1 : 0.35
  const icons: Record<string, JSX.Element> = {
    cmc: (
      // CoinMarketCap — blue circle with upward arrow/chart motif
      <svg
height="18" style={{opacity}}
viewBox="0 0 76.52 77.67" width="18">
        <path
          d="M66.54 46.41a4.09 4.09 0 0 1-4.17.28c-1.54-.87-2.37-2.91-2.37-5.73V34.8c0-3.92-1.53-6.2-4.09-6.09-3.29.14-5.81 4.18-7.67 8.05l-5.66 11.82V30.32c-.1-3.28-1.22-5.6-3.31-5.72a4 4 0 0 0-3.41 1.94L21.43 53.6a26.59 26.59 0 0 1-3.07-12.47 26.71 26.71 0 0 1 53.42 0 26.18 26.18 0 0 1-.67 5.88c-.73 2.6-2.28 4.22-4.57 4.3ZM38.26 0a38.62 38.62 0 0 0-9.87 76 1.58 1.58 0 0 0 .49.08 1.54 1.54 0 0 0 .49-3 35.54 35.54 0 1 1 24.49.82 1.54 1.54 0 1 0 1.42 2.73A38.62 38.62 0 0 0 38.26 0Z"
          fill={enabled ? '#3861FB' : '#555'}
        />
      </svg>
    ),
    coingecko: (
      // CoinGecko — green gecko character
      <svg
height="18" style={{opacity}}
viewBox="0 0 276 276" width="18">
        <circle
cx="138" cy="138"
fill={enabled ? '#8DC63F' : '#555'} r="138" />
        <path
          d="M196.2 82.3c-4.1-4.8-10.5-7-16.8-5.9-10.5 1.9-16.6 11.9-16.6 11.9s-12-4.8-27-4.8c-48.5 0-71.5 35.5-71.5 67.5 0 32 20.5 60 60 60s62.5-28 62.5-60c0-14.5-3-25.5-7.5-34 3-3 8.5-6 13.5-5.5 5.5.5 9 4 9 4s3-8.7.5-15.2c-2-5.5-6.1-18-6.1-18Z"
          fill="white"
        />
        <circle
cx="157" cy="118"
fill={enabled ? '#8DC63F' : '#555'} r="8" />
        <circle
cx="157" cy="118"
fill="#333" r="5" />
        <circle
cx="155" cy="116"
fill="white" r="2" />
      </svg>
    ),
    blockscout: (
      <svg
height="16" style={{opacity}}
viewBox="0 0 24 24" width="16">
        <rect
          fill={enabled ? '#4A6CF7' : '#555'}
          height="16"
          rx="3"
          width="16"
          x="4"
          y="4"
        />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    tradingview: (
      <svg
height="16" style={{opacity}}
viewBox="0 0 24 24" width="16">
        <rect
          fill={enabled ? '#2962FF' : '#555'}
          height="20"
          rx="4"
          width="20"
          x="2"
          y="2"
        />
        <path
          d="M6 15L10 10L14 13L18 7"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
cx="18" cy="7"
fill="white" r="1.5" />
      </svg>
    ),
    economic_cal: (
      <svg
height="16" style={{opacity}}
viewBox="0 0 24 24" width="16">
        <rect
          fill={enabled ? '#FF6838' : '#555'}
          height="16"
          rx="3"
          width="16"
          x="4"
          y="5"
        />
        <path
d="M4 10H20" stroke="white"
strokeWidth="1.5" />
        <rect
fill="white" height="2"
rx="0.5" width="2"
x="7" y="12" />
        <rect
fill="white" height="2"
rx="0.5" width="2"
x="11" y="12" />
        <rect
fill="white" height="2"
rx="0.5" width="2"
x="15" y="12" />
        <rect
fill="white" height="2"
rx="0.5" width="2"
x="7" y="16" />
        <rect
fill="white" height="2"
rx="0.5" width="2"
x="11" y="16" />
        <path
          d="M9 5V3M15 5V3"
          stroke={enabled ? '#FF6838' : '#555'}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    ),
  }
  return icons[connectorId] ?? null
}

const connectorList = [
  {id: 'cmc', name: 'CoinMarketCap'},
  {id: 'coingecko', name: 'CoinGecko'},
  {id: 'blockscout', name: 'BlockScout'},
  {id: 'tradingview', name: 'TradingView'},
  {id: 'economic_cal', name: 'Economic Calendar'},
]

/* ─── Shared UI ─── */
const SectionHeader = ({
  title,
  expanded,
  onToggle,
  badge,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  badge?: string
}) => (
  <button
    className="w-full flex items-center justify-between py-2.5 cursor-pointer"
    onClick={onToggle}
    type="button"
  >
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-tertiary-color uppercase tracking-wider">
        {title}
      </span>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[rgba(0,192,118,0.15)] text-[#00C076] font-bold">
          {badge}
        </span>
      )}
    </div>
    <svg
      className={`w-3 h-3 text-text-hint-color transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 9l-7 7-7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  </button>
)

const MiniToggle = ({
  enabled,
  onToggle,
}: {
  enabled: boolean
  onToggle: () => void
}) => (
  <button
    aria-label="Toggle"
    className={`w-8 h-[18px] rounded-full p-[2px] transition-all duration-200 cursor-pointer shrink-0 ${enabled ? 'bg-[#00C076]' : 'bg-neutral-active-color'}`}
    onClick={onToggle}
    type="button"
  >
    <div
      className={`w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-[14px]' : 'translate-x-0'}`}
    />
  </button>
)

/* ─── Confirmation Modal ─── */
const ConfirmModal = ({
  connectorName,
  action,
  onConfirm,
  onCancel,
}: {
  connectorName: string
  action: 'on' | 'off'
  onConfirm: () => void
  onCancel: () => void
}) => (
  <div
    className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4"
    onClick={onCancel}
  >
    <div
      className="bg-secondary-bg-color border border-primary-border-color rounded-2xl p-5 max-w-[280px] w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-sm font-bold text-primary-color mb-2">
        {action === 'off' ? 'Disconnect' : 'Connect'} {connectorName}?
      </div>
      <p className="text-xs text-text-hint-color mb-4">
        {action === 'off'
          ? `Are you sure you want to turn off ${connectorName}? Zeno will lose access to this data source.`
          : `Are you sure you want to turn on ${connectorName}? Zeno will start pulling data from this source.`}
      </p>
      <div className="flex gap-2">
        <button
          className="flex-1 py-2 rounded-lg border border-primary-border-color text-tertiary-color text-xs font-medium cursor-pointer hover:bg-[rgba(255,255,255,0.03)]"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-white text-xs font-bold cursor-pointer ${action === 'off' ? 'bg-[#FF6838] hover:bg-[#e55a2e]' : 'bg-[#00C076] hover:bg-[#00a866]'}`}
          onClick={onConfirm}
          type="button"
        >
          {action === 'off' ? 'Turn Off' : 'Turn On'}
        </button>
      </div>
    </div>
  </div>
)

/* ─── Main Sidebar ─── */
const ChatSidebar = ({
  agentStates,
  onToggleAgent,
  activeAgents,
  connectors,
  onToggleConnector,
  selectedStrategies,
  onToggleStrategy,
}: ChatSidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string>('agents')
  const [confirmModal, setConfirmModal] = useState<{
    id: string
    name: string
    action: 'on' | 'off'
  } | null>(null)

  const toggle = (section: string) =>
    setExpandedSection((prev) => (prev === section ? '' : section))

  const subAgents = agentDefinitions.filter((a) => !a.isSupervisor)
  const enabledAgentCount = subAgents.filter((a) => agentStates[a.id]).length
  const enabledConnectorCount = Object.values(connectors).filter(Boolean).length

  const handleConnectorToggle = useCallback(
    (id: string, name: string) => {
      const currentlyEnabled = connectors[id] ?? false
      setConfirmModal({id, name, action: currentlyEnabled ? 'off' : 'on'})
    },
    [connectors]
  )

  const confirmConnectorToggle = useCallback(() => {
    if (confirmModal) {
      onToggleConnector(confirmModal.id)
      setConfirmModal(null)
    }
  }, [confirmModal, onToggleConnector])

  return (
    <React.Fragment>
      {confirmModal && (
        <ConfirmModal
          action={confirmModal.action}
          connectorName={confirmModal.name}
          onCancel={() => setConfirmModal(null)}
          onConfirm={confirmConnectorToggle}
        />
      )}

      <div className="w-[220px] shrink-0 h-full bg-secondary-bg-color border-l border-primary-border-color flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b border-primary-border-color">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,192,118,0.15)] flex items-center justify-center">
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
              <div className="text-sm font-bold text-primary-color">
                Zeno AI
              </div>
              <div className="text-[10px] text-text-hint-color">
                Your trading companion
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto px-3 py-2 no-scrollbar">
          {/* ── AGENTS ── */}
          <SectionHeader
            badge={`${enabledAgentCount + 1}`}
            expanded={expandedSection === 'agents'}
            onToggle={() => toggle('agents')}
            title="Agents"
          />
          <div
            className={`transition-all duration-300 overflow-hidden ${expandedSection === 'agents' ? 'max-h-[500px]' : 'max-h-0'}`}
          >
            <div className="flex flex-col gap-1 pb-3">
              {/* Supervisor */}
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[rgba(123,97,255,0.06)]">
                <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <AgentAvatar
agentId="zeno_core" color="#7B61FF"
size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-primary-color truncate">
                    Zeno Core
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B61FF] animate-pulse" />
              </div>

              {/* Sub agents with face avatars */}
              {subAgents.map((agent) => {
                const enabled = agentStates[agent.id]
                const isWorking = activeAgents.includes(agent.id)
                return (
                  <div
                    key={agent.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <div
                      className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-all duration-300 ${isWorking ? 'animate-pulse' : ''} ${!enabled ? 'opacity-40' : ''}`}
                    >
                      <AgentAvatar
                        agentId={agent.id}
                        color={agent.color}
                        size={28}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-medium truncate ${enabled ? 'text-primary-color' : 'text-text-hint-color'}`}
                      >
                        {agent.name}
                      </div>
                    </div>
                    {isWorking && (
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{backgroundColor: agent.color}}
                      />
                    )}
                    <MiniToggle
                      enabled={enabled}
                      onToggle={() => onToggleAgent(agent.id)}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-primary-border-color my-1" />

          {/* ── CONNECTORS with brand icons ── */}
          <SectionHeader
            badge={`${enabledConnectorCount}`}
            expanded={expandedSection === 'connectors'}
            onToggle={() => toggle('connectors')}
            title="Connectors"
          />
          <div
            className={`transition-all duration-300 overflow-hidden ${expandedSection === 'connectors' ? 'max-h-[300px]' : 'max-h-0'}`}
          >
            <div className="flex flex-col gap-1 pb-3">
              {connectorList.map((connector) => {
                const enabled = connectors[connector.id] ?? false
                return (
                  <div
                    key={connector.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0">
                      <ConnectorIcon
                        connectorId={connector.id}
                        enabled={enabled}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-medium truncate ${enabled ? 'text-primary-color' : 'text-text-hint-color'}`}
                      >
                        {connector.name}
                      </div>
                    </div>
                    <MiniToggle
                      enabled={enabled}
                      onToggle={() =>
                        handleConnectorToggle(connector.id, connector.name)
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-primary-border-color my-1" />

          {/* ── STRATEGIES with clearer toggles ── */}
          <SectionHeader
            badge={`${selectedStrategies.length}`}
            expanded={expandedSection === 'strategies'}
            onToggle={() => toggle('strategies')}
            title="Strategies"
          />
          <div
            className={`transition-all duration-300 overflow-hidden ${expandedSection === 'strategies' ? 'max-h-[600px]' : 'max-h-0'}`}
          >
            <div className="flex flex-col gap-0.5 pb-3 max-h-[300px] overflow-y-auto no-scrollbar">
              {strategyCategories.map((cat) => (
                <div key={cat.id}>
                  <div className="text-[10px] text-text-hint-color font-medium px-2 pt-2 pb-1 uppercase">
                    {cat.title}
                  </div>
                  {cat.strategies.map((strategy) => {
                    const selected = selectedStrategies.includes(strategy.id)
                    return (
                      <div
                        key={strategy.id}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                      >
                        <span
                          className={`flex-1 text-[11px] leading-tight truncate ${selected ? 'text-primary-color' : 'text-text-hint-color'}`}
                        >
                          {strategy.name}
                        </span>
                        <MiniToggle
                          enabled={selected}
                          onToggle={() => onToggleStrategy(strategy.id)}
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom - Settings */}
        <div className="px-3 py-3 border-t border-primary-border-color">
          <button
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer"
            type="button"
          >
            <svg
              className="w-4 h-4 text-text-hint-color"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-xs text-text-hint-color">
              Reconfigure Zeno AI
            </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default memo(ChatSidebar)
