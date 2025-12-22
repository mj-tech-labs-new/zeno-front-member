import {useCallback, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'

import {CommonButton, ImageComponent} from '@/components'
import {English, Images} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {
  CommonBuyAndSellProp,
  OpenPosition,
  PendingOrder,
} from '@/types/ChartTypes'
import {Methodtype} from '@/types/UnionTypes'

import {useChartProvider} from '../context/ChartProvider'
import StopLoss from './StopLoss'

const EditStopLoss = (props: {
  item: (OpenPosition | PendingOrder) | null
  closeModel: () => void
  apiMethod: Methodtype
}) => {
  const {item, closeModel, apiMethod} = props
  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const {livePrice} = useChartProvider()
  const isItems = useRef(false)

  const handleUpdateOrder = async (type: string, method: Methodtype) => {
    if (item?.direction === 'buy' || item?.direction === 'sell') {
      const sl = stopLossData?.stop_loss?.[0]?.price
      const tp = stopLossData?.take_profit?.[0]?.price

      if (type === 'stopLoss' && (sl === 0 || !sl) && method === 'put') {
        toast.error(English.E343)
        return
      }
      if ((tp === 0 || !tp) && type === 'takeProfit' && method === 'put') {
        toast.error(English.E343)
        return
      }

      if ((tp === 0 || sl === 0) && type === 'all') {
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
      type === 'all' &&
      item?.stop_loss?.length !== 1 &&
      stopLossData.stop_loss
    ) {
      payload = {...payload, stop_loss: stopLossData.stop_loss}
    }

    if (
      type === 'all' &&
      item?.take_profit?.length !== 1 &&
      stopLossData.take_profit
    ) {
      payload = {...payload, take_profit: stopLossData.take_profit}
    }

    if (type === 'stopLoss') {
      payload = {...payload, stop_loss: stopLossData.stop_loss}
    }
    if (type === 'takeProfit') {
      payload = {...payload, take_profit: stopLossData.take_profit}
    }

    APICall(
      type ? method : apiMethod,
      method === 'put' ? Endpoints.updateOrder : Endpoints.addStopLoss,
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
    if (!item || isItems.current) return
    isItems.current = true
    setStopLossData({stop_loss: item.stop_loss, take_profit: item.take_profit})
  }, [item])

  const handleDeleteOrder = useCallback(
    (type: string) => {
      let payload: Record<string, string | number> = {
        challenge_id: item?.challenge_id ?? '',
        tx_hash: item?.tx_hash ?? '',
      }

      if (type === 'all') {
        if (item?.stop_loss?.length === 1) {
          payload = {...payload, stop_loss_id: 1}
        }

        if (item?.take_profit?.length === 1) {
          payload = {...payload, take_profit_id: 1}
        }
      }
      if (type === 'stopLoss' && item?.stop_loss?.length === 1) {
        payload = {...payload, stop_loss_id: 1}
      }

      if (type === 'takeProfit' && item?.take_profit?.length === 1) {
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
    },
    [
      closeModel,
      item?.challenge_id,
      item?.stop_loss?.length,
      item?.take_profit?.length,
      item?.tx_hash,
    ]
  )

  return (
    <div>
      <div className="flex flex-col gap-6 py-6 ">
        <div>
          {Array.from({length: 2}).map((__, index) => {
            const stopLoss = index + 1
            return (
              <div
                key={`tpsl_${stopLoss}`}
                className="flex items-end justify-center  gap-2.5"
              >
                <StopLoss
                  heading={stopLoss === 1 ? English.E292 : English.E368}
                  marketPrice={Number(item?.average_price)}
                  quantity={Number(item?.quantity)}
                  subHeading={stopLoss === 1 ? English.E292 : English.E368}
                  setStopLoss={(value) =>
                    setStopLossData((prev) => {
                      const updated = [
                        ...(stopLoss === 1
                          ? (prev.stop_loss ?? [])
                          : (prev?.take_profit ?? [])),
                      ]

                      updated[0] = {
                        ...updated[0],
                        ...(stopLoss === 1
                          ? value.stop_loss?.[0]
                          : value.take_profit?.[0]),
                        quantity: Number(item?.quantity ?? 0),
                      }

                      const stopLossValue = {
                        ...prev,
                        stop_loss: updated,
                      }
                      const takeProfitValue = {
                        ...prev,
                        take_profit: updated,
                      }
                      return stopLoss === 1 ? stopLossValue : takeProfitValue
                    })
                  }
                  stopLoss={{
                    id:
                      stopLoss === 1
                        ? (stopLossData?.stop_loss?.[0]?.id ?? 0)
                        : (stopLossData?.take_profit?.[0]?.id ?? 0),
                    price:
                      stopLoss === 1
                        ? (stopLossData.stop_loss?.[0]?.price ?? 0)
                        : (stopLossData?.take_profit?.[0]?.price ?? 0),
                    quantity: stopLoss === 1 ? item?.quantity : item?.quantity,
                    status:
                      stopLoss === 1
                        ? stopLossData.stop_loss?.[0]?.status
                        : stopLossData?.take_profit?.[0]?.status,
                  }}
                />
                <div className="flex flex-col items-center">
                  {(stopLoss === 1
                    ? item?.stop_loss?.length === 1
                    : item?.take_profit?.length === 1) && (
                    <div>
                      <ImageComponent
                        className="h-6 w-4 cursor-pointer"
                        imageUrl={Images.editIcon}
                        onPressItem={async () =>
                          handleUpdateOrder(
                            stopLoss === 1 ? 'stopLoss' : 'takeProfit',
                            (
                              stopLoss === 1
                                ? !item?.stop_loss?.[0]
                                : !item?.take_profit?.[0]
                            )
                              ? 'post'
                              : 'put'
                          )
                        }
                      />
                      <ImageComponent
                        className="h-6 w-5 cursor-pointer "
                        imageUrl={Images.deleteIcon}
                        onPressItem={() =>
                          handleDeleteOrder(
                            stopLoss === 1 ? 'stopLoss' : 'takeProfit'
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center gap-4 ">
          {Array.from({length: 2}).map((__, index) => (
            <CommonButton
              key={`index_${index + 1}`}
              singleLineContent={index + 1 === 1 ? English.E341 : English.E342}
              className={`font-semibold text-sm ${index + 1 === 1 ? 'bg-chart-red-color ' : 'bg-extra-dark-danger-color'}
                   ${index + 1 === 1 && item?.stop_loss?.length === 1 && item?.take_profit?.length === 1 ? 'bg-chart-red-color/50 text-primary-color/50 pointer-events-none' : ''} text-primary-color !w-fit `}
              onClick={async () =>
                index + 1 === 1
                  ? handleUpdateOrder('all', 'post')
                  : handleDeleteOrder('all')
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EditStopLoss
