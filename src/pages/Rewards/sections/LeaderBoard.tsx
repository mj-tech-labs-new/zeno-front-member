import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {
  BasicPagination,
  CommonTableComponent,
  ImageComponent,
  PaginationDropDown,
} from '@/components'
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

  const [selectedLimit, setSelectedLimit] = useState({
    title: paginationData?.limit?.toString() ?? '5',
  })
  const limitArray = useMemo(
    () =>
      Array.from({length: 10}).map(
        (_, index) => ({title: ((index + 1) * 5).toString()}),
        []
      ),
    []
  )

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
    GetLeaderBoards(1, 10, '', '', 'DESC', 'created_at')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <ImageComponent className="h-38!" imageUrl={Images.leaderBoardImage} />
      </div>

      <CommonTableComponent tableHeading={Constants.leaderBoardHeading}>
        {!leaderBoardData || leaderBoardData?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td className="py-8" colSpan={12}>
              {English.E492}
            </td>
          </tr>
        ) : (
          leaderBoardData?.map((item) => {
            const {
              country,
              email,
              name,
              owner_type,
              total_earn_point,
              total_rewards,
            } = item
            const Name = `${name?.slice(0, 2)}***${name?.slice(-2)}`
            const Email = `${email?.slice(0, 3)}*******${English.E494?.toLocaleLowerCase()}`

            return (
              <tr
                key={`content-ad${owner_type}`}
                className="font-normal text-primary-color text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
              >
                <th
                  className="p-6 font-medium text-primary-color whitespace-nowrap "
                  scope="row"
                >
                  {owner_type}
                </th>
                <td className="p-6 text-primary-color capitalize">{Name}</td>
                <td className="p-6 text-primary-color capitalize ">{Email}</td>
                <td className="p-6 text-primary-color capitalize">
                  {total_earn_point}
                </td>
                <td className="p-6 text-primary-color capitalize">
                  {total_rewards}
                </td>
                <td className="p-6 text-primary-color capitalize">{country}</td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
      {paginationData?.totalPages !== 0 && paginationData?.totalPages && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            GetLeaderBoards(page, 10, '', '', 'DESC', 'created_at')
          }}
        />
      )}
      <div className="flex items-center  text_13_utility *:font-switzer! text-primary-color font-light gap-2">
        <span>{English.E483}</span>
        <PaginationDropDown
          className="h-6! max-w-13.75! px-2.5!"
          dropDownData={limitArray}
          placeHolderText="Limit"
          selectedValue={selectedLimit}
          onSelectValue={(value) => {
            const limit = Number(value?.title)
            setSelectedLimit({
              title: value?.title,
            })
            GetLeaderBoards(1, limit, '', '', 'DESC', 'created_at')
          }}
        />
        <span>{English.E484}</span>
      </div>
    </div>
  )
}

export default LeaderBoard
