import {memo} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

const DashboardSectionLayout = (
  props: Required<Pick<GeneralProps, 'singleLineContent' | 'children'>>
) => {
  const {children, singleLineContent} = props
  return (
    <div className="space-y-6">
      <p className="text_lg_utility text-primary-color">{singleLineContent}</p>
      <div className="relative">{children}</div>
    </div>
  )
}

export default memo(DashboardSectionLayout)
