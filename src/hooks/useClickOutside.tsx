import {useEffect} from 'react'

interface ClickOutsideProps {
  refs: React.RefObject<HTMLElement | null>[]
  onClickOutside: () => void
}

const useClickOutside = ({refs, onClickOutside}: ClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(e.target as Node)
      )

      if (isOutside) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, onClickOutside])
}

export default useClickOutside
