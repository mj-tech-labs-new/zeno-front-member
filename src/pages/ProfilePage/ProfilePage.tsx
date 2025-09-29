import {Divider, HeadingComponent} from '@/components'
import {English} from '@/helpers'

import FormContainer from '../AuthPages/components/FormContainer'

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <HeadingComponent singleLineContent={English.E112} variant="medium" />

      <Divider className="!bg-info-bg-color" />

      <div className="max-w-xs mx-auto w-full pb-6">
        <FormContainer type="profileType" onPressItem={() => {}} />
      </div>
    </div>
  )
}

export default ProfilePage
