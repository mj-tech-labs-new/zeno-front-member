import {GeneralProps} from '@/types/CommonTypes'

const Divider = (props: Pick<GeneralProps, 'className'>) => {
  const {className = ''} = props
  return (
    <div
      className={`h-[1px] rounded-full bg-divider-color w-full ${className}`}
    />
  )
}

export default Divider
