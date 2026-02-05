import React from 'react'

import {CommonButton, HeadingComponent} from '@/components'
import ModalComponent from '@/components/Modal/ModalComponent/ModalComponent'
import {English} from '@/helpers'

const CongratulationModel = (props: {
  point: number
  isModelOpen: boolean
  setIsModelOpen: (value: boolean) => void
}) => {
  const {point, isModelOpen, setIsModelOpen} = props
  return (
    <React.Fragment>
      {isModelOpen && (
        <ModalComponent
          className="w-[300px]  !rounded-2xl !bg-primary-color [&div>h2]:!text-primary-color [&<div<div]:!bg-primary-color  !py-5 !border !border-solid !border-tertiary-color"
          showCross={false}
          onPressButton={() => {
            setIsModelOpen(false)
          }}
        >
          <div className="flex text-center py-2 px-2.5 flex-col gap-4 justify-center items-center w-full">
            <HeadingComponent
              className="text-medium-success-color! rounde text-[32px] font-medium font-switzer "
              singleLineContent={English.E496}
              type="h1"
            />
            <div>
              <div>{English.E497}</div>
              <div>
                {point} {English.E480}
              </div>
            </div>
            <CommonButton
              className={`px-2! py-3!  text-primary-color medium-success-btn-type   w-full sm:max-w-56! `}
              singleLineContent={English.E470}
            />
          </div>
        </ModalComponent>
      )}
    </React.Fragment>
  )
}

export default CongratulationModel
