import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {Constants, English, Images} from '@/helpers'
import {CommonFunction} from '@/services'
import {GeneralProps, StorageProps} from '@/types/CommonTypes'

import AffiliateButton from '../CommonButton/AffiliateButton'
import ImageComponent from '../ImageComponent/ImageComponent'
import LogoComponent from '../LogoComponent/LogoComponent'

const Sidebar = (
  props: Required<Pick<GeneralProps, 'onPressItem'>> & {isSmallScreen: boolean}
) => {
  const userData = useSelector((state: StorageProps) => state.userData)
  const {socketRef} = useSocketProvider()
  const {onPressItem, isSmallScreen} = props
  const location = useLocation()
  const onPressLink = useCallback(
    (isLogoutType: boolean) => {
      if (isLogoutType)
        CommonFunction.addSliceData('logout', {}).then(() => {
          socketRef.current?.removeAllListeners()
          socketRef.current?.disconnect()
          socketRef.current = null
        })
      onPressItem()
    },
    [onPressItem, socketRef]
  )
  return (
    <div className="h-full w-full px-3.5 pt-8  ">
      <div className="flex justify-between w-full relative">
        <LogoComponent layoutClassName="sticky top-0  !flex-row-reverse w-fit mr-auto" />
        {isSmallScreen && (
          <ImageComponent
            className="[&>img]:white_filter absolute right-4 top-1/2 -translate-y-1/2 size-3.5"
            imageUrl={Images.crossIcon}
            onPressItem={onPressItem}
          />
        )}
      </div>
      <div
        className={`${location.pathname.startsWith('/profile') ? 'h-[calc(100vh-84px)]' : 'h-[calc(100vh-106px)]'} overflow-y-auto pt-8 flex flex-col justify-between`}
      >
        <ul className="space-y-2">
          {Constants.SidebarData?.slice(0, -1)?.map((sidebaritems) => {
            const currentPath = location.pathname
            const isActiveItem =
              currentPath?.toLowerCase().startsWith('/dashboard') ||
              currentPath?.toLowerCase().startsWith('/challenge')
                ? 'challenges'
                : currentPath?.toLowerCase().startsWith('/certificates')
                  ? 'certificates'
                  : currentPath?.toLowerCase().startsWith('/payout')
                    ? 'payout'
                    : currentPath?.toLowerCase().startsWith('/billing')
                      ? 'billing'
                      : currentPath?.toLowerCase().startsWith('/rewards')
                        ? 'Rewards'
                        : currentPath?.toLowerCase().startsWith('/profile')
                          ? 'my profile'
                          : ''
            return (
              <Link
                key={sidebaritems?.title}
                className={`flex gap-3.5 items-center px-4 py-2  rounded-xl transition-all duration-500 ease-in-out ${sidebaritems?.title === English.E423 ? 'bg-red-dark-color text-primary-color' : 'hover:bg-button-primary-color'} ${sidebaritems?.title?.toLowerCase() === isActiveItem.toLowerCase() ? 'bg-button-primary-color' : ''}`}
                to={sidebaritems?.linkTo}
                onClick={() => {
                  onPressLink(sidebaritems?.title?.toLowerCase() === 'logout')
                }}
              >
                <img alt="icon" src={sidebaritems.icon} />
                <li className="text-tertiary-color text-base/6 font-normal list-none">
                  {sidebaritems?.title}
                </li>
              </Link>
            )
          })}
        </ul>

        <div className="flex flex-col gap-6">
          <div>
            {userData?.user?.userData?.isMarketer === true && (
              <AffiliateButton />
            )}
            <Link
              className="flex gap-3.5 items-center px-4 py-2 hover:bg-button-primary-color rounded-xl transition-all duration-500 ease-in-out"
              onClick={() => {
                onPressLink(true)
              }}
              to={
                Constants?.SidebarData?.[Constants.SidebarData.length - 1]
                  ?.linkTo
              }
            >
              <ImageComponent
                imageUrl={
                  Constants?.SidebarData?.[Constants.SidebarData.length - 1]
                    ?.icon
                }
              />
              <li className="text-tertiary-color text-base/6 font-normal list-none">
                {
                  Constants?.SidebarData?.[Constants.SidebarData.length - 1]
                    ?.title
                }
              </li>
            </Link>
          </div>
          {!location.pathname.startsWith('/profile') && (
            <div className="flex  items-center gap-3 bg-user-info-card-bg-color p-2 rounded-2xl mb-4">
              <ImageComponent
                className="h-8 aspect-square rounded-full *:text-sm/5 *:font-normal shrink-0 [&>img]:grey__filter"
                imageType="user"
                imageUrl={Images.placeholderUser}
              />
              <div className="flex flex-col *:truncate items-center">
                <p className="text-user-name-light-color w-[150px]">
                  {userData?.user?.userData?.name}
                </p>
                <p className=" text-user-name-dark-color w-[150px]">
                  {userData?.user?.userData?.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
