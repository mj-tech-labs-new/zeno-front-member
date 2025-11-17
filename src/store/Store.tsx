import {combineReducers, configureStore, Tuple} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {thunk} from 'redux-thunk'

// eslint-disable-next-line import-x/no-cycle
import UserSlice from './UserSlice/UserSlice'

const persistConfig = {
  key: 'root',
  storage,
}
const tuple = new Tuple(thunk)
const rootReducer = combineReducers({
  userData: UserSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: () => tuple,
  devTools: process.env.NODE_ENV !== 'production',
})

export const PersistStorage = persistStore(Store)
