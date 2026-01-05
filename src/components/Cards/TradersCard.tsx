import {TraderCardsProps} from '@/types/ComponentTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const TradersCard = (props: TraderCardsProps) => {
  const {description, details, mainImg, mainTitle, secondaryDesc} = props

  return (
    <div className="card  overflow-hidden">
      <div className="p-8 mt-32 bg-dark-gray-bg rounded-[26px] lg:p-[85px] lg:pr-0! grid grid-cols-1 lg:grid-cols-2 gap-[49px]">
        <div className="flex flex-col gap-5 justify-between">
          <div className="flex flex-col gap-3 *:font-geist!">
            <DescriptionComponent
              className="font-medium  text-[40px]/12 text-primary-color!"
              singleLineContent={mainTitle}
            />
            <DescriptionComponent
              className="text-lg/[30px] font-normal text-primary-color/50"
              singleLineContent={description}
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-lg/5 font-normal text-primary-color/50 font-inter!">
              {secondaryDesc}
            </span>
            <div className="flex gap-2 flex-wrap">
              {details?.map((item) => (
                <p
                  key={item}
                  className="py-2 pl-2 pr-3 rounded-[4px] border border-solid border-white/30 text-base/5 font-normal font-inter! text-primary-color text-left"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <ImageComponent
          className="size-full hidden lg:block"
          imageUrl={mainImg}
        />
      </div>
    </div>
  )
}

export default TradersCard
