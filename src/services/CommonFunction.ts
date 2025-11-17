import {addToken, PersistStorage, removeToken, Store} from '@/store'
import {
  addPaymentDetails,
  removePaymentDetails,
} from '@/store/UserSlice/UserSlice'
import {SliceDataType} from '@/types/UnionTypes'

const addSliceData = async (type: SliceDataType, payload: any) =>
  new Promise<boolean>((resolve) => {
    if (type === 'addUserToken') {
      Store.dispatch(addToken(payload))
      resolve(true)
      return
    }
    if (type === 'addPaymentDetails') {
      Store.dispatch(addPaymentDetails(payload))
      resolve(true)
      return
    }
    if (type === 'removePaymentDetails') {
      Store.dispatch(removePaymentDetails(payload))
      resolve(true)
      return
    }
    if (type === 'logout') {
      PersistStorage.purge()
      Store.dispatch(removeToken())
      setTimeout(() => {
        resolve(true)
      }, 1000)
    }
  })

const CommonFunction = {
  addSliceData,
}

export default CommonFunction
