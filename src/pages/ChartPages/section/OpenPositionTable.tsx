import {CommonCloseActionButton, CommonTableComponent} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import {CreateChallengeProps} from '@/types/ChallengeTypes'
import {OpenPosition} from '@/types/ChartTypes'

import EditStopLossModel from '../components/EditStopLossModel'

const OpenPositionTable = (
  props: Pick<CreateChallengeProps, 'challenge_id'> & {
    openPosition: OpenPosition[]
    setPosition: (data: OpenPosition[]) => void
  }
) => {
  const {challenge_id, openPosition, setPosition} = props
  return (
    <CommonTableComponent
      apiMethod="put"
      className="!bg-transparent !text-neutral-primary-color [&>tr>th]:!pl-0"
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
      {openPosition?.map((tableBody) => {
        const {
          symbol,
          tx_hash,
          leverage,
          direction,
          open,
          open_pnl,
          average_price,
          current_price,
          est_liq_price,
          margin_ratio,
          marginBalance,
          margin_mode,
          return_on_equity,
          quantity,
        } = tableBody
        const directionCaseInsensitive = direction.toLowerCase()
        const contractFullName = `${symbol} ${English.E132}`
        const directionText = `${directionCaseInsensitive === 'buy' ? English.E74 : English.E75}-${leverage}x-${margin_mode}`

        return (
          <tr
            key={`content-${tx_hash}`}
            className=" text-xs/5 *:transition-all *:duration-300 *:ease-in *:!font-poppins *:!leading-5"
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
              {Utility.removeDecimal(open ?? 0)}
            </td>
            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              {quantity ?? 0}
            </td>

            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              <span>
                {average_price
                  ? Utility.removeDecimal(average_price ?? 0)
                  : '--'}
              </span>
            </td>
            <td className="pr-6 py-4 text-left text-chart-text-primary-color !whitespace-nowrap">
              <span>
                {current_price ? Utility.removeDecimal(current_price) : '--'}
              </span>
            </td>
            <td
              className={`pr-6 py-4 text-left !whitespace-nowrap ${Utility.colorGeneratorUtility(est_liq_price)}`}
            >
              {est_liq_price ? Utility.removeDecimal(est_liq_price) : '---'}
            </td>
            <td
              className={`pr-6 py-4 text-left ${!margin_ratio?.toString()?.startsWith('-') ? 'text-chart-green-color' : 'text-chart-red-color'} !whitespace-nowrap`}
            >
              {margin_ratio
                ? `${Utility.removeDecimal(margin_ratio, 2)}%`
                : '--'}
            </td>
            <td className="pr-6 py-4 text-left !whitespace-nowrap">
              <span
                className={`${Utility.colorGeneratorUtility(marginBalance)} block`}
              >
                {' '}
                {marginBalance ? Utility.removeDecimal(marginBalance) : '--'}
              </span>
              <span className="text-primary-color pb-0.5">{margin_mode}</span>
            </td>
            <td className="flex flex-col  pr-6 py-4 !text-left text-chart-text-primary-color !whitespace-nowrap">
              {tableBody?.take_profit?.[0]?.price &&
              tableBody?.stop_loss?.[0]?.price ? (
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col">
                    <span className="!text-primary-green">
                      {tableBody?.take_profit?.[0]?.price ?? '--'}
                    </span>

                    <span className="!text-extra-dark-danger-color">
                      {tableBody?.stop_loss?.[0]?.price ?? '--'}
                    </span>
                  </div>
                  <div className="cursor-pointer">
                    <EditStopLossModel
                      apiMethod="put"
                      item={tableBody}
                      singleLineContent={English.E333}
                    />
                  </div>
                </div>
              ) : (
                <div className="cursor-pointer flex gap-2 ">
                  --{' '}
                  <EditStopLossModel
                    apiMethod="post"
                    item={tableBody}
                    singleLineContent={English.E341}
                  />
                </div>
              )}
            </td>
            <th
              className="pr-6 py-4 font-medium text-chart-text-primary-color !whitespace-nowrap "
              scope="row"
            >
              <span className={Utility.colorGeneratorUtility(open_pnl)}>
                {Utility.removeDecimal(open_pnl ?? 0)}(
                {Utility.removeDecimal(return_on_equity, 3)})
              </span>
            </th>
            <td className="pr-6 py-4 text-left !whitespace-nowrap">
              <CommonCloseActionButton
                apiMethod="put"
                challenge_id={challenge_id}
                tx_hash={tableBody?.tx_hash}
                type="single_order"
                onPerformAction={() => {
                  if (openPosition?.length === 1) {
                    setPosition([])
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

export default OpenPositionTable
