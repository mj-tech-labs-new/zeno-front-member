import {GoBackButton, LogoComponent} from '@/components'
import {English} from '@/helpers'

import ChartProvider from './context/ChartProvider'
import ChartRenderingLayout from './section/ChartRenderingLayout'

const Chart = () => (
  <ChartProvider>
    <div className="h-screen w-screen">
      <div className="flex gap-5 p-6">
        <GoBackButton className="!h-4" />
        <LogoComponent
          className="!w-4"
          layoutClassName="flex-row-reverse"
          singleLineContent={English.E20}
        />
      </div>
      <ChartRenderingLayout />
    </div>
  </ChartProvider>
)

export default Chart
