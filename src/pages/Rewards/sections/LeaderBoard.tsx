import {useCallback, useEffect, useRef, useState} from 'react'

import {CommonTableComponent, ImageComponent} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {ApiPaginationProps, LeaderBoardApiDataTypes} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'

const LeaderBoard = () => {
  const loaderRef = useRef<AppLoaderRef>(null)
  const [leaderBoardData, setLeaderBoardData] = useState<
    LeaderBoardApiDataTypes[] | null
  >([])
  const [paginationData, setPaginationData] =
    useState<ApiPaginationProps | null>(null)

  const GetLeaderBoards = useCallback(
    (
      page: number,
      limit: number,
      fromDate: string,
      toDate: string,
      order_type: string,
      order_value: string
    ) => {
      loaderRef.current?.showLoader(true)

      RewardApi.GetLeaderBoard({
        page,
        limit,
        fromDate,
        toDate,
        order_type,
        order_value,
      })
        .then((res) => {
          if (res) {
            setLeaderBoardData([])
          }

          if (res) {
            setLeaderBoardData(res?.data)
            setPaginationData(res?.pagination)
          }
        })
        .finally(() => {
          loaderRef.current?.showLoader(false)
        })
    },
    []
  )

  useEffect(() => {
    GetLeaderBoards(1, 10, '', '', 'DESC', 'createdAt')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-4 space-y-9">
      <div className="">
        <ImageComponent
          className="h-16 sm:h-38!"
          imageUrl={Images.leaderBoardImage}
        />
      </div>

      <CommonTableComponent tableHeading={Constants.leaderBoardHeading}>
        {!leaderBoardData || leaderBoardData?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td className="py-8" colSpan={12}>
              {English.E492}
            </td>
          </tr>
        ) : (
          leaderBoardData?.map((item, index) => {
            const {country, email, name, owner_type, total_earn_point} = item
            const Name = `${name?.slice(0, 2)}***${name?.slice(-2)}`
            const Email = `${email?.slice(0, 3)}*******${English.E494?.toLocaleLowerCase()}`
            const currentPageNumber = paginationData?.page ?? 1
            const multiplier = (currentPageNumber - 1) * 10
            return (
              <tr
                key={`content-ad${owner_type}`}
                className="font-normal text-primary-color text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
              >
                <th
                  className="p-6 font-medium text-primary-color whitespace-nowrap "
                  scope="row"
                >
                  #{multiplier + index + 1}
                </th>
                <td className="p-6 text-primary-color capitalize">{Name}</td>
                <td className="p-6 text-primary-color capitalize ">{Email}</td>
                <td className="p-6 text-primary-color capitalize">
                  {total_earn_point}
                </td>

                <td className="p-6 text-primary-color capitalize">
                  {country === '' ? '--' : country}
                </td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
    </div>
  )
}

export default LeaderBoard
