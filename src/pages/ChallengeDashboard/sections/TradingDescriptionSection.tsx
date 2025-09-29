import {HeadingComponent, StatsDescription} from '@/components'
import {Constants} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {TradingDescriptionSectionProps} from '@/types/ChallengeTypes'
import {StatsCardType} from '@/types/UnionTypes'

const TradingDescriptionSection = (props: TradingDescriptionSectionProps) => {
  const {
    type,
    className = '',
    isHeadingType = false,
    layoutClassName = '',
    singleLineContent,
  } = props

  return (
    <div className={`space-y-6 ${layoutClassName}`}>
      {isHeadingType && singleLineContent && (
        <HeadingComponent
          singleLineContent={singleLineContent}
          variant="small"
        />
      )}

      <div className={`flex flex-col gap-4 ${className}`}>
        {Constants.CustomTradingStats?.[type]?.map((tradingItem) => {
          const {
            first_content,
            second_content,
            title,
            type,
            subType,
            isProgressBarType,
          } = tradingItem
          const currentType = type as StatsCardType
          return (
            <ChallengeCardLayout key={title}>
              <StatsDescription
                headingContent={title}
                infoContent="Hello this is info Demo"
                initialContent={first_content}
                secondContent={second_content}
                type={currentType}
                subType={subType}
                isProgressBarType={isProgressBarType}
              />
            </ChallengeCardLayout>
          )
        })}
      </div>
    </div>
  )
}

export default TradingDescriptionSection
