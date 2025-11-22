import { memo, useCallback, useEffect, useState } from 'react'

import { Divider, DropDown, ImageComponent, InputContainer } from '@/components'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import { Constants, English, Images, Utility } from '@/helpers'
import { BuyOrSelProps, CommonBuyAndSellProp } from '@/types/ChartTypes'
import { DropDownObjectType } from '@/types/CommonTypes'

import { useChartProvider } from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const Limit = (props: BuyOrSelProps) => {
  const { activeIndex } = props
  const { chartInfo, buyOrSellApiResArray, getChallengeByIdArray, livePrice } =
    useChartProvider()
  const [checked, setChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    entryprice: '',
    quantity: '',
  })
  const [total, setTotal] = useState(0)
  const [stopLoss, setStopLoss] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'>
  >({ stop_loss: [] })
  const [takeProfit, setTakeProfit] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'>
  >({ stop_loss: [] })
  const [stopLossValue, setStopLossValue] = useState<number>(0)

  const [leverageValueArray, setLeverageValueArray] = useState<
    DropDownObjectType[]
  >([])

  const [currentDifferent, setCurrentDifferent] = useState(0)
  const [selectedLeverage, setSelectedLeverage] = useState<DropDownObjectType>()

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

        if (Number(value) === 0) setCurrentDifferent(0)

        if (Number(value) > 0) {
          setCurrentDifferent(
            getChallengeByIdArray[0].current_usdt -
            Number(Utility.validPointValue(value)) * livePrice
          )
        }

        return {
          ...prev,
          quantity: Utility.validFloatNumber(Utility.validPointValue(value)),
        }
      })

      if (!value) setTotal(0)

      if (name === 'quantity' && value) {
        setTotal(
          (parseFloat(value) * livePrice) / Number(selectedLeverage?.title)
        )
      }
    },
    [getChallengeByIdArray, livePrice, selectedLeverage?.title]
  )

  useEffect(() => {
    const currentStage = getChallengeByIdArray?.[0]?.current_stage ?? 0
    if (!getChallengeByIdArray?.[0]) return

    const stages = getChallengeByIdArray[0].ChallengeStage[currentStage]

    if (!stages) return

    const levArray = Array.from({ length: stages.leverage }).map((_, index) => ({
      title: (index + 1).toString(),
    }))
    setLeverageValueArray(levArray)
    setSelectedLeverage(levArray[0])
  }, [getChallengeByIdArray])

  useEffect(() => {
    setInputValues({
      entryprice: '',
      quantity: '',
    })
  }, [selectedLeverage])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-base !leading-8 text-chart-text-primary-color font-semibold ">
          {English.E130}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-extra-light-success-color text-xs font-semibold !leading-5">
            {Utility.numberConversion(
              buyOrSellApiResArray?.[0]?.usdt_balance_after ??
              getChallengeByIdArray?.[0]?.current_usdt
            )}
          </span>
          <ImageComponent className="!w-4" imageUrl={Images.walletImg} />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <span>Leverage :</span>
          <div>{selectedLeverage?.title ?? '1'}x</div>
        </div>
        <DropDown
          className="!max-h-52 mt-2 !overflow-auto"
          dropDownData={leverageValueArray}
          selectedValue={selectedLeverage ?? { title: '1' }}
          onSelectValue={(data) => {
            setSelectedLeverage(data)
          }}
        />
      </div>

      {Constants.BuySellInputArray.Limit.map((item, index) => {
        const { name, placeHolder, label, textContent } = item
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
                    value={inputValues?.[name as keyof typeof inputValues]}
                    className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
              [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                    onChange={(e) => {
                      if (name === 'entryprice') {
                        const { value } = e.target
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
            {index === 0 && (
              <div className="flex justify-between items-center !mt-5 !mb-3 px-0.5 ">
                <div className=" !text-light-neutral-color">
                  Current Difference :
                </div>
                <div
                  className={` ${currentDifferent ? (currentDifferent < 0 ? '!text-dark-danger-color' : '!text-chart-green-color') : 'text-neutral-primary-color'}`}
                >
                  {Utility.numberConversion(currentDifferent)}
                </div>
              </div>
            )}
          </div>
        )
      })}
      {total > getChallengeByIdArray?.[0]?.current_usdt && (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      )}
      <div className="flex items-center gap-3">
        <ActionButton
          activeIndex={activeIndex}
          leverage={selectedLeverage?.title}
          order_type="limit"
          price={Number(inputValues?.entryprice)}
          quantity={Number(inputValues?.quantity)}
          stop_loss={stopLoss.stop_loss}
          take_profit={takeProfit.stop_loss}
          total={total}
          setInputValues={() => {
            setInputValues({ entryprice: '0', quantity: '0' })
            setStopLossValue(0)
          }}
        />
      </div>

      <Divider className="!bg-chart-secondary-bg-color !my-3" />

      <CheckBoxInputContainer
        checked={checked}
        className="checkbox-checked-bg"
        singleLineContent={English.E298}
        onChange={() => {
          setChecked((prev) => !prev)
        }}
      />

      {checked && <Divider className="!bg-chart-secondary-bg-color !my-3" />}

      {checked && (
        <div className="flex flex-col">
          <StopLoss
            closingQuantity={Number(inputValues.quantity)}
            heading="Stop Loss"
            marketPrice={Number(inputValues.entryprice)}
            resetValue={stopLossValue}
            subHeading="Stop loss"
            total={total}
            setStopLoss={(value) => {
              setStopLoss(value)
            }}
          />
          <StopLoss
            closingQuantity={Number(inputValues.quantity)}
            heading="Take Profit"
            marketPrice={Number(inputValues.entryprice)}
            resetValue={stopLossValue}
            subHeading="Take Profit "
            total={total}
            setStopLoss={(value) => {
              setTakeProfit(value)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default memo(Limit)
