import {GeneralProps} from '@/types/CommonTypes'

const BasicSkeleton = (props: Pick<GeneralProps, 'className'>) => {
  const {className} = props

  return <div className={`custom-skeleton h-full w-full ${className}`} />
}

export default BasicSkeleton
