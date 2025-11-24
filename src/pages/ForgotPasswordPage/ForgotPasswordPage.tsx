import {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {
  CommonButton,
  HeadingComponent,
  ImageComponent,
  InputContainer,
} from '@/components'
import {English, Images, Utility} from '@/helpers'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    email: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({email: ''})

  const handleInputChange = useCallback(
    (name: keyof typeof inputValues, value: string) => {
      setInputValues((prevValues) => {
        const newValues = {...prevValues, [name]: value}
        if (name === 'email') {
          if (!Utility.isValidEmail(value)) {
            setErrors((data) => ({...data, [name]: English.E86}))
          } else {
            setErrors((data) => ({...data, [name]: ''}))
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

  const handleSendOtp = useCallback(() => {
    if (inputValues.email === '') return

    navigate('/set-new-password', {
      state: {
        email: inputValues?.email,
      },
    })
  }, [inputValues?.email, navigate])
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
            <div className="flex flex-col gap-4  w-full px-6 pt-6 pb-7">
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <HeadingComponent
                  className="!text-secondary-light-color"
                  singleLineContent={English.E11}
                  type="h1"
                  variant="xx-medium"
                />
                <HeadingComponent
                  className="!text-[26px]/8 "
                  singleLineContent={English.E313}
                  type="h2"
                />
              </div>
              <div />
              <div className="flex flex-col gap-4">
                <InputContainer
                  error={errors?.email}
                  name="email"
                  placeholder={English.E4}
                  singleLineContent={English.E3}
                  value={inputValues?.email}
                  onChange={(e) => {
                    handleInputChange('email', e.target.value)
                  }}
                />
                <div className="flex flex-col justify-start gap-4 text text-primary-color">
                  <div className="flex justify-end">
                    <Link
                      className="font-normal underline text-primary-dark-blue-color/75 text-base/6 text-end w-full"
                      to="/login"
                    >
                      {English.E304}
                    </Link>
                  </div>
                  <CommonButton
                    className={`primary-btn-type ${inputValues.email.length === 0 ? 'bg-button-primary-color opacity-50 pointer-events-none' : ''}`}
                    onClick={handleSendOtp}
                    singleLineContent={English.E303}
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

export default ForgotPasswordPage
