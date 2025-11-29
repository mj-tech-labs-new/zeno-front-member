import React, {memo, useRef} from 'react'

import {English} from '@/helpers'
import chartPageApi from '@/pages/ChartPages/api/ChartPageApi'
import {useChartProvider} from '@/pages/ChartPages/context/ChartProvider'
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
    apiMethod = '',
    submittedPrice = 0,
  } = props
  const loaderRef = useRef<AppLoaderRef>(null)
  const {getChallengeByIdArray, setCurrentUsdt} = useChartProvider()

  return (
    <React.Fragment>
      <Loader ref={loaderRef} />
      <CommonButton
        singleLineContent={apiMethod === 'delete' ? English.E295 : English.E243}
        className={`!w-fit !p-0 text-primary-dark-blue-color  hover:text-primary-dark-blue-color/90 
        ${
          apiMethod === 'delete'
            ? '!text-extra-dark-danger-color hover:!text-dark-danger-color/90'
            : '!text-primary-dark-blue-color hover:!text-primary-dark-blue-color/90'
        }
        ${className}
      `}
        onClick={() => {
          loaderRef.current?.showLoader(true)
          if (type === 'single_order' && apiMethod === 'delete') {
            setCurrentUsdt(
              (getChallengeByIdArray?.[0]?.current_usdt ?? 0) + submittedPrice
            )
          }
          if (type === 'single_order' && apiMethod === 'put') {
            setCurrentUsdt(
              (getChallengeByIdArray?.[0]?.current_usdt ?? 0) + submittedPrice
            )
          }
          chartPageApi
            .closeOrderApi({apiMethod, challenge_id, tx_hash, type})
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
