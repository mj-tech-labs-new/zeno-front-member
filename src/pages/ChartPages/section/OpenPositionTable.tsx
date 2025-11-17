import dayjs from 'dayjs'

import {CommonCloseActionButton, CommonTableComponent} from '@/components'
import {Constants} from '@/helpers'
import {CreateChallengeProps} from '@/types/ChallengeTypes'
import {OpenPosition} from '@/types/ChartTypes'

const OpenPositionTable = (
  props: Pick<CreateChallengeProps, 'challenge_id'> & {
    openPosition: OpenPosition[]
    setPosition: (data: OpenPosition[]) => void
  }
) => {
  const {challenge_id, openPosition, setPosition} = props
  return (
    <CommonTableComponent
      className="!bg-transparent !text-neutral-primary-color"
      extraProp={{challenge_id}}
      headingClassName="justify-start !whitespace-nowrap"
      layoutClassName="!border-none"
      showArrows={false}
      tableHeading={Constants.Openposition}
      onPerformAction={(value) => {
        if (value) {
          setPosition([])
        }
      }}
    >
      {openPosition?.map((tableBody) => (
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
            {tableBody?.direction}
          </td>
          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap "
            scope="row"
          >
            {dayjs(tableBody?.open_time).format('h:mm:ss')}
          </th>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.duration}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.quantity}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.open_price}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.take_profit}
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            {tableBody?.stop_loss}
          </td>
          <td
            className={`px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap ${tableBody?.realized_pnl?.toString().startsWith('-') ? 'text-extra-dark-danger-color' : '!text-chart-green-color'}
                        }`}
          >
            {Number(tableBody?.realized_pnl).toFixed(6)}
          </td>
          <td
            className={`px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap ${tableBody?.open_pnl?.startsWith('-') ? 'text-extra-dark-danger-color' : '!text-chart-green-color'}`}
          >
            {Number(tableBody?.open_pnl)?.toFixed(6)}
          </td>
          <td className="px-6 py-4 text-left  !whitespace-nowrap">
            <CommonCloseActionButton
              challenge_id={challenge_id}
              tx_hash={tableBody?.tx_hash}
              type="single_order"
              onPerformAction={() => {
                if (openPosition?.length === 0) {
                  setPosition([])
                }
              }}
            />
          </td>
        </tr>
      ))}
    </CommonTableComponent>
  )
}

export default OpenPositionTable
