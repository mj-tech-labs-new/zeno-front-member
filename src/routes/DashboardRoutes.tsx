import { Route } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import {
  BillingPage,
  Certificate,
  ChallengeDashboard,
  ChallengesPage,
  CreateChallenge,
  Dashboard,
  PayoutPage,
  ProfilePage,
} from '@/pages'
import ChallengeDashboardProvider from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'

const DashboardRoutes = [
  <Route
    path="/" element={<Layout />}
    key="layout">
    <Route
      path="dashboard" element={<Dashboard />}
      key="dashboard" />
    <Route
      path="challenge-dashboard"
      element={
        <ChallengeDashboardProvider>
          <ChallengeDashboard />
        </ChallengeDashboardProvider>
      }
      key="challenge-dashboard"
    />
    ,
    <Route
      element={<Certificate />} path="certificates"
      key="certificates" />,
    <Route
      element={<PayoutPage />} path="payout"
      key="payout" />,
    <Route
      element={<BillingPage />} path="billing"
      key="billing" />,
    <Route
      element={<ProfilePage />} path="profile"
      key="profile" />,
    <Route
      element={<ChallengesPage />} path="challenges"
      key="challenges" />,
  </Route>,
  <Route
    path="/create-challenge"
    element={<CreateChallenge />}
    key="dashboard"
  />,
]

export default DashboardRoutes
