import {CommonTableComponent, HeadingComponent} from '@/components'
import {Constants, English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'

const PayoutPage = () => (
  <div className="flex flex-col gap-8">
    <HeadingComponent singleLineContent={English.E23} variant="medium" />

    <ChallengeCardLayout className="max-w-72">
      <span className="text-15 !leading-6 text-text-hint-color">
        {English.E100}
      </span>
      <div className="mt-2">
        <span className="text-lg/6 font-normal text-primary-color">{`${Utility.numberConversion(158.09)} ${English.E60}`}</span>
        <p className="text-13 !leading-6 font-normal text-text-hint-color">
          {English.E101} 1st Oct 2025
        </p>
      </div>
    </ChallengeCardLayout>

    <HeadingComponent
      className="!text-base !leading-6"
      singleLineContent={English.E102}
    />

    <CommonTableComponent
      tableHeading={Constants.Payout.PayoutTableHeadingData}
    >
      {Constants.Payout.PayoutTableBodyData?.map((tableBody) => {
        const {payoutId, date, amount, status, method, transactionId} =
          tableBody
        const capital = Number(amount)
        return (
          <tr
            key={`content-${payoutId}`}
            className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
          >
            <th
              className="p-6 font-medium text-secondary-light-color whitespace-nowrap "
              scope="row"
            >
              {payoutId}
            </th>
            <td className="p-6 text-secondary-light-color capitalize">
              {date}
            </td>
            <td className="p-6 text-secondary-light-color">
              {`${Utility.numberConversion(capital)} ${English.E60}`}
            </td>
            <td className="p-6 text-secondary-light-color">{status}</td>
            <td className="p-6 text-secondary-light-color">{method}</td>
            <td className="p-6 text-secondary-light-color">{transactionId}</td>
          </tr>
        )
      })}
    </CommonTableComponent>
  </div>
)

export default PayoutPage
