import {memo, useState} from 'react'

import {English, Images, Utility} from '@/helpers'
import PayoutApi from '@/pages/PayoutPage/api/PayoutApi'

import CommonButton from '../CommonButton/CommonButton'
import ImageComponent from '../ImageComponent/ImageComponent'
import InputContainer from '../InputContainer/InputContainer'

const ChangeWalletBtn = (props: {
  wallet: string
  isYellowType?: boolean
  onPressClose: (content: string) => void
  onPressBtn?: () => void
}) => {
  const {wallet, isYellowType = false, onPressClose, onPressBtn} = props
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [updatedAdd, setUpdatedAdd] = useState(wallet)

  return isButtonClicked ? (
    <div className="flex flex-col gap-2 mt-2">
      <InputContainer
        className="[&>input]:h-10!"
        placeholder={English.E357}
        value={updatedAdd}
        onChange={(e) => {
          setUpdatedAdd(Utility.trimMultipleSpaces(e.target.value))
        }}
      />
      <CommonButton
        className="medium-success-btn-type text-primary-color py-2! text_base_utility font-switzer! font-normal rounded-lg!"
        disabled={updatedAdd === ''}
        singleLineContent={English.E439}
        onClick={(e) => {
          e.stopPropagation()
          PayoutApi.updatePayoutWallet(updatedAdd).then((res) => {
            if (res) {
              onPressClose(updatedAdd)
              setIsButtonClicked(false)
            }
          })
        }}
      />
    </div>
  ) : (
    <button
      className="flex items-center gap-1 cursor-pointer mt-2"
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onPressBtn?.()
        setIsButtonClicked(true)
      }}
    >
      <ImageComponent
        className={`size-4! ${isYellowType ? '' : 'secondary_red_filter'}`}
        imageUrl={Images.editIcon}
      />
      <span
        className={`text_base_utility ${isYellowType ? '' : 'text-light-danger-color'}`}
      >
        {English.E441}
      </span>
    </button>
  )
}

export default memo(ChangeWalletBtn)
