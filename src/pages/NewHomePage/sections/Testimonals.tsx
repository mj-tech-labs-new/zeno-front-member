import Marquee from 'react-fast-marquee'

import {Divider, WordSplit} from '@/components'
import TestimonialCard from '@/components/Cards/TestimonialCard'
import {Constants, English} from '@/helpers'

const Testimonals = () => (
  <div className="bg-primary-black relative z-9999" id="testimonials">
    <Divider className="bg-primary-color/15!" />
    <div className="py-12 md:py-28 lg:pt-[120px] lg:pb-[250px] h-full space-y-14">
      <WordSplit className="px-5" singleLineContent={English.E412} />
      <Marquee speed={60}>
        <div className="flex gap-2.5 mr-5">
          {Constants.Testimonals.map((testimonals) => {
            const {amount, details, flag, heading, name} = testimonals
            return (
              <TestimonialCard
                key={name}
                details={details}
                flag={flag}
                headingContent={heading}
                initialContent={amount}
                secondaryContent={name}
              />
            )
          })}
        </div>
      </Marquee>
    </div>
  </div>
)

export default Testimonals
