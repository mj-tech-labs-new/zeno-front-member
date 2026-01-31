import {memo} from 'react'

import {English} from '@/helpers'
import {EmptyComponentProps} from '@/types/ComponentTypes'

const EmptyComponent = (props: EmptyComponentProps) => {
  const {singleLineContent, isTableType = false} = props
  return isTableType ? (
    <tr className="text-center">
      <td
        className="text_lg_utility text-white-500 bg-dark-black-200 rounded-lg w-full"
        colSpan={12}
      >
        {singleLineContent ?? English.E17}
      </td>
    </tr>
  ) : (
    <p className="text_lg_utility text-white-500 bg-dark-black-200 p-4 rounded-lg w-full">
      {singleLineContent ?? English.E17}
    </p>
  )
}

export default memo(EmptyComponent)
