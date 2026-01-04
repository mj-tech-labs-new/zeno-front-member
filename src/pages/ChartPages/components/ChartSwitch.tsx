import {Constants} from '@/helpers'
import {ChartSwitchProps} from '@/types/ChartTypes'
import {TradingSortingType} from '@/types/UnionTypes'

const ChartSwitch = (props: ChartSwitchProps) => {
  const {activeType, setActiveType} = props

  return (
    <div className="flex gap-2.5">
      <div className="grid grid-cols-3  gap-3 items-center w-1/3">
        {Constants.ChartSwitchType?.map((chartType) => (
          <div
            key={chartType}
            className={`flex flex-col gap-0.5 py-[11px] px-2.5 rounded transition-all duration-300 ease-linear mx-auto ${activeType === chartType ? 'bg-neutral-secondary-color pointer-events-none' : 'bg-transparent cursor-pointer'}`}
            onClick={() => {
              setActiveType(chartType as TradingSortingType)
            }}
          >
            {Array.from({length: 3}).map((_, index) => (
              <div
                key={`lines_${index.toString()}`}
                className={`h-0.5 w-3 ${chartType === 'buy_sell_type' ? (index === 0 ? 'bg-chart-red-color' : index === 1 ? 'bg-light-neutral-color' : 'bg-chart-green-color') : chartType === 'buy_type' ? (index === 2 ? 'bg-chart-green-color' : 'bg-light-neutral-color') : index === 0 ? 'bg-chart-red-color' : 'bg-light-neutral-color'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartSwitch
