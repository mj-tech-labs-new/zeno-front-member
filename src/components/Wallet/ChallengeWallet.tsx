import { memo, useEffect, useState } from "react"

import { English, Images } from "@/helpers"
import ChallengeCardLayout from "@/layouts/ChallengeDashboardCardLayout"
import PayoutApi from "@/pages/PayoutPage/api/PayoutApi"

import ImageComponent from "../ImageComponent/ImageComponent"
import BasicSkeleton from "../SkeletonComponents/BasicSkeleton"

const ChallengeWallet = () => {

    const [wallet, setWallet] = useState('0xljlkjklfewhoilksdlkfjlkyhsildlfkdh')
    const [isLoadingWallet, setIsLoadingWallet] = useState(true)
    useEffect(() => {
        setIsLoadingWallet(true)
        PayoutApi.getPayoutWalletAddress().then((res) => {
            setWallet(res)
        }).finally(() => {
            setIsLoadingWallet(false)
        })
    }, [])


    return isLoadingWallet ? <BasicSkeleton className="h-33! w-full!" /> : (
        <ChallengeCardLayout className="max-w-72">
            <span className="text-15 !leading-6 text-text-hint-color font-switzer!">
                {English.E440}
            </span>
            <div className="mt-2">
                <p className="text-lg/6 font-normal text-primary-color font-switzer!">{`${wallet.toString().slice(1, 10)}...${wallet.toString().slice(-4)}`}</p>
                <span className="text-13 leading-6! text-text-hint-color font-light font-switzer">{English.E379}</span>
            </div>

            <div className="flex gap-2 items-center">
                <ImageComponent className="!size-4" imageUrl={Images.changeWallet} />
                <p className="text_base_utility text-accents-yellow">{English.E441}</p>
            </div>
        </ChallengeCardLayout>
    )
}

export default memo(ChallengeWallet)