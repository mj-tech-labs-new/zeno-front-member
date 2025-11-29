import dayjs from 'dayjs'

import {CommonCloseActionButton, CommonTableComponent} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import {CreateChallengeProps} from '@/types/ChallengeTypes'
import {PendingOrder} from '@/types/ChartTypes'

const PendingOrderTable = (
  props: Pick<CreateChallengeProps, 'challenge_id'> & {
    pendingOrder: PendingOrder[]
    setPendingOrder: (data: PendingOrder[]) => void
  }
) => {
  const {challenge_id, pendingOrder, setPendingOrder} = props

  return (
    <CommonTableComponent
      apiMethod="delete"
      className="!bg-transparent !text-neutral-primary-color [&>tr>th]:!pl-0"
      extraProp={{challenge_id}}
      headingClassName="justify-start !whitespace-nowrap"
      layoutClassName="!border-none"
      showArrows={false}
      tableHeading={Constants.PendingOrders}
      onPerformAction={(value) => {
        if (value) {
          setPendingOrder([])
        }
      }}
    >
      {pendingOrder?.map((tableBody) => {
        const {
          symbol,
          leverage,
          direction,
          submitted_time,
          quantity,
          submitted_price,
          position_margin,
          margin_mode,
        } = tableBody
        const directionCaseInsensitive = direction.toLowerCase()
        const contractFullName = `${symbol} ${English.E132}`
        const directionText = `${directionCaseInsensitive === 'buy' ? English.E74 : English.E75}-${leverage}x-${margin_mode}`
        const longShortDirectionText =
          directionCaseInsensitive === 'buy'
            ? `${English.E180} ${English.E74}`
            : English.E135.replace('/', '')
        return (
          <tr
            key={`content-${tableBody?.tx_hash}`}
            className="font-normal text-xs/5 *:transition-all *:duration-300 *:ease-in-out"
          >
            <th
              className="pr-6 py-4  text-chart-text-primary-color !whitespace-nowrap"
              scope="row"
            >
              <span className="!text-light-neutral-color block !pb-0.5 ">
                {contractFullName}
              </span>
              <span
                className={
                  directionCaseInsensitive === 'buy'
                    ? 'text-chart-green-color'
                    : 'text-chart-red-color'
                }
              >
                {directionText}
              </span>
            </th>
            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              <span className="block pb-0.5">
                {dayjs(submitted_time).format('YYYY-MM-DD')}
              </span>
              <span className="block">
                {dayjs(submitted_time).format('HH:mm:ss')}
              </span>
            </td>

            <td
              className={`pr-6 py-4 text-left ${directionCaseInsensitive === 'buy' ? 'text-chart-green-color' : 'text-chart-red-color'} !whitespace-nowrap`}
            >
              {longShortDirectionText}
            </td>

            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              <span>
                {quantity
                  ? `${Utility.removeDecimal(quantity)} ${symbol.replace('USDT', '')}`
                  : '--'}
              </span>
            </td>

            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              {submitted_price ? Utility.removeDecimal(submitted_price) : '---'}
            </td>

            <td
              className={`pr-6 py-4 text-left ${Utility.colorGeneratorUtility(position_margin)} !whitespace-nowrap`}
            >
              {position_margin ? Utility.removeDecimal(position_margin) : '---'}
            </td>

            <td className=" pr-6 py-4 !text-left text-chart-text-primary-color !whitespace-nowrap">
              {tableBody?.take_profit?.[0]?.price &&
              tableBody?.stop_loss?.[0]?.price ? (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="!text-primary-green">
                      {tableBody?.take_profit?.[0]?.price ?? '--'}
                    </span>

                    <span className="!text-extra-dark-danger-color">
                      {tableBody?.stop_loss?.[0]?.price ?? '--'}
                    </span>
                  </div>
                </div>
              ) : (
                '--'
              )}
            </td>
            <td className="pr-6 py-4 text-left !whitespace-nowrap">
              <CommonCloseActionButton
                apiMethod="delete"
                challenge_id={challenge_id}
                submittedPrice={tableBody?.position_margin}
                tx_hash={tableBody?.tx_hash}
                type="single_order"
                onPerformAction={() => {
                  if (pendingOrder?.length === 1) {
                    setPendingOrder([])
                  }
                }}
              />
            </td>
          </tr>
        )
      })}
    </CommonTableComponent>
  )
}

export default PendingOrderTable
