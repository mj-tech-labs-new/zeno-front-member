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
          className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in"
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
            <span>{tableBody?.direction}</span>
          </td>
          <th
            className="px-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap "
            scope="row"
          >
            <span>{dayjs(tableBody?.open_time).format('h:mm:ss')}</span>
          </th>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.duration}</span>
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.quantity}</span>
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.open_price}</span>
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.take_profit}</span>
          </td>
          <td className="px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
            <span>{tableBody?.stop_loss}</span>
          </td>
          <td
            className={`px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap ${tableBody?.realized_pnl?.toString().startsWith('-') ? 'text-extra-dark-danger-color' : '!text-chart-green-color'}
                        }`}
          >
            <span>{Number(tableBody?.realized_pnl)?.toFixed(6)}</span>
          </td>
          <td
            className={`px-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap ${tableBody?.open_pnl?.startsWith('-') ? 'text-extra-dark-danger-color' : '!text-chart-green-color'}`}
          >
            <span>{Number(tableBody?.open_pnl)?.toFixed(6)}</span>
          </td>
          <td className="px-6 py-4 text-left !whitespace-nowrap">
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
