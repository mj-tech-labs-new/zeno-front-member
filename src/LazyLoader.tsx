import {Suspense} from 'react'

import {Loader} from './components'
import {GeneralProps} from './types/CommonTypes'

const LazyLoader = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  return (
    <Suspense
      fallback={
        <Loader
          ref={(ref) => {
            ref?.showLoader(true)
          }}
        />
      }
    >
      {children}
    </Suspense>
  )
}

export default LazyLoader
