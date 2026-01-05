import {useCallback, useEffect, useRef, useState} from 'react'

import {Steps, WordSplit} from '@/components'
import {English} from '@/helpers'
import Payout from '@/pages/CreateChallenge/sections/Payout'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

const TradingRules = () => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [selectedPayout, setSelectedPayout] = useState<ChallengePayoutObject>({
    amount: '0.00',
    capital: '0.00',
    type: '----',
    name: '----',
    status: '----',
    plan_icon_url: '',
  })

  const handleRender = useCallback(() => {
    const element = document.getElementById('payout_id')
    if (!element || !divRef.current) return

    const elementStyle = element.style
    elementStyle.top = '0px'
    if (window.innerWidth <= 1024) {
      elementStyle.marginTop = '0px'
      return
    }
    elementStyle.marginTop = `${divRef.current.clientHeight + 96}px`
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
    <div className="w-full flex flex-col lg:flex-row gap-[22px]">
      <div className="w-full h-full space-y-[96px] flex-1 ">
        <div ref={divRef} className="lg:w-[calc(100%-24px)] space-y-4">
          <WordSplit singleLineContent={English.E408} />
          <WordSplit
            className="text-xl/[30px] font-normal font-geist text-secondary-light-color!"
            singleLineContent={English.E409}
          />
        </div>
        <Steps
          onSelectedItem={(data) => {
            setSelectedPayout({
              amount: data?.capital_fund.toString(),
              capital: data?.fee.toString(),
              type: data?.step === 1 ? 'One Step' : 'Two Step',
              name: data?.challenge_name,
              status: data?.plan_status.toString(),
              plan_icon_url: data?.plan_icon_url,
            })
          }}
        />
      </div>

      <Payout {...selectedPayout} />
    </div>
  )
}

export default TradingRules
