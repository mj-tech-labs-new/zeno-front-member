import {useState} from 'react'

import {TabComponent} from '@/components'
import {Constants} from '@/helpers'
import {TradingSortingType} from '@/types/UnionTypes'

import ChartSwitch from '../components/ChartSwitch'
import TradesTabComponent from '../components/TradesTabComponent'

const Trades = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sortingType, setSortingType] =
    useState<TradingSortingType>('buy_sell_type')
  return (
    <TabComponent
      activeIndex={activeIndex}
      className="shrink-0 col-span-1 py-2 px-4 !gap-3 [&>div]:!justify-center "
      headingData={Constants.TradingTab}
      setActiveIndex={setActiveIndex}
      type="buttonType"
    >
      <div className="h-full">
        <ChartSwitch activeType={sortingType} setActiveType={setSortingType} />
        <TradesTabComponent activeType={sortingType} />
      </div>
    </TabComponent>
  )
}

export default Trades
