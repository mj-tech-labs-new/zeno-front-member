import dayjs from 'dayjs'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {utils, writeFileXLSX} from 'xlsx'

import {
  BasicPagination,
  CommonButton,
  CommonTableComponent,
  DatePickerComponent,
  Divider,
  ExportButton,
  HeadingComponent,
  Loader,
  PaginationDropDown,
} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {DateObject} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {ApiPaginationProps, RewardHistoryTypes} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'

const RewardHistory = () => {
  const loaderRef = useRef<AppLoaderRef>(null)

  const [rewardData, setRewardData] = useState<RewardHistoryTypes[] | null>([])
  const [paginationData, setPaginationData] =
    useState<ApiPaginationProps | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    date1: null,
    date2: null,
  })
  const [selectedLimit, setSelectedLimit] = useState({
    title: '10',
  })
  const [isNoDataType, setIsNoDataType] = useState(true)
  const isFirstType = useRef(true)

  const limitArray = useMemo(
    () =>
      Array.from({length: 10}).map(
        (_, index) => ({title: ((index + 1) * 5).toString()}),
        []
      ),
    []
  )
  const onPressExport = useCallback(() => {
    if (isNoDataType) return
    loaderRef.current?.showLoader(true)
    RewardApi.getTotalRewardHistory()
      .then((res) => {
        if (res) {
          const excelData = res?.map((item, index) => {
            const {createdAt, balance, description, earn_point} = item
            return {
              [English.E456]: index + 1,
              [English.E104]: dayjs(createdAt).format('DD/MM/YYYY'),
              [English.E83]: item.reward_type,
              [English.E479]: description,
              [English.E508]: earn_point,

              [English.E481]: balance,
            }
          })

          const ws = utils.json_to_sheet(excelData)
          const wb = utils.book_new()
          utils.book_append_sheet(wb, ws, 'Zeno Traders')
          writeFileXLSX(wb, `My User.xlsx`)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [isNoDataType])

  const GetRewardHistory = useCallback(
    (
      page: number,
      limit: number,
      fromDate: string,
      toDate: string,
      order_type: string,
      order_value: string
    ) => {
      loaderRef.current?.showLoader(true)

      RewardApi.GetRewardHistory({
        page,
        limit,
        fromDate,
        toDate,
        order_type,
        order_value,
      })
        .then((res) => {
          if (res) {
            if (isFirstType.current) {
              setIsNoDataType(res?.data?.length === 0)
              isFirstType.current = false
            }
            setRewardData(res?.data ?? [])
            setPaginationData(res?.pagination)
          }
        })
        .finally(() => {
          setTimeout(() => {
            loaderRef.current?.showLoader(false)
          }, 1000)
        })
    },
    []
  )

  useEffect(() => {
    GetRewardHistory(1, 10, '', '', 'ASC', 'updatedAt')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex flex-col gap-4">
        <div className=" sm:flex space-y-4 block justify-between">
          <HeadingComponent
            className="text-28!"
            singleLineContent={English.E482}
          />

          <div className="flex  flex-wrap items-end sm:items-center gap-4 !font-switzer !font-medium !text-13 !leading-6 !text-center">
            {selectedDate?.date1 && selectedDate?.date2 && (
              <CommonButton
                className="w-full! sm:!w-fit !text-13 [&>div]:size-3 !white_filter !text-primary-color !flex !flex-row-reverse "
                imageUrl={Images.crossIcon}
                singleLineContent="Clear"
                onClick={() => {
                  setSelectedDate({
                    date1: null,
                    date2: null,
                  })
                  GetRewardHistory(
                    1,
                    Number(selectedLimit?.title),
                    '',
                    '',
                    'ASC',
                    'updatedAt'
                  )
                }}
              />
            )}
            <DatePickerComponent
              className="!max-w-fit flex items-center"
              dateFormate="d MMM yyyy"
              minDate={selectedDate.date1 as unknown as Date}
              selectedDate1={selectedDate?.date1 as unknown as Date}
              selectedDate2={selectedDate?.date2}
              showIcon={false}
              onSelectDate={(data) => {
                setSelectedDate({date1: data?.[0] ?? null, date2: data?.[1]})
                const fromDate = `${dayjs(data?.[0]).format('YYYY-MM-DD')} 00:00:00`
                const toDate = `${dayjs(data?.[1]).format('YYYY-MM-DD')} 23:59:59`

                if (data?.[0] && data?.[1]) {
                  GetRewardHistory(
                    1,
                    Number(10),
                    fromDate,
                    toDate,
                    'ASC',
                    'updatedAt'
                  )
                }
              }}
            />
            <ExportButton disabled={isNoDataType} onPressItem={onPressExport} />
          </div>
        </div>
        <Divider className="!bg-info-bg-color" />
      </div>
      <Loader ref={loaderRef} />
      <CommonTableComponent tableHeading={Constants.rewardHeading}>
        {!rewardData || rewardData?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td className="py-8" colSpan={12}>
              {English.E492}
            </td>
          </tr>
        ) : (
          rewardData?.map((item, index) => {
            const {
              balance,
              createdAt,
              description,
              earn_point,
              _id,
              reward_type,
            } = item
            return (
              <tr
                key={`content-ad${_id}`}
                className="font-normal text-primary-color text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
              >
                <th
                  className="p-6 font-medium text-primary-color whitespace-nowrap "
                  scope="row"
                >
                  {(currentPage - 1) * Number(selectedLimit?.title) + index + 1}
                </th>
                <td className="p-6 text-primary-color capitalize">
                  {dayjs(createdAt)?.format('DD/MM/YYYY')}
                </td>
                <td className="p-6 text-primary-color capitalize ">
                  {reward_type}
                </td>
                <td className="p-6 text-primary-color capitalize">
                  {reward_type.toLowerCase() === 'refferal'
                    ? 'Register With Your Link'
                    : description}
                </td>
                <td className="p-6 text-primary-color capitalize">
                  {earn_point}
                </td>
                <td className="p-6 text-primary-color capitalize">{balance}</td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        <div className="order-2">
          {paginationData?.totalPages !== 0 && paginationData?.totalPages && (
            <BasicPagination
              total={paginationData?.totalPages}
              onSelectPage={(page) => {
                setCurrentPage(page)
                GetRewardHistory(
                  page,
                  Number(selectedLimit?.title),
                  '',
                  '',
                  'ASC',
                  'updatedAt'
                )
              }}
            />
          )}
        </div>
        <div className="flex items-center  text_13_utility *:font-switzer! text-primary-color font-light gap-2">
          <span>{English.E483}</span>
          <PaginationDropDown
            isTopType
            className="h-6! max-w-13.75! px-2.5! "
            dropDownData={limitArray}
            placeHolderText="Limit"
            selectedValue={selectedLimit}
            onSelectValue={(value) => {
              const newLimit = Number(value?.title)
              const oldLimit = Number(selectedLimit?.title)

              const startIndex = (currentPage - 1) * oldLimit
              const newPage = Math.floor(startIndex / newLimit) + 1

              setSelectedLimit({
                title: value?.title,
              })

              setCurrentPage(newPage)

              GetRewardHistory(newPage, newLimit, '', '', 'ASC', 'updatedAt')
            }}
          />
          <span>{English.E484}</span>
        </div>
      </div>
    </div>
  )
}

export default RewardHistory
