import {useState} from 'react'

import {TabComponent} from '@/components'
import {Constants} from '@/helpers'
import {ChartObjectProps} from '@/types/ChartTypes'
import {TradingSortingType} from '@/types/UnionTypes'

import ChartSwitch from '../components/ChartSwitch'
import TradesTabComponent from '../components/TradesTabComponent'

const Trades = (props: Pick<ChartObjectProps, 'close'>) => {
  const {close} = props
  const [activeIndex, setActiveIndex] = useState(0)
  const [sortingType, setSortingType] =
    useState<TradingSortingType>('buy_sell_type')
  return (
    <TabComponent
      activeIndex={activeIndex}
      className="shrink-0 py-2 px-4 !gap-3"
      headingData={Constants.TradingTab}
      setActiveIndex={setActiveIndex}
      type="buttonType"
    >
      <ChartSwitch activeType={sortingType} setActiveType={setSortingType} />
      <TradesTabComponent activeType={sortingType} close={close} />
    </TabComponent>
  )
}

export default Trades
