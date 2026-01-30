import {addToken, PersistStorage, removeToken, Store} from '@/store'
import {
  addAmountType,
  addCoinToken,
  addFrame,
  removeCoinToken,
  removeFrame,
} from '@/store/ChartSlice/ChartSlice'
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
    if (type === 'addTimeFrame') {
      Store.dispatch(addFrame(payload))
      resolve(true)
      return
    }
    if (type === 'addAmountType') {
      Store.dispatch(addAmountType(payload))
      resolve(true)
      return
    }
    if (type === 'removeAmountType') {
      Store.dispatch(addAmountType(payload))
      resolve(true)
      return
    }
    if (type === 'addCoinToken') {
      Store.dispatch(addCoinToken(payload))
      resolve(true)
      return
    }
    if (type === 'removeCoinToken') {
      Store.dispatch(removeCoinToken())
      resolve(true)
      return
    }
    if (type === 'logout') {
      PersistStorage.purge()
      Store.dispatch(removeToken())
      Store.dispatch(removeFrame())
      setTimeout(() => {
        resolve(true)
      }, 1000)
    }
  })

const getBase64FromUrl = async (url: string): Promise<string> => {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => resolve(reader.result as string)
  })
}
const CommonFunction = {
  addSliceData,
  getBase64FromUrl,
}

export default CommonFunction
