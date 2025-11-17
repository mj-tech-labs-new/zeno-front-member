import {ImageComponent} from '@/components'
import {Images} from '@/helpers'

import AuthForm from './components/AuthForm'

const Login = () => (
  <div className="h-screen w-screen py-10 lg:py-[74px]  relative overflow-auto no-scrollbar">
    <div className="flex justify-between">
      <AuthForm type="loginType" />
      <ImageComponent
        className="hidden lg:block w-full [&>img]:!object-contain"
        imageUrl={Images.heroImage}
      />
    </div>
  </div>
)

export default Login
