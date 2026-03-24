import {useCallback, useEffect, useRef, useState} from 'react'

import {useZenoAI} from '../context/ZenoAIProvider'
import {
  OnboardingQuestion,
  onboardingQuestions,
} from '../data/onboardingQuestions'

const SingleOption = ({
  option,
  selected,
  onSelect,
}: {
  option: {id: string; label: string; description?: string}
  selected: boolean
  onSelect: () => void
}) => (
  <button
    aria-label={option.label}
    onClick={onSelect}
    type="button"
    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer
      ${
        selected
          ? 'border-[#00C076] bg-[rgba(0,192,118,0.08)]'
          : 'border-primary-border-color bg-secondary-bg-color hover:border-neutral-secondary-color'
      }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300
        ${selected ? 'border-[#00C076]' : 'border-neutral-secondary-color'}`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#00C076]" />}
      </div>
      <div>
        <div className="text-sm font-medium text-primary-color">
          {option.label}
        </div>
        {option.description && (
          <div className="text-xs text-text-hint-color mt-0.5">
            {option.description}
          </div>
        )}
      </div>
    </div>
  </button>
)

const MultiOption = ({
  option,
  selected,
  onToggle,
}: {
  option: {id: string; label: string; description?: string}
  selected: boolean
  onToggle: () => void
}) => (
  <button
    aria-label={option.label}
    onClick={onToggle}
    type="button"
    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer
      ${
        selected
          ? 'border-[#00C076] bg-[rgba(0,192,118,0.08)]'
          : 'border-primary-border-color bg-secondary-bg-color hover:border-neutral-secondary-color'
      }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-300
        ${selected ? 'border-[#00C076] bg-[#00C076]' : 'border-neutral-secondary-color'}`}
      >
        {selected && (
          <svg
            fill="none"
            height="10"
            viewBox="0 0 12 10"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
      <div>
        <div className="text-sm font-medium text-primary-color">
          {option.label}
        </div>
        {option.description && (
          <div className="text-xs text-text-hint-color mt-0.5">
            {option.description}
          </div>
        )}
      </div>
    </div>
  </button>
)

const SliderInput = ({
  question,
  value,
  onChange,
}: {
  question: OnboardingQuestion
  value: number
  onChange: (val: number) => void
}) => {
  const config = question.sliderConfig
  if (!config) return null

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="text-center">
        <span className="text-5xl font-bold text-[#00C076]">{value}</span>
        <span className="text-2xl text-text-hint-color ml-1">
          {config.unit}
        </span>
      </div>
      <input
        max={config.max}
        min={config.min}
        onChange={(e) => onChange(Number(e.target.value))}
        step={config.step}
        type="range"
        value={value}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-secondary-bg-color
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00C076]
          [&::-webkit-slider-thumb]:mt-[-8px] [&::-webkit-slider-thumb]:shadow-lg"
      />
      {config.labels && (
        <div className="flex justify-between text-xs text-text-hint-color px-1">
          {Object.entries(config.labels).map(([key, label]) => (
            <span key={key}>{label}</span>
          ))}
        </div>
      )}
    </div>
  )
}

const QuestionCard = () => {
  const {questionIndex, answers, setAnswer, goNext, goPrev} = useZenoAI()
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [isAnimating, setIsAnimating] = useState(false)
  const prevIndex = useRef(questionIndex)
  const question = onboardingQuestions[questionIndex]

  useEffect(() => {
    if (prevIndex.current !== questionIndex) {
      setDirection(questionIndex > prevIndex.current ? 'left' : 'right')
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      prevIndex.current = questionIndex
      return () => clearTimeout(timer)
    }
    return undefined
  }, [questionIndex])

  const currentAnswer = answers[question.id]

  const handleSingleSelect = useCallback(
    (optionId: string) => {
      setAnswer(question.id, optionId)
    },
    [question.id, setAnswer]
  )

  const handleMultiToggle = useCallback(
    (optionId: string) => {
      const current = (currentAnswer as string[]) || []
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      setAnswer(question.id, updated)
    },
    [question.id, currentAnswer, setAnswer]
  )

  const canProceed =
    question.type === 'slider'
      ? true
      : question.type === 'multi'
        ? ((currentAnswer as string[]) || []).length > 0
        : !!currentAnswer

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-lg mx-auto w-full">
        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-8 w-full max-w-xs">
          {onboardingQuestions.map((_, i) => (
            <div
              key={`progress-${i.toString()}`}
              className={`h-1 flex-1 rounded-full transition-all duration-500
                ${i <= questionIndex ? 'bg-[#00C076]' : 'bg-secondary-bg-color'}`}
            />
          ))}
        </div>

        {/* Step counter */}
        <div className="text-xs text-text-hint-color mb-2 font-medium tracking-wide uppercase">
          Step {questionIndex + 1} of {onboardingQuestions.length}
        </div>

        {/* Question card with swipe animation */}
        <div
          className={`w-full transition-all duration-300 ease-in-out
            ${isAnimating ? (direction === 'left' ? 'translate-x-[-20px] opacity-0' : 'translate-x-[20px] opacity-0') : 'translate-x-0 opacity-100'}`}
        >
          <h2 className="text-2xl font-bold text-primary-color text-center mb-2 leading-8">
            {question.title}
          </h2>
          <p className="text-sm text-text-hint-color text-center mb-8">
            {question.subtitle}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.type === 'single' &&
              question.options?.map((opt) => (
                <SingleOption
                  key={opt.id}
                  onSelect={() => handleSingleSelect(opt.id)}
                  option={opt}
                  selected={currentAnswer === opt.id}
                />
              ))}

            {question.type === 'multi' &&
              question.options?.map((opt) => (
                <MultiOption
                  key={opt.id}
                  onToggle={() => handleMultiToggle(opt.id)}
                  option={opt}
                  selected={((currentAnswer as string[]) || []).includes(
                    opt.id
                  )}
                />
              ))}

            {question.type === 'slider' && (
              <SliderInput
                onChange={(val) => setAnswer(question.id, val)}
                question={question}
                value={(currentAnswer as number) ?? 50}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 p-6 border-t border-primary-border-color">
        <button
          disabled={questionIndex === 0}
          onClick={goPrev}
          type="button"
          className="flex-1 p-4 rounded-xl border border-primary-border-color text-primary-color font-medium
            disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-secondary-bg-color transition-all duration-300"
        >
          Back
        </button>
        <button
          disabled={!canProceed}
          onClick={goNext}
          type="button"
          className={`flex-1 p-4 rounded-xl font-medium transition-all duration-300
            ${canProceed ? 'bg-[#00C076] text-white cursor-pointer hover:bg-[#00a866]' : 'bg-secondary-bg-color text-text-hint-color cursor-not-allowed'}`}
        >
          {questionIndex === onboardingQuestions.length - 1
            ? 'Choose Strategies'
            : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
