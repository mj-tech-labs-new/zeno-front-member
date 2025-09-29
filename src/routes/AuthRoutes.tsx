import {Route} from 'react-router-dom'

import {Login, SignUp} from '@/pages'

const AuthRoutes = [
  <Route
path="/" element={<Login />}
key="login" />,
  <Route
path="/sign-up" element={<SignUp />}
key="sign-up" />,
]

export default AuthRoutes
