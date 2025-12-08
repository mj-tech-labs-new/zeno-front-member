import {memo} from 'react'

import {Images} from '@/helpers'
import {CommonTableComponentProps} from '@/types/ComponentTypes'

import CommonCloseActionButton from '../CommonButton/CommonCloseActionButton'
import ImageComponent from '../ImageComponent/ImageComponent'
import BasicSkeleton from '../SkeletonComponents/BasicSkeleton'

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
    apiMethod,
  } = props

  return (
    <div
      className={`relative rounded-lg shadow-sm ${layoutClassName} w-full`}
      id="table"
    >
      <table
        className={`w-full text-sm text-left overflow-hidden ${showLoader && 'border-separate border-spacing-y-2'}`}
      >
        <thead
          className={`text-xs bg-widget-primary-bg-color capitalize text-tertiary-color ${className}`}
        >
          <tr>
            {tableHeading?.map((heading) => {
              const {content} = heading
              return (
                <th
key={content[0]} className={`px-6 py-4  `}
scope="col">
                  {content.includes('Close') ||
                  content.includes('Action') ||
                  content.includes('Delete') ? (
                    <CommonCloseActionButton
                      apiMethod={apiMethod}
                      challenge_id={extraProp?.challenge_id}
                      onPerformAction={onPerformAction}
                      type="all_order"
                    />
                  ) : (
                    <div
                      className={`flex items-center gap-2 whitespace-nowrap cursor-pointer ${headingClassName}`}
                    >
                      <div>
                        {content.map((header) => (
                          <div key={`header_${header}`}>
                            {content.length > 0 ? (
                              <span
                                className="inline-block"
                                onClick={() => {
                                  if (ChangeOrder) ChangeOrder(header)
                                }}
                              >
                                {header}
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  if (ChangeOrder) ChangeOrder(header)
                                }}
                              >
                                {header}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {heading.showArrow && (
                        <div className="flex flex-col items-center">
                          <ImageComponent
                            className="w-2"
                            imageUrl={imageUrl ?? Images.arrows}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="w-full">
          {showLoader ? (
            <BasicSkeleton
              className="!h-[50px] [&>td]:!rounded-sm"
              tableHeading={tableHeading}
              type="tableSkeleton"
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
