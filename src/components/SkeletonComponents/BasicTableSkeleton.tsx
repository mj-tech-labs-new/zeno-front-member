import {Fragment} from 'react/jsx-runtime'

import {GeneralProps} from '@/types/CommonTypes'

const BasicTableSkeleton = (
  props: {tableHeading: {content: string; showArrow: boolean}[]} & Pick<
    GeneralProps,
    'className'
  >
) => {
  const {tableHeading, className} = props

  return (
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
  )
}

export default BasicTableSkeleton
