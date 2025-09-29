import {useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {ImageComponent} from '@/components'
import {English, Images} from '@/helpers'
import {AuthType} from '@/types/UnionTypes'

import FormContainer from './FormContainer'

const AuthForm = (props: {type: AuthType}) => {
  const {type} = props
  const navigate = useNavigate()
  const onSubmitForm = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return (
    <div className="flex flex-col gap-8 mx-auto w-full">
      <div
        className={`h-full sm:w-small-container mx-auto lg:w-sm xl:w-md 2xl:w-2xl ${type === 'loginType' ? 'lg:ml-[102px] lg:mx-0' : ''}`}
      >
        <ImageComponent
          imageUrl={Images.platformLogo}
          className="h-8 sm:h-10 mx-auto aspect-square"
        />
        <div className="flex flex-col gap-10 sm:gap-8 w-full">
          <div className="flex flex-col gap-[60px] w-full px-6 pt-6 pb-7">
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <h1 className="text-base/6 sm:text-2xl/6 font-normal text-secondary-light-color">
                {type === 'loginType' ? English.E1 : English.E11}
              </h1>
              <h2 className="text-2xl/6 sm:text-26 text-primary-color">
                {type === 'loginType' ? English.E2 : English.E12}
              </h2>
            </div>
            <FormContainer type={type} onPressItem={onSubmitForm} />
          </div>
          <Link
            to={type === 'loginType' ? '/sign-up' : '/'}
            className="font-normal text-tertiary-color text-base/6 text-center w-full"
          >
            {type === 'loginType' ? English.E9 : English.E13}{' '}
            <span className="underline underline-offset-1 font-medium">
              {type === 'loginType' ? English.E10 : English.E7}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
