import {useSelector} from 'react-redux'

import {StorageProps} from '@/types/CommonTypes'

const useStorageObject = () => {
  const storageState = useSelector((state: StorageProps) => state)

  return {
    userData: storageState?.userData,
  }
}

export default useStorageObject
