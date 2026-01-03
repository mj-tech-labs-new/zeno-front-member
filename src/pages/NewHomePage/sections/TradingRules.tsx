import {useState} from 'react'

import {Steps, WordSplit} from '@/components'
import {English} from '@/helpers'
import Payout from '@/pages/CreateChallenge/sections/Payout'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

const TradingRules = () => {
  const [selectedPayout, setSelectedPayout] = useState<ChallengePayoutObject>({
    amount: '0.00',
    capital: '0.00',
    type: '----',
    name: '----',
    status: '----',
  })
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[22px]">
      <div className="w-full h-full space-y-[96px] flex-1">
        <div className="lg:w-[calc(100%-24px)] space-y-4">
          <WordSplit singleLineContent={English.E408} />
          <WordSplit
            className="text-xl/[30px] font-normal font-geist text-secondary-light-color!"
            singleLineContent={English.E409}
          />
        </div>
        <Steps
          onSelectedItem={(data) => {
            setSelectedPayout({
              amount: data.fee.toString(),
              capital: data.capital_fund.toString(),
              type: data.step === 1 ? 'One Step' : 'Two Step',
              name: data.challenge_name,
              status: data.plan_status.toString(),
            })
          }}
        />
      </div>

      <Payout {...selectedPayout} />
    </div>
  )
}

export default TradingRules
