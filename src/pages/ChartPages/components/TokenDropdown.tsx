import React, {useEffect, useMemo, useRef, useState} from 'react'

import {ImageComponent, SearchComponent} from '@/components'
import {English, Utility} from '@/helpers'
import {useClickOutside, useDebounce} from '@/hooks'
import {CommonFunction} from '@/services'

import {useChartProvider} from '../context/ChartProvider'

const TokenDropdown = () => {
  const {
    tokenList,
    selectedToken,
    totalTokenData,
    setSelectedToken,
    isLastCandle,
    chartInfo,
    totalCandlesCount,
  } = useChartProvider()
  const TokenArray = useMemo(
    () => Object.entries(tokenList ?? [])?.map(([_, value]) => ({...value})),
    [tokenList]
  )
  const [tokenArray, setTokenArray] = useState(TokenArray)
  const tokenArrayRef = useRef(TokenArray)
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue)
  const mainDivRef = useRef<HTMLDivElement | null>(null)
  const [isDivOpen, setIsDivOpen] = useState(false)
  const floatingDiv = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({
    refs: [searchRef, mainDivRef, floatingDiv],
    onClickOutside() {
      setIsDivOpen(false)
    },
  })

  useEffect(() => {
    if (!isDivOpen || !mainDivRef.current || !floatingDiv.current) return

    const {top, height} = mainDivRef.current.getBoundingClientRect()

    const styleElement = floatingDiv.current.style
    styleElement.top = `${top + height}px`
    styleElement.height = `calc(100vh - ${top + height + 40}px)`
  }, [isDivOpen])

  useEffect(() => {
    if (debouncedValue === '') {
      setTokenArray(tokenArrayRef.current)
      return
    }
    setTokenArray(() => {
      const filteredArray = tokenArrayRef.current.filter((tokenItem) =>
        (tokenItem.token_symbol + English.E60)
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
    <React.Fragment>
      <div
        ref={mainDivRef}
        className="flex items-center gap-2 cursor-pointer "
        onClick={(e) => {
          e.stopPropagation()
          setIsDivOpen((data) => !data)
        }}
      >
        <ImageComponent
          className="w-6 h-6 "
          imageUrl={`${import.meta.env.VITE_API_BASE_URL_PRODUCTION}${selectedToken?.token_image_url?.replace('/home/ubuntu/backend/', '')}`}
        />
        {tokenList && selectedToken && (
          <span className="text-primary-color text-lg !leading-5 font-semibold uppercase tracking-wider">
            {selectedToken.token_symbol + English.E60}
          </span>
        )}
      </div>

      {isDivOpen && (
        <div
          ref={floatingDiv}
          className="fixed inset-0 z-[999] bg-button-tertiary-color rounded-md left-0 w-[500px] p-5  "
        >
          <SearchComponent
            ref={searchRef}
            showCross
            onPressSearch={setSearchValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <div className="grid grid-cols-3 mt-5 gap-2.5 *:text-neutral-primary-color font-semibold text-sm px-2.5">
            <span>{English.E386}</span>
            <p className="text-right">{English.E387}</p>
            <p className="text-right">{English.E119}</p>
          </div>
          <div className="mt-5 h-full">
            <div className="overflow-y-auto h-[calc(100%-80px)]">
              {tokenArray?.map((item) => {
                const {id, token_image_url, token_symbol} = item
                const tokenData = totalTokenData?.[token_symbol]
                return (
                  <div
                    key={id}
                    className="grid grid-cols-3  gap-2.5 text-primary-color font-medium tracking-wider hover:bg-neutral-secondary-color px-2.5 py-4 rounded-md cursor-pointer overflow-y-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedToken((data) => {
                        if (data?.token_symbol !== item?.token_symbol) {
                          CommonFunction.addSliceData('removeCoinToken', '')
                          CommonFunction.addSliceData('addCoinToken', {
                            token: item?.token_name?.replace('USDT', ''),
                          })
                          CommonFunction.addSliceData('addAmountType', {
                            amount: chartInfo?.symbol,
                          })
                          isLastCandle.current = false
                          const matchCoin = tokenList?.find(
                            (token) => token.token_symbol === item?.token_symbol
                          )
                          totalCandlesCount.current = 0
                          return matchCoin ?? null
                        }
                        return data
                      })
                      setIsDivOpen(false)
                      setSearchValue('')
                    }}
                  >
                    <div className="gap-2 flex items-center">
                      <ImageComponent
                        className="w-6 h-6"
                        imageUrl={`${import.meta.env.VITE_API_BASE_URL_PRODUCTION}${token_image_url?.replace('/home/ubuntu/backend/', '')}`}
                      />
                      <p className="text-left">{token_symbol + English.E60}</p>
                    </div>
                    {tokenData?.high ? (
                      <p className="text-right">
                        {Utility.numberConversion(Number(tokenData?.high ?? 0))}
                      </p>
                    ) : (
                      '----'
                    )}
                    {tokenData?.change ? (
                      <span
                        className={`text-right ${Utility.colorGeneratorUtility(Number(tokenData?.change ?? 0))}`}
                      >{`${Utility.numberConversion(Number(tokenData?.change ?? 0))}%`}</span>
                    ) : (
                      '----'
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default TokenDropdown
