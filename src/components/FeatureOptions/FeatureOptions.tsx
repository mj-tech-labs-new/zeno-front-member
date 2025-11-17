import {FeatureOptionsProps} from '@/types/CommonTypes'

const FeatureOptions = (props: FeatureOptionsProps) => {
  const {featureOptions = []} = props

  return (
    <div className="flex flex-col gap-2 mt-2 lg:hidden">
      {featureOptions.map((feature) => (
        <div
          key={feature}
          className="text-xl tracking-[-0.5px] p-4 bg-primary-color font-[430] leading-[22px] !text-linear-gr-bg2-color !font-bureau"
        >
          {feature}
        </div>
      ))}
    </div>
  )
}

export default FeatureOptions
