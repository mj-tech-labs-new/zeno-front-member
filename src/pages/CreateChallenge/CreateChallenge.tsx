import dayjs from 'dayjs'
import {useState} from 'react'

import {DescriptionComponent, HeadingComponent} from '@/components'
import {English} from '@/helpers'
import Layout2 from '@/layouts/Layout2'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

import PayoutSuccess from './components/PayoutSuccess'
import CreateChallengeContainer from './sections/CreateChallengeContainer'
import Payout from './sections/Payout'
import TradingCapitalContainer from './sections/TradingCapitalContainer'

const CreateChallenge = () => {
  const [payoutDetails, setPayoutDetails] = useState<ChallengePayoutObject>({
    amount: '---',
    capital: '---',
    name: '---',
    type: '---',
  })
  const [showSuccessPayout, setShowSuccessPayout] = useState(false)

  return (
    <Layout2>
      {showSuccessPayout ? (
        <PayoutSuccess
          status="✅ Active"
          start_date={dayjs(Date.now()).format('D MMMM YYYY').toString()}
          amount={payoutDetails?.amount}
          type={payoutDetails?.type}
          name={payoutDetails?.name}
          capital={payoutDetails?.capital}
        />
      ) : (
        <div className="w-full flex flex-col gap-12 lg:gap-14">
          <div className="flex flex-col gap-4 max-w-md mx-auto text-center">
            <HeadingComponent
              variant="medium"
              singleLineContent={English.E88}
            />
            <DescriptionComponent multilineContent={[English.E89]} />
          </div>
          <div className="flex gap-4 flex-col justify-center lg:flex-row w-full">
            <div className="w-full flex flex-col gap-4 lg:w-2/3">
              <CreateChallengeContainer />
              <TradingCapitalContainer onPressItem={setPayoutDetails} />
            </div>
            <div className="w-full lg:w-[385px] bg-white p-6 rounded-2xl sticky top-0 h-fit">
              <Payout
                amount={payoutDetails?.amount}
                capital={payoutDetails?.capital}
                name={payoutDetails?.name}
                type={payoutDetails?.type}
                onPressItem={() => {
                  setShowSuccessPayout(true)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Layout2>
  )
}

export default CreateChallenge
