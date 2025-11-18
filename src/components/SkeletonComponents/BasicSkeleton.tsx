import {Fragment} from 'react/jsx-runtime'

import {GeneralProps} from '@/types/CommonTypes'

const BasicSkeleton = (
  props: {
    tableHeading?: {content: string; showArrow: boolean}[]
    type?: string
  } & Pick<GeneralProps, 'className'>
) => {
  const {className, type = '', tableHeading = []} = props

  return type === 'tableSkeleton' ? (
    <Fragment>
      {Array.from({length: 5}).map((_, index) => (
        <tr key={index} className={className}>
          <td
            className="custom-table-skeleton h-full w-full"
            colSpan={tableHeading?.length}
          />
        </tr>
      ))}
    </Fragment>
  ) : (
    <div className={`custom-skeleton h-full w-full ${className}`} />
  )
}

export default BasicSkeleton
