import {useState} from 'react'
// import { useSelector } from 'react-redux'
import {useLocation} from 'react-router-dom'

import {DescriptionComponent, HeadingComponent} from '@/components'
import {English} from '@/helpers'
import Layout2 from '@/layouts/Layout2'
// import { CommonFunction } from '@/services'
import {ChallengePayoutObject} from '@/types/ChallengeTypes'

// import { StorageProps } from '@/types/CommonTypes'
// import { createChallengeApi } from './api/CreateChallengeApis'
import CreateChallengeContainer from './sections/CreateChallengeContainer'
import Payout from './sections/Payout'
import TradingCapitalContainer from './sections/TradingCapitalContainer'

const CreateChallenge = () => {
  const location = useLocation()

  // const userData = useSelector((state: StorageProps) => state.userData)
  const [payoutDetails, setPayoutDetails] = useState<ChallengePayoutObject>({
    amount: '---',
    capital: '---',
    name: '---',
    type: '---',
  })
  // const [showLoader, setShowLoader] = useState(false)
  const [selectedOption, setSelectedOption] = useState(1)
  // const [selectedTableRow, setSelectedTableRow] = useState(1)
  // const navigate = useNavigate()

  // const handleCreateChallengeApi = () => {
  //   setShowLoader(true)
  //   createChallengeApi({
  //     challenge_plan_id: selectedTableRow,
  //     step: selectedOption,
  //     total_stage: selectedOption === 1 ? 2 : 3,
  //   }).then((res) => {
  //     setShowLoader(false)
  //     navigate('/payout-success', {
  //       state: {
  //         ...res[0],
  //         capital: payoutDetails.capital,
  //       },
  //     })
  //   })
  // }

  return (
    <Layout2>
      {/* <Loader ref={(ref) => ref?.showLoader(showLoader)} /> */}
      <div className="w-full flex flex-col gap-12 lg:gap-14 lg:w-full shrink-0">
        <div
          className={`${location.pathname !== '/' ? 'max-w-md mx-auto' : ''} flex flex-col gap-4 text-center`}
        >
          <HeadingComponent
            className={location.pathname === '/' ? 'text-left' : ''}
            singleLineContent={English.E201}
            variant="medium"
          />
          <DescriptionComponent
            className={location.pathname === '/' ? 'text-left' : ''}
            multilineContent={[English.E202]}
          />
        </div>
        <div className="flex gap-4 flex-col justify-center lg:flex-row w-full">
          <div className="w-full flex flex-col gap-4 lg:w-2/3">
            <CreateChallengeContainer
              onPressStage={setSelectedOption}
              selectedOption={selectedOption}
            />
            <TradingCapitalContainer
              onPressItem={setPayoutDetails}
              selectedOption={selectedOption}
              setSelectedTableRow={() => {}}
            />
          </div>
          <div
            className={`w-full lg:w-[385px] bg-white p-6 rounded-2xl ${location.pathname === '/' ? '' : 'sticky top-0'} h-fit`}
          >
            <Payout
              amount={payoutDetails?.amount}
              capital={payoutDetails?.capital}
              name={payoutDetails?.name}
              onPressItem={() => {}}
              type={payoutDetails?.type}
              // onPressItem={() => {
              //   if (!userData?.user?.token) {
              //     CommonFunction.addSliceData('addPaymentDetails', {
              //       challenge_plan_id: selectedTableRow,
              //       step: selectedOption,
              //       total_stage: selectedOption === 1 ? 2 : 3,
              //       capital: payoutDetails?.capital,
              //     }).then(() => {
              //       navigate('/login')
              //     })
              //     return
              //   }
              //   handleCreateChallengeApi()
              // }}
            />
          </div>
        </div>
      </div>
    </Layout2>
  )
}

export default CreateChallenge
