import {useCallback} from 'react'

import {CommonButton} from '@/components'
import {English} from '@/helpers'
import {ReverceOrderApiProps} from '@/types/ChartTypes'

import chartPageApi from '../api/ChartPageApi'

const ReverseOrder = (props: ReverceOrderApiProps) => {
  const handleReverseOrder = useCallback(() => {
    const queryPayload = {
      method: 'single',
      tx_hash: props?.tx_hash,
      challenge_id: props?.challenge_id,
    }
    chartPageApi.ReverceOrderApi(queryPayload)
  }, [props?.challenge_id, props?.tx_hash])

  return (
    <CommonButton
      className={`!py-1 !w-18 !px-0  text-accents-yellow!  !font-semibold  bg-neutral-secondary-color  `}
      onClick={handleReverseOrder}
      singleLineContent={English.E369}
    />
  )
}

export default ReverseOrder
