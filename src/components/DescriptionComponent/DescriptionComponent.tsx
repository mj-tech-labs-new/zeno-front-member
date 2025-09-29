import {GeneralProps} from '@/types/CommonTypes'

const DescriptionComponent = (
  props: Pick<
    GeneralProps,
    'className' | 'multilineContent' | 'layoutClassName'
  >
) => {
  const {className = '', multilineContent = [], layoutClassName = ''} = props

  return (
    <div className={`flex flex-col gap-1 ${layoutClassName}`}>
      {multilineContent?.length > 0 &&
        multilineContent?.map((textContent) => {
          return (
            <p
              className={`text-text-hint-color text-15 ${className}`}
              key={textContent}
            >
              {textContent}
            </p>
          )
        })}
    </div>
  )
}

export default DescriptionComponent
