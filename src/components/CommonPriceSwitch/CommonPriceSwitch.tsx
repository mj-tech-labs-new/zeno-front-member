import SelecAmountModel from '@/pages/ChartPages/components/SelecAmountModel'
import {CommonPriceSwitchType} from '@/types/ComponentTypes'

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
  } = props
  return (
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
  )
}

export default CommonPriceSwitch
