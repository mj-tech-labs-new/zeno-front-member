import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import {ChallengeInfoDashboardProps} from '@/types/ChallengeTypes'
import {GeneralProps} from '@/types/CommonTypes'

const DashboardContext = createContext<{
  challengeInfoArray: ChallengeInfoDashboardProps[]
  setChallengeInfoArray: Dispatch<SetStateAction<ChallengeInfoDashboardProps[]>>
}>({
  challengeInfoArray: [],
  setChallengeInfoArray: () => {},
})

const DashboardProvider = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  const [challengeInfoArray, setChallengeInfoArray] = useState<
    ChallengeInfoDashboardProps[]
  >([])
  const valueObj = useMemo(
    () => ({challengeInfoArray, setChallengeInfoArray}),
    [challengeInfoArray]
  )

  return (
    <DashboardContext.Provider value={valueObj}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
export const useDashboardProvider = () => useContext(DashboardContext)
