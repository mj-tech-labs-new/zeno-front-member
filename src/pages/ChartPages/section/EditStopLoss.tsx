import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

import {CommonButton} from '@/components'
import {English, Utility} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {
  CommonBuyAndSellProp,
  OpenPosition,
  PendingOrder,
} from '@/types/ChartTypes'

import StopLoss from './StopLoss'

const EditStopLoss = (props: {
  item: (OpenPosition | PendingOrder) | null
  closeModel: () => void
}) => {
  const {item, closeModel} = props
  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const [stopLossValue, setStopLossValue] = useState<number>(0)

  const handleUpdateOrder = async () => {
    const payload = {
      challenge_id: item?.challenge_id,
      tx_hash: item?.tx_hash,
      symbol: item?.symbol,
      stop_loss: stopLossData?.stop_loss,
      take_profit: stopLossData?.take_profit,
    }
    APICall('put', Endpoints.updateOrder, payload)
      .then(() => {})
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
        <div>
          <CommonButton
            className="bg-chart-red-color text-primary-color !w-fit mx-auto"
            onClick={handleUpdateOrder}
            singleLineContent={English.E333}
          />
        </div>
      </div>
    </div>
  )
}

export default EditStopLoss
