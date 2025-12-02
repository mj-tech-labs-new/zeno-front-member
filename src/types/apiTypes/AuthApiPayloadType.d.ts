export interface RegisterApiProps extends Pick<VerifyOtpProps, 'token'> {
  user_signup_type: 1 | 2
  name: string
  email: string
  password: string
}

export type LoginApiProps = Pick<
  RegisterApiProps,
  'email' | 'password' | 'user_signup_type'
>

export type UpdateApiProps = Pick<
  RegisterApiProps,
  'name' | 'email' | 'password'
>

export type GetUserApiProps = Omit<RegisterApiProps, 'user_signup_type'> & {
  profilePic: string | null
}

export interface forgotPasswordApiProps
  extends Pick<RegisterApiProps, 'email'> {
  token?: string
}
export interface SetNewPasswordApiProps
  extends Pick<forgotPasswordApiProps, 'token'> {
  otp: number
  new_password: string
}

export interface VerifyOtpProps {
  token?: string
  payloadData?: RegisterApiProps
  otp?: string
  setToken?: (value: string) => void
}
