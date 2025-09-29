import {memo, useCallback, useEffect, useMemo, useState} from 'react'

import {CommonButton, InputContainer} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'
import {AuthType} from '@/types/UnionTypes'

const FormContainer = (
  props: {type: AuthType} & Required<Pick<GeneralProps, 'onPressItem'>>
) => {
  const {type, onPressItem} = props

  const actionButtons = useMemo(() => {
    return [
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
    ]
  }, [type])

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

  const handleInputChange = useCallback((name: string, value: string) => {
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

        if (name === 'password' || name === 're_password') {
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
  }, [])

  useEffect(() => {
    if (type === 'loginType') return

    setFormData((prev) => {
      return [
        {
          name: 'full_name',
          labelText: English.E15,
          placeHolderText: English.E16,
          type: 'text',
        },
        ...prev,
        {
          name: 're_password',
          labelText: English.E17,
          placeHolderText: English.E18,
          type: 'password',
        },
      ]
    })

    setErrors((prev) => ({
      ...prev,
      full_name: '',
      re_password: '',
    }))
  }, [type])

  useEffect(() => {
    if (type === 'profileType') {
      setInputValues({
        full_name: 'Test User',
        email: 'test_user_yopmail.com',
        password: 'Hello@123',
        re_password: 'Hello@123',
      })
    }
  }, [type])

  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {formData?.map((inputItems) => {
          return (
            <InputContainer
              singleLineContent={inputItems.labelText}
              key={inputItems.name}
              value={inputValues?.[inputItems.name] ?? ''}
              onChange={(e) =>
                handleInputChange(inputItems?.name, e.target.value)
              }
              placeholder={inputItems?.placeHolderText}
              error={errors?.[inputItems.name] ?? ''}
              name={inputItems?.name}
              type={inputItems?.type}
            />
          )
        })}
      </div>

      <div className="flex flex-col gap-4">
        {actionButtons?.map((buttonItem) => {
          return (
            <CommonButton
              disabled={
                Object.values(inputValues).some((item) => item === '') ||
                Object.values(errors).some((item) => item !== '')
              }
              singleLineContent={buttonItem?.text}
              key={buttonItem?.key}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onPressItem()
              }}
              type="submit"
              className={`${type === 'profileType' && buttonItem?.type === 'google_sign_in' ? 'hidden' : ''} ${
                buttonItem?.type === 'google_sign_in'
                  ? 'google-btn-type'
                  : 'primary-btn-type'
              } ${type === 'profileType' ? 'py-3' : ''}`}
              imageUrl={
                buttonItem?.type === 'google_sign_in' ? Images.googleIcon : ''
              }
            />
          )
        })}
      </div>
    </form>
  )
}

export default memo(FormContainer)
