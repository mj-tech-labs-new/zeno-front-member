import {Link} from 'react-router-dom'

import {HeadingComponent, ImageComponent} from '@/components'
import {English, Images} from '@/helpers'
import {AuthType} from '@/types/UnionTypes'

import FormContainer from './FormContainer'

const AuthForm = (props: {type: AuthType}) => {
  const {type} = props

  return (
    <div className="flex flex-col gap-8 mx-auto w-full m-auto">
      <div
        className={`h-full sm:w-small-container mx-auto xl:w-md 2xl:w-2xl ${type === 'loginType' ? 'lg:ml-[102px] lg:mx-0' : ''}`}
      >
        <ImageComponent
          className="h-8 sm:h-10 mx-auto aspect-square"
          imageUrl={Images.platformLogo}
        />
        <div className="flex flex-col gap-10 sm:gap-8 w-full">
          <div className="flex flex-col gap-[60px] w-full px-6 pt-6 pb-7">
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <HeadingComponent
                className="!text-secondary-light-color"
                type="h1"
                variant="xx-medium"
                singleLineContent={
                  type === 'loginType' ? English.E1 : English.E11
                }
              />
              <HeadingComponent
                className="!text-[26px]/6 "
                type="h2"
                singleLineContent={
                  type === 'loginType' ? English.E2 : English.E12
                }
              />
            </div>
            <FormContainer type={type} />
          </div>
          <Link
            className="font-normal text-tertiary-color text-base/6 text-center w-full"
            to={type === 'loginType' ? '/sign-up' : '/login'}
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
