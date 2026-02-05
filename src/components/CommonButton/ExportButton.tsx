import {English, Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const ExportButton = (
  props: Required<Pick<GeneralProps, 'onPressItem'>> & {disabled: boolean}
) => {
  const {onPressItem, disabled} = props

  return (
    <div
      className={`cursor-pointer py-2 red_btn_utility px-4 flex items-center gap-2 ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onPressItem()
      }}
    >
      <button className="text_13_utility cursor-pointer" type="button">
        {English.E493}
      </button>
      <ImageComponent
        className="size-4! flex items-center justify-center cursor-pointer"
        imageUrl={Images.arrowBottomIcon}
      />
    </div>
  )
}

export default ExportButton
