import {GeneralProps} from '@/types/CommonTypes'

const TermsLayout = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  return (
    <div className="container text-white mx-auto space-y-3 py-5">
      {children}
    </div>
  )
}

export default TermsLayout
