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
}) => {
  const {item, closeModel, apiMethod, livePrice} = props
  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const [stopLossValue, setStopLossValue] = useState<number>(0)

  const handleUpdateOrder = async () => {
    if (item?.direction === 'buy' || item?.direction === 'sell') {
      const sl = stopLossData?.stop_loss?.[0]?.price
      const tp = stopLossData?.take_profit?.[0]?.price
      if (sl === undefined || tp === undefined) {
        toast.error(English.E343)
        return
      }

      if (item?.direction === 'buy') {
        if (sl != null && Number(sl) >= livePrice) {
          toast.error(English.E296)
          return
        }
        if (tp != null && Number(tp) <= livePrice) {
          toast.error(English.E296)
          return
        }
      }

      if (item?.direction === 'sell') {
        if (sl != null && Number(sl) <= livePrice) {
          toast.error(English.E297)
          return
        }
        if (tp != null && Number(tp) >= livePrice) {
          toast.error(English.E297)
          return
        }
      }
    }
    const payload = {
      challenge_id: item?.challenge_id,
      tx_hash: item?.tx_hash,
      symbol: item?.symbol,
      stop_loss: stopLossData?.stop_loss,
      take_profit: stopLossData?.take_profit,
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
    const payload = {
      challenge_id: item?.challenge_id,
      tx_hash: item?.tx_hash,
      stop_loss_id: 1,
      take_profit_id: 1,
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
  }, [closeModel, item?.challenge_id, item?.tx_hash])
  useEffect(() => {
    setStopLossValue(0)
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 ">
        <div>
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
        <div
          className={apiMethod === 'put' ? 'flex justify-center gap-4 ' : ''}
        >
          <CommonButton
            className={`bg-chart-red-color text-primary-color !w-fit ${apiMethod === 'put' ? '' : 'mx-auto'} `}
            onClick={handleUpdateOrder}
            singleLineContent={
              apiMethod === 'put' ? English.E333 : English.E341
            }
          />
          {apiMethod === 'put' && (
            <CommonButton
              className="bg-extra-dark-danger-color text-primary-color !w-fit "
              onClick={handleDeleteOrder}
              singleLineContent={English.E342}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditStopLoss
