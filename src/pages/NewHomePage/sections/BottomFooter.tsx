import {
  DescriptionComponent,
  ImageComponent,
  OpacityContainer,
} from '@/components'
import {English, Images} from '@/helpers'

const BottomFooter = () => (
  <div className="px-5 xl:px-0 max-w-[980px] mx-auto pb-9 hidden lg:block">
    <OpacityContainer
      isHorizontalPositionType
      className="flex items-center justify-center w-full text-info-bg-color p-6"
      isVerticalPositionType={false}
    >
      <p className="text-9xl 2xl:text-[199px] leading-[100%] font-switzer! font-semibold">
        GET
      </p>
      <ImageComponent
        className=" h-[200px] 2xl:h-[263px] shrink-0 rotate-180 [&>img]:info__bg__filter"
        imageUrl={Images.arrowLeft}
      />
      <p className="text-9xl 2xl:text-[199px] leading-[100%] font-switzer! font-semibold">
        FUNDED
      </p>
    </OpacityContainer>

    <OpacityContainer>
      <div className="bg-tertiary-bg-color border border-primary-border-color p-6 rounded-[16px]">
        <span className="text-primary-color font-semibold font-switzer! text-lg/6">
          {English.E415}
        </span>
        <DescriptionComponent singleLineContent={English.E416} />
      </div>
    </OpacityContainer>
  </div>
)

export default BottomFooter
