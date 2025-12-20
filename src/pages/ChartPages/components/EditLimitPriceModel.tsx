import React, {useCallback, useEffect, useRef, useState} from 'react'
import {toast} from 'react-toastify'

import {CommonButton, ImageComponent, InputContainer} from '@/components'
import ModalComponent from '@/components/Modal/ModalComponent/ModalComponent'
import {English, Images} from '@/helpers'
import {APICall, Endpoints} from '@/services'
import {EditPriceProps} from '@/types/ChartTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import {useChartProvider} from '../context/ChartProvider'

const EditLimitPriceModel = (props: EditPriceProps) => {
  const {challenge_id, submitted_price, symbol, direction, tx_hash} = props
  const priceRef = useRef<number | null>(null)
  const [inputValues, setInputValues] = useState({
    entryprice: submitted_price.toString(),
  })
  const loaderRef = useRef<AppLoaderRef>(null)
  const {livePrice} = useChartProvider()
  const [isModelOpen, setIsModelOpen] = useState(false)

  const entryPriceUpdate = useCallback(() => {
    const payload = {
      challenge_id,
      order_type: 'limit',
      order_side: direction,
      tx_hash,
      symbol,
      usdt_price: Number(inputValues.entryprice),
    }

    APICall('put', Endpoints.updateOrder, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          setIsModelOpen(false)
          toast.success(res?.message)
        } else {
          toast.error(res?.message)
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [challenge_id, direction, inputValues.entryprice, symbol, tx_hash])

  useEffect(() => {
    if (!submitted_price) return
    priceRef.current = submitted_price
  }, [submitted_price])
  return (
    <React.Fragment>
      {isModelOpen && (
        <ModalComponent
          className="w-fit  !rounded-lg !bg-text-info-dark-color [&div>h2]:!text-primary-dark-blue-color [&<div<div]:!bg-primary-black/10 !px-3.5 !py-5 !border !border-solid !border-tertiary-color"
          singleLineContent={English.E371}
          onPressButton={() => {
            setIsModelOpen(false)
          }}
        >
          <div>
            <div className="flex flex-col gap-6 py-6 ">
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-switzer text-primary-dark-blue-color font-medium text-[17px]">
                    {English.E293} :{' '}
                  </div>

                  <div className="font-switzer text-primary-dark-blue-color font-medium text-[14px]">
                    {livePrice}
                    {` ${symbol?.replace('USDT', '')}`}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 rounded-xl border-2 border-solid border-neutral-secondary-color">
                <div className="flex justify-between gap-2">
                  <div className="w-full gap-2.5 flex items-center">
                    <InputContainer
                      layoutClassName="!w-full"
                      name="entry price"
                      placeholder="Entry Price"
                      value={inputValues.entryprice}
                      className="!p-0 !border-none !w-full [&>input]:!text-end [&>input]:!h-6
              [&>input]:!text-chart-text-primary-color [&>input]:!text-sm [&>input]:placeholder:!text-chart-text-primary-color [&>input]:!w-full !leading-6 !font-medium"
                      onChange={(e) => {
                        const {value} = e.target
                        setInputValues((prev) => ({...prev, entryprice: value}))
                      }}
                    />
                    <div className="w-[1px] bg-primary-dark-blue-color h-full" />
                    <span className="text-neutral-primary-color font-medium text-sm !leading-6">
                      USDT
                    </span>
                  </div>
                </div>
              </div>
              <CommonButton
                className={`font-semibold text-sm bg-chart-red-color w-fit! mx-auto ${inputValues.entryprice === priceRef.current?.toString() || inputValues.entryprice === '' ? 'bg-chart-red-color/50 text-primary-color/50 pointer-events-none' : ''}`}
                singleLineContent={English.E371}
                onClick={(e) => {
                  e.stopPropagation()
                  entryPriceUpdate()
                }}
              />
            </div>
          </div>
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

export default EditLimitPriceModel
