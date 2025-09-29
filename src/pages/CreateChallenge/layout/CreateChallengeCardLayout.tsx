import {GeneralProps} from '@/types/CommonTypes'

const CreateChallengeCardLayout = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  return (
    <div className="bg-tertiary-bg-color p-6 rounded-2xl border border-solid border-primary-border-color">
      {children}
    </div>
  )
}

export default CreateChallengeCardLayout
