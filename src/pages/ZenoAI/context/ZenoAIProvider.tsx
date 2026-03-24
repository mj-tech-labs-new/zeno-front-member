import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type OnboardingStep = 'questions' | 'strategy' | 'agents' | 'complete'

interface ZenoAIContextType {
  currentStep: OnboardingStep
  setCurrentStep: (step: OnboardingStep) => void
  questionIndex: number
  setQuestionIndex: (index: number) => void
  answers: Record<string, string | string[] | number>
  setAnswer: (questionId: string, value: string | string[] | number) => void
  selectedStrategies: string[]
  toggleStrategy: (strategyId: string) => void
  agentStates: Record<string, boolean>
  toggleAgent: (agentId: string) => void
  goNext: () => void
  goPrev: () => void
  totalQuestions: number
}

const ZenoAIContext = createContext<ZenoAIContextType | null>(null)

const TOTAL_QUESTIONS = 10

export const ZenoAIProvider = ({children}: {children: ReactNode}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('questions')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<
    Record<string, string | string[] | number>
  >({})
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])
  const [agentStates, setAgentStates] = useState<Record<string, boolean>>({
    marcus: true,
    kai: true,
    atlas: true,
    elena: true,
    rex: true,
    aria: true,
  })

  const setAnswer = useCallback(
    (questionId: string, value: string | string[] | number) => {
      setAnswers((prev) => ({...prev, [questionId]: value}))
    },
    []
  )

  const toggleStrategy = useCallback((strategyId: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategyId)
        ? prev.filter((s) => s !== strategyId)
        : [...prev, strategyId]
    )
  }, [])

  const toggleAgent = useCallback((agentId: string) => {
    setAgentStates((prev) => ({...prev, [agentId]: !prev[agentId]}))
  }, [])

  const goNext = useCallback(() => {
    if (currentStep === 'questions') {
      if (questionIndex < TOTAL_QUESTIONS - 1) {
        setQuestionIndex((prev) => prev + 1)
      } else {
        setCurrentStep('strategy')
      }
    } else if (currentStep === 'strategy') {
      setCurrentStep('agents')
    } else if (currentStep === 'agents') {
      setCurrentStep('complete')
    }
  }, [currentStep, questionIndex])

  const goPrev = useCallback(() => {
    if (currentStep === 'questions') {
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1)
      }
    } else if (currentStep === 'strategy') {
      setCurrentStep('questions')
      setQuestionIndex(TOTAL_QUESTIONS - 1)
    } else if (currentStep === 'agents') {
      setCurrentStep('strategy')
    }
  }, [currentStep, questionIndex])

  const value = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      questionIndex,
      setQuestionIndex,
      answers,
      setAnswer,
      selectedStrategies,
      toggleStrategy,
      agentStates,
      toggleAgent,
      goNext,
      goPrev,
      totalQuestions: TOTAL_QUESTIONS,
    }),
    [
      currentStep,
      questionIndex,
      answers,
      setAnswer,
      selectedStrategies,
      toggleStrategy,
      agentStates,
      toggleAgent,
      goNext,
      goPrev,
    ]
  )

  return (
    <ZenoAIContext.Provider value={value}>{children}</ZenoAIContext.Provider>
  )
}

export const useZenoAI = () => {
  const ctx = useContext(ZenoAIContext)
  if (!ctx) throw new Error('useZenoAI must be used within ZenoAIProvider')
  return ctx
}
