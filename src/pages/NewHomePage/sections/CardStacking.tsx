import {WordSplit} from '@/components'

import Stacking from '../components/Stacking'

const CardStacking = () => (
  <div className="lg:pt-[144px] lg:pb-[120px] py-12 md:py-28">
    <div className=" px-5 xl:px-0 max-w-6xl mx-auto flex flex-col">
      <WordSplit multilineContent={['Built for traders who', 'want more']} />
      <Stacking />
    </div>
  </div>
)

export default CardStacking
