import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {GoBackComponent, ModalContextProvider} from './components'
import LazyLoader from './LazyLoader'
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
key="404" element={<GoBackComponent />}
path="*" />
        {AuthRoutes}
        {DashboardRoutes}
      </Routes>
    </ModalContextProvider>
  </BrowserRouter>
)

export default App
