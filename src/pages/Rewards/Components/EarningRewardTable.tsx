import React from 'react'
import { Link } from 'react-router-dom'

import {
  CommonButton,
  CommonTableComponent,
  ImageComponent,
  Loader,
  Timer,
} from '@/components'
import { Constants, English, Images } from '@/helpers'
import { useRewardCalculation } from '@/hooks'

const EarningRewardTable = () => {

  const {
    certificateTableData,
    handCheckSocialMediaReward,
    handUpdateCheckSocialMediaReward,
    loaderRef,
  } = useRewardCalculation()


  return (
    <React.Fragment>
      <Loader ref={loaderRef} />
      <CommonTableComponent
        className="h-full! "
        layoutClassName="h-full! [&>table]:overflow-y-visible!"
        tableHeading={Constants.certificateDashboardHeading}
      >
        {certificateTableData?.map((item, index) => {
          const {
            image,
            registerDate,
            reward,
            status,
            type,
            title,
            taskLink,
            rewardStatus,
            second,
          } = item
          const taken = status === 'taken'
          const granted = status === 'not_granted'
          const pending = status === 'pending'
          const secondsToCalculate =
            60 - (typeof second === 'number' && second ? second : 0)

          return (
            <tr
              key={`content-${index + 1}`}
              className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
            >
              <th
                className="p-6 font-medium text-primary-color whitespace-nowrap "
                scope="row"
              >
                <ImageComponent className="w-6" imageUrl={image} />
              </th>
              <td className="p-6 text-primary-color capitalize">
                {registerDate}
              </td>
              <td className="p-6 text-primary-color capitalize ">
                {/* green Complete  */}
                {(taken || index === 0) && (
                  <span className="flex gap-3">
                    <ImageComponent
                      className="w-5"
                      imageUrl={Images.greenDoneIcon}
                    />
                    <span>{English.E495}</span>
                  </span>
                )}
                {(granted || pending) && !(index === 0) && (
                  <Link
                    target="_blank"
                    to={taskLink}
                    onClick={() => {
                      if (rewardStatus) return
                      handCheckSocialMediaReward(type)
                    }}
                  >
                    <CommonButton
                      className="px-2! py-3! red_btn_utility w-full sm:max-w-56! "
                      singleLineContent={title}
                    />
                  </Link>
                )}
              </td>
              <td className="p-6 text-primary-color capitalize">{reward}</td>
              <td className="p-6 text-primary-color capitalize">
                {status === 'pending' && rewardStatus === false ? (
                  <Timer
                    seconds={
                      Number(secondsToCalculate) < 60 &&
                        Number(secondsToCalculate) > 0
                        ? Number(secondsToCalculate)
                        : 60
                    }
                  />
                ) : (
                  <CommonButton
                    disabled={taken || !(pending && rewardStatus)}
                    className={`px-2! py-3! ${pending
                        ? 'text-primary-color! medium-success-btn-type '
                        : 'text-text-hint-color! primary-btn-type'
                      } w-full sm:max-w-56! `}
                    onClick={() => {
                      handUpdateCheckSocialMediaReward(type)
                    }}
                    singleLineContent={
                      status !== 'taken' ? English.E470 : English.E498
                    }
                  />
                )}
              </td>
            </tr>
          )
        })}
      </CommonTableComponent>
    </React.Fragment>
  )
}

export default EarningRewardTable
