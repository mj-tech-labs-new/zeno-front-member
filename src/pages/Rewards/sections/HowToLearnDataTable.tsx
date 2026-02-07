import {CommonTableComponent} from '@/components'
import {Constants} from '@/helpers'

const HowToLearnDataTable = () => (
  <div>
    <CommonTableComponent tableHeading={Constants.howToLearnHeading}>
      {Constants.howToEarnTableData.map((item, index) => {
        const {activity, descrption, pointEarned} = item
        return (
          <tr
            key={`content-ad${index + 1}`}
            className="font-normal text-primary-color text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
          >
            <td className="p-6 text-primary-color capitalize">{activity}</td>
            <td className="p-6 text-primary-color capitalize ">{descrption}</td>
            <td className="p-6 text-primary-color capitalize">{pointEarned}</td>
          </tr>
        )
      })}
    </CommonTableComponent>
  </div>
)

export default HowToLearnDataTable
