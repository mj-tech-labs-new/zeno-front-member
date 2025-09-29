import {Link, useLocation} from 'react-router-dom'

import {Constants, English, Images} from '@/helpers'
import {GeneralProps} from '@/types/CommonTypes'

import ImageComponent from '../ImageComponent/ImageComponent'
import LogoComponent from '../LogoComponent/LogoComponent'

const Sidebar = (props: Required<Pick<GeneralProps, 'onPressItem'>>) => {
  const {onPressItem} = props
  const location = useLocation()
  return (
    <div className="h-full w-full px-3.5 pt-8">
      <LogoComponent
        singleLineContent={English.E20}
        layoutClassName="sticky top-0"
      />
      <div
        className={`${location.pathname.startsWith('/profile') ? 'h-[calc(100vh-64px)]' : 'h-[calc(100vh-86px)]'} overflow-y-auto pt-8 flex flex-col justify-between`}
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
                      : currentPath?.toLowerCase().startsWith('/profile')
                        ? 'my profile'
                        : ''
            return (
              <Link
                onClick={onPressItem}
                to={sidebaritems?.linkTo}
                key={sidebaritems?.title}
                className={`flex gap-3.5 items-center px-4 py-2 hover:bg-button-primary-color rounded-xl transition-all duration-500 ease-in-out ${sidebaritems?.title?.toLowerCase() === isActiveItem ? 'bg-button-primary-color' : ''}`}
              >
                <img src={sidebaritems?.icon} />
                <li className="text-tertiary-color text-base/6 font-normal list-none">
                  {sidebaritems?.title}
                </li>
              </Link>
            )
          })}
        </ul>

        <div className="flex flex-col gap-6">
          <Link
            onClick={onPressItem}
            to={
              Constants?.SidebarData?.[Constants?.SidebarData?.length - 1]
                ?.linkTo
            }
            className="flex gap-3.5 items-center px-4 py-2 hover:bg-button-primary-color rounded-xl transition-all duration-500 ease-in-out"
          >
            <img
              src={
                Constants?.SidebarData?.[Constants?.SidebarData?.length - 1]
                  ?.icon
              }
            />
            <li className="text-tertiary-color text-base/6 font-normal list-none">
              {
                Constants?.SidebarData?.[Constants?.SidebarData?.length - 1]
                  ?.title
              }
            </li>
          </Link>
          {!location.pathname.startsWith('/profile') && (
            <div className="flex items-center gap-3 bg-user-info-card-bg-color p-2 rounded-2xl mb-4">
              <ImageComponent
                className="h-8 aspect-square rounded-full *:text-sm/5 *:font-normal"
                imageUrl={Images.placeholderImage}
              />
              <div className="flex flex-col">
                <span className="text-user-name-light-color ">Olivia Rhye</span>
                <span className="text-user-name-dark-color">
                  olivia@untitledui.com
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
