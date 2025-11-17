import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'

import {GeneralProps, StorageProps} from '@/types/CommonTypes'

// eslint-disable-next-line @typescript-eslint/promise-function-async
const AuthWrapper = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  const [status, setStatus] = useState(false)
  const Data = useSelector((state: StorageProps) => state?.userData)
  const navigate = useNavigate()
  const location = useLocation()
  // const locationData = useMemo(() => location.state: StorageProps, [])

  useEffect(() => {
    const user = Data?.user?.token
    const currentPath = location.pathname
    if (!user) {
      navigate(currentPath === '/login' ? '/login' : '/sign-up', {
        replace: true,
      })
      setStatus(false)
      return
    }
    navigate('/dashboard')
    setStatus(true)
  }, [Data?.user?.token, children, location.pathname, navigate])

  return !status ? children : null
}

export default AuthWrapper
