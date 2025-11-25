import {lazy} from 'react'

const Login = lazy(async () => import('./AuthPages/Login'))
const SignUp = lazy(async () => import('./AuthPages/SignUp'))
const BillingPage = lazy(async () => import('./BillingPage/BillingPage'))
const Certificate = lazy(async () => import('./Certificates/Certificate'))
const ChallengeDashboard = lazy(
  async () => import('./ChallengeDashboard/ChallengeDashboard')
)
const Chart = lazy(async () => import('./ChartPages/Chart'))
const CreateChallenge = lazy(
  async () => import('./CreateChallenge/CreateChallenge')
)
const Dashboard = lazy(async () => import('./Dashboard/Dashboard'))
const HomePage = lazy(async () => import('./HomePage/HomePage'))
const PayoutPage = lazy(async () => import('./PayoutPage/PayoutPage'))
const ProfilePage = lazy(async () => import('./ProfilePage/ProfilePage'))
const SetNewPasswordPage = lazy(
  async () => import('./SetNewPasswordPage/SetNewPasswordPage')
)
const ForgotPasswordPage = lazy(
  async () => import('./ForgotPasswordPage/ForgotPasswordPage')
)
export {
  BillingPage,
  Certificate,
  ChallengeDashboard,
  Chart,
  CreateChallenge,
  Dashboard,
  ForgotPasswordPage,
  HomePage,
  Login,
  PayoutPage,
  ProfilePage,
  SetNewPasswordPage,
  SignUp,
}
