import {HeadingComponent, ImageComponent, LogoComponent} from '@/components'
import {Constants, English, Images} from '@/helpers'

const Footer = () => (
  <footer className="bg-black text-primary-color xl:max-w-6xl">
    <div className="px-4 lg:px-[52px] pt-[67px] pb-16 lg:pb-24 flex flex-col lg:flex-row gap-16">
      <div className="flex lg:flex-col items-start gap-6 lg:gap-12 lg:w-1/2">
        <LogoComponent />
        <div className="flex flex-col gap-4">
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
        </div>
      </div>

      <div className="font-[430] gap-6 grid grid-cols-1 md:grid-cols-3 flex-1 ">
        {Constants.footerLinks.map((item) => (
          <ul key={item.title} className="">
            <HeadingComponent
              className="!text-lg !leading-5 lg:!text-base !mb-4"
              singleLineContent={item.title}
              type="h6"
            />
            {item.links.map((link) => (
              <li
                key={link}
                className="text-base lg:text-sm !leading-5 text-landing-page-dark-gray-color last:mb-0 mb-2"
              >
                {link}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between px-4 lg:px-[52px] py-5 gap-1 font-[430]">
      {Constants.socialLinks.map((item) => (
        <ul key={item.title} className="flex gap-4">
          {item.links.map((link) => (
            <li
              key={link}
              className="text-[13.5px] text-landing-page-dark-gray-color"
            >
              {link}
            </li>
          ))}
        </ul>
      ))}
    </div>
  </footer>
)

export default Footer
