import {CSSProperties, forwardRef, useImperativeHandle} from 'react'

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
          element?.classList.remove('visible')
        }
      },
    }))

    return (
      <div className={`loader-container backdrop-blur-md ${className}`}>
        <div className="loader-body" id="loader-body">
          <div className="ml-loader">
            {Array.from({length: 12}).map((_, index) => {
              const style = {'--i': index + 1} as CSSProperties
              return <div style={style} key={`loader_${index.toString()}`} />
            })}
          </div>
        </div>
      </div>
    )
  }
)

export default Loader
