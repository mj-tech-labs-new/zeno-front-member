import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {CommonButton, InputContainer, Loader} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {
  LoginApiProps,
  RegisterApiProps,
  UpdateApiProps,
} from '@/types/apiTypes/AuthApiPayloadType'
import {GeneralProps, StorageProps} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {AuthType} from '@/types/UnionTypes'

import {
  getUserApi,
  loginApi,
  registerApi,
  updateUserDataApi,
} from '../api/AuthApi'

const FormContainer = (
  props: {
    type?: AuthType
    onSubmit?: (token: string, data: RegisterApiProps) => void
    setIsToken?: (value: boolean) => void
  } & Pick<GeneralProps, 'className'>
) => {
  const {type, onSubmit, setIsToken, className} = props
  const userData = useSelector((state: StorageProps) => state.userData)
  const navigate = useNavigate()
  const loaderRef = useRef<AppLoaderRef>(null)
  const [isShowPassword, setIsShowPassword] = useState(true)
  const location = useLocation()
  const [referralCode, setReferralCode] = useState(
    location.search?.split('=')?.[1] ?? ''
  )
  const [referral_code, setReferral_code] = useState('')
  const [isMarketer, setIsMarketer] = useState(false)

  const actionButtons = useMemo(
    () => [
      {
        text:
          type === 'loginType'
            ? English.E7
            : type === 'signUpType'
              ? English.E14
              : English.E113,
        key: 'normal_sign_in_btn',
        type: 'normal_sign_in',
      },
      {
        text: English.E8,
        key: 'google_sign_in_btn',
        type: 'google_sign_in',
      },
    ],
    [type]
  )

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    type === 'loginType'
      ? {email: '', password: ''}
      : {email: '', password: '', full_name: '', re_password: ''}
  )

  const [errors, setErrors] = useState<Record<string, string>>(
    type === 'loginType'
      ? {email: '', password: ''}
      : {email: '', password: '', full_name: '', re_password: ''}
  )

  const [formData, setFormData] = useState(Constants.AuthContainerArray)

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setInputValues((prevValues) => {
        const newValues = {...prevValues, [name]: value}

        if (value === '') {
          setErrors((prev) => ({...prev, [name]: ''}))
        }

        if (value !== '') {
          if (name === 'email') {
            if (!Utility.isValidEmail(value)) {
              setErrors((data) => ({...data, [name]: English.E86}))
            } else {
              setErrors((data) => ({...data, [name]: ''}))
            }
          }
          if (type !== 'loginType' && name === 'password') {
            if (Utility.isPasswordValid(value)) {
              setErrors((prev) => ({
                ...prev,
                password: '',
                re_password: '',
              }))
            } else {
              setErrors((prev) => ({
                ...prev,
                password: English.E328,
                re_password: '',
              }))
            }
          }

          if (name === 're_password') {
            if (
              're_password' in newValues &&
              newValues.password !== newValues.re_password
            ) {
              setErrors((prev) => ({
                ...prev,
                password: English.E87,
                re_password: English.E87,
              }))
            } else {
              setErrors((data) => ({
                ...data,
                password: '',
                re_password: '',
              }))
            }
          }
        }

        return newValues
      })
    },
    [type]
  )

  const handleSubmitForm = useCallback(() => {
    loaderRef.current?.showLoader(true)
    let payload: Record<string, string | number | null> = {
      email: inputValues.email,
    }
    if (type === 'loginType') {
      payload = {
        ...payload,
        user_signup_type: 1,
        password: inputValues.password,
      }
      loginApi(payload as unknown as LoginApiProps)
        .then((response) => {
          loaderRef.current?.showLoader(false)
          if (response) {
            if (!userData.payoutDetails) {
              navigate('/dashboard')
              return
            }
            navigate('/')
          }
        })
        .catch(() => {
          loaderRef.current?.showLoader(false)
        })

      return
    }

    if (type === 'signUpType') {
      payload = {
        ...payload,
        name: inputValues.full_name,
        user_signup_type: 1,
        password: inputValues.password,
        referral_code: referralCode === '' ? null : referralCode,
      }
      registerApi(payload as unknown as RegisterApiProps)
        .then((response) => {
          if (response) {
            setIsToken?.(true)
            onSubmit?.(response, payload as unknown as RegisterApiProps)
          }
        })
        .finally(() => {
          loaderRef?.current?.showLoader(false)
        })
    }

    if (type === 'profileType') {
      payload = {
        ...payload,
        name: inputValues.full_name,
        password: inputValues.password,
        referral_code,
      }
      updateUserDataApi(payload as unknown as UpdateApiProps)
        .then((response) => {
          loaderRef.current?.showLoader(false)
          if (response) navigate('/dashboard')
        })
        .catch(() => {
          loaderRef.current?.showLoader(false)
        })
    }
  }, [
    inputValues.email,
    inputValues.full_name,
    inputValues.password,
    navigate,
    onSubmit,
    setIsToken,
    type,
    userData.payoutDetails,
    referralCode,
    referral_code,
  ])

  useEffect(() => {
    if (type === 'loginType') return

    setFormData((prev) => [
      {
        name: 'full_name',
        labelText: English.E15,
        placeHolderText: English.E16,
        type: 'text',
      },
      ...prev,
      {
        name: 're_password',
        labelText: English.E309,
        placeHolderText: English.E310,
        type: 'password',
      },
    ])

    setErrors((prev) => ({
      ...prev,
      full_name: '',
      re_password: '',
    }))
  }, [type])

  useEffect(() => {
    if (type === 'profileType') {
      setInputValues({
        full_name: userData.user.userData?.name ?? '',
        email: userData.user.userData?.email ?? '',
        password: 'Hello@123',
        re_password: 'Hello@123',
      })
      return
    }
    if (type === 'signUpType') {
      setReferralCode(location.search?.split('=')?.[1] ?? '')
    }
  }, [
    location.search,
    type,
    userData.user.userData?.email,
    userData.user.userData?.name,
  ])

  useEffect(() => {
    if (type !== 'profileType') return
    loaderRef.current?.showLoader(true)

    getUserApi().then((res) => {
      loaderRef.current?.showLoader(false)
      if (res === null) return
      setInputValues({
        full_name: res.name,
        email: res.email,
        password: res.password,
        re_password: res.password,
      })
      setIsMarketer(res.isMarketer !== 0)
      setReferral_code(
        `${window.location.origin}/sign-up/?refCode=${res.referral_code ?? ''}`
      )
    })
  }, [type])

  return (
    <Fragment>
      <Loader ref={loaderRef} />
      <form className={`flex flex-col gap-4 ${className} `}>
        <div className="flex flex-col gap-4">
          {formData?.map((inputItems) => (
            <InputContainer
              key={inputItems.name}
              error={errors?.[inputItems.name] ?? ''}
              name={inputItems?.name}
              placeholder={inputItems?.placeHolderText}
              singleLineContent={inputItems.labelText}
              value={inputValues?.[inputItems.name] ?? ''}
              imageUrl={
                inputItems?.type === 'password'
                  ? isShowPassword
                    ? Images.eyeClose
                    : Images.eyeOpen
                  : ''
              }
              onChange={(e) =>
                handleInputChange(inputItems?.name, e.target.value)
              }
              onPressIcon={() => {
                setIsShowPassword((prev) => !prev)
              }}
              type={
                inputItems
                  ? isShowPassword && inputItems?.type === 'password'
                    ? 'password'
                    : 'text'
                  : 'text'
              }
            />
          ))}
          {type === 'signUpType' && (
            <div className="flex gap-2 flex-col  w-full">
              <span className="font-normal text-base/6 text-tertiary-color whitespace-nowrap">
                Referral Code
              </span>
              <InputContainer
                disabled={location.search?.split('=')?.[1] !== undefined}
                maxLength={8}
                placeholder="Enter Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value)
                }}
              />
            </div>
          )}
          {type === 'profileType' && isMarketer && (
            <div className="flex gap-5 items-center w-full">
              <span className="font-normal text-base/6 text-tertiary-color whitespace-nowrap">
                Referral Link
              </span>
              <div className="h-[60px] bg-secondary-bg-color rounded-lg text-tertiary-color w-full flex items-center justify-between px-4">
                <span className="inline-block w-56 truncate ...">
                  {referral_code}
                </span>
                <CommonButton
                  className="text-xs cursor-pointer bg-primary-green! w-fit! h-7"
                  singleLineContent="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(referral_code).then(() => {
                      toast.success('Link copied to clipboard')
                    })
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {type === 'loginType' && (
            <div className="flex justify-end ">
              <Link
                className="font-normal underline text-primary-dark-blue-color/75 text-end text-base/6 w-full"
                to="/forgot-password"
              >
                {English.E301}
              </Link>
            </div>
          )}
          <CommonButton
            key={actionButtons?.[0]?.key}
            singleLineContent={actionButtons?.[0]?.text}
            type="submit"
            className={`${type === 'profileType' && actionButtons?.[0]?.type === 'google_sign_in' ? '' : ''} ${
              actionButtons?.[0]?.type === 'google_sign_in'
                ? 'google-btn-type'
                : 'primary-btn-type'
            } ${type === 'profileType' ? 'py-3' : ''}`}
            disabled={
              Object.values(inputValues).some((item) => item === '') ||
              Object.values(errors).some((item) => item !== '')
            }
            imageUrl={
              actionButtons?.[0]?.type === 'google_sign_in'
                ? Images.googleIcon
                : ''
            }
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleSubmitForm()
            }}
          />
        </div>
      </form>
    </Fragment>
  )
}

export default memo(FormContainer)
