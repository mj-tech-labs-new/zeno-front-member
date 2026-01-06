import {GeneralProps} from '@/types/CommonTypes'

const Labels = (
  props: Required<Pick<GeneralProps, 'singleLineContent'>> &
    Pick<GeneralProps, 'className'> & {id?: string}
) => {
  const {className = '', singleLineContent, id = ''} = props
  return (
    <div
      className={`px-2 py-0.5 h-[20px] rounded-t-[4px] text-primary-black! bg-medium-success-color text-xs/6 font-medium font-geist! absolute -top-5 border-bl-[8px] flex items-center left-0 ${className}`}
      id={id}
    >
      {singleLineContent}
    </div>
  )
}

export default Labels
