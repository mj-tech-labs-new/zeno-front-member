import {Link} from 'react-router-dom'

import {ImageComponent, OpacityContainer, WordSplit} from '@/components'
import {Constants, English} from '@/helpers'

const JoinUs = () => (
  <div className="xl:max-w-6xl w-full min-h-[630px] h-full mx-auto relative hero2_section">
    <div className="lg:max-w-[730px] lg:mx-auto w-[98%] flex flex-col gap-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center">
      <WordSplit
        className="text-4xl  lg:text-7xl xl:text-[88px]/[92px]"
        singleLineContent={English.E413}
      />
      <OpacityContainer>
        <p className="text-primary-color/50 text-lg/5 font-geist">
          {English.E414}
        </p>
      </OpacityContainer>

      <div className="gap-4  flex flex-col md:flex-row md:items-center w-fit mx-auto mt-12">
        {Constants.LinkToFollow.map((items) => {
          const {boldText, content, icon, link} = items
          return (
            <OpacityContainer key={content}>
              <Link
                className="bg-primary-color py-2 px-4 rounded-full cursor-pointer font-geist! font-medium text-base/6 flex gap-2 w-full"
                to={link}
              >
                <ImageComponent className="size-6" imageUrl={icon} />
                <p className="whitespace-nowrap">
                  {content}
                  <span className="font-extrabold! ml-0.5 ">{boldText}</span>
                </p>
              </Link>
            </OpacityContainer>
          )
        })}
      </div>
    </div>
  </div>
)

export default JoinUs
