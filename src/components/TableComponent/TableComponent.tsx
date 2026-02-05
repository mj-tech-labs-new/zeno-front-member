import {memo} from 'react'

import {CommonTableComponentProps} from '@/types/ComponentTypes'

const TableComponent = (props: CommonTableComponentProps) => {
  const {children, tableHeading, className = ''} = props
  return (
    <div
      className="relative border border-solid border-dark-black-300 overflow-x-auto shadow-sm w-full rounded-lg "
      id="table"
    >
      <table className="w-full text-sm text-left overflow-hidden">
        <thead
          className={`text-xs bg-dark-black-300 capitalize text-tertiary-color ${className}`}
        >
          <tr>
            {tableHeading?.map((heading, index) => {
              const {content, showArrow} = heading
              return (
                <th
                  key={`${content[0]}_table_${index.toString()}`}
                  className="px-6 py-4 text-white-500 font-helvetica"
                  scope="col"
                >
                  <span className="inline-block">{content}</span>
                  {showArrow ? <span className="inline-block" /> : null}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="w-full">{children}</tbody>
      </table>
    </div>
  )
}

export default memo(TableComponent)
