import {useEffect} from 'react'

import {ImageComponent} from '@/components'
import {Constants} from '@/helpers'
import {ChartShapesType} from '@/types/UnionTypes'

import {useChartProvider} from '../context/ChartProvider'

const ChartShapes = () => {
  const {
    selectedTool,
    setSelectedTool,
    enableChartActions,
    disableChartActions,
  } = useChartProvider()
  useEffect(() => {
    if (!selectedTool || selectedTool === 'cursor') {
      enableChartActions()
      return
    }
    disableChartActions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool])
  return (
    <div className="p-2 h-full flex flex-row flex-wrap lg:flex-col lg:flex-nowrap gap-1">
      {Constants.chartTools?.map((tool) => {
        const {img, name} = tool
        return (
          <div
            key={name}
            className={`p-1 rounded transition-all duration-500 ease-linear ${name === selectedTool ? 'bg-neutral-active-color pointer-events-none' : 'bg-transparent cursor-pointer'}`}
            onClick={() => {
              setSelectedTool(name as ChartShapesType)
            }}
          >
            <ImageComponent
              className={`w-6 ${selectedTool === name ? '[&>img]:blue_filter' : '[&>img]:grey__filter'}`}
              imageUrl={img}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ChartShapes
