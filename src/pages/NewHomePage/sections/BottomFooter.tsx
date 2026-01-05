import {
  DescriptionComponent,
  ImageComponent,
  OpacityContainer,
} from '@/components'
import {English, Images} from '@/helpers'

const BottomFooter = () => (
  <div className="px-5 xl:px-0  pb-9 ">
    <OpacityContainer
      isHorizontalPositionType
      className=" items-center justify-center w-full text-info-bg-color p-6 pb-0 hidden lg:flex max-w-[980px] mx-auto"
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
        <DescriptionComponent
          className="font-switzer! text-xs"
          singleLineContent={English.E416}
        />
      </div>
    </OpacityContainer>
  </div>
)

export default BottomFooter
