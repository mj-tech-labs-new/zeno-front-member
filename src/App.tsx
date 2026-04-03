import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {GoBackComponent, ModalContextProvider} from './components'
import LazyLoader from './LazyLoader'
import {PrivacyPolicy} from './pages'
import RefundPolicy from './pages/Conditions/RefundPolicy'
import Terms from './pages/Conditions/Terms'
import HomePage from './pages/NewHomePage/HomePage'
// import {HomePage} from './pages'
import {AuthRoutes} from './routes'
import DashboardRoutes from './routes/DashboardRoutes'

const App = () => (
  <BrowserRouter>
    <ModalContextProvider>
      <Routes>
        <Route
          key="home"
          path="/"
          element={
            <LazyLoader>
              <HomePage />
            </LazyLoader>
          }
        />
        <Route
          key="policy"
          path="/privacy-policy"
          element={
            <LazyLoader>
              <PrivacyPolicy />
            </LazyLoader>
          }
        />
        <Route
          key="refund"
          path="/refund-policy"
          element={
            <LazyLoader>
              <RefundPolicy />
            </LazyLoader>
          }
        />
        <Route
          key="terms"
          path="/terms-and-condition"
          element={
            <LazyLoader>
              <Terms />
            </LazyLoader>
          }
        />
        <Route
key="404" element={<GoBackComponent />}
path="*" />
        {AuthRoutes}
        {DashboardRoutes}
      </Routes>
    </ModalContextProvider>
  </BrowserRouter>
)

export default App
