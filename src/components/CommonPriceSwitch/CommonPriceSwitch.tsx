import SelecAmountModel from '@/pages/ChartPages/components/SelecAmountModel'
import { CommonPriceSwitchType } from '@/types/ComponentTypes'

import RangeSelector from '../CommonRangeSelector/RangeSelector'
import InputContainer from '../InputContainer/InputContainer'

const CommonPriceSwitch = (props: CommonPriceSwitchType) => {
  const {
    currentIndex,
    currentPriceType,
    onModelClose,
    disabled,
    name,
    onChange,
    placeholder,
    showModelType = false,
    value,
    isRangeType = false,
    setRangeValue,
    rangeValue
  } = props
  return (
    <div className="mb-3!">
      <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
        <div className="flex justify-between gap-2">
          <div className="w-full gap-2.5 flex items-center">
            <InputContainer
              disabled={disabled}
              layoutClassName="!w-full"
              onChange={onChange}
              placeholder={placeholder}
              value={value}
              className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
                [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
            />

            {name === 'amount' && (
              <div className="w-[1px] bg-primary-dark-blue-color h-full" />
            )}
            <span
              className={`text-neutral-primary-color font-medium text-sm !leading-6 cursor-pointer ${currentIndex === 2 ? 'pointer-events-none' : ''}`}
            >
              {showModelType && (
                <div className="flex gap-1.5 items-center">
                  <SelecAmountModel
                    index={currentIndex}
                    onModelClose={onModelClose}
                    symbol={currentPriceType}
                  />
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      {isRangeType && <RangeSelector
        className="!mt-3 mb-4"
        rangeValue={rangeValue ?? 0}
        setRangeValue={(range) => {
          setRangeValue?.(range)
        }}
      />}
    </div>
  )
}

export default CommonPriceSwitch
