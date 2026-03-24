import {useNavigate} from 'react-router-dom'

import {useZenoAI} from '../context/ZenoAIProvider'
import {agentDefinitions} from '../data/agents'

const OnboardingComplete = () => {
  const {selectedStrategies, agentStates, answers} = useZenoAI()
  const navigate = useNavigate()

  const enabledAgents = agentDefinitions.filter(
    (a) => a.isSupervisor || agentStates[a.id]
  )

  return (
    <div className="flex flex-col h-full items-center justify-center px-6 py-8">
      <div className="max-w-lg mx-auto w-full text-center">
        {/* Success animation */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-full bg-[rgba(0,192,118,0.1)] border-2 border-[#00C076] mx-auto flex items-center justify-center animate-pulse">
            <svg
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 20L17 27L30 13"
                stroke="#00C076"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-primary-color mb-3">
          Zeno AI is ready
        </h2>
        <p className="text-sm text-text-hint-color mb-8 max-w-sm mx-auto">
          Your personal AI trading companion has been configured. Every trade
          you take will now be evaluated, scored, and guided.
        </p>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-secondary-bg-color border border-primary-border-color">
            <div className="text-2xl font-bold text-[#00C076]">
              {Object.keys(answers).length}
            </div>
            <div className="text-xs text-text-hint-color mt-1">
              Profile answers
            </div>
          </div>
          <div className="p-4 rounded-xl bg-secondary-bg-color border border-primary-border-color">
            <div className="text-2xl font-bold text-[#3B82F6]">
              {selectedStrategies.length}
            </div>
            <div className="text-xs text-text-hint-color mt-1">
              Strategies loaded
            </div>
          </div>
          <div className="p-4 rounded-xl bg-secondary-bg-color border border-primary-border-color">
            <div className="text-2xl font-bold text-[#7B61FF]">
              {enabledAgents.length}
            </div>
            <div className="text-xs text-text-hint-color mt-1">
              Agents active
            </div>
          </div>
        </div>

        {/* Agent badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {enabledAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: agent.bgColor,
                color: agent.color,
                border: `1px solid ${agent.borderColor}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{backgroundColor: agent.color}}
              />
              {agent.name}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="w-full max-w-sm mx-auto p-4 rounded-xl bg-[#00C076] text-white font-bold text-base cursor-pointer hover:bg-[#00a866] transition-all duration-300"
          onClick={async () => navigate('/dashboard')}
          type="button"
        >
          Start Trading with Zeno AI
        </button>

        <p className="text-xs text-text-hint-color mt-4">
          You can reconfigure your agents and strategies anytime from settings.
        </p>
      </div>
    </div>
  )
}

export default OnboardingComplete
