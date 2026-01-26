import {memo, useCallback, useRef} from 'react'

import {English, Images} from '@/helpers'
import {getUserApi} from '@/pages/AuthPages/api/AuthApi'
import {Store} from '@/store'
import {AppLoaderRef} from '@/types/ComponentTypes'

import ImageComponent from '../ImageComponent/ImageComponent'

const AffiliateButton = () => {
  const loaderRef = useRef<AppLoaderRef | null>(null)

  const onPressAffiliate = useCallback(() => {
    loaderRef.current?.showLoader(true)
    getUserApi()
      .then((res) => {
        if (res?.isMarketer !== 0 && res) {
          const {referral_code} = res
          window.open(
            `${import.meta.env.VITE_APPLICATION_REDIRECT_URL}/?user_id=${Store?.getState()?.userData?.user?.token}&ref_code=${referral_code}`,
            '_blank'
          )
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  return (
    <button
      className="flex w-full gap-3.5 items-center px-4 py-2 hover:bg-button-primary-color rounded-xl transition-all duration-500 ease-in-out text-tertiary-color text-base/6 font-normal cursor-pointer"
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onPressAffiliate()
      }}
    >
      <ImageComponent imageUrl={Images.affiliate} />
      {English.E435}
    </button>
  )
}

export default memo(AffiliateButton)
