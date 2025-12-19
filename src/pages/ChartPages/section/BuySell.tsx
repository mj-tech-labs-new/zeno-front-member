/* eslint-disable prefer-template */
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Divider,
  ImageComponent,
  InputContainer,
  RangeSelector,
} from '@/components'
import CheckBoxInputContainer from '@/components/InputContainer/CheckBoxInputContainer'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {Constants, English, Images, Utility} from '@/helpers'
import {BuyOrSelProps, CommonBuyAndSellProp} from '@/types/ChartTypes'

import MaxOpenAndMargin from '../components/MaxOpenAndMargin'
import {useChartProvider} from '../context/ChartProvider'
import ActionButton from './ActionButton'
import StopLoss from './StopLoss'

const BuySell = (props: BuyOrSelProps) => {
  const {activeIndex, margin_mode} = props
  const {
    isLoadingCandles,
    selectedToken,
    tokenList,
    getChallengeByIdArray,
    chartInfo,
    currentStageArray,
    livePrice,
    selectedLeverage,
  } = useChartProvider()
  const {socketRef} = useSocketProvider()
  const [checked, setChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    price: '',
    amount: '',
    total: '',
  })
  const [rangeValue, setRangeValue] = useState(0)

  const [stopLossData, setStopLossData] = useState<
    Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  >({stop_loss: [], take_profit: []})

  const leverage = useMemo(
    () => currentStageArray?.[0]?.leverage,
    [currentStageArray]
  )

  const amountRef = useRef(0)

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      let totalStrFinal
      const priceStr = inputValues.price
      const priceBigInt = priceStr.includes('.')
        ? BigInt(priceStr.replace('.', ''))
        : BigInt(priceStr)

      const amountStr = value ?? '0'
      const amountBigInt = amountStr.includes('.')
        ? BigInt(amountStr.replace('.', '') ?? '0')
        : BigInt(amountStr ?? '0')

      const leverageBigInt = BigInt(selectedLeverage?.title.toString() ?? 1)

      const totalStr = (
        (priceBigInt * amountBigInt) /
        leverageBigInt
      ).toString()

      if (!priceStr.includes('.') && !amountStr.includes('.')) {
        totalStrFinal = totalStr // for int
      } else {
        const decimalPlacesPrice = priceStr.includes('.')
          ? priceStr.length - priceStr.indexOf('.') - 1
          : 0
        const decimalPlacesAmount = amountStr.includes('.')
          ? amountStr.length - amountStr.indexOf('.') - 1
          : 0

        const indexTotal =
          totalStr.length - (decimalPlacesPrice + decimalPlacesAmount)

        totalStrFinal = totalStr

        if (totalStr !== '0') {
          let totalStrPrecise =
            (totalStr.slice(0, indexTotal) ?? '0') +
            '.' +
            (totalStr.slice(indexTotal, indexTotal + 2) ?? '0')

          if (totalStrPrecise.startsWith('.')) {
            const updatedTotal = '0' + totalStrPrecise
            totalStrPrecise = updatedTotal
          }

          totalStrFinal = totalStrPrecise
        }

        if (totalStr === '0') totalStrFinal = totalStr
      }

      if (name === 'amount') {
        setRangeValue(0)
      }

      setInputValues((prev) => ({
        ...prev,
        [name]: Utility.validPointValue(Utility.validFloatNumber(value)),
        total: Utility.validPointValue(Utility.validFloatNumber(totalStrFinal)),
      }))
    },
    [inputValues.price, selectedLeverage?.title]
  )

  useEffect(() => {
    setInputValues({
      price: '',
      amount: '',
      total: '',
    })
  }, [selectedLeverage])

  useEffect(() => {
    if (isLoadingCandles || !socketRef.current) return
    setInputValues((prev) => ({
      ...prev,
      price: livePrice?.toString() ?? '0',
    }))
  }, [
    inputValues.amount,
    inputValues.price,
    inputValues.total,
    isLoadingCandles,
    leverage,
    livePrice,
    rangeValue,
    selectedLeverage?.title,
    selectedToken,
    socketRef,
    tokenList,
  ])

  useEffect(() => {
    amountRef.current = getChallengeByIdArray?.[0]?.current_usdt ?? 0
  }, [getChallengeByIdArray])

  return (
    <div className="flex flex-col gap-3">
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
      {Constants.BuySellInputArray?.Market.map((item, index) => {
        const {name, placeHolder, textContent} = item

        return (
          <div key={`name_${name}`} className="!mb-3">
            <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
              <div className="flex justify-between gap-2">
                <div className="w-full gap-2.5 flex items-center">
                  <InputContainer
                    disabled={name !== 'amount'}
                    layoutClassName="!w-full"
                    placeholder={placeHolder}
                    value={inputValues?.[name as keyof typeof inputValues]}
                    className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
                [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                    onChange={(e) => {
                      handleInputChange(
                        name as keyof typeof inputValues,
                        e.target.value
                      )
                    }}
                  />

                  {name === 'amount' && (
                    <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                  )}
                  <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                    {index === 0 && textContent}
                    {index === 1 && chartInfo?.fullSymbolName.split('USDT')}
                  </span>
                </div>
              </div>
            </div>
            {name === 'amount' && (
              <RangeSelector
                className="!mt-3 mb-4"
                rangeValue={rangeValue}
                setRangeValue={(value) => {
                  const percentValue = value === 0 ? 0 : value / 100
                  const tokenValue = Number(amountRef.current) * percentValue
                  const newAmount = tokenValue / livePrice
                  setInputValues((prev) => {
                    const Leverage = Number(selectedLeverage?.title)

                    const totalValue = (newAmount * livePrice) / Leverage
                    return {
                      ...prev,
                      amount: Utility.removeDecimal(newAmount).toString(),
                      total: totalValue
                        ? totalValue.toFixed(2).toString()
                        : '0',
                    }
                  })
                  setRangeValue(value)
                }}
              />
            )}
          </div>
        )
      })}

      {Number(Number(inputValues.total).toFixed(2)) >
        getChallengeByIdArray?.[0]?.current_usdt && (
        <span className="text-light-danger-color text-xs/6 font-normal tracking-[0.4px]">
          {English.E279}
        </span>
      )}

      <div className="flex items-center gap-3">
        <ActionButton
          activeIndex={activeIndex}
          checked={checked}
          leverage={Number(selectedLeverage?.title.replace('X', ' '))}
          margin_mode={margin_mode}
          order_type="market"
          price={Number(inputValues?.price)}
          quantity={Number(inputValues?.amount)}
          setChecked={setChecked}
          stop_loss={stopLossData?.stop_loss}
          take_profit={stopLossData?.take_profit}
          total={Number(inputValues?.total)}
          setInputValues={() => {
            setInputValues((prev) => ({...prev, amount: '0', price: '0'}))
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
            marketPrice={Number(inputValues.price)}
            quantity={Number(inputValues?.amount)}
            subHeading="Stop loss"
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev.stop_loss ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value.stop_loss?.[0],
                  quantity: Number(inputValues.amount),
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
            marketPrice={Number(inputValues.price)}
            quantity={Number(inputValues?.amount)}
            subHeading="Take Profit "
            setStopLoss={(value) =>
              setStopLossData((prev) => {
                const updated = [...(prev?.take_profit ?? [])]

                updated[0] = {
                  ...updated[0],
                  ...value?.take_profit?.[0],
                  quantity: Number(inputValues.amount),
                }

                return {
                  ...prev,
                  take_profit: updated,
                }
              })
            }
          />
        </div>
      )}

      {Array.from({length: 2}).map((_, index) => (
        <Fragment key={index}>
          <Divider className="!bg-chart-secondary-bg-color !my-3" />

          <MaxOpenAndMargin
            totalNum={Number(inputValues?.total)}
            totalStr={inputValues?.total}
            type={index === 0 ? 'max_open' : 'margin'}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default memo(BuySell)
