import React, {useState} from 'react'

import {ImageComponent} from '@/components'
import ModalComponent from '@/components/Modal/ModalComponent/ModalComponent'
import {English, Images} from '@/helpers'
import {EditStopLossModelProps} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'
import EditStopLoss from '../section/EditStopLoss'

const EditStopLossModel = (props: EditStopLossModelProps) => {
  const {singleLineContent, item, apiMethod, symbol} = props
  const {livePrice} = useChartProvider()
  const [isModelOpen, setIsModelOpen] = useState(false)

  return (
    <React.Fragment>
      {isModelOpen && (
        <ModalComponent
          className="w-fit  !rounded-lg !bg-text-info-dark-color [&div>h2]:!text-primary-dark-blue-color [&<div<div]:!bg-primary-black/10 !px-3.5 !py-5 !border !border-solid !border-tertiary-color"
          singleLineContent={singleLineContent}
          onPressButton={() => {
            setIsModelOpen(false)
          }}
        >
          <div className="flex justify-between items-center">
            <div className="font-switzer text-primary-dark-blue-color font-medium text-[17px]">
              {English.E293} :{' '}
            </div>

            <div className="font-switzer text-primary-dark-blue-color font-medium text-[14px]">
              {livePrice}
              {` ${symbol?.replace('USDT', '')}`}
            </div>
          </div>
          <EditStopLoss
            apiMethod={apiMethod ?? 'put'}
            item={item}
            closeModel={() => {
              setIsModelOpen(false)
            }}
          />
        </ModalComponent>
      )}
      <ImageComponent
        className="h-3.5 w-3.5"
        imageUrl={Images.editIcon}
        onPressItem={() => {
          setIsModelOpen(true)
        }}
      />
    </React.Fragment>
  )
}

export default EditStopLossModel
