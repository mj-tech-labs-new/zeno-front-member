import {Route} from 'react-router-dom'

import LazyLoader from '@/LazyLoader'
import {ForgotPasswordPage, Login, SetNewPasswordPage, SignUp} from '@/pages'
import {AuthWrapper} from '@/wrappers'

const AuthRoutes = [
  <Route
    key="login"
    path="/login"
    element={
      <AuthWrapper>
        <LazyLoader>
          <Login />
        </LazyLoader>
      </AuthWrapper>
    }
  />,
  <Route
    key="sign-up"
    path="/sign-up/:refCode?"
    element={
      <AuthWrapper>
        <LazyLoader>
          <SignUp />
        </LazyLoader>
      </AuthWrapper>
    }
  />,
  <Route
    key="forgot-password"
    path="/forgot-password"
    element={
      <AuthWrapper>
        <LazyLoader>
          <ForgotPasswordPage />
        </LazyLoader>
      </AuthWrapper>
    }
  />,
  <Route
    key="set-new-password"
    path="/set-new-password"
    element={
      <AuthWrapper>
        <LazyLoader>
          <SetNewPasswordPage />
        </LazyLoader>
      </AuthWrapper>
    }
  />,
]

export default AuthRoutes
