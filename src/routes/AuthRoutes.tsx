import {Route} from 'react-router-dom'

import LazyLoader from '@/LazyLoader'
import {Login, SignUp} from '@/pages'
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
    path="/sign-up"
    element={
      <AuthWrapper>
        <LazyLoader>
          <SignUp />
        </LazyLoader>
      </AuthWrapper>
    }
  />,
]

export default AuthRoutes
