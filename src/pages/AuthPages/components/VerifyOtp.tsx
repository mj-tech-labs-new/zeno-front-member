import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {CommonButton, InputContainer, Loader} from '@/components'
import {English, Utility} from '@/helpers'
import {
  RegisterApiProps,
  VerifyOtpProps,
} from '@/types/apiTypes/AuthApiPayloadType'

import {registerApi, verifyOtpApi} from '../api/AuthApi'

const VerifyOtp = (props: VerifyOtpProps) => {
  const {token, payloadData, setToken} = props

  const [inputValue, setInputValue] = useState({otp: ''})
  const [showLoader, setShowLoader] = useState(false)
  const [timer, setTimer] = useState(300)
  const navigate = useNavigate()

  const handleInputChange = useCallback((name: string, value: string) => {
    setInputValue((prev) => {
      if (name === 'otp') {
        if (value === '' || Utility.isValidNumber(value)) {
          return {...prev, otp: value}
        }
        return prev
      }

      return {...prev, [name]: value}
    })
  }, [])

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleResendOtp = useCallback(() => {
    const payload = {
      name: payloadData?.name,
      email: payloadData?.email,
      password: payloadData?.password,
      user_signup_type: payloadData?.user_signup_type,
      token,
    }
    registerApi(payload as unknown as RegisterApiProps)
      .then((response: any) => {
        if (response) {
          startTimer()
          if (setToken) setToken(response)
        }
      })
      .catch(() => {})
  }, [payloadData, setToken, startTimer, token])

  const handleVerifyOtp = useCallback(() => {
    setShowLoader(true)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const props = {
      otp: inputValue.otp,
      token,
    }
    verifyOtpApi(props)
      .then((response) => {
        if (response) {
          if (response) navigate('/dashboard')
        }
      })
      .catch((error) => {
        toast.error(error)
        setShowLoader(false)
      })
      .finally(() => {
        setShowLoader(false)
      })
  }, [inputValue.otp, navigate, token])

  useEffect(() => {
    if (!token) return
    startTimer()
  }, [startTimer, token])
  return (
    <div className="flex flex-col gap-4">
      <Loader ref={(ref) => ref?.showLoader(showLoader)} />

      <InputContainer
        maxLength={6}
        name="otp"
        onChange={(e) => handleInputChange('otp', e.target.value)}
        placeholder={English.E307}
        singleLineContent={English.E306}
        type="text"
        value={inputValue.otp}
      />
      <div className="flex flex-col justify-start gap-4 text text-primary-color">
        <span className="text-nowrap text-right">
          <span
            className={`text-primary-dark-blue-color/75 text-base/6 ${timer === 0 ? 'cursor-pointer text-primary-dark-blue-color/75' : 'pointer-events-none'}`}
            onClick={handleResendOtp}
          >
            Resend Otp in :{' '}
          </span>
          {formatTime(timer)}
        </span>
        <CommonButton
          className={`primary-btn-type ${inputValue.otp.length === 0 ? 'bg-button-primary-color opacity-50 pointer-events-none' : ''}`}
          onClick={handleVerifyOtp}
          singleLineContent={English.E330}
        />
      </div>
    </div>
  )
}

export default VerifyOtp
