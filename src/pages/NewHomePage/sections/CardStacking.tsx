import {WordSplit} from '@/components'

import Stacking from '../components/Stacking'

const CardStacking = () => (
  <div className="pt-[144px] pb-[120px] ">
    <div className=" px-5 xl:px-0 max-w-6xl mx-auto space-y-[88px]">
      <WordSplit multilineContent={['Built for traders who', 'want more']} />

      <Stacking />
    </div>
  </div>
)

export default CardStacking
