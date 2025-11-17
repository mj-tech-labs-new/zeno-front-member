import {DescriptionComponent} from '@/components'

const EmptyLayout = (props: {content: string}) => {
  const {content} = props

  return (
    <DescriptionComponent
      className="!text-white !text-center"
      multilineContent={[content]}
    />
  )
}

export default EmptyLayout
