import CommonButton from '@/components/CommonButton/CommonButton'
import {Images} from '@/helpers'
import {ModalComponentProps} from '@/types/ComponentTypes'

const ModalComponent = (props: ModalComponentProps) => {
  const {children, className = '', showCross = true, onPressButton} = props
  return (
    <div
      className="fixed inset-0 bg-primary-black/70 z-[999]"
      onClick={(e) => {
        e.stopPropagation()
        if (onPressButton) {
          onPressButton(false)
        }
      }}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-color p-5 rounded-md max-h-screen max-w-[90vw] ${className}`}
      >
        {showCross && (
          <CommonButton
            className="!w-fit !ml-auto !cursor-pointer"
            imageUrl={Images.crossIcon}
            singleLineContent=""
            onClick={(e) => {
              e.stopPropagation()
              if (onPressButton) {
                onPressButton(false)
              }
            }}
          />
        )}
        {children}
      </div>
    </div>
  )
}

export default ModalComponent
