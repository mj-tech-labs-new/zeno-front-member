import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import {GeneralProps} from '@/types/CommonTypes'
import {ModalComponentProps} from '@/types/ComponentTypes'

import ModalComponent from '../ModalComponent/ModalComponent'

const ModalContext = createContext<{
  childContent: ReactNode | null
  setChildContent: Dispatch<SetStateAction<ReactNode | null>>
  modalProps: Omit<ModalComponentProps, 'children'> | null
  setModalProps: Dispatch<
    SetStateAction<Omit<ModalComponentProps, 'children'> | null>
  >
}>({
  childContent: false,
  setChildContent: () => {},
  modalProps: null,
  setModalProps: () => {},
})

const ModalContextProvider = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  const [childContent, setChildContent] = useState<ReactNode | null>()
  const [modalProps, setModalProps] = useState<Omit<
    ModalComponentProps,
    'children'
  > | null>(null)

  const defaultValue = useMemo(
    () => ({
      childContent,
      setChildContent,
      modalProps,
      setModalProps,
    }),
    [childContent, modalProps]
  )

  return (
    <ModalContext.Provider value={defaultValue}>
      {children}
      {childContent && modalProps && (
        <ModalComponent {...modalProps}>{childContent}</ModalComponent>
      )}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
export const useModalContext = () => useContext(ModalContext)
