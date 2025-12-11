import {createSlice} from '@reduxjs/toolkit'

// eslint-disable-next-line import-x/no-cycle
import {
  ChallengePayoutObject,
  CreateChallengePayload,
} from '@/types/ChallengeTypes'
import {UserObjectType} from '@/types/CommonTypes'

export interface UserSliceInitialType {
  user: {
    token: string | null
    userData: UserObjectType | null
    loggedIn: string | null
  }
  payoutDetails:
    | (CreateChallengePayload & Pick<ChallengePayoutObject, 'capital'>)
    | null
}

const initialState: UserSliceInitialType = {
  user: {
    token: null,
    userData: null,
    loggedIn: null,
  },
  payoutDetails: null,
}

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addToken: (state, action) => {
      const {token, userData, loggedIn} = action.payload
      state.user = {token, userData, loggedIn}
    },
    removeToken: (state) => {
      state.user = {token: null, userData: null, loggedIn: null}
      state.payoutDetails = null
    },
    addPaymentDetails: (state, action) => {
      state.payoutDetails = action.payload
    },
    removePaymentDetails: (state) => {
      state.payoutDetails = null
    },
  },
})

export const {addToken, removeToken, addPaymentDetails, removePaymentDetails} =
  UserSlice.actions
export default UserSlice.reducer
