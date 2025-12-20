import {useCallback} from 'react'

import {ImageComponent} from '@/components'
import {useModalContext} from '@/components/Modal/context/ModalContextProvider'
import {English, Images} from '@/helpers'
import {Store} from '@/store'

import AmountTypeSelectComponent from './AmountTypeSelectComponent'

const SelecAmountModel = (props: {onModelClose: () => void; index: number}) => {
  const {onModelClose, index} = props
  const {setChildContent, setModalProps} = useModalContext()
  const onPressAmount = useCallback(() => {
    setChildContent(
      <AmountTypeSelectComponent
        onPressButton={() => {
          setChildContent(null)
          setModalProps(null)
          onModelClose()
        }}
      />
    )
    setModalProps({
      showCross: true,
      singleLineContent: English.E376,
      className:
        'className="w-full max-w-[550px]  !rounded-lg !bg-text-info-dark-color [&div>h2]:!text-primary-dark-blue-color [&<div<div]:!bg-primary-black/10 !p-5 !border !border-solid !border-tertiary-color',
      onPressButton() {
        setChildContent(null)
        setModalProps(null)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="text-white font-bold flex gap-1.5 items-center"
      onClick={onPressAmount}
    >
      {index === 1
        ? Store.getState().chartData.amountType
        : Store.getState().chartData.amountType === 'BTC'
          ? English.E60
          : English.E373}
      {index === 1 && (
        <ImageComponent className="h-4! w-4!" imageUrl={Images.dropdownArrow} />
      )}
    </div>
  )
}

export default SelecAmountModel
