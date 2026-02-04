import 'tippy.js/dist/tippy.css'

import Tippy from '@tippyjs/react'
import { memo } from 'react'

import { Images } from '@/helpers'
import { GeneralProps } from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const Info = (props: Pick<GeneralProps, 'singleLineContent' | 'className'>) => {
  const { singleLineContent, className = '' } = props
  return singleLineContent === '' ? null : (
    <Tippy content={singleLineContent}>
      <div className="relative w-4 h-4 rounded-full group ">
        <ImageComponent
          className={`[&>img]:grey__filter ${className}`}
          imageUrl={Images.infoIcon}
        />
      </div>
    </Tippy>
  )
}

export default memo(Info)
