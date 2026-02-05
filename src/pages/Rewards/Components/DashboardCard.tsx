import {memo} from 'react'

import {Info} from '@/components'
import {DashboardCardProps} from '@/types/Certificate'

const DashboardCard = (props: DashboardCardProps) => {
  const {content, title, infoContent} = props
  return (
    <div className="p-px bg-linear-to-t from-gradient-gr1 to-black-dark-700 rounded-2xl overflow-hidden">
      <div className="rounded-2xl p-6 bg-linear-to-t from-black-dark-600 to-black-dark-700 h-full">
        <div className="flex flex-col gap-2 justify-between h-full ">
          <div className="flex justify-between items-center gap-1">
            <span className="text_base_utility text-inactive-color">
              {title}
            </span>
            {infoContent !== '' && <Info singleLineContent={infoContent} />}
          </div>
          <span className="text_base_utility text-primary-color">
            {content}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(DashboardCard)
