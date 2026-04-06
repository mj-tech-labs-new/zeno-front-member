import {Route} from 'react-router-dom'

import SocketProvider from '@/GlobalProvider/SocketProvider'
import Layout from '@/layouts/Layout'
import LazyLoader from '@/LazyLoader'
import {
  BillingPage,
  Certificate,
  ChallengeDashboard,
  Chart,
  CreateChallenge,
  Dashboard,
  PayoutPage,
  ProfilePage,
} from '@/pages'
import ChallengeDashboardProvider from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
import PaymentPage from '@/pages/CreateChallenge/PaymentPage'
import PayoutSuccessPage from '@/pages/CreateChallenge/PayoutSuccessPage'
import DashboardProvider from '@/pages/Dashboard/context/DashboardProvider'
import Rewards from '@/pages/Rewards/Rewards'
import UserWrapper from '@/wrappers/UserWrapper'

const DashboardRoutes = [
  <Route
    key="layout"
    path="/"
    element={
      <UserWrapper>
        <Layout />
      </UserWrapper>
    }
  >
    <Route
      key="dashboard"
      path="dashboard"
      element={
        <DashboardProvider>
          <LazyLoader>
            <Dashboard />
          </LazyLoader>
        </DashboardProvider>
      }
    />
    <Route
      key="challenge-dashboard"
      path="challenge-dashboard/:challengeId"
      element={
        <ChallengeDashboardProvider>
          <LazyLoader>
            <ChallengeDashboard />
          </LazyLoader>
        </ChallengeDashboardProvider>
      }
    />
    ,
    <Route
      key="certificates"
      path="certificates"
      element={
        <LazyLoader>
          <Certificate />
        </LazyLoader>
      }
    />
    ,
    <Route
      key="reward"
      path="rewards"
      element={
        <LazyLoader>
          <Rewards />
        </LazyLoader>
      }
    />
    ,
    <Route
      key="payout"
      path="payout"
      element={
        <LazyLoader>
          <PayoutPage />
        </LazyLoader>
      }
    />
    ,
    <Route
      key="billing"
      path="billing"
      element={
        <LazyLoader>
          <BillingPage />
        </LazyLoader>
      }
    />
    ,
    <Route
      key="profile"
      path="profile"
      element={
        <LazyLoader>
          <ProfilePage />
        </LazyLoader>
      }
    />
    ,
  </Route>,
  <Route
    key="create-challenge"
    path="/create-challenge"
    element={
      <LazyLoader>
        <SocketProvider>
          <CreateChallenge />
        </SocketProvider>
      </LazyLoader>
    }
  />,
  <Route
    key="payment-details"
    element={<PaymentPage />}
    path="/payment-screen"
  />,
  <Route
    key="payout-success"
    path="/payout-success"
    element={
      <UserWrapper>
        <PayoutSuccessPage />
      </UserWrapper>
    }
  />,
  <Route
    key="chart"
    path="/chart/:challengeId"
    element={
      <UserWrapper>
        <LazyLoader>
          <SocketProvider>
            <Chart />
          </SocketProvider>
        </LazyLoader>
      </UserWrapper>
    }
  />,
]

export default DashboardRoutes
