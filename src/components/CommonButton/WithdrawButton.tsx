import {memo, useCallback, useEffect, useState} from 'react'

import {English} from '@/helpers'

const WithdrawButton = (props: {availableAmount: number}) => {
  const {availableAmount} = props
  const [avlbAmtToWithdraw, setAvlbAmtToWithdraw] = useState(availableAmount)

  const onPressWithdraw = useCallback(() => {
    if (avlbAmtToWithdraw !== 0) {
      /// Something Here Later....
    }
  }, [avlbAmtToWithdraw])

  useEffect(() => {
    setAvlbAmtToWithdraw(availableAmount)
  }, [availableAmount])

  return (
    <button
      className="medium-success-btn-type p-0! w-[233px] cursor-pointer h-10 rounded-lg font-normal font-switzer! text-primary-color text-xs/6"
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onPressWithdraw()
      }}
    >
      {English.E444}
    </button>
  )
}

export default memo(WithdrawButton)
