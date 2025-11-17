import {DescriptionComponent} from '@/components'
import {English} from '@/helpers'

const StopWastingTime = () => (
  <div className="bg-black text-white">
    <div className="lg:max-w-[659px] lg:mx-auto px-5 lg:px-0 lg:pt-[237px] lg:pb-[154px] pt-[68px] pb-[86px] flex flex-col gap-12">
      <DescriptionComponent
        className="!text-lg font-normal !leading-[26px] !text-tertiary-color !text-center font-switzer"
        layoutClassName="max-w-[370px] mx-auto"
        multilineContent={[English.E223]}
      />

      <p className="font-switzer font-[300] text-2xl !leading-10 lg:text-[34px] lg:leading-10 text-center text-landing-page-dark-gray-color max-w-[660px] mx-auto">
        {English.E208} <span className="text-white">{English.E209}</span>
      </p>
    </div>
  </div>
)

export default StopWastingTime
