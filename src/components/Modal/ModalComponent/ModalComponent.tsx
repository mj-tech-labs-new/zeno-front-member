import CommonButton from '@/components/CommonButton/CommonButton'
import HeadingComponent from '@/components/HeadingComponent/HeadingComponent'
import {Images} from '@/helpers'
import {ModalComponentProps} from '@/types/ComponentTypes'

const ModalComponent = (props: ModalComponentProps) => {
  const {
    children,
    className = '',
    showCross = true,
    onPressButton,
    singleLineContent = '',
  } = props
  return (
    <div className="fixed inset-0 bg-primary-black/70 backdrop-blur-md  z-[999]">
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-color p-5 rounded-md max-h-screen max-w-[90vw] ${className}`}
      >
        <div className="flex items-center">
          {singleLineContent && (
            <HeadingComponent
              className="!text-2xl font-bold"
              singleLineContent={singleLineContent}
              type="h2"
            />
          )}
          {showCross && (
            <CommonButton
              imageUrl={Images.crossIcon}
              singleLineContent=""
              className="!w-fit !ml-auto !cursor-pointer [&>div>img]:w-5 [&>div>img]:white_filter
            "
              onClick={(e) => {
                e.stopPropagation()
                if (onPressButton) {
                  onPressButton(false)
                }
              }}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalComponent
