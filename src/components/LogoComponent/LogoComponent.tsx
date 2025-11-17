import {memo} from 'react'

import {Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const LogoComponent = (
  props: Pick<
    GeneralProps,
    'singleLineContent' | 'layoutClassName' | 'className'
  >
) => {
  const {singleLineContent = '', layoutClassName = '', className = ''} = props
  return (
    <div className={`flex gap-4 items-center ${layoutClassName}`}>
      {singleLineContent !== '' && (
        <HeadingComponent
          className="font-inter font-semibold"
          singleLineContent={singleLineContent}
          type="h1"
          variant="x-small"
        />
      )}
      <ImageComponent
        className={`w-6 aspect-square ${className}`}
        imageUrl={Images.platformLogo}
      />
    </div>
  )
}

export default memo(LogoComponent)
