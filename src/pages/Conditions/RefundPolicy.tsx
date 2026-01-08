import {Link} from 'react-router-dom'

import {HeadingComponent} from '@/components'
import TermsLayout from '@/layouts/TermsLayout'

const RefundPolicy = () => (
  <TermsLayout>
    <HeadingComponent
      className="text-3xl!"
      singleLineContent="Refund Policy"
      type="h5"
    />

    <p className="text-text-hint-color font-bureau leading-7 text-15">
      {' '}
      This Refund Policy forms an integral part of the Terms & Conditions of
      Zeno Traders FZ LLC and governs all purchases made on{' '}
      <Link
        className="font-bold text-white"
        target="_blank"
        to="www.zenotraders.com"
      >
        www.zenotraders.com
      </Link>{' '}
      This policy is designed in line with industry-standard proprietary trading
      firm practices.
    </p>

    <h3>1. Nature of Products (Digital Services)</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      All products offered by Zeno Traders are digital services that provide
      access to a simulated trading environment. Upon successful payment, users
      receive immediate access to trading accounts, dashboards, rules, and
      proprietary technology.
      <br />
      Because these services are delivered instantly and resources are allocated
      immediately, all purchases are treated as consumed digital services.
    </p>

    <h3>2. General No-Refund Policy</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      All payments made to Zeno Traders are final and non-refundable.
      <br />
      All payments made to Zeno Traders are final and non-refundable.
      <br />
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Trading challenges
      <br />
      ● Evaluation accounts
      <br />
      ● One-step, two-step, or instant funding programs
      <br />
      ● Platform access fees
      <br />
      ● Add-ons or account upgrades
      <br />
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Once access to the platform or challenge is granted, no refunds,
      reversals, or
    </p>

    <h3>3. Industry Standard Alignment</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      This no-refund structure is consistent with leading proprietary trading
      firms operating globally. Users acknowledge that:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Performance outcomes are based on individual trading decisions
      <br />
      ● Market conditions are unpredictable
      <br />
      ● Failure to pass a challenge does not constitute grounds for a refund
      <br />
    </p>
    <h3>4. Exceptional Refund Consideration (Limited Cases)</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      4. Exceptional Refund Consideration (Limited Cases)
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Duplicate payments for the same product
      <br />
      ● Verified technical errors that prevent account delivery and remain
      unresolved
      <br />
    </p>

    <h4>Conditions :</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Requests must be submitted within 24 hours of purchase
      <br />
      ● No trading activity must have taken place on the account
      <br />
      ● Approval of any exception does not create a precedent for future cases
      <br />
    </p>

    <h4>5. Ineligible Refund Scenarios</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Refunds will not be provided for:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Failure to meet profit targets
      <br />
      ● Breach of trading rules
      <br />
      ● Account suspension or termination due to violations
      <br />
      ● Change of mind after purchase
      <br />
      ● Misunderstanding of rules or program conditions
      <br />
      ● Losses incurred during simulated trading
      <br />
    </p>
    <h4>6. Chargebacks & Payment Disputes</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Any attempt to initiate a chargeback, payment reversal, or dispute through
      a bank, card issuer, or payment processor will result in:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Immediate termination of all user accounts
      <br />
      ● Forfeiture of any active or completed challenges
      <br />
      ● Permanent ban from all Zeno Traders services
      <br />
    </p>
    <h4>7. Payment Responsibility</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Users are solely responsible for:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Ensuring payment details are accurate
      <br />
      ● Reviewing product descriptions and rules before purchase
      <br />
      ● Confirming eligibility based on jurisdiction
      <br />
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Failure to comply does not entitle the user to a refund.
    </p>
    <h3>8. Policy Updates</h3>
  </TermsLayout>
)

export default RefundPolicy
