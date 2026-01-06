import {Link} from 'react-router-dom'

import {HeadingComponent, ImageComponent, LogoComponent} from '@/components'
import {Constants, English, Images} from '@/helpers'

const Footer = () => (
  <footer className="bg-black text-primary-color mx-auto xl:max-w-6xl">
    <div className="px-4 lg:px-[52px] pt-[67px] pb-16 lg:pb-24 flex flex-col lg:flex-row gap-16">
      <div className="flex lg:flex-col items-start gap-6 lg:gap-12 lg:w-1/2">
        <LogoComponent />
        <Link
          className="flex flex-col gap-4"
          target="_blank"
          to="https://medium.com/@zenotraders"
        >
          <h5 className="font-[430] max-w-[230px] text-[24px] leading-[26px] tracking-[-0.7px]">
            <span className="text-landing-page-dark-gray-color">
              {English.E221}
            </span>{' '}
            {English.E222}
          </h5>
          <ImageComponent
            className="w-[64px] h-[32px]"
            imageUrl={Images.footerArrow}
          />
        </Link>
      </div>

      <div className="font-[430] gap-6 grid grid-cols-2 md:grid-cols-3 flex-1 ">
        {Constants.footerLinks.map((item) => (
          <ul key={item.title} className="">
            <HeadingComponent
              className="!text-lg !leading-5 lg:!text-base !mb-4"
              singleLineContent={item.title}
              type="h6"
            />
            <div className="flex flex-col gap-3">
              {item.links.map((link) => (
                <Link
                  key={link.content}
                  className="text-base inline-block lg:text-sm !leading-5 text-landing-page-dark-gray-color"
                  target={link.link === '#' ? '_top' : '_blank'}
                  to={link.link}
                >
                  {link.content}
                </Link>
              ))}
            </div>
          </ul>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer
