import { memo } from 'react'

import { CommonButton, Info } from '@/components'
import { English } from '@/helpers'
import { DashboardCardProps } from '@/types/Certificate'

const DailyBonusCard = (props: DashboardCardProps) => {
    const { content, title, infoContent } = props
    return (
        <div className="p-px bg-linear-to-t from-gradient-gr1 to-light-success-color rounded-2xl overflow-hidden">
            <div className="rounded-2xl  p-6 bg-linear-to-t from-black-dark-600 to-black-dark-700 h-full">
                <div className="flex flex-col space-y-1 justify-between h-full ">
                    <div className="flex justify-between items-center  ">
                        <span className="text_base_utility text-sm text-inactive-color">{title}</span>
                        {infoContent !== '' && <Info singleLineContent={infoContent} />}
                    </div>
                    <span className="text_base_utility text-primary-color">{content}</span>
                    {/* <CommonButton
                    className="px-1.5! py-1.5! text-primary-color! medium-success-btn-type  "
                    singleLineContent={English.E470
                    } /> */}
                    <CommonButton
                        className="px-1.5! py-1.5! mt-2! text-text-hint-color! text-xs primary-btn-type  "
                        singleLineContent={English.E470
                        } />
                </div>
                {/* {index !== 0 && <CommonButton
                                    className="px-2! py-3! text-text-hint-color! primary-btn-type w-full sm:max-w-56! "
                                    singleLineContent={English.E470
                                    } />} */}
            </div>
        </div>
    )
}

export default memo(DailyBonusCard)
