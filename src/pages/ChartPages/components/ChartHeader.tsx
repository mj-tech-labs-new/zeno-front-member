import {memo, useEffect, useMemo, useRef, useState} from 'react'

import {BasicSkeleton, DropDown, ImageComponent} from '@/components'
import {English, Images, Utility} from '@/helpers'
import {useDebounce} from '@/hooks'

import {useChartProvider} from '../context/ChartProvider'
import ChartHeaderStats from './ChartHeaderStats'

const ChartHeader = () => {
  const {
    chartInfo,
    isLoadingCandles,
    selectedToken,
    setSelectedToken,
    otherLoading,
    tokenList,
    isLastCandle,
    totalCandlesCount,
    livePrice,
  } = useChartProvider()
  const isMatch = useMemo(
    () => Object.values(tokenList ?? {}).includes(selectedToken),
    [selectedToken, tokenList]
  )
  const TokenArray = useMemo(
    () =>
      Object.entries(tokenList ?? [])?.map(([_, value]) => ({
        title: value,
      })),
    [tokenList]
  )
  const [tokenArray, setTokenArray] = useState(TokenArray)
  const tokenArrayRef = useRef(TokenArray)
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue)

  useEffect(() => {
    if (debouncedValue === '') {
      setTokenArray(tokenArrayRef.current)
      return
    }
    setTokenArray(() => {
      const filteredArray = tokenArrayRef.current.filter((tokenItem) =>
        tokenItem.title
          .toLowerCase()
          .includes(Utility.trimMultipleSpaces(debouncedValue.toLowerCase()))
      )
      return filteredArray
    })
  }, [debouncedValue])

  useEffect(() => {
    setTokenArray(TokenArray)
    tokenArrayRef.current = TokenArray
  }, [TokenArray])

  return (
    <div className="py-5 px-6 bg-chart-layout-bg rounded">
      <div className="space-y-5">
        <div className="flex flex-row w-full  gap-10 overflow-x-auto floating__container">
          <div className="flex flex-row gap-4 lg:gap-8 whitespace-nowrap">
            {chartInfo && (
              <div className="flex flex-col justify-center ">
                <div className="max-w-60 flex items-center gap-1 ">
                  <span>
                    <ImageComponent
                      className="w-6 h-6 "
                      imageUrl={Images.bitcoinIcon}
                    />
                  </span>
                  {otherLoading.isDropdownLoading && !isLoadingCandles ? (
                    <BasicSkeleton className="rounded-lg !h-11" />
                  ) : (
                    <DropDown
                      isSearchType
                      showArrows
                      className=" border-none !p-0"
                      dropDownData={tokenArray}
                      elementId={['chartRendering']}
                      headingClassName="hover:!bg-transparent !text-2xl !font-semibold !font-bureau !leading-8 !text-primary-color"
                      layoutClassName="!font-semibold left-0! !leading-8 h-[calc(100vh-200px)]! w-[500px]! "
                      searchValue={searchValue}
                      onPressSearch={(value) => {
                        setSearchValue(value)
                      }}
                      onSelectValue={(item) => {
                        setSelectedToken((data) => {
                          if (data !== item.title) {
                            isLastCandle.current = false
                            totalCandlesCount.current = 0
                            return item.title
                          }
                          return data
                        })
                      }}
                      selectedValue={{
                        title: isMatch
                          ? `${chartInfo?.fullSymbolName?.split('USDT')?.[0]} / ${English.E60}`
                          : selectedToken,
                      }}
                      setSearchValue={(value) => {
                        setSearchValue(value)
                      }}
                    />
                  )}
                </div>
                <div>
                  {tokenList && (
                    <span className="text-neutral-primary-color text-xs !leading-5 font-semibold">
                      {tokenList[chartInfo.symbol]}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <span className="text-chart-red-color text-2xl !leading-8 font-semibold w-44">
                {livePrice} {English.E60}
              </span>
              <span className="text-primary-color font-medium leading-tight">
                $ {livePrice}
              </span>
            </div>
          </div>

          <ChartHeaderStats />
        </div>
      </div>
    </div>
  )
}

export default memo(ChartHeader)
