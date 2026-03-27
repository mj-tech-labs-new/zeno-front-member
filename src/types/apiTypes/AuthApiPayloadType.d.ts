export interface RegistrationApiResponse {
  token: string
}

export interface RegisterApiProps
  extends Pick<RegistrationApiResponse, 'token'> {
  user_signup_type: 1 | 2
  name: string
  email: string
  password: string
  referral_code?: null | string
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
  isMarketer: number
  referral_code: null | string
}

export type LoginApiResponseProp = Pick<RegistrationApiResponse, 'token'> & {
  user: Pick<GetUserApiProps, 'email' | 'isMarketer' | 'name' | 'profilePic'>
}

export interface ForgotPasswordApiProps
  extends Pick<RegisterApiProps, 'email'>,
    Partial<Pick<RegistrationApiResponse, 'token'>> {}
export interface SetNewPasswordApiProps
  extends Pick<ForgotPasswordApiProps, 'token'> {
  otp: number
  new_password: string
}

export interface VerifyOtpProps
  extends Partial<Pick<RegistrationApiResponse, 'token'>> {
  payloadData?: RegisterApiProps
  otp?: string
  setToken?: (value: string) => void
}
export interface VerifyOtpResponseProps
  extends Pick<RegistrationApiResponse, 'token'> {
  user: Pick<GetUserApiProps, 'email' | 'name' | 'profilePic'>
}
