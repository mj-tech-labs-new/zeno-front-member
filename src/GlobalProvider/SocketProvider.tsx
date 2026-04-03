/* eslint-disable consistent-return */
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {useSelector} from 'react-redux'
import {io, Socket} from 'socket.io-client'

import {GeneralProps, StorageProps} from '@/types/CommonTypes'

const SocketContext = createContext<{
  socketRef: RefObject<Socket | null>
}>({
  socketRef: {current: null},
})
const SocketProvider = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  const UserData = useSelector((state: StorageProps) => state?.userData?.user)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!UserData?.token) {
      socketRef.current?.disconnect()
      socketRef.current = null
      return
    }
    if (socketRef.current) return
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL_PROJECT_URL, {
      extraHeaders: {
        token: `Bearer ${UserData?.token ?? ''}`,
      },
    })

    return () => {
      socketRef.current?.offAny()
    }
  }, [UserData?.token])

  const defaultValue = useMemo(
    () => ({
      socketRef,
    }),
    []
  )
  return (
    <SocketContext.Provider value={defaultValue}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
export const useSocketProvider = () => useContext(SocketContext)
