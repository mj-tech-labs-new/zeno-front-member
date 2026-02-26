import {CommonButton, HeadingComponent} from '@/components'
import {English} from '@/helpers'

const CongratulationModel = (props: {
  point: number
  onPressClose: () => void
}) => {
  const {point, onPressClose} = props
  return (
    <div className="flex text-center py-2 px-2.5 flex-col gap-4 justify-center items-center w-full">
      <HeadingComponent
        className="text-medium-success-color! rounde text-[32px] font-medium font-switzer "
        singleLineContent={English.E496}
        type="h1"
      />
      <div>
        <div>{English.E497}</div>
        <div>
          {point} {English.E480}
        </div>
      </div>
      <CommonButton
        className={`px-2! py-3!  text-primary-color medium-success-btn-type   w-full sm:max-w-56! `}
        singleLineContent={English.E243}
        onClick={() => {
          onPressClose()
        }}
      />
    </div>
  )
}

export default CongratulationModel
