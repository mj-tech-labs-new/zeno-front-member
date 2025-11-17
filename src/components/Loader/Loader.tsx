import {forwardRef, useImperativeHandle} from 'react'

import {GeneralProps} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

const Loader = forwardRef<AppLoaderRef, Pick<GeneralProps, 'className'>>(
  (props, ref) => {
    const {className = ''} = props

    useImperativeHandle(ref, () => ({
      showLoader(state) {
        const element = document.querySelector('.loader-container')
        if (state) {
          element?.classList.add('visible')
        } else {
          element?.classList?.remove('visible')
        }
      },
    }))

    return (
      <div
        className={`fixed invisible h-screen w-screen bg-primary-bg-color/50 left-0 top-0 backdrop-blur-md loader-container z-[99999] ${className}`}
      >
        <div className="gradient-container h-36 w-36 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      </div>
    )
  }
)

export default Loader
