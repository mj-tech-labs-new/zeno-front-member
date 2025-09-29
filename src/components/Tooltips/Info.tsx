import 'react-tooltip/dist/react-tooltip.css'

import {memo} from 'react'
import {Tooltip} from 'react-tooltip'

import {Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const Info = (props: Pick<GeneralProps, 'singleLineContent' | 'className'>) => {
  const {singleLineContent, className = ''} = props
  return (
    <div className="relative w-4 h-4 rounded-full group">
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-content={singleLineContent || 'Hello Content!!!'}
      >
        <ImageComponent imageUrl={Images.infoIcon} className={className} />
      </a>
      <Tooltip
        id="my-tooltip"
        className="bg-primary-color p-2 rounded-2xl fixed z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out max-w-sm h-fit text-secondary-dark-color text-xs font-normal"
      />
    </div>
  )
}

export default memo(Info)
