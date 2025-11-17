import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import {CommonButton} from '@/components'
import {Constants, English} from '@/helpers'
import {StorageProps} from '@/types/CommonTypes'

const NavList = () => {
  const UserData = useSelector((state: StorageProps) => state.userData.user)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col lg:flex-row w-full h-full justify-between">
      <div className="">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
          {Constants.HomePageNavbarContent.map((navItem) => {
            const {content, linkTo} = navItem
            return (
              <Link
                key={content}
                className="py-2 text-light-grey-btn-color/60 hover:text-light-grey-btn-color/90 outline-none focus:outline-none focus-within:outline-none text-xl/5 lg:text-sm/5"
                to={linkTo}
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-5">
        {UserData?.token === null && (
          <CommonButton
            className="!p-0 text-light-grey-btn-color font-medium text-sm leading-5 !w-fit hover:text-light-grey-btn-color/70 duration-300 ease-in-out transition-all"
            singleLineContent={English.E196}
            onClick={() => {
              navigate('/login')
            }}
          />
        )}
        <CommonButton
          className="bg-extra-dark-danger-color text-white !px-3 !py-2 !rounded-full !text-sm !leading-5 !w-fit !ml-auto"
          singleLineContent={English.E138}
          onClick={() => {
            navigate('/dashboard')
          }}
        />
      </div>
    </div>
  )
}

export default NavList
