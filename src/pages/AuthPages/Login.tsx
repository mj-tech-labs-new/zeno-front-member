import {ImageComponent} from '@/components'
import {Images} from '@/helpers'

import AuthForm from './components/AuthForm'

const Login = () => {
  return (
    <div className="h-screen w-screen flex items-center relative overflow-hidden">
      <AuthForm type="loginType" />
      <ImageComponent
        imageUrl={Images.heroImage}
        className="hidden lg:block lg:h-[425px] xl:h-[517px] absolute -translate-y-1/2 top-1/2  right-0 -z-10"
      />
    </div>
  )
}

export default Login
