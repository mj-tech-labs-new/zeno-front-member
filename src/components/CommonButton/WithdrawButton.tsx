import {memo, useCallback, useEffect, useState} from 'react'

import {English} from '@/helpers'
import {WalletModelProps} from '@/types/ComponentTypes'

import {useModalContext} from '../Modal/context/ModalContextProvider'
import WalletModel from '../Wallet/WalletModel'

const WithdrawButton = (props: {
  availableAmount: number
  walletAddress: string
  challenge_id: string
}) => {
  const {availableAmount, walletAddress, challenge_id} = props
  const [avlbAmtToWithdraw, setAvlbAmtToWithdraw] = useState(availableAmount)
  const {setChildContent, setModalProps} = useModalContext()

  const onPressWithdraw = useCallback(
    (
      data: Pick<WalletModelProps, 'earningAmount' | 'walletAddress'> & {
        challenge_id: string
      }
    ) => {
      if (avlbAmtToWithdraw !== 0) {
        setChildContent(<WalletModel {...data} />)
        setModalProps({
          className: 'p-6 rounded-[16px] bg-primary-color w-[558px]',
          showCross: true,
          onPressButton: () => {
            setChildContent(null)
            setModalProps(null)
          },
        })
      }
    },
    [avlbAmtToWithdraw, setChildContent, setModalProps]
  )

  useEffect(() => {
    setAvlbAmtToWithdraw(availableAmount)
  }, [availableAmount])

  return (
    <button
      className="medium-success-btn-type p-0! w-[233px] cursor-pointer h-10 rounded-lg font-normal font-switzer! text-primary-color text-xs/6"
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onPressWithdraw({
          earningAmount: availableAmount,
          walletAddress,
          challenge_id,
        })
      }}
    >
      {English.E444}
    </button>
  )
}

export default memo(WithdrawButton)
