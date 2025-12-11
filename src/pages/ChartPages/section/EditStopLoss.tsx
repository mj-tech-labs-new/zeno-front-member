import {useCallback, useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {CommonButton} from '@/components'
import {English, Utility} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {
  CommonBuyAndSellProp,
  OpenPosition,
  PendingOrder,
} from '@/types/ChartTypes'
import {Methodtype} from '@/types/UnionTypes'

import StopLoss from './StopLoss'

const EditStopLoss = (props: {
  item: (OpenPosition | PendingOrder) | null
  closeModel: () => void
  apiMethod: Methodtype
  livePrice: number
  symbol: string
}) => {
  const {item, closeModel, apiMethod, livePrice, symbol} = props

  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const [stopLossValue, setStopLossValue] = useState<number>(0)

  const handleUpdateOrder = async () => {
    if (item?.direction === 'buy' || item?.direction === 'sell') {
      const sl = stopLossData?.stop_loss?.[0]?.price
      const tp = stopLossData?.take_profit?.[0]?.price
      if (sl === undefined && tp === undefined) {
        toast.error(English.E343)
        return
      }

      if (item?.direction === 'buy') {
        if (Number(sl) >= livePrice) {
          toast.error(English.E296)
          return
        }
        if (Number(tp) <= livePrice) {
          toast.error(English.E296)
          return
        }
      }

      if (item?.direction === 'sell') {
        if (Number(sl) <= livePrice) {
          toast.error(English.E297)
          return
        }
        if (Number(tp) >= livePrice) {
          toast.error(English.E297)
          return
        }
      }
    }
    let payload: Record<string, any> = {
      challenge_id: item?.challenge_id ?? '',
      tx_hash: item?.tx_hash ?? '',
      symbol: item?.symbol ?? '',
    }

    if (
      item?.stop_loss?.length !== 1 &&
      apiMethod === 'post' &&
      stopLossData.stop_loss
    ) {
      payload = {...payload, stop_loss: stopLossData.stop_loss}
    }
    if (apiMethod === 'put') {
      payload = {...payload, stop_loss: stopLossData.stop_loss}
    }
    if (
      item?.take_profit?.length !== 1 &&
      apiMethod === 'post' &&
      stopLossData.stop_loss
    ) {
      payload = {...payload, take_profit: stopLossData.take_profit}
    }
    if (apiMethod === 'put') {
      payload = {...payload, take_profit: stopLossData.take_profit}
    }
    APICall(
      apiMethod,
      apiMethod === 'put' ? Endpoints.updateOrder : Endpoints.addStopLoss,
      payload
    )
      .then((res: any) => {
        if (res) {
          toast.success(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
      })
      .finally(() => {
        closeModel()
      })
  }

  useEffect(() => {
    if (!item) return
    setStopLossData({stop_loss: item.stop_loss, take_profit: item.take_profit})
  }, [item])

  const handleDeleteOrder = useCallback(() => {
    let payload: Record<string, string | number> = {
      challenge_id: item?.challenge_id ?? '',
      tx_hash: item?.tx_hash ?? '',
    }

    if (item?.stop_loss?.length === 1) {
      payload = {...payload, stop_loss_id: 1}
    }

    if (item?.take_profit?.length === 1) {
      payload = {...payload, take_profit_id: 1}
    }

    APICall('delete', Endpoints.deleteStopLoss, payload)
      .then((res: any) => {
        if (res) {
          toast.success(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
      })
      .finally(() => {
        closeModel()
      })
  }, [
    closeModel,
    item?.challenge_id,
    item?.stop_loss?.length,
    item?.take_profit?.length,
    item?.tx_hash,
  ])
  useEffect(() => {
    setStopLossValue(0)
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 py-6 ">
        <div>
          <div className="flex justify-between items-center">
            <div className="font-switzer text-primary-dark-blue-color font-medium">
              {English.E293} :{' '}
            </div>
            <div className="text-primary-dark-blue-color font-normal">
              {livePrice}
              {` ${symbol.replace('USDT', '')}`}
            </div>
          </div>
          <StopLoss
            heading="Stop Loss"
            marketPrice={Number(item?.average_price)}
            quantity={Number(item?.quantity)}
            resetValue={stopLossValue}
            subHeading="Stop loss"
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev.stop_loss ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value.stop_loss?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(item?.quantity ?? 0))
                  ),
                }

                return {
                  ...prev,
                  stop_loss: updated,
                }
              })
            }
            stopLoss={{
              id: stopLossData?.stop_loss?.[0]?.id ?? 0,
              price: stopLossData.stop_loss?.[0]?.price ?? 0,
              quantity: stopLossData.stop_loss?.[0]?.quantity,
              status: stopLossData.stop_loss?.[0]?.status,
            }}
          />
          <StopLoss
            heading="Take Profit"
            marketPrice={Number(item?.average_price)}
            quantity={Number(item?.quantity)}
            resetValue={stopLossValue}
            subHeading="Take Profit "
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev?.take_profit ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value?.take_profit?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(item?.quantity ?? 0))
                  ),
                }

                return {
                  ...prev,
                  take_profit: updated,
                }
              })
            }
            stopLoss={{
              id: stopLossData.take_profit?.[0]?.id ?? 0,
              price: stopLossData.take_profit?.[0]?.price ?? 0,
              quantity: stopLossData.take_profit?.[0]?.quantity ?? 0,
              status: stopLossData.take_profit?.[0]?.status ?? '',
            }}
          />
        </div>
        <div className="flex justify-center gap-4 ">
          <CommonButton
            className={`bg-chart-red-color text-primary-color !w-fit  `}
            onClick={handleUpdateOrder}
            singleLineContent={
              apiMethod === 'put' ? English.E333 : English.E341
            }
          />

          <CommonButton
            className="bg-extra-dark-danger-color text-primary-color !w-fit "
            onClick={handleDeleteOrder}
            singleLineContent={English.E342}
          />
        </div>
      </div>
    </div>
  )
}

export default EditStopLoss
