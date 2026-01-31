import {GeneralProps} from '@/types/CommonTypes'

const PayoutLayout = (
  props: Required<Pick<GeneralProps, 'children' | 'singleLineContent'>>
) => {
  const {children, singleLineContent} = props
  return (
    <div className="space-y-8">
      <p className="text_base_utility text-primary-color">
        {singleLineContent}
      </p>
      {children}
    </div>
  )
}

export default PayoutLayout
