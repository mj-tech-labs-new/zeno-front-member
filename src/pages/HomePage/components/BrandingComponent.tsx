import Marquee from 'react-fast-marquee'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {
  CommonButton,
  DescriptionComponent,
  Divider,
  ImageComponent,
} from '@/components'
import {Constants, English, Images} from '@/helpers'
import {StorageProps} from '@/types/CommonTypes'

const BrandingComponent = () => {
  const navigate = useNavigate()
  const UserData = useSelector((state: StorageProps) => state.userData?.user)
  return (
    <div className="px-4 !pt-0 relative top-[70px] mb-[54px] lg:mb-20">
      <div className="lg:max-w-5xl lg:mx-auto mb-10 lg:mb-16 pt-6 lg:pt-[107px]">
        <div className="relative">
          <div className="bg-extra-dark-danger-color w-[375px] h-[205px] lg:w-[205px] lg:h-[405px] lg:aspect-square absolute top-0 right-0 lg:right-60 blur-2xl opacity-20 lg:opacity-40 rounded-full" />
          <DescriptionComponent
            className="!text-3xl lg:!text-[52px] !tracking-[-1px] lg:!tracking-[-2.4px] !leading-[38px] lg:!leading-[60px] !font-[430] !text-primary-black !font-bureau"
            multilineContent={[English.E203, English.E204, English.E205]}
          />

          <Divider className="!bg-primary-black mt-8 lg:mt-12" />
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:justify-between w-full">
            <DescriptionComponent
              className="!font-[430] font-bureau tracking-normal !text-base !leading-[22px] !text-primary-black"
              multilineContent={[English.E206]}
            />

            <div className="flex flex-col gap-4 lg:gap-[31px]">
              <DescriptionComponent
                className="!font-[430] !font-bureau !text-base !leading-[22px] !text-tertiary-bg-color !text-justify"
                layoutClassName="lg:!max-w-[317px]"
                multilineContent={[English.E207]}
              />
              {UserData?.token === null && (
                <CommonButton
                  className="black-btn-type !w-fit !rounded-full !text-sm !leading-5"
                  singleLineContent={English.E197}
                  onClick={() => {
                    navigate('/sign-up', {
                      replace: true,
                    })
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <ImageComponent
          className="mt-14 lg:mt-[93px]"
          imageUrl={Images.fullDashboardCropped}
        />
      </div>

      <Marquee
gradient gradientColor="#F7F6F5"
gradientWidth={200} loop={0}>
        <div className="flex gap-4">
          {Constants.brandImages.map((item) => (
            <ImageComponent
              key={item}
              className="h-[61px] flex items-center justify-center py-1.5 w-[153px]  [&>img]:object-none"
              imageUrl={item}
            />
          ))}
          {Constants.brandImages.map((item) => (
            <ImageComponent
              key={item}
              className="h-[61px] flex items-center justify-center py-1.5 w-[153px]  [&>img]:object-none"
              imageUrl={item}
            />
          ))}
        </div>
      </Marquee>
    </div>
  )
}

export default BrandingComponent
