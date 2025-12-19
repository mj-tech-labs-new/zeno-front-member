import {useCallback, useEffect, useState} from 'react'

import {
  BasicPagination,
  ChallengeActionButton,
  DescriptionComponent,
  HeadingComponent,
  TabComponent,
} from '@/components'
import BasicSkeleton from '@/components/SkeletonComponents/BasicSkeleton'
import {Constants, English} from '@/helpers'
import {PaginationType} from '@/types/CommonTypes'

import {challengeInfoDashboardApi} from '../ChallengeDashboard/api/ChallengeDashboardApi'
import ChallengeDetailCard from '../Challenges/components/ChallengeDetailCard'
import EmptyChallengeLayout from './components/EmptyChallengeLayout'
import EmptyLayout from './components/EmptyLayout'
import {useDashboardProvider} from './context/DashboardProvider'

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const {challengeInfoArray, setChallengeInfoArray} = useDashboardProvider()
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const [showLoader, setShowLoader] = useState(false)

  const getChallenges = useCallback(
    (
      challengeType: string,
      page: number,
      limit: number,
      totalCount: number
    ) => {
      setShowLoader(true)
      challengeInfoDashboardApi(challengeType, page, limit, totalCount)
        .then((res) => {
          if (!res) return
          setChallengeInfoArray(res.data)
          setPaginationData(res.pagination)
        })
        .finally(() => setShowLoader(false))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [challengeInfoArray]
  )

  useEffect(() => {
    getChallenges(
      activeIndex === 0
        ? English.E114.toLowerCase()
        : activeIndex === 1
          ? English.E115
          : activeIndex === 2
            ? English.E116
            : '',
      1,
      10,
      0
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div
      className={`bg-primary-bg-color h-full ${paginationData?.totalCount === 0 ? 'flex flex-col' : ''}`}
    >
      <div
        className={`flex gap-4 ${paginationData?.totalCount === 0 ? 'flex-col' : 'flex-col sm:flex-row justify-between items-center'} items-start bg-primary-bg-color z-40 py-8`}
      >
        <HeadingComponent singleLineContent={English.E21} variant="medium" />
        <ChallengeActionButton
          className={`!m-0 !gap-2 [&>div>img]:!h-3 [&>div>img]:!w-3 [&>div]:!flex [&>div]:!justify-center [&>div]:!items-center ${paginationData?.totalCount === 0 ? 'hidden' : 'block'}`}
        />
        {paginationData?.totalCount === 0 && (
          <DescriptionComponent multilineContent={[English.E26]} />
        )}
      </div>

      {paginationData?.totalCount === 0 ? (
        <EmptyChallengeLayout />
      ) : (
        <div className="space-y-8 h-[calc(100%-160px)] sm:h-[calc(100%-104px)] overflow-y-auto">
          <TabComponent
            activeIndex={activeIndex}
            className={`!gap-6 ${challengeInfoArray?.length === 0 ? '!h-full' : '!min-h-full'}`}
            headingData={Constants.ChallengesTabContent}
            isDividerType={false}
            setActiveIndex={(index) => {
              if (index === 3) return
              setActiveIndex(index)
            }}
          >
            {showLoader ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <BasicSkeleton className="!w-full !h-[604px] !rounded-2xl" />
              </div>
            ) : challengeInfoArray?.length !== 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                {challengeInfoArray?.map((item) =>
                  showLoader ? (
                    <BasicSkeleton
                      key={item.id}
                      className="!w-full !h-[604px] !rounded-2xl"
                    />
                  ) : (
                    <ChallengeDetailCard
                      key={item.id}
                      item={item}
                      showLoader={showLoader}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <EmptyLayout content={English.E288} />
              </div>
            )}
          </TabComponent>

          {paginationData?.totalPages !== 0 && paginationData?.totalPages && (
            <BasicPagination
              total={paginationData?.totalPages}
              onSelectPage={(page) => {
                getChallenges(
                  activeIndex === 0
                    ? English.E91.toLowerCase()
                    : activeIndex === 1
                      ? English.E114
                      : activeIndex === 2
                        ? English.E115
                        : '',
                  page,
                  10,
                  Number(paginationData?.totalCount)
                )
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard
