import dayjs from 'dayjs'
import {useMemo} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {
  CommonButton,
  Divider,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import Layout2 from '@/layouts/Layout2'

const PayoutSuccessPage = () => {
  const location = useLocation()
  const {state} = location

  const navigate = useNavigate()

  const objectToRender = useMemo(
    () => ({
      [English.E27]: state.challenge_type,
      [English.E38]: state.initial_capital,
      [English.E51]: state.capital,
      [English.E52]: state.status,
      [English.E53]: dayjs(state.created_at).format('D MMMM YYYY').toString(),
    }),
    [
      state.capital,
      state.challenge_type,
      state.created_at,
      state.initial_capital,
      state.status,
    ]
  )

  return (
    <Layout2>
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
          <p className="text-text-hint-color text-center text-15">
            {`You’ve successfully purchased the ${objectToRender[English.E27]} Challenge ($${objectToRender[English.E38]} account) for $${objectToRender[English.E51]}.`}
          </p>
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
                  {!(key === English.E38 || key === English.E51)
                    ? value
                    : `$${value}`}
                </span>
              </div>
            ))}
          </div>

          <CommonButton
            className="dark-danger-btn-type"
            singleLineContent={English.E54}
            onClick={() => {
              navigate('/dashboard')
            }}
          />
        </div>
      </div>
    </Layout2>
  )
}

export default PayoutSuccessPage
