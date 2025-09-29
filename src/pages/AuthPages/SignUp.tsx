import AuthForm from './components/AuthForm'

const SignUp = () => {
  return (
    <div className="h-screen w-screen">
      <div className="pt-[74px] pb-9">
        <AuthForm type="signUpType" />
      </div>
    </div>
  )
}

export default SignUp
