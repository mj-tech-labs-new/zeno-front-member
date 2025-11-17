import React, {memo, useRef} from 'react'

import {English} from '@/helpers'
import chartPageApi from '@/pages/ChartPages/api/ChartPageApi'
import {CloseOrderButtonProps} from '@/types/ChallengeTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import Loader from '../Loader/Loader'
import CommonButton from './CommonButton'

const CommonCloseActionButton = (props: CloseOrderButtonProps) => {
  const {
    type = 'single_order',
    className = '',
    tx_hash = '',
    challenge_id = '',
    onPerformAction,
  } = props
  const loaderRef = useRef<AppLoaderRef>(null)

  return (
    <React.Fragment>
      <Loader ref={loaderRef} />
      <CommonButton
        className={`!w-fit !p-0 text-primary-dark-blue-color hover:text-primary-dark-blue-color/90 ${className}`}
        singleLineContent={English.E243}
        onClick={() => {
          loaderRef.current?.showLoader(true)
          chartPageApi
            .closeOrderApi({challenge_id, tx_hash, type})
            .then(() => {
              if (onPerformAction) {
                onPerformAction(true)
              }
            })
            .finally(() => {
              setTimeout(() => {
                loaderRef.current?.showLoader(false)
              }, 1500)
            })
        }}
      />
    </React.Fragment>
  )
}

export default memo(CommonCloseActionButton)
