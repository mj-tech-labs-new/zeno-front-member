import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'

import {
  CommonButton,
  DescriptionComponent,
  Divider,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import {PayoutProps} from '@/types/ChallengeTypes'

const PayoutSuccess = (props: PayoutProps) => {
  const {amount, capital, start_date, status, type} = props
  const navigate = useNavigate()

  const objectToRender = useMemo(() => ({
      [English.E27]: type,
      [English.E38]: capital,
      [English.E51]: amount,
      [English.E52]: status,
      [English.E53]: start_date,
    }), [amount, capital, start_date, status, type])

  return (
    <div className="w-full flex flex-col gap-10 max-w-[482px] 2xl:max-w-lg mx-auto">
      <ImageComponent
        className="w-[72px] aspect-square mx-auto"
        imageUrl={Images.cup}
      />
      <div className="flex flex-col gap-4 lg:w-[calc(100%-118px)] lg:mx-auto">
        <HeadingComponent
          className="text-center"
          singleLineContent={English.E49}
          variant="medium"
        />
        <DescriptionComponent
          className="text-center"
          multilineContent={[English.E50]}
        />
      </div>

      <div className="border border-solid border-primary-border-color p-6 rounded-2xl flex flex-col gap-[26px]">
        <div className="w-full flex flex-col gap-y-5">
          {Object.entries(objectToRender)?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-6">
                <span className="text-text-hint-color text-13 !leading-6 font-medium">
                  {key}
                </span>{' '}
                <Divider className="flex-1" />{' '}
                <span className="text-tertiary-color text-13 font-normal !leading-6">
                  {value}
                </span>
              </div>
            ))}
        </div>

        <CommonButton
          className="dark-danger-btn-type"
          singleLineContent={English.E54}
          onClick={() => {
            navigate('/challenge-dashboard')
          }}
        />
      </div>
    </div>
  )
}

export default PayoutSuccess
