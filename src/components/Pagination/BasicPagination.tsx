import {memo, useEffect, useState} from 'react'

import {BasicPaginatinProps} from '@/types/ComponentTypes'

import CommonButton from '../CommonButton/CommonButton'

const BasicPagination = ({total, onSelectPage}: BasicPaginatinProps) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(Math.min(10, total))
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setEnd(Math.min(10, total))
  }, [total])

  return end > 1 ? (
    <div className="mb-12 lg:mb-0">
      <div className="flex gap-5 items-center justify-center flex-wrap">
        <div className="flex flex-wrap gap-2">
          {Array.from({length: end - start}).map((_, paginationIndex) => {
            const indexToRender = start + paginationIndex + 1
            return (
              <span
                key={`pagination__${paginationIndex.toString()}`}
                className={`border border-solid px-3 py-1 flex justify-center items-center rounded-full ${indexToRender === currentPage ? 'bg-light-danger-color border-transparent text-primary-color' : 'border-light-danger-color text-light-danger-color hover:bg-light-danger-color/80 hover:text-primary-color cursor-pointer'}`}
                onClick={() => {
                  if (indexToRender !== currentPage) {
                    setCurrentPage(indexToRender)
                    onSelectPage(indexToRender)
                  }
                }}
              >
                {indexToRender}
              </span>
            )
          })}
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-5 mt-5">
        {start > 0 && (
          <CommonButton
            className="!p-2 !bg-primary-focus-bg !text-primary-color rounded-full !px-4"
            singleLineContent="<<<"
            type="button"
            onClick={() => {
              setStart((data) => {
                const newData = Math.max(data - 10, 0)
                setCurrentPage(newData + 1)
                onSelectPage(newData + 1)
                return newData
              })
              setEnd((data) => Math.min(Math.max(data - 10, start), total))
            }}
          />
        )}
        {end < total && (
          <CommonButton
            className="!p-2 !bg-primary-focus-bg !text-primary-color rounded-full !px-4"
            singleLineContent=">>>"
            type="button"
            onClick={() => {
              setEnd((data) => Math.min(data + 10, total))
              setStart((data) => {
                onSelectPage(data + 10 + 1)
                setCurrentPage(data + 10 + 1)
                return data + 10
              })
            }}
          />
        )}
      </div>
    </div>
  ) : null
}

export default memo(BasicPagination)
