import {useEffect, useMemo, useState} from 'react'
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

  const publicRoutes = useMemo(
    () => ['/login', '/sign-up', '/forgot-password'],
    []
  )

  useEffect(() => {
    const user = Data?.user?.token
    const currentPath = location.pathname

    if (!user) {
      if (currentPath === '/set-new-password') {
        const email = location.state?.email

        if (!email) {
          navigate('/login', {replace: true})
          return
        }

        setStatus(false)
        return
      }

      if (!publicRoutes.includes(currentPath)) {
        navigate('/login', {replace: true})
      }

      setStatus(false)
      return
    }

    if (currentPath !== '/dashboard') {
      navigate('/dashboard', {replace: true})
    }

    setStatus(true)
  }, [
    Data?.user?.token,
    children,
    location.pathname,
    location.state,
    navigate,
    publicRoutes,
  ])

  return !status ? children : null
}

export default AuthWrapper
