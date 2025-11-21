import dayjs from 'dayjs'

import {CommonCloseActionButton, CommonTableComponent} from '@/components'
import {Constants} from '@/helpers'
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
      className="!bg-transparent !text-neutral-primary-color"
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
      {pendingOrder?.map((tableBody) => (
        <tr
          key={`content-${tableBody?.tx_hash}`}
          className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
        >
          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap"
            scope="row"
          >
            <span>{tableBody?.tx_hash}</span>
          </th>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.symbol}</span>
          </td>

          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap capitalize">
            <span>{tableBody?.order_type}</span>
          </td>

          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap"
            scope="row"
          >
            <span>{dayjs(tableBody?.submitted_time).format('h:mm:ss')}</span>
          </th>

          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.quantity}</span>
          </td>

          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.submitted_price}</span>
          </td>

          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.distance}</span>
          </td>

          <td className=" px-6 py-4 !text-left text-chart-text-primary-color !whitespace-nowrap">
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
          <td className="px-6 py-4 text-left !whitespace-nowrap">
            <CommonCloseActionButton
              apiMethod="delete"
              challenge_id={challenge_id}
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
      ))}
    </CommonTableComponent>
  )
}

export default PendingOrderTable
