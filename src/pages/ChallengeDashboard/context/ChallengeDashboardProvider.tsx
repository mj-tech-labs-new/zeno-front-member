import {createContext, useContext, useMemo, useState} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

const ChallengeDashboardContext = createContext<{
  step: number
}>({step: 0})

const ChallengeDashboardProvider = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  const [step, setStep] = useState(0)
  const valueObj = useMemo(() => {
    return {setStep, step}
  }, [step])

  return (
    <ChallengeDashboardContext.Provider value={valueObj}>
      {children}
    </ChallengeDashboardContext.Provider>
  )
}

export default ChallengeDashboardProvider
export const useChallengeProvider = () => useContext(ChallengeDashboardContext)
