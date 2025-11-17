import {ListComponentProps} from '@/types/ComponentTypes'

import DescriptionComponent from '../DescriptionComponent/DescriptionComponent'

const ListingComponent = (props: ListComponentProps) => {
  const {type, className = '', singleLineContent = ''} = props

  if (type === 'normal_list_type') {
    return (
      <div className={`flex gap-2.5 items-center ${className}`}>
        <div className="size-2 bg-extra-dark-danger-color rounded-full" />
        {singleLineContent && (
          <DescriptionComponent singleLineContent={singleLineContent} />
        )}
      </div>
    )
  }

  return (
    <div className={`flex gap-2.5 items-center ${className}`}>
      <div className="size-3.5 bg-landing-page-extra-light-red flex justify-center items-center rounded-full">
        <div className="size-2 bg-extra-dark-danger-color rounded-full" />
      </div>
      {singleLineContent && (
        <DescriptionComponent singleLineContent={singleLineContent} />
      )}
    </div>
  )
}

export default ListingComponent
