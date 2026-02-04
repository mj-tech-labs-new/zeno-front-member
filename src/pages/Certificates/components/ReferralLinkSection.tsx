
import { toast } from 'react-toastify'

import { CommonButton } from '@/components'
import { English, Images } from '@/helpers'

const ReferralLinkSection = () => (
    <div className="space-y-2">
        <p className="text_lg_utility text-primary-color">{English.E453}</p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <div className="py-2 px-4 border border-solid rounded-lg bg-tertiary-bg-color border-secondary-border-color  flex-1">
                <span className=" font-switzer! text-text-hint-color">https://zenotrade.com/referal?14/13923908/rushabh/4u1vjjasd</span>
            </div>
            <CommonButton
                className="red_btn_utility gap-2! text-xs/6 w-fit! py-2! px-4! flex-row-reverse items-center [&>div]:size-4!"
                imageUrl={Images.copy}
                singleLineContent={English.E454}
                onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard
                        ?.writeText(
                            `https://zenotrade.com/referal?14/13923908/rushabh/4u1vjjasd`
                        )
                        .finally(() => {
                            toast.success(English.E232)

                        })
                }}
            />

        </div>
        <span className="text-text-hint-color text-xs" >{English.E455}</span>
    </div>
)

export default ReferralLinkSection