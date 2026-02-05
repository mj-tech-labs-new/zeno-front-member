import dayjs from 'dayjs'
import React, { useState } from 'react'

import { CommonButton, CommonTableComponent, Divider, HeadingComponent, ImageComponent } from '@/components'
import TableComponent from '@/components/TableComponent/TableComponent'
import { Constants, English, Images } from '@/helpers'
import { UserObjectType } from '@/types/CommonTypes'


const RewardHistory = () => {
  // const [isLoading, setIsLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState<UserObjectType[]>([])

  return (
    <div className="flex flex-col gap-4">

      <HeadingComponent className="text-28!" singleLineContent={English.E482} />

      <Divider className="!bg-info-bg-color" />
      <CommonTableComponent tableHeading={Constants.rewardHeading} >
        {Constants.certificateTableData?.map((item, index) => {
          const { image, registerDate, reward } = item
          return (
            <tr
              key={`content-${index + 1}`}
              className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
            >
              <th
                className="p-6 font-medium text-secondary-light-color whitespace-nowrap "

                scope="row"
              >
                <ImageComponent className="w-6" imageUrl={image} />
              </th>
              <td className="p-6 text-secondary-light-color capitalize" >
                {registerDate}
              </td>
              <td className="p-6 text-secondary-light-color capitalize " >
                {index === 0 && <span className="flex gap-3">
                  <ImageComponent className="w-5" imageUrl={Images.greenDoneIcon} />
                  <span>Completed</span>
                </span>}
                {index !== 0 &&
                  <CommonButton
                    className="px-2! py-3! red_btn_utility w-full sm:max-w-56! "
                    singleLineContent={index === 0 || index === 1 || index === 2 ? English.E467
                      : index === 3 || index === 4 ? English.E468 : English.E469
                    } />
                }
              </td>
              <td className="p-6 text-secondary-light-color capitalize" >
                {reward}
              </td>
              <td className="p-6 text-secondary-light-color capitalize">
                {index === 0 && <CommonButton
                  className="px-2! py-3! text-primary-color! medium-success-btn-type w-full sm:max-w-56! "
                  singleLineContent={English.E470
                  } />}
                {index !== 0 && <CommonButton
                  className="px-2! py-3! text-text-hint-color! primary-btn-type w-full sm:max-w-56! "
                  singleLineContent={English.E470
                  } />}
              </td>

            </tr>
          )
        })}
      </CommonTableComponent>

    </div>
  )
}

export default RewardHistory