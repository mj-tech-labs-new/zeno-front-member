import {FeatureCardProps, GeneralProps} from '@/types/CommonTypes'

const DescriptionComponent = (
  props: Pick<
    GeneralProps,
    'className' | 'multilineContent' | 'layoutClassName' | 'singleLineContent'
  > &
    Pick<FeatureCardProps, 'featureCardSpan'>
) => {
  const {
    className = '',
    multilineContent = [],
    singleLineContent = '',
    featureCardSpan = '',
    layoutClassName = '',
  } = props

  return (
    <div className={layoutClassName}>
      {multilineContent?.length > 0 &&
        multilineContent.map((item) => (
          <p
            key={item}
            className={`text-text-hint-color font-bureau leading-7 text-15 ${className}`}
          >
            {item}
          </p>
        ))}

      {singleLineContent?.length > 0 && (
        <p className={`text-text-hint-color text-15 ${className} md:w-full`}>
          {singleLineContent}
          {featureCardSpan && (
            <span className="text-primary-black text-15">
              {featureCardSpan}
            </span>
          )}
        </p>
      )}
    </div>
  )
}

export default DescriptionComponent
