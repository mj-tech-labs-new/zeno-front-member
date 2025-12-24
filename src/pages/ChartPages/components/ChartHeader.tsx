import {memo, useEffect, useMemo, useRef, useState} from 'react'

import {BasicSkeleton, DropDown, ImageComponent} from '@/components'
import {English, Utility} from '@/helpers'
import {useDebounce} from '@/hooks'
import {CommonFunction} from '@/services'

import {useChartProvider} from '../context/ChartProvider'
import ChartHeaderStats from './ChartHeaderStats'

const ChartHeader = () => {
  const {
    chartInfo,
    setSelectedToken,
    isLoadingCandles,
    selectedToken,
    otherLoading,
    tokenList,
    isLastCandle,
    totalCandlesCount,
    livePrice,
  } = useChartProvider()

  const isMatch = useMemo(
    () =>
      tokenList?.some(
        (item) => item?.token_symbol === selectedToken?.token_symbol
      ),
    [selectedToken, tokenList]
  )

  const TokenArray = useMemo(
    () =>
      Object.entries(tokenList ?? [])?.map(([_, value]) => ({
        title: `${value?.token_symbol}${English.E60}`,
        img: `${import.meta.env.VITE_API_BASE_URL}${value?.token_image_url}`,
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
        tokenItem?.title
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

  useEffect(() => {
    if (!chartInfo?.symbol) return
    CommonFunction.addSliceData('addAmountType', {amount: chartInfo.symbol})
  }, [chartInfo?.symbol])
  return (
    <div className="py-5 px-6 bg-chart-layout-bg rounded">
      <div className="space-y-5">
        <div className="flex flex-row w-full  gap-10 overflow-x-auto floating__container">
          <div className="flex flex-row gap-4 lg:gap-8 whitespace-nowrap">
            <div className="flex flex-col justify-center ">
              <div className="max-w-60 flex items-center gap-1 ">
                <span>
                  <ImageComponent
                    className="w-6 h-6 "
                    imageUrl={`${import.meta.env.VITE_API_BASE_URL}${selectedToken?.token_image_url}`}
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
                    titleClassname="!py-3 !px-0"
                    onPressSearch={(value) => {
                      setSearchValue(value)
                    }}
                    onSelectValue={(item) => {
                      setSelectedToken((data) => {
                        if (data?.token_symbol !== item?.title) {
                          CommonFunction.addSliceData('removeCoinToken', '')
                          CommonFunction.addSliceData('addCoinToken', {
                            token: item?.title?.replace('USDT', ''),
                          })
                          CommonFunction.addSliceData('addAmountType', {
                            amount: chartInfo?.symbol,
                          })
                          isLastCandle.current = false
                          const matchCoin = tokenList?.find(
                            (token) =>
                              token.token_symbol ===
                              item?.title?.replace('USDT', '')
                          )
                          totalCandlesCount.current = 0
                          return matchCoin ?? null
                        }
                        return data
                      })
                    }}
                    selectedValue={{
                      title: isMatch
                        ? `${chartInfo?.fullSymbolName?.split('USDT')?.[0]} / ${English.E60}`
                        : (selectedToken?.token_symbol as unknown as string),
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
                    {selectedToken?.token_name}
                  </span>
                )}
              </div>
            </div>
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
