import {memo, useCallback} from 'react'

import {GeneralProps} from '@/types/CommonTypes'

import File from './sample.pdf'

const DownloadButton = (
  props: Required<Pick<GeneralProps, 'singleLineContent'>> &
    Pick<GeneralProps, 'className'>
) => {
  const {singleLineContent, className = ''} = props
  const handleDownload = useCallback(() => {
    const filePath = File

    const link = document.createElement('a')
    link.href = filePath
    link.download = 'sample.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <button
      className={`text-secondary-light-color ${className}`}
      onClick={handleDownload}
      type="button"
    >
      {singleLineContent}
    </button>
  )
}

export default memo(DownloadButton)
