import {Accordian, ImageComponent, ListingComponent} from '@/components'
import {Constants, English, Images} from '@/helpers'

const Questions = () => (
  <div className="bg-landing-page-bg-darker-gray-color text-white py-8 lg:py-[120px] space-y-8 w-full flex px-4 lg:px-[52px]">
    <div className="hidden lg:flex lg:w-[222px] lg:items-center lg:h-fit lg:gap-2 max-h-fit !sticky !top-[64px] `">
      <ListingComponent
        className="[&>div]:!bg-landing-page-dark-gray-color [&>div>div]:!bg-primary-color"
        type="multi_list_type"
      />
      <span>{English.E216}</span>
    </div>

    <div className="w-full lg:w-[calc(100%-222px)]">
      <div className="flex items-end justify-between mb-8 lg:mb-10">
        <div className="font-[430] text-[47px] leading-12 tracking-[-1.5px] flex flex-col">
          <span>{English.E217}</span>
          <span className="text-landing-page-dark-gray-color">
            {English.E218}
          </span>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-2 lg:text-sm">
          <span className="">{English.E219}</span>
          <div className="flex items-center gap-2">
            <span className="">{English.E220}</span>
            <div className="size-4 rounded-full bg-primary-color flex justify-center items-center">
              <ImageComponent
                className="size-[12px]"
                imageUrl={Images.navigationArrow}
              />
            </div>
          </div>
        </div>
      </div>

      {Constants.QA.map((qa) => (
        <Accordian
          key={qa.que}
          className="!gap-0"
          layoutClassName="!py-6 !border-b !border-landing-page-trading-rules-para-text !border-solid"
          multilineContent={[qa.ans]}
          singleLineContent={qa.que}
        />
      ))}
    </div>
  </div>
)

export default Questions
