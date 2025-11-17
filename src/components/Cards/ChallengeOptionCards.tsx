import {memo} from 'react'

import {CreatChallengeCardType} from '@/types/ComponentTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'
import HeadingComponent from '../HeadingComponent/HeadingComponent'

const ChallengeOptionCards = (props: CreatChallengeCardType) => {
  const {
    multilineContent,
    singleLineContent,
    className = '',
    onPressItem,
  } = props
  return (
    <div
      className={`border border-solid flex flex-col gap-2 transition-all duration-200 ease-in-out p-4 rounded-2xl w-full ${className}`}
      onClick={() => {
        if (onPressItem) onPressItem()
      }}
    >
      <HeadingComponent
        className="font-semibold"
        singleLineContent={singleLineContent}
        type="h3"
        variant="x-small"
      />
      <DescriptionComponent
        className="text-13"
        multilineContent={multilineContent}
      />
    </div>
  )
}

export default memo(ChallengeOptionCards)
