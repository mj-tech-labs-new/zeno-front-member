/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './index.css'
import './chart.css'

import {PersistStorage, Store} from '@store'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import {PersistGate} from 'redux-persist/integration/react'

import App from './App'
// import ModalContextProvider from './components/Modal/context/ModalContextProvider'

createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <PersistGate persistor={PersistStorage}>
      <ToastContainer
        hideProgressBar
        autoClose={2000}
        draggable={false}
        limit={1}
        position="top-right"
      />
      <App />
    </PersistGate>
  </Provider>
)
