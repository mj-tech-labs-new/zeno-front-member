import {memo} from 'react'

import {Images} from '@/helpers'
import {CommonTableComponentProps} from '@/types/ComponentTypes'

import CommonCloseActionButton from '../CommonButton/CommonCloseActionButton'
import ImageComponent from '../ImageComponent/ImageComponent'
import BasicTableSkeleton from '../SkeletonComponents/BasicTableSkeleton'

const CommonTableComponent = (props: CommonTableComponentProps) => {
  const {
    tableHeading,
    children,
    className = '',
    layoutClassName = '',
    headingClassName = '',
    imageUrl,
    ChangeOrder,
    extraProp,
    onPerformAction,
    showLoader,
  } = props

  return (
    <div
      className={`relative overflow-x-auto rounded-lg shadow-sm ${layoutClassName} w-full`}
    >
      <table className="w-full text-sm text-left overflow-hidden">
        <thead
          className={`text-xs bg-widget-primary-bg-color capitalize text-tertiary-color ${className}`}
        >
          <tr>
            {tableHeading?.map((heading) => (
              <th
key={heading.content} className={`px-6 py-4  `}
scope="col">
                {heading.content === 'Close' ? (
                  <CommonCloseActionButton
                    challenge_id={extraProp?.challenge_id}
                    onPerformAction={onPerformAction}
                    type="all_order"
                  />
                ) : (
                  <div
                    className={`flex items-center gap-2 whitespace-nowrap ${headingClassName}`}
                    onClick={() => {
                      if (ChangeOrder) ChangeOrder(heading.content)
                    }}
                  >
                    {heading?.content}
                    {heading.showArrow && (
                      <div className="flex flex-col items-center cursor-pointer">
                        <ImageComponent
                          className="w-2"
                          imageUrl={imageUrl ?? Images.arrows}
                        />
                      </div>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="w-full">
          {showLoader ? (
            <BasicTableSkeleton
              className="!h-6 [&>td]:!rounded-full"
              tableHeading={tableHeading}
            />
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  )
}

export default memo(CommonTableComponent)
