import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {English, Utility} from '@/helpers'
import {getTradingCapitalApi} from '@/pages/CreateChallenge/api/CreateChallengeApis'
import StepComponent from '@/pages/HomePage/components/StepComponent'
import {GetTradingCapitalProps} from '@/types/ChallengeTypes'

import Divider from '../Divider/Divider'
import HeadingComponent from '../HeadingComponent/HeadingComponent'
import SimpleTab from '../TabComponent/SimpleTab'

interface StepsProps {
  onSelectedItem: (data: GetTradingCapitalProps) => void
}

const Steps = (props: StepsProps) => {
  const {onSelectedItem} = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [totalContent, setTotalContent] = useState<GetTradingCapitalProps[]>([])
  const divRef = useRef<HTMLDivElement | null>(null)
  const stepArray = useMemo(
    () => [{content: English.E32}, {content: English.E34}],
    []
  )
  const amountArray = useMemo(
    () =>
      totalContent.map((item, index) => {
        const {capital_fund} = item
        return {
          content: `$${Utility.numberConversion(capital_fund)?.split('.')?.[0]}`,
          labelText:
            totalContent?.[index]?.challenge_name === 'test plan'
              ? 'Most Popular'
              : '',
        }
      }),
    [totalContent]
  )

  useEffect(() => {
    setTotalContent([])
    getTradingCapitalApi(selectedIndex === 0 ? 1 : 2).then((res) => {
      const response = res.map((item) => ({
        ...item,
        checked: false,
      }))
      setTotalContent(response)
      onSelectedItem(response?.[0])
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  const handleRender = useCallback(() => {
    const element = document.getElementById('payout_id')
    if (!element || !divRef.current || window.innerWidth <= 1024) return

    const {top} = divRef.current.getBoundingClientRect()

    const elementStyle = element.style
    elementStyle.top = `${top}px`
  }, [])

  useEffect(() => {
    handleRender()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleRender)

    return () => {
      window.removeEventListener('resize', handleRender)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={divRef}
      className="bg-tertiary-bg-color rounded-[16px] border border-solid border-primary-border-color p-6 space-y-8"
    >
      <div className="flex flex-col gap-[18px]">
        <HeadingComponent
          className="text-tertiary-color! font-semibold font-geist! text-xl/6!"
          singleLineContent={English.E410}
          type="h1"
        />
        <SimpleTab
          selectedIndex={selectedIndex}
          tabArray={stepArray}
          onPressIndex={(index) => {
            setSelectedIndex(index)
            setSelectedAmount(0)
          }}
        />
      </div>
      <Divider className="bg-landing-page-trading-rules-para-text/50!" />
      <div className="flex flex-col gap-[18px]">
        <HeadingComponent
          className="text-tertiary-color! font-semibold font-geist! text-xl/6!"
          singleLineContent={English.E37}
          type="h4"
        />
        <SimpleTab
          selectedIndex={selectedAmount}
          tabArray={amountArray}
          onPressIndex={(index) => {
            setSelectedAmount(index)
            onSelectedItem(totalContent?.[index])
          }}
        />
      </div>
      <Divider />
      <div className="flex flex-col gap-[18px]">
        <HeadingComponent
          className="text-tertiary-color! font-semibold font-geist! text-xl/6!"
          singleLineContent={English.E411}
          type="h4"
        />
        <StepComponent selectedIndex={selectedIndex} />
      </div>
    </div>
  )
}

export default Steps
