import dayjs from 'dayjs'

import {CommonTableComponent} from '@/components'
import {Constants} from '@/helpers'
import {CreateChallengeProps} from '@/types/ChallengeTypes'
import {PendingOrder} from '@/types/ChartTypes'

const PendingOrderTable = (
  props: Pick<CreateChallengeProps, 'challenge_id'> & {
    pendingOrder: PendingOrder[]
  }
) => {
  const {challenge_id, pendingOrder} = props
  return (
    <CommonTableComponent
      className="!bg-transparent !text-neutral-primary-color"
      extraProp={{challenge_id}}
      headingClassName="justify-start !whitespace-nowrap"
      layoutClassName="!border-none"
      showArrows={false}
      tableHeading={Constants.PendingOrders}
    >
      {pendingOrder?.map((tableBody) => (
        <tr
          key={`content-${tableBody?.tx_hash}`}
          className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
        >
          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap"
            scope="row"
          >
            {tableBody?.tx_hash}
          </th>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.symbol}
          </td>

          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap capitalize">
            {tableBody?.order_type}
          </td>

          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap"
            scope="row"
          >
            {dayjs(tableBody?.submitted_time).format('h:mm:ss')}
          </th>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.quantity}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.submitted_price}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.distance}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.take_profit}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.stop_loss}
          </td>
        </tr>
      ))}
    </CommonTableComponent>
  )
}

export default PendingOrderTable
