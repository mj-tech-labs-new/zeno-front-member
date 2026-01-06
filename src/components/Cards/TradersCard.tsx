import {TraderCardsProps} from '@/types/ComponentTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const TradersCard = (props: TraderCardsProps) => {
  const {description, details, mainImg, mainTitle, secondaryDesc} = props

  return (
    <div className="card  overflow-hidden">
      <div className=" p-4 xl:p-8 mt-[100px] bg-dark-gray-bg rounded-[26px] lg:p-[85px] lg:pr-0! grid grid-cols-1 lg:grid-cols-2 gap-[49px]">
        <div className="flex flex-col gap-12 xl:gap-[96px] justify-between">
          <div className="flex flex-col gap-3 *:font-geist!">
            <DescriptionComponent
              className="font-medium last:mt-0 text-base/6! xl:text-[40px]/12! text-primary-color!"
              multilineContent={mainTitle}
            />
            <DescriptionComponent
              className="text-base/6 xl:text-lg/[30px] font-light font-geist! text-primary-color/50"
              singleLineContent={description}
            />
          </div>

          <div className="flex-col gap-3.5 xl:flex hidden">
            <span className="text-lg/5 font-light text-primary-color/50 font-geist!">
              {secondaryDesc}
            </span>
            <div className="flex gap-2 flex-wrap">
              {details?.map((item) => (
                <p
                  key={item}
                  className="py-2 pl-2 pr-3 rounded-[4px] border border-solid border-white/30 text-base/5 font-light font-inter! text-primary-color text-left"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ImageComponent
          className="[&>img]:custom_shadow [&>img]:object-contain h-[220px] xl:h-[440px]"
          imageUrl={mainImg}
        />
      </div>
    </div>
  )
}

export default TradersCard
