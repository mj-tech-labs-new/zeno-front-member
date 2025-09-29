import { memo } from 'react'

import { CommonTableComponentProps } from '@/types/ComponentTypes'

const CommonTableComponent = (props: CommonTableComponentProps) => {
  const { tableHeading, children } = props
  return (
    <div className="relative overflow-x-auto border border-solid border-dropdown-bg-color rounded-lg shadow-sm">
      <table className="w-full text-sm text-left overflow-hidden">
        <thead className="text-xs bg-info-bg-color capitalize text-tertiary-color">
          <tr>
            {tableHeading?.map((tableHeading) => {
              return (
                <th
                  scope="col" className="px-6 py-4"
                  key={tableHeading}>
                  {tableHeading}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default memo(CommonTableComponent)
