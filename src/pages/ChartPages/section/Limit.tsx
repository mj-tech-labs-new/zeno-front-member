import {memo, useCallback, useEffect, useState} from 'react'

import {Divider, ImageComponent, InputContainer} from '@/components'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import {Constants, English, Images, Utility} from '@/helpers'
import {BuyOrSelProps, CommonBuyAndSellProp} from '@/types/ChartTypes'

import MaxOpenAndMargin from '../components/MaxOpenAndMargin'
import {useChartProvider} from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const Limit = (props: BuyOrSelProps) => {
  const {activeIndex} = props
  const {chartInfo, getChallengeByIdArray, selectedLeverage} =
    useChartProvider()
  const [checked, setChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    entryprice: '',
    quantity: '',
  })
  const [total, setTotal] = useState(0)
  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})
  const [stopLossValue, setStopLossValue] = useState<number>(0)

  useEffect(() => {
    setInputValues({
      entryprice: '',
      quantity: '',
    })
  }, [selectedLeverage])

  const handleLeverageCount = useCallback(
    (price: number | string) => {
      if (!selectedLeverage?.title || !price) return
      const leverage = Number()

      const entry = Number(price)

      const leveragedPrice = entry / leverage

      setInputValues((prev) => ({
        ...prev,
        entryprice: leveragedPrice.toString(),
      }))
    },
    [selectedLeverage]
  )

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      setInputValues((prev) => {
        if (name === 'entryprice' && getChallengeByIdArray) {
          return {
            ...prev,
            entryprice: Utility.validFloatNumber(
              Utility.validPointValue(value)
            ),
          }
        }

        return {
          ...prev,
          quantity: Utility.validFloatNumber(Utility.validPointValue(value)),
        }
      })
    },
    [getChallengeByIdArray]
  )

  useEffect(() => {
    if (!inputValues?.entryprice) setTotal(0)
    if (!inputValues?.quantity) setTotal(0)
    if (
      inputValues?.entryprice != null &&
      inputValues?.entryprice !== '' &&
      inputValues?.quantity != null &&
      inputValues?.quantity !== ''
    ) {
      setTotal(
        (parseFloat(inputValues?.entryprice) *
          parseFloat(inputValues?.quantity)) /
          Number(selectedLeverage?.title)
      )
    }
  }, [getChallengeByIdArray, inputValues, selectedLeverage?.title, total])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-base !leading-8 text-chart-text-primary-color font-semibold ">
          {English.E130}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-extra-light-success-color text-xs font-semibold !leading-5">
            {Utility.numberConversion(
              getChallengeByIdArray?.[0]?.current_usdt ?? 0
            )}
          </span>
          <ImageComponent className="!w-4" imageUrl={Images.walletImg} />
        </div>
      </div>

      {Constants.BuySellInputArray.Limit.map((item, index) => {
        const {name, placeHolder, label, textContent} = item
        const priceValue = inputValues?.[name as keyof typeof inputValues]
        return (
          <div key={`name_${name}`}>
            <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
              <div className="flex justify-between gap-2">
                <span className="shrink-0 text-light-neutral-color text-sm !leading-6 font-medium capitalize">
                  {label}
                </span>
                <div className="w-full gap-2.5 flex items-center">
                  <InputContainer
                    layoutClassName="!w-full"
                    placeholder={name === 'price' ? placeHolder : ''}
                    value={priceValue}
                    className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
              [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                    onChange={(e) => {
                      if (name === 'entryprice') {
                        const {value} = e.target
                        handleLeverageCount(value)
                      }
                      handleInputChange(
                        name as keyof typeof inputValues,
                        e.target.value
                      )
                    }}
                  />

                  <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                  <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                    {index === 0 && textContent}
                    {index === 1 && chartInfo?.fullSymbolName.split('USDT')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {total && total > getChallengeByIdArray?.[0]?.current_usdt ? (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      ) : null}
      <div className="flex items-center gap-3">
        <ActionButton
          activeIndex={activeIndex}
          checked={checked}
          leverage={Number(selectedLeverage?.title)}
          order_type="limit"
          price={Number(inputValues?.entryprice)}
          setChecked={setChecked}
          stop_loss={stopLossData?.stop_loss}
          take_profit={stopLossData?.take_profit}
          total={total}
          quantity={Number(
            Utility.removeDecimal(Number(inputValues?.quantity))
          )}
          setInputValues={() => {
            setInputValues({entryprice: '0', quantity: '0'})
            setStopLossValue(0)
          }}
        />
      </div>

      <Divider className="!bg-chart-secondary-bg-color !my-3" />

      <CheckBoxInputContainer
        checked={checked}
        className="checkbox-checked-bg !appearance-none"
        singleLineContent={English.E298}
        onChange={() => {
          setChecked((prev) => !prev)
        }}
      />

      {checked && <Divider className="!bg-chart-secondary-bg-color !my-1" />}

      {checked && (
        <div className="flex flex-col">
          <StopLoss
            heading="Stop Loss"
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            subHeading="Stop loss"
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev.stop_loss ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value.stop_loss?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(inputValues.quantity))
                  ),
                }

                return {
                  ...prev,
                  stop_loss: updated,
                }
              })
            }
          />
          <StopLoss
            heading="Take Profit"
            marketPrice={Number(inputValues.entryprice)}
            quantity={Number(inputValues.quantity)}
            resetValue={stopLossValue}
            subHeading="Take Profit "
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev?.take_profit ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value?.take_profit?.[0],
                  quantity: Number(
                    Utility.removeDecimal(Number(inputValues.quantity))
                  ),
                }

                return {
                  ...prev,
                  take_profit: updated,
                }
              })
            }
          />

          <Divider className="!bg-chart-secondary-bg-color !my-3" />

          <MaxOpenAndMargin total={total} type="max_open" />

          <Divider className="!bg-chart-secondary-bg-color !my-3" />

          <MaxOpenAndMargin total={total} type="margin" />
        </div>
      )}
    </div>
  )
}

export default memo(Limit)
