import {useState} from 'react'

import {useZenoAI} from '../context/ZenoAIProvider'
import {agentDefinitions} from '../data/agents'

const AgentCard = ({
  agent,
  enabled,
  onToggle,
  expanded,
  onExpand,
}: {
  agent: (typeof agentDefinitions)[0]
  enabled: boolean
  onToggle: () => void
  expanded: boolean
  onExpand: () => void
}) => (
  <div
    className={`rounded-xl border overflow-hidden transition-all duration-300
      ${agent.isSupervisor ? 'border-[rgba(123,97,255,0.4)] bg-[rgba(123,97,255,0.05)]' : 'border-primary-border-color bg-secondary-bg-color'}`}
  >
    <div className="flex items-center justify-between p-4">
      <button
        className="flex items-center gap-3 flex-1 text-left cursor-pointer"
        onClick={onExpand}
        type="button"
      >
        {/* Agent color dot */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold"
          style={{backgroundColor: agent.bgColor, color: agent.color}}
        >
          {agent.name[0]}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary-color">
              {agent.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: agent.bgColor,
                color: agent.color,
              }}
            >
              {agent.role}
            </span>
          </div>
          <div className="text-xs text-text-hint-color truncate mt-0.5">
            {agent.description}
          </div>
        </div>
      </button>

      {/* Toggle switch */}
      {agent.isSupervisor ? (
        <div className="px-3 py-1 rounded-full bg-[rgba(123,97,255,0.2)] text-[#7B61FF] text-xs font-bold shrink-0">
          Always On
        </div>
      ) : (
        <button
          aria-label={`Toggle ${agent.name}`}
          onClick={onToggle}
          type="button"
          className={`w-12 h-7 rounded-full p-1 transition-all duration-300 shrink-0 cursor-pointer
            ${enabled ? 'bg-[#00C076]' : 'bg-neutral-active-color'}`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300
              ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
      )}
    </div>

    {/* Expanded skills */}
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden
        ${expanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-4 pb-4">
        <div className="text-xs text-text-hint-color font-medium mb-2 uppercase tracking-wide">
          Skills
        </div>
        <div className="flex flex-col gap-1.5">
          {agent.skills.map((skill) => (
            <div key={skill} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{backgroundColor: agent.color}}
              />
              <span className="text-xs text-tertiary-color">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const AgentPanel = () => {
  const {agentStates, toggleAgent, goNext, goPrev} = useZenoAI()
  const [expandedAgent, setExpandedAgent] = useState<string | null>('zeno_core')

  const supervisor = agentDefinitions.find((a) => a.isSupervisor)
  const subAgents = agentDefinitions.filter((a) => !a.isSupervisor)
  const enabledCount = Object.values(agentStates).filter(Boolean).length

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-xs text-text-hint-color mb-2 font-medium tracking-wide uppercase">
              Your AI Team
            </div>
            <h2 className="text-2xl font-bold text-primary-color mb-2">
              6 agents working for you
            </h2>
            <p className="text-sm text-text-hint-color">
              Toggle agents on or off. The supervisor is always active.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,192,118,0.1)] border border-[rgba(0,192,118,0.3)]">
              <span className="text-sm text-[#00C076] font-medium">
                {enabledCount + 1} of {agentDefinitions.length} agents active
              </span>
            </div>
          </div>

          {/* Supervisor agent */}
          {supervisor && (
            <div className="mb-3">
              <AgentCard
                enabled
                agent={supervisor}
                expanded={expandedAgent === supervisor.id}
                onToggle={() => {}}
                onExpand={() =>
                  setExpandedAgent((prev) =>
                    prev === supervisor.id ? null : supervisor.id
                  )
                }
              />
            </div>
          )}

          {/* Connection line */}
          <div className="flex justify-center my-1">
            <div className="w-px h-6 bg-neutral-secondary-color" />
          </div>
          <div className="text-center mb-3">
            <span className="text-xs text-text-hint-color bg-primary-bg-color px-3 py-1 rounded-full border border-primary-border-color">
              Coordinates
            </span>
          </div>

          {/* Sub agents */}
          <div className="flex flex-col gap-3">
            {subAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                enabled={agentStates[agent.id] ?? true}
                expanded={expandedAgent === agent.id}
                onToggle={() => toggleAgent(agent.id)}
                onExpand={() =>
                  setExpandedAgent((prev) =>
                    prev === agent.id ? null : agent.id
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 p-6 border-t border-primary-border-color">
        <button
          onClick={goPrev}
          type="button"
          className="flex-1 p-4 rounded-xl border border-primary-border-color text-primary-color font-medium
            cursor-pointer hover:bg-secondary-bg-color transition-all duration-300"
        >
          Back
        </button>
        <button
          className="flex-1 p-4 rounded-xl bg-[#00C076] text-white font-medium cursor-pointer hover:bg-[#00a866] transition-all duration-300"
          onClick={goNext}
          type="button"
        >
          Activate Zeno AI
        </button>
      </div>
    </div>
  )
}

export default AgentPanel
