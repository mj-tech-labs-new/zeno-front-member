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
  ZenoAIChat,
  ZenoAIOnboarding,
} from '@/pages'
import ChallengeDashboardProvider from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
import PaymentPage from '@/pages/CreateChallenge/PaymentPage'
import PayoutSuccessPage from '@/pages/CreateChallenge/PayoutSuccessPage'
import DashboardProvider from '@/pages/Dashboard/context/DashboardProvider'
import Rewards from '@/pages/Rewards/Rewards'
import {ZenoAIProvider} from '@/pages/ZenoAI/context/ZenoAIProvider'
import UserWrapper from '@/wrappers/UserWrapper'

const DashboardRoutes = [
  <Route
    key="layout"
    path="/"
    element={
      <SocketProvider>
        <Layout />
      </SocketProvider>
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
    <Route
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
      key="reward"
      path="rewards"
      element={
        <UserWrapper>
          <LazyLoader>
            <Rewards />
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
    />
    ,
    <Route
      key="zeno-ai-chat-inner"
      path="zeno-ai/chat"
      element={
        <UserWrapper>
          <LazyLoader>
            <ZenoAIChat />
          </LazyLoader>
        </UserWrapper>
      }
    />
    ,
  </Route>,
  <Route
    key="create-challenge"
    path="/create-challenge"
    element={
      <UserWrapper>
        <LazyLoader>
          <SocketProvider>
            <CreateChallenge />
          </SocketProvider>
        </LazyLoader>
      </UserWrapper>
    }
  />,
  <Route
    key="payment-details"
    path="/payment-screen"
    element={
      <UserWrapper>
        <PaymentPage />
      </UserWrapper>
    }
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
  <Route
    key="zeno-ai"
    path="/zeno-ai"
    element={
      <UserWrapper>
        <LazyLoader>
          <ZenoAIProvider>
            <ZenoAIOnboarding />
          </ZenoAIProvider>
        </LazyLoader>
      </UserWrapper>
    }
  />,
]

export default DashboardRoutes
