import {Route} from 'react-router-dom'

// import SocketProvider from '@/GlobalProvider/SocketProvider'
import Layout from '@/layouts/Layout'
import LazyLoader from '@/LazyLoader'
import {Dashboard} from '@/pages'
// import ChallengeDashboardProvider from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
// import PayoutSuccessPage from '@/pages/CreateChallenge/PayoutSuccessPage'
import DashboardProvider from '@/pages/Dashboard/context/DashboardProvider'
import UserWrapper from '@/wrappers/UserWrapper'

const DashboardRoutes = [
  <Route
    key="layout"
    path="/"
    element={
      // <SocketProvider>
      <Layout />
      // </SocketProvider>
    }
  >
    <Route
      key="dashboard"
      path="dashboard"
      element={
        <UserWrapper>
          <DashboardProvider>
            <LazyLoader>
              <Dashboard />
            </LazyLoader>
          </DashboardProvider>
        </UserWrapper>
      }
    />
    {/* <Route
      key="challenge-dashboard"
      path="challenge-dashboard/:challengeId"
      element={
        <UserWrapper>
          <ChallengeDashboardProvider>
            <LazyLoader>
              <ChallengeDashboard />
            </LazyLoader>
          </ChallengeDashboardProvider>
        </UserWrapper>
      }
    />
    ,
    <Route
      key="certificates"
      path="certificates"
      element={
        <UserWrapper>
          <LazyLoader>
            <Certificate />
          </LazyLoader>
        </UserWrapper>
      }
    />
    ,
    <Route
      key="payout"
      path="payout"
      element={
        <UserWrapper>
          <LazyLoader>
            <PayoutPage />
          </LazyLoader>
        </UserWrapper>
      }
    />
    ,
    <Route
      key="billing"
      path="billing"
      element={
        <UserWrapper>
          <LazyLoader>
            <BillingPage />
          </LazyLoader>
        </UserWrapper>
      }
    />
    ,
    <Route
      key="profile"
      path="profile"
      element={
        <UserWrapper>
          <LazyLoader>
            <ProfilePage />
          </LazyLoader>
        </UserWrapper>
      }
    /> */}
  </Route>,
  // <Route
  //   key="dashboard"
  //   path="/create-challenge"
  //   element={
  //     <UserWrapper>
  //       <LazyLoader>
  //         <CreateChallenge />
  //       </LazyLoader>
  //     </UserWrapper>
  //   }
  // />,
  // <Route
  //   key="payout-success"
  //   path="/payout-success"
  //   element={
  //     <UserWrapper>
  //       <PayoutSuccessPage />
  //     </UserWrapper>
  //   }
  // />,
  // <Route
  //   key="chart"
  //   path="/chart/:challengeId"
  //   element={
  //     <UserWrapper>
  //       <LazyLoader>
  //         <SocketProvider>
  //           <Chart />
  //         </SocketProvider>
  //       </LazyLoader>
  //     </UserWrapper>
  //   }
  // />,
]

export default DashboardRoutes
