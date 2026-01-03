import React from 'react'
import Marquee from 'react-fast-marquee'

import {Divider, WordSplit} from '@/components'
import TestimonialCard from '@/components/Cards/TestimonialCard'
import {Constants, English} from '@/helpers'

const Testimonals = () => (
  <React.Fragment>
    <Divider className="bg-primary-color/15!" />
    <div className="pt-[120px] pb-[250px] h-full space-y-14">
      <WordSplit
        className="text-[56]/[64px]! px-5"
        singleLineContent={English.E412}
      />
      <Marquee speed={100}>
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
  </React.Fragment>
)

export default Testimonals
