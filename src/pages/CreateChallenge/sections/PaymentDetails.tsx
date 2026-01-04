import {ImageComponent} from '@/components'
import {English, Images} from '@/helpers'
import {CreateChallengeProps} from '@/types/ChallengeTypes'

const PaymentDetails = (
  props: Pick<
    CreateChallengeProps,
    'wallet_address' | 'status_message' | 'qrDataURL'
  >
) => {
  const {status_message, wallet_address, qrDataURL} = props
  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="flex flex-col gap-3 text-15">
          <div className=" flex justify-between">
            <span className=" text-text-info-color capitalize font-medium">
              {English.E357}
            </span>
            <span className="text-text-hint-color text-13 !leading-6 flex gap-0.5 items-center">
              <span className="truncate w-30 text-text-info-dark-color ">
                {wallet_address}
              </span>
              <ImageComponent
                className="ml-1 !w-4 !h-4 !cursor-pointer !red_filter"
                imageRelatedText={wallet_address}
                imageUrl={Images.copy}
              />
            </span>
          </div>
          <div>{status_message}</div>
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <div className="w-48 sm:w-56  lg:w-60">
          <ImageComponent imageUrl={qrDataURL} />
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
