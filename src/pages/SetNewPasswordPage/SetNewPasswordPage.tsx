import {useCallback, useEffect, useMemo, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {
  CommonButton,
  HeadingComponent,
  ImageComponent,
  InputContainer,
  Loader,
} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {SetNewPasswordApiProps} from '@/types/apiTypes/AuthApiPayloadType'

import {forgotPasswordApi, setNewPasswordApi} from '../AuthPages/api/AuthApi'

const SetNewPasswordPage = () => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    otp: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [timer, setTimer] = useState(300)
  const [errors, setErrors] = useState<Record<string, string>>({
    otp: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [token, setToken] = useState<string>('')
  const [isShowPassword, setIsShowPassword] = useState({
    password: true,
    cpassword: true,
  })
  const navigate = useNavigate()
  const location = useLocation()
  const isEmail = useMemo(() => location.state, [location.state])
  const [showLoader, setShowLoader] = useState(false)

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      setInputValues((prevValues) => {
        const newValues = {...prevValues, [name]: value}

        setErrors((prev) => {
          const newErrors = {...prev}

          if (value === '') {
            newErrors[name] = ''
            return newErrors
          }

          newErrors[name] = ''

          if (name === 'otp') {
            const validOtp = Utility.isValidNumber(value)
            newValues.otp = validOtp
          }

          if (name === 'new_password' || name === 'confirm_new_password') {
            const {new_password, confirm_new_password} = newValues

            if (new_password && !Utility.isPasswordValid(new_password)) {
              newErrors.new_password = English.E328
            } else {
              newErrors.new_password = ''
            }

            if (new_password && confirm_new_password) {
              if (new_password !== confirm_new_password) {
                newErrors.new_password = English.E87
                newErrors.confirm_new_password = English.E87
              } else {
                newErrors.confirm_new_password = ''
              }
            }
          }

          return newErrors
        })

        return newValues
      })
    },
    []
  )

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const startTimer = useCallback(() => {
    setTimer(300)
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleForgotPassword = useCallback(() => {
    setShowLoader(true)

    forgotPasswordApi({email: isEmail.email})
      .then((response) => {
        if (typeof response === 'string') {
          navigate('/login')
          setShowLoader(false)
          return
        }

        if (response) {
          startTimer()
          setToken(response?.token ?? '')
        } else {
          navigate('/forgot-password')
        }
      })
      .catch((error) => {
        navigate('/forgot-password')
        toast.error(error)
      })
      .finally(() => {
        setShowLoader(false)
      })
  }, [isEmail.email, navigate, startTimer])

  const handleSetNewPassword = useCallback(() => {
    setShowLoader(true)
    const props: SetNewPasswordApiProps = {
      otp: Number(inputValues?.otp),
      new_password: inputValues?.new_password,
      token: token ?? '',
    }
    setNewPasswordApi(props)
      .then((response) => {
        if (response === 200) {
          navigate('/login')
        }
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setShowLoader(false)
      })
  }, [inputValues?.new_password, inputValues?.otp, navigate, token])

  useEffect(() => {
    if (!isEmail) {
      navigate('/login')
      return
    }
    handleForgotPassword()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmail, navigate])

  return (
    <div className="h-screen w-screen flex items-center justify-center  ">
      <Loader ref={(ref) => ref?.showLoader(showLoader)} />
      <div className="flex flex-col gap-8 mx-auto w-full ">
        <div
          className={`h-full sm:w-small-container mx-auto xl:w-md 2xl:w-2xl `}
        >
          <ImageComponent
            className="w-56 mx-auto"
            imageUrl={Images.platformLogo}
          />
          <div className="flex flex-col gap-10 sm:gap-8 w-full">
            <div className="flex flex-col gap-4 w-full px-6 pt-6 pb-7">
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <HeadingComponent
                  className="!text-secondary-light-color"
                  singleLineContent={English.E314}
                  type="h1"
                  variant="xx-medium"
                />
                <HeadingComponent
                  className="!text-[26px]/8 "
                  singleLineContent={English.E315}
                  type="h2"
                />
              </div>
              <div />
              <div className="flex flex-col gap-4">
                {Constants.NewPasswordInoutArray.map((inputItems) => {
                  const {labelText, name, placeHolderText, type} = inputItems
                  return (
                    <InputContainer
                      key={name}
                      {...(name === 'otp' && {maxLength: 6})}
                      error={errors?.[name] ?? ''}
                      name={name}
                      placeholder={placeHolderText}
                      singleLineContent={labelText}
                      value={inputValues?.[name] ?? ''}
                      imageUrl={
                        type !== 'password'
                          ? ''
                          : name === 'new_password'
                            ? isShowPassword.password
                              ? Images.eyeOpen
                              : Images.eyeClose
                            : isShowPassword.cpassword
                              ? Images.eyeOpen
                              : Images.eyeClose
                      }
                      onChange={(e) =>
                        handleInputChange(inputItems?.name, e.target.value)
                      }
                      onPressIcon={() => {
                        setIsShowPassword((prev) => {
                          if (inputItems?.name === 'new_password') {
                            return {...prev, password: !prev.password}
                          }
                          return {...prev, cpassword: !prev.cpassword}
                        })
                      }}
                      type={
                        type !== 'password'
                          ? type
                          : name === 'new_password'
                            ? isShowPassword.password
                              ? 'text'
                              : 'password'
                            : isShowPassword.cpassword
                              ? 'text'
                              : 'password'
                      }
                    />
                  )
                })}
                <div className="flex flex-col justify-start gap-4 text text-primary-color">
                  <div className="flex ">
                    <Link
                      className="font-normal underline text-primary-dark-blue-color/75 text-base/6 text-start w-full"
                      to="/login"
                    >
                      {English.E304}
                    </Link>
                    <span className="text-nowrap">
                      <span
                        className={`text-primary-dark-blue-color/75 text-base/6 ${timer === 0 ? 'cursor-pointer text-primary-dark-blue-color/75' : 'opacity-60 pointer-events-none'}`}
                        onClick={handleForgotPassword}
                      >
                        Resend Otp in :{' '}
                      </span>
                      {formatTime(timer)}
                    </span>
                  </div>
                  <CommonButton
                    className={`primary-btn-type ${inputValues.otp.length === 0 || inputValues.new_password.length === 0 || inputValues.confirm_new_password.length === 0 ? 'bg-button-primary-color opacity-50 pointer-events-none' : ''}`}
                    onClick={handleSetNewPassword}
                    singleLineContent={English.E308}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetNewPasswordPage
