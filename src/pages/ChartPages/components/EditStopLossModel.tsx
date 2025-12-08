import {useCallback} from 'react'

import {ImageComponent} from '@/components'
import {useModalContext} from '@/components/Modal/context/ModalContextProvider'
import {Images} from '@/helpers'
import {EditStopLossModelProps} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'
import EditStopLoss from '../section/EditStopLoss'

const EditStopLossModel = (props: EditStopLossModelProps) => {
  const {singleLineContent, item, apiMethod} = props
  const {setChildContent, setModalProps} = useModalContext()
  const {livePrice} = useChartProvider()
  const onPressEdit = useCallback(() => {
    setModalProps({
      singleLineContent,
      className:
        'w-fit  !rounded-lg !bg-text-info-dark-color [&<div<div]:!bg-primary-black/10 !px-3.5 !py-5 !border !border-solid !border-tertiary-color',
      onPressButton() {
        setChildContent(null)
        setModalProps(null)
      },
    })
    setChildContent(
      <EditStopLoss
        apiMethod={apiMethod ?? 'put'}
        item={item}
        livePrice={livePrice}
        closeModel={() => {
          setChildContent(null)
          setModalProps(null)
        }}
      />
    )
  }, [
    apiMethod,
    item,
    livePrice,
    setChildContent,
    setModalProps,
    singleLineContent,
  ])

  return (
    <div onClick={onPressEdit}>
      <ImageComponent className="h-3.5 w-3.5" imageUrl={Images.editIcon} />
    </div>
  )
}

export default EditStopLossModel
