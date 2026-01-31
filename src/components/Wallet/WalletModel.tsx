import {memo, useCallback, useRef, useState} from 'react'

import {English, Utility} from '@/helpers'
import PayoutApi from '@/pages/PayoutPage/api/PayoutApi'
import {AppLoaderRef, WalletModelProps} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'
import Divider from '../Divider/Divider'
import InputContainer from '../InputContainer/InputContainer'
import Loader from '../Loader/Loader'
import ChangeWalletBtn from './ChangeWalletBtn'

const WalletModel = (props: WalletModelProps) => {
  const {earningAmount, walletAddress, challenge_id} = props
  const [address, setAddress] = useState(walletAddress)
  const [isDisabled, setIsDisabled] = useState(false)
  const [withDrawAmt, setWithDrawAmt] = useState('')
  const loaderRef = useRef<AppLoaderRef>(null)

  const onPressSubmitPayout = useCallback(() => {
    if (!challenge_id || withDrawAmt === '') return
    loaderRef.current?.showLoader(true)
    PayoutApi.payoutRequest(challenge_id, Number(withDrawAmt))
      .then((res) => {
        if (res) {
          window.location.reload()
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [challenge_id, withDrawAmt])

  return (
    <div className="px-6 py-4 space-y-6">
      <Loader ref={loaderRef} />
      <div className="flex flex-col gap-2">
        <span className="text-secondary-dark-color font-switzer! text_base_utility font-medium">
          {English.E445}
        </span>
        <span className="text-[32px]/6 font-medium font-switzer! text-text-info-dark-color">{`${Utility.numberConversion(earningAmount)} ${English.E60}`}</span>
      </div>

      <Divider className="bg-divider-color!" />

      <div className="flex flex-col">
        <span>{English.E440}</span>
        <p className="text-lg/6 mt-2 font-normal text-text-info-color font-switzer!">
          {Utility.generateTrimmedWallet(address)}
        </p>
        <span className="text-13 leading-6! text-text-info-dark-color font-normal font-switzer!">
          {English.E379}
        </span>

        <ChangeWalletBtn
          wallet={walletAddress}
          onPressBtn={() => {
            setIsDisabled(true)
          }}
          onPressClose={(value) => {
            setAddress(value)
            setIsDisabled((data) => !data)
          }}
        />

        {!isDisabled && (
          <div className="flex flex-col gap-2 mt-8">
            <InputContainer
              className="[&>input]:h-10!"
              placeholder={English.E105}
              value={withDrawAmt}
              onChange={(e) => {
                setWithDrawAmt(Utility.validFloatNumber(e.target.value))
              }}
            />
            <CommonButton
              className="medium-success-btn-type  rounded-lg! text-primary-color py-2! text_base_utility font-switzer! font-normal "
              disabled={withDrawAmt === ''}
              singleLineContent={English.E447}
              onClick={(e) => {
                e.stopPropagation()
                onPressSubmitPayout()
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(WalletModel)
