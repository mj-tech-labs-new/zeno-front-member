import {FeatureCardProps, GeneralProps} from '@/types/CommonTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'
import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const FeatureCard = (
  props: FeatureCardProps & Pick<GeneralProps, 'className'>
) => {
  const {
    className,
    featureCardSubHeading,
    featureCardImageUrl,
    featureCardPara,
    featureCardSpan,
    featureContainerHeading,
  } = props
  return (
    <div
      className={`p-4 font-[430] bg-primary-color flex flex-col gap-10 ${className}`}
    >
      <div className="space-y-1">
        {featureContainerHeading && (
          <HeadingComponent
            className="!text-xl !tracking-[-0.5px] !leading-6 !text-linear-gr-bg2-color !font-bureau"
            singleLineContent={featureContainerHeading}
            type="h3"
          />
        )}

        <DescriptionComponent
          className="!text-xl !tracking-[-0.5px] !leading-6 !landing-page-features-lg-less-opacity-gray opacity-[41%] !font-bureau"
          singleLineContent={featureCardSubHeading}
        />
      </div>

      <ImageComponent
        className="size-full p-2 rounded-lg shadow-sm bg-feature-card-bg-color max-w-[500px] mx-auto"
        imageUrl={featureCardImageUrl}
      />

      <DescriptionComponent
        className="!text-sm !leading-5 !font-bureau !tracking-[-0.14px] !text-light-grey-btn-color/60 [&>span]:opacity-100"
        featureCardSpan={featureCardSpan}
        singleLineContent={featureCardPara}
      />
    </div>
  )
}

export default FeatureCard
