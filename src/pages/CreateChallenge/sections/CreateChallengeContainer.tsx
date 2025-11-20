import {useEffect, useState} from 'react'

import {
  BasicSkeleton,
  ChallengeOptionCards,
  DescriptionComponent,
  HeadingComponent,
} from '@/components'
import {English} from '@/helpers'
import {ExtendedGetChallengeTypeProps} from '@/types/ChallengeTypes'

import {getChallengeTypeApi} from '../api/CreateChallengeApis'
import CreateChallengeCardLayout from '../layout/CreateChallengeCardLayout'

const CreateChallengeContainer = (props: {
  selectedOption: number
  onPressStage: (id: number) => void
}) => {
  const [challengeTypeData, setChallengeTypeData] = useState<
    ExtendedGetChallengeTypeProps[]
  >([])
  const [showLoader, setShowLoader] = useState(false)
  const {onPressStage, selectedOption} = props

  useEffect(() => {
    setShowLoader(true)
    getChallengeTypeApi()
      .then((res) => {
        const response = res.map((item) => ({
          ...item,
          title: item.step === 1 ? English.E32 : English.E34,
          content: item.step === 1 ? English.E33 : English.E35,
        }))
        setChallengeTypeData(response)
      })
      .finally(() => setShowLoader(false))
  }, [])

  return (
    <CreateChallengeCardLayout>
      <div className="space-y-10">
        <div className="flex flex-col gap-y-2">
          <HeadingComponent singleLineContent={English.E27} variant="small" />
          <DescriptionComponent multilineContent={[English.E31]} />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          {showLoader ? (
            <BasicSkeleton className="!h-[104px] max-w-[309px] rounded-2xl" />
          ) : (
            challengeTypeData?.map((item) => {
              const {content, title, step} = item
              return (
                <ChallengeOptionCards
                  key={title}
                  multilineContent={[content]}
                  singleLineContent={title}
                  className={
                    step === selectedOption
                      ? 'bg-info-bg-color border-tertiary-color'
                      : 'border-info-bg-color cursor-pointer'
                  }
                  onPressItem={() => {
                    onPressStage(step)
                  }}
                />
              )
            })
          )}
        </div>
      </div>
    </CreateChallengeCardLayout>
  )
}

export default CreateChallengeContainer
