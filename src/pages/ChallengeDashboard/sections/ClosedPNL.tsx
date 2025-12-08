import dayjs from 'dayjs'
import {memo, useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {
  BasicPagination,
  CommonButton,
  CommonTableComponent,
  DatePickerComponent,
  DescriptionComponent,
  HeadingComponent,
} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {ClosedPnlDataResponsePayload} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'

import {getClosedPnlDetails} from '../api/ChallengeDashboardApi'

interface DateObject {
  date1: Date | null
  date2: Date | null
}

const ClosedPNL = (props: {showHeader: boolean}) => {
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
  const [closedPNL, setClosedPNL] = useState<ClosedPnlDataResponsePayload[]>([])
  const [priceType, setPriceType] = useState('open_price')

  const getClosedPnlData = useCallback(
    (
      challenge_id: string,
      page: number,
      fromDate: string,
      toDate: string,
      order_type: string,
      order_value: string
    ) => {
      setShowLoader(true)
      getClosedPnlDetails({
        challenge_id,
        page,
        fromDate,
        toDate,
        order_type,
        order_value,
      })
        .then((data) => {
          if (!data) return
          setClosedPNL(data.data)
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
    getClosedPnlData(params.challengeId, 1, '', '', 'ASC', 'open_price')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-7 w-full">
      <div
        className={`w-full flex items-center ${showHeader ? 'justify-between' : 'justify-end'} gap-5`}
      >
        {showHeader && (
          <div>
            <HeadingComponent singleLineContent={English.E81} />
            <div className="flex gap-2">
              <DescriptionComponent multilineContent={[English.E82]} />
              <div className="flex gap-1">
                <DescriptionComponent multilineContent={[English.E83]} />
                <DescriptionComponent
                  className="!text-primary-color !underline"
                  multilineContent={[English.E84]}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 !font-switzer !font-medium !text-13 !leading-6 !text-center">
          <DatePickerComponent
            className="!max-w-fit flex items-center"
            dateFormate="d MMM yyyy"
            selectedDate1={selectedDate?.date1 as unknown as Date}
            selectedDate2={selectedDate?.date2}
            showIcon={false}
            onSelectDate={(data) => {
              setSelectedDate({date1: data?.[0] ?? null, date2: data?.[1]})
              const fromDate = dayjs(data?.[0]).format('YYYY-MM-DD')
              const toDate = dayjs(data?.[1]).format('YYYY-MM-DD')

              if (data?.[0] && data?.[1]) {
                getClosedPnlData(
                  params?.challengeId ?? '',
                  1,
                  fromDate,
                  toDate,
                  orderType,
                  'open_price'
                )
              }
            }}
          />
          {selectedDate?.date1 && selectedDate?.date2 && (
            <CommonButton
              className="!w-fit !text-13 [&>div]:size-3 !white_filter !text-primary-color !flex !flex-row-reverse "
              imageUrl={Images.crossIcon}
              singleLineContent="Clear"
              onClick={() => {
                setSelectedDate({
                  date1: null,
                  date2: null,
                })
                getClosedPnlData(
                  params?.challengeId ?? '',
                  1,
                  '',
                  '',
                  orderType,
                  'open_price'
                )
              }}
            />
          )}
        </div>
      </div>

      <CommonTableComponent
        className="!bg-ingfo-bg-color !text-primary-color !whitespace-nowrap !font-medium !text-[12px] !leading-[18px]"
        imageUrl={Images.backArrow}
        showLoader={showLoader}
        tableHeading={Constants.ClosedPNLTableHeading}
        ChangeOrder={(value) => {
          setPriceType(value)
          getClosedPnlData(
            params?.challengeId ?? '',
            1,
            '',
            '',
            orderType === 'ASC' ? 'DESC' : 'ASC',
            value === 'Entry Price' ? 'open_price' : ' close_price'
          )

          setOrderType((data) => (data === 'ASC' ? 'DESC' : 'ASC'))
        }}
        headingClassName={`!font-medium !font-helvetica !text-[12px] !leading-[18px] [&>div>div]:transition-transform [&>div>div]:duration-300 
          ${orderType === 'ASC' ? '[&>div>div>img]:!rotate-90' : '[&>div>div>img]:!rotate-270'} `}
      >
        {!closedPNL || closedPNL?.length === 0 ? (
          <tr className="font-medium text-chart-text-primary-color text-lg text-center !whitespace-nowrap">
            <td
              className="py-8"
              colSpan={Constants.ClosedPNLTableHeading?.length || 1}
            >
              No Orders
            </td>
          </tr>
        ) : (
          closedPNL?.map((tableBody) => {
            const entryValue =
              tableBody?.quantity && tableBody?.open_price
                ? tableBody.quantity * tableBody.open_price
                : 0
            const exitValue =
              tableBody?.quantity && tableBody?.close_price
                ? tableBody.quantity * tableBody.close_price
                : 0
            const closedType = tableBody?.last_close_type

            return (
              <tr
                key={`content-${tableBody?.id}`}
                className="font-normal bg-info-bg-color border-b border-landing-page-trading-rules-para-text  text-sm/6 *:transition-all *:duration-300 *:ease-in-out whitespace-nowrap *:p-6 *:text-secondary-light-color"
              >
                <td className="px-7 py-4 text-left !text-primary-color !whitespace-nowrap !font-inter">
                  <span>{tableBody?.symbol.replace('USDT', '/USDT')}</span>
                </td>
                <td className="px-7 py-4 flex gap-1 text-left !whitespace-nowrap !font-inter">
                  <span>
                    <span
                      className={
                        tableBody?.order_side === 'buy'
                          ? '!text-light-success-color'
                          : '!text-light-danger-color'
                      }
                    >
                      {tableBody?.order_side}
                    </span>
                    &minus;&gt;
                    <span>closed</span>
                  </span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{tableBody?.quantity?.toFixed(6)}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{Number(entryValue).toFixed(6)}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{Number(exitValue).toFixed(6)}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{tableBody?.open_price?.toFixed(6)}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{tableBody?.close_price?.toFixed(6)}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter">
                  <span>{closedType}</span>
                </td>
                <td className="px-7 py-4 text-left !text-secondary-light-color !whitespace-nowrap !font-inter capitalize">
                  <span>{tableBody?.order_type}</span>
                </td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
      {paginationData?.totalPages !== 0 && paginationData?.totalPages && (
        <BasicPagination
          total={paginationData?.totalPages}
          onSelectPage={(page) => {
            getClosedPnlData(
              params?.challengeId ?? '',
              page,
              '',
              '',
              orderType,
              priceType === 'Entry Price' ? 'open_price' : 'close_price'
            )
          }}
        />
      )}
    </div>
  )
}

export default memo(ClosedPNL)
