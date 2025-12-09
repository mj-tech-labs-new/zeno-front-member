import dayjs from 'dayjs'
import {memo, useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {
  BasicPagination,
  CommonButton,
  CommonTableComponent,
  DatePickerComponent,
} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {PositionHistory} from '@/types/ChartTypes'
import {PaginationType} from '@/types/CommonTypes'

import chartPageApi from '../api/ChartPageApi'

interface DateObject {
  date1: Date | null
  date2: Date | null
}

const PositionHistoryTable = (props: {showHeader: boolean}) => {
  const {showHeader} = props
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    date1: null,
    date2: null,
  })
  const [showLoader, setShowLoader] = useState(true)
  const [paginationData, setPaginationData] = useState<PaginationType | null>(
    null
  )
  const [orderType, setOrderType] = useState('ASC')
  const [positionHistory, setPositionHistory] = useState<PositionHistory[]>([])

  const getPositionHistoryData = useCallback(
    (
      challenge_id: string,
      page: number,
      fromDate: string,
      toDate: string,
      order_type: string,
      order_value: string
    ) => {
      setShowLoader(true)
      chartPageApi
        .PositionHistoryApi({
          challenge_id,
          page,
          fromDate,
          toDate,
          order_type,
          order_value,
        })
        .then((data) => {
          if (!data) return
          setPositionHistory(data.data)
          setPaginationData(data?.page)
        })
        .finally(() => {
          setShowLoader(false)
        })
    },
    []
  )

  useEffect(() => {
    if (!params?.challengeId) return
    getPositionHistoryData(params.challengeId, 1, '', '', 'ASC', 'created_at')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-3 w-full">
      <div
        className={`w-full flex items-center ${showHeader ? 'justify-between' : 'justify-end'} gap-5`}
      >
        <div className="flex items-center gap-4 !font-switzer !font-medium !text-13 !leading-6 !text-center">
          <DatePickerComponent
            showIcon
            className={`!py-5 !pl-2 !pr-2  flex items-center !bg-neutral-secondary-color !rounded-[4px] ${selectedDate?.date1 && selectedDate?.date2 ? '!w-55' : '!max-w-fit'}`}
            dateFormate="dd/MM/yyyy"
            selectedDate1={selectedDate?.date1 as unknown as Date}
            selectedDate2={selectedDate?.date2}
            onSelectDate={(data) => {
              setSelectedDate({date1: data?.[0] ?? null, date2: data?.[1]})
              const fromDate = dayjs(data?.[0]).format('YYYY-MM-DD')
              const toDate = dayjs(data?.[1]).format('YYYY-MM-DD')

              if (data?.[0] && data?.[1]) {
                getPositionHistoryData(
                  params?.challengeId ?? '',
                  1,
                  fromDate,
                  toDate,
                  orderType,
                  'created_at'
                )
              }
            }}
          />
          {selectedDate?.date1 && selectedDate?.date2 && (
            <CommonButton
              className="!w-fit !p-2 !text-13 [&>div]:size-3 !white_filter !text-primary-color !flex !flex-row-reverse "
              imageUrl={Images.crossIcon}
              singleLineContent="Clear"
              onClick={() => {
                setSelectedDate({
                  date1: null,
                  date2: null,
                })
                getPositionHistoryData(
                  params?.challengeId ?? '',
                  1,
                  '',
                  '',
                  orderType,
                  'created_at'
                )
              }}
            />
          )}
        </div>
      </div>

      <CommonTableComponent
        className="!bg-transparent !text-neutral-primary-color [&>tr>th]:!pl-0 "
        imageUrl={Images.backArrow}
        layoutClassName="!h-[500px] !overflow-y-auto no-scrollbar"
        showLoader={showLoader}
        tableHeading={Constants.PositionHistoryTableHeading}
        ChangeOrder={() => {
          getPositionHistoryData(
            params?.challengeId ?? '',
            1,
            '',
            '',
            orderType === 'ASC' ? 'DESC' : 'ASC',
            ' created_at'
          )

          setOrderType((data) => (data === 'ASC' ? 'DESC' : 'ASC'))
        }}
      >
        {!positionHistory || positionHistory?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td
              className="py-8"
              colSpan={Constants.ClosedPNLTableHeading?.length || 1}
            >
              No Orders
            </td>
          </tr>
        ) : (
          positionHistory?.map((tableBody) => {
            const {
              symbol,
              margin_mode,
              open_time,
              close_time,
              leverage,
              close_price,
              open_price,
              quantity,
              realized_pnl,
              order_side,
              roe,
              total_charge_amount,
              stop_loss,
              take_profit,
            } = tableBody
            const contractFullName = `${symbol} ${English.E132}`
            const directionText = `${leverage}x-${margin_mode}`
            return (
              <tr
                key={`content-${tableBody?.open_time}`}
                className=" text-xs/5 *:transition-all *:duration-300 *:ease-in *:!font-poppins *:!leading-5"
              >
                <td className="pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <span className="!text-light-neutral-color block !pb-0.5 ">
                    {contractFullName}
                  </span>
                  <span
                    className={
                      order_side === 'buy'
                        ? 'text-chart-green-color'
                        : 'text-chart-red-color'
                    }
                  >
                    {directionText ?? '--'}
                  </span>
                </td>
                <td className="pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <div className="flex flex-col">
                    <span>{dayjs(open_time).format('YYYY-MM-DD')}</span>
                    <span>{dayjs(open_time).format('hh:mm:ss')}</span>
                  </div>
                </td>
                <td className="pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <div className="flex flex-col">
                    <span>{dayjs(close_time).format('YYYY-MM-DD')}</span>
                    <span>{dayjs(close_time).format('hh:mm:ss')}</span>
                  </div>
                </td>
                <td className="pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <span
                    className={
                      order_side === 'buy'
                        ? 'text-chart-green-color'
                        : 'text-chart-red-color'
                    }
                  >
                    {order_side ?? '--'}
                  </span>
                </td>
                <td className="  pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <div className="flex flex-col">
                    <span>{open_price ?? '--'}</span>
                    <span>{close_price ?? '--'}</span>
                  </div>
                </td>
                <td className=" flex flex-col pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <span>{realized_pnl ?? '--'}</span>
                  <span>{roe ?? '--'}</span>
                </td>
                <td className=" pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <div className="flex flex-col">{quantity}</div>
                </td>
                <td className=" flex  flex-col pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  {Utility.removeDecimal(total_charge_amount, 3) ?? '--'}
                </td>
                <td className="pr-6 py-3 text-left text-chart-text-primary-color !whitespace-nowrap">
                  <div className="flex flex-col">
                    <span>{stop_loss?.[0]?.price ?? '--'}</span>
                    <span>{take_profit?.[0]?.price ?? '--'}</span>
                  </div>
                </td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
      {paginationData?.totalPages && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            getPositionHistoryData(
              params?.challengeId ?? '',
              page,
              '',
              '',
              orderType,
              ' created_at'
            )
          }}
        />
      )}
    </div>
  )
}

export default memo(PositionHistoryTable)
