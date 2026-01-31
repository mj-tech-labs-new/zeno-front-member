import {memo} from 'react'

import {English} from '@/helpers'
import {EmptyComponentProps} from '@/types/ComponentTypes'

const EmptyComponent = (props: EmptyComponentProps) => {
  const {singleLineContent = '', isTableType = false} = props
  return isTableType ? (
    <tr className="text-center">
      <td
        className="text_lg_utility p-6  text-primary-color bg-secondary-bg-color rounded-lg w-full"
        colSpan={12}
      >
        {singleLineContent === '' ? English.E288 : singleLineContent}
      </td>
    </tr>
  ) : (
    <p className="text_lg_utility text-primary-color bg-secondary-bg-color p-4 rounded-lg w-full">
      {singleLineContent === '' ? English.E288 : singleLineContent}
    </p>
  )
}

export default memo(EmptyComponent)
