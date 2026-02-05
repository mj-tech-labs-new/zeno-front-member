import {memo} from 'react'

import {CommonButton, ImageComponent, Info} from '@/components'
import {English, Images} from '@/helpers'
import {DashboardCardProps} from '@/types/Certificate'

const DailyBonusCard = (props: DashboardCardProps) => {
  const {content, title, infoContent, onPressItem, showDisableValue, id} = props

  return (
    <div
      className={`p-px  rounded-2xl overflow-hidden  ${(showDisableValue ?? 1) + 1 === id ? 'bg-linear-to-t from-gradient-gr1 to-light-success-color' : ''}`}
    >
      <div className="rounded-2xl  px-6  bg-linear-to-t from-black-dark-600 to-black-dark-700 h-34 py-6">
        <div className="flex flex-col space-y-1 justify-between h-full ">
          <div className="flex justify-between items-center  ">
            <span className="text_base_utility text-sm text-inactive-color">
              {title}
            </span>
            {infoContent !== '' && <Info singleLineContent={infoContent} />}
          </div>
          <span className="text_base_utility text-primary-color">
            {content}
          </span>
          {(showDisableValue ?? 1) >= (id ?? 1) && (
            <span className="flex justify-center gap-1.5">
              <ImageComponent className="w-3" imageUrl={Images.greenDoneIcon} />
              <span className="text-primary-color font-switzer text-xs">
                {English.E495}
              </span>
            </span>
          )}
          {(showDisableValue ?? 1) < (id ?? 1) && (
            <CommonButton
              className={`px-1.5! py-1.5! text-xs  mt-2!  ${(showDisableValue ?? 1) + 1 === id ? 'text-primary-color! medium-success-btn-type ' : 'text-text-hint-color! primary-btn-type '} `}
              singleLineContent={English.E470}
              onClick={() => {
                onPressItem?.()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(DailyBonusCard)
