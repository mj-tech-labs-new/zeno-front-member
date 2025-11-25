import {useCallback, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {
  CommonButton,
  HeadingComponent,
  ImageComponent,
  InputContainer,
} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'

const SetNewPasswordPage = () => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    otp: '',
    new_password: '',
    confirm_new_password: '',
  })
  const [timer, setTimer] = useState(600)
  const [errors, setErrors] = useState<Record<string, string>>({
    otp: '',
    new_password: '',
    confirm_new_password: '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const isEmail = location.state
  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      setInputValues((prevValues) => {
        const newValues = {...prevValues, [name]: value}

        if (name === 'otp') {
          return {
            ...prevValues,
            otp: Utility.isValidNumber(value),
          }
        }

        if (name === 'new_password' || name === 'confirm_new_password') {
          if (
            'confirm_new_password' in newValues &&
            newValues.new_password !== newValues.confirm_new_password
          ) {
            setErrors((prev) => ({
              ...prev,
              new_password: English.E87,
              confirm_new_password: English.E87,
            }))
          } else {
            setErrors((data) => ({
              ...data,
              new_password: '',
              confirm_new_password: '',
            }))
          }
        }
        if (value === '') {
          setErrors((data) => ({...data, [name]: ''}))
        }

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

  useEffect(() => {
    if (!isEmail) {
      navigate('/login')
      return
    }
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval)
  }, [isEmail, navigate])

  return (
    <div className="h-screen w-screen flex items-center justify-center  ">
      <div className="flex flex-col gap-8 mx-auto w-full ">
        <div
          className={`h-full sm:w-small-container mx-auto xl:w-md 2xl:w-2xl `}
        >
          <ImageComponent
            className="h-8 sm:h-10 mx-auto aspect-square"
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
                {Constants.NewPasswordInoutArray.map((inputItems) => (
                  <InputContainer
                    key={inputItems.name}
                    {...(inputItems.name === 'otp' && {maxLength: 6})}
                    error={errors?.[inputItems.name] ?? ''}
                    name={inputItems?.name}
                    placeholder={inputItems?.placeHolderText}
                    singleLineContent={inputItems.labelText}
                    type={inputItems?.type}
                    value={inputValues?.[inputItems.name] ?? ''}
                    onChange={(e) =>
                      handleInputChange(inputItems?.name, e.target.value)
                    }
                  />
                ))}
                <div className="flex flex-col justify-start gap-4 text text-primary-color">
                  <div className="flex ">
                    <Link
                      className="font-normal underline text-primary-dark-blue-color/75 text-base/6 text-start w-full"
                      to="/login"
                    >
                      {English.E304}
                    </Link>
                    <span className="text-nowrap">
                      <span className=" text-primary-dark-blue-color/75 text-base/6">
                        Resend Otp in :{' '}
                      </span>
                      {formatTime(timer)}
                    </span>
                  </div>
                  <CommonButton
                    className={`primary-btn-type ${inputValues.otp.length === 0 || inputValues.new_password.length === 0 || inputValues.confirm_new_password.length === 0 ? 'bg-button-primary-color opacity-50 pointer-events-none' : ''}`}
                    singleLineContent={English.E308}
                    type="submit"
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
