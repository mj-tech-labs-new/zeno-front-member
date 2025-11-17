export interface RegisterApiProps {
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
