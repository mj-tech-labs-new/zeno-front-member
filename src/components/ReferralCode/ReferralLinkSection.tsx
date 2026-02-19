import {useEffect, useState} from 'react'

import {English, Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import CommonButton from '../CommonButton/CommonButton'

const ReferralLinkSection = (
  props: Required<Pick<GeneralProps, 'singleLineContent'>>
) => {
  const {singleLineContent} = props
  const [referralCode, setReferralCode] = useState<null | string>(null)

  useEffect(() => {
    setReferralCode(singleLineContent)
  }, [singleLineContent])

  return (
    <div className="space-y-2">
      <p className="text_lg_utility text-primary-color">{English.E453}</p>
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        <div className="py-2 px-4 border border-solid rounded-lg  truncate  bg-tertiary-bg-color border-secondary-border-color  flex-1">
          <span className=" font-switzer! text-text-hint-color ">
            {referralCode}
          </span>
        </div>
        <CommonButton
          className="red_btn_utility gap-2! text-xs/6 w-fit! py-2! px-4! flex-row-reverse items-center [&>div]:size-4!"
          imageUrl={Images.copy}
          singleLineContent={English.E454}
          onClick={(e) => {
            if (!referralCode) return
            e.stopPropagation()
            navigator.clipboard?.writeText(referralCode)
          }}
        />
      </div>
      <span className="text-text-hint-color text-xs text-wrap">
        {English.E455}
      </span>
    </div>
  )
}

export default ReferralLinkSection
