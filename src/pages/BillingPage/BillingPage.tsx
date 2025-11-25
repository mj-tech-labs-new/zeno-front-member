import {
  CommonTableComponent,
  DescriptionComponent,
  DownloadButton,
  HeadingComponent,
} from '@/components'
import {Constants, English} from '@/helpers'

const BillingPage = () => (
  <div className="flex flex-col gap-8 mt-8">
    <HeadingComponent singleLineContent={English.E109} variant="medium" />

    <DescriptionComponent multilineContent={[English.E110]} />

    <CommonTableComponent
      tableHeading={Constants.Billing.BillingTableHeadingData}
    >
      {Constants.Billing.BillingTableBodyData?.map((tableBody) => {
        const {
          invoiceId,
          date,
          challenge,
          plan,
          amount,
          status,
          transactionId,
          action,
        } = tableBody
        return (
          <tr
            key={`content-${invoiceId}`}
            className="font-normal text-sm/6 *:transition-all *:duration-300 *:ease-in-out"
          >
            <th
              className="p-6 font-medium text-secondary-light-color whitespace-nowrap "
              scope="row"
            >
              {invoiceId}
            </th>
            <td className="p-6 text-secondary-light-color capitalize">
              {date}
            </td>
            <td className="p-6 text-secondary-light-color capitalize">
              {challenge}
            </td>
            <td className="p-6 text-secondary-light-color capitalize">
              {plan}
            </td>
            <td className="p-6 text-secondary-light-color">{amount}</td>
            <td className="p-6 text-secondary-light-color">{status}</td>
            <td className="p-6 text-secondary-light-color">{transactionId}</td>
            <td className="">
              <DownloadButton className="p-6" singleLineContent={action} />
            </td>
          </tr>
        )
      })}
    </CommonTableComponent>
  </div>
)

export default BillingPage
