import {useState} from 'react'

import {useZenoAI} from '../context/ZenoAIProvider'
import {strategyCategories} from '../data/strategies'

const StrategySelector = () => {
  const {selectedStrategies, toggleStrategy, goNext, goPrev} = useZenoAI()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    strategyCategories[0].id
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  const getCategorySelectedCount = (categoryId: string) => {
    const category = strategyCategories.find((c) => c.id === categoryId)
    if (!category) return 0
    return category.strategies.filter((s) => selectedStrategies.includes(s.id))
      .length
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-xs text-text-hint-color mb-2 font-medium tracking-wide uppercase">
              Strategy Configuration
            </div>
            <h2 className="text-2xl font-bold text-primary-color mb-2">
              Teach Zeno your trading edge
            </h2>
            <p className="text-sm text-text-hint-color">
              Select the strategies you use. Zeno will evaluate every trade
              against these.
            </p>
            {selectedStrategies.length > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,192,118,0.1)] border border-[rgba(0,192,118,0.3)]">
                <span className="text-sm text-[#00C076] font-medium">
                  {selectedStrategies.length} strategies selected
                </span>
              </div>
            )}
          </div>

          {/* Category accordion */}
          <div className="flex flex-col gap-3">
            {strategyCategories.map((category) => {
              const isExpanded = expandedCategory === category.id
              const selectedCount = getCategorySelectedCount(category.id)

              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-primary-border-color bg-secondary-bg-color overflow-hidden"
                >
                  {/* Category header */}
                  <button
                    aria-label={`Toggle ${category.title}`}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300"
                    onClick={() => toggleCategory(category.id)}
                    type="button"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary-color">
                          {category.title}
                        </span>
                        {selectedCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#00C076] text-white text-xs font-bold">
                            {selectedCount}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-hint-color">
                        {category.description}
                      </span>
                    </div>
                    <svg
                      className={`transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#999"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>

                  {/* Strategies list */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden
                      ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-4 pb-4 flex flex-col gap-2">
                      {category.strategies.map((strategy) => {
                        const isSelected = selectedStrategies.includes(
                          strategy.id
                        )
                        return (
                          <button
                            key={strategy.id}
                            aria-label={`Toggle ${strategy.name}`}
                            onClick={() => toggleStrategy(strategy.id)}
                            type="button"
                            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer
                              ${
                                isSelected
                                  ? 'border-[#00C076] bg-[rgba(0,192,118,0.06)]'
                                  : 'border-primary-border-color bg-tertiary-bg-color hover:border-neutral-secondary-color'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200
                                  ${isSelected ? 'border-[#00C076] bg-[#00C076]' : 'border-neutral-secondary-color'}`}
                              >
                                {isSelected && (
                                  <svg
                                    fill="none"
                                    height="8"
                                    viewBox="0 0 12 10"
                                    width="10"
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
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-primary-color">
                                  {strategy.name}
                                </div>
                                <div className="text-xs text-text-hint-color truncate">
                                  {strategy.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
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
          disabled={selectedStrategies.length === 0}
          onClick={goNext}
          type="button"
          className={`flex-1 p-4 rounded-xl font-medium transition-all duration-300
            ${selectedStrategies.length > 0 ? 'bg-[#00C076] text-white cursor-pointer hover:bg-[#00a866]' : 'bg-secondary-bg-color text-text-hint-color cursor-not-allowed'}`}
        >
          Meet Your Agents
        </button>
      </div>
    </div>
  )
}

export default StrategySelector
