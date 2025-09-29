import {BrowserRouter, Routes} from 'react-router-dom'

import {AuthRoutes} from './routes'
import DashboardRoutes from './routes/DashboardRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes}
        {DashboardRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default App
