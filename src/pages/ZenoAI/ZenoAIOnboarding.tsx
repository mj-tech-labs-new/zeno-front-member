import AgentPanel from './components/AgentPanel'
import OnboardingComplete from './components/OnboardingComplete'
import QuestionCard from './components/QuestionCard'
import StrategySelector from './components/StrategySelector'
import {useZenoAI} from './context/ZenoAIProvider'

const StepIndicator = ({
  step,
  label,
  active,
  completed,
}: {
  step: number
  label: string
  active: boolean
  completed: boolean
}) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
        ${active ? 'bg-[#00C076] text-white' : completed ? 'bg-[#00C076] text-white' : 'bg-secondary-bg-color text-text-hint-color'}`}
    >
      {completed ? (
        <svg
fill="none" height="10"
viewBox="0 0 12 10" width="12">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ) : (
        step
      )}
    </div>
    <span
      className={`text-xs font-medium hidden sm:block transition-colors duration-300
      ${active ? 'text-primary-color' : 'text-text-hint-color'}`}
    >
      {label}
    </span>
  </div>
)

const ZenoAIOnboarding = () => {
  const {currentStep} = useZenoAI()

  const steps = [
    {key: 'questions', label: 'Know You', step: 1},
    {key: 'strategy', label: 'Your Edge', step: 2},
    {key: 'agents', label: 'Your Team', step: 3},
    {key: 'complete', label: 'Ready', step: 4},
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep)

  return (
    <div className="flex flex-col h-screen bg-primary-bg-color">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary-border-color">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(0,192,118,0.15)] flex items-center justify-center">
            <svg
              fill="none"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
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
            <div className="text-sm font-bold text-primary-color">Zeno AI</div>
            <div className="text-xs text-text-hint-color">
              Setup your trading companion
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-4">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <StepIndicator
                active={i === currentStepIndex}
                completed={i < currentStepIndex}
                label={s.label}
                step={s.step}
              />
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-2 hidden sm:block transition-colors duration-300
                  ${i < currentStepIndex ? 'bg-[#00C076]' : 'bg-primary-border-color'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {currentStep === 'questions' && <QuestionCard />}
        {currentStep === 'strategy' && <StrategySelector />}
        {currentStep === 'agents' && <AgentPanel />}
        {currentStep === 'complete' && <OnboardingComplete />}
      </div>
    </div>
  )
}

export default ZenoAIOnboarding
