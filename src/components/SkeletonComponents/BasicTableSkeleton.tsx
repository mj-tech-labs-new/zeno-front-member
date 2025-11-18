import {GeneralProps} from '@/types/CommonTypes'

const BasicTableSkeleton = (
  props: {tableHeading: {content: string; showArrow: boolean}[]} & Pick<
    GeneralProps,
    'className'
  >
) => {
  const {tableHeading, className} = props

  return (
    <tr className={className}>
      <td
        className="custom-table-skeleton h-full w-full"
        colSpan={tableHeading?.length}
      />
    </tr>
  )
}

export default BasicTableSkeleton
