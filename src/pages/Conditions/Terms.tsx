import {Link} from 'react-router-dom'

import {HeadingComponent} from '@/components'
import TermsLayout from '@/layouts/TermsLayout'

const Terms = () => (
  <TermsLayout>
    <HeadingComponent
      className="text-3xl!"
      singleLineContent=" Terms & Conditions"
      type="h5"
    />

    <h3>1.1 Nature of Services</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Zeno Traders provides access to simulated trading environments only. We
      are:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Not a broker
      <br />
      ● Not an investment advisor
      <br />
      ● Not a fund manager
      <br />
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      No real-money trading is conducted by users
    </p>

    <h3>1.2 Eligibility</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      By using our services, you confirm that:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● You are at least 18 years old
      <br />
      ● You are not a resident of a restricted jurisdiction
      <br />
      ● You have read, understood, and accepted these Terms & Conditions
      <br />
    </p>
    <h3>1.3 User Accounts</h3>

    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Only one account per user is permitted unless explicitly approved
      <br />
      ● Account sharing is strictly prohibited
      <br />
      ● Use of VPNs, IP masking, or location manipulation may result in
      immediate termination
      <br />
    </p>

    <h3>1.4 Trading Rules</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Users must strictly comply with all trading rules defined for each
      challenge, including but not limited to:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Maximum drawdown limits
      <br />
      ● Daily loss limits
      <br />
      ● Profit targets
      <br />
      ● Prohibited trading strategies (arbitrage, latency abuse, system
      exploitation)
      <br />
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Any violation may result in immediate disqualification
    </p>

    <h4>1.5 Certificates & Funded Status</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Any certificates, funded status, or profit eligibility:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Are conditional
      <br />
      ● May be revoked at any time due to rule violations, suspicious activity,
      or compliance concerns
      <br />
    </p>
    <h4>1.6 Payouts (If Applicable)</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Any payouts offered by Zeno Traders are discretionary and based solely on
      performance within a simulated environment, subject to internal review and
      compliance checks.
    </p>

    <h4>1.7 Intellectual Property</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      All website content, branding, logos, and materials are the exclusive
      property of Zeno Traders FZ LLC and may not be used without prior written
      consent.
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Failure to comply does not entitle the user to a refund.
    </p>
    <h4>1.8 Limitation of Liability</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Zeno Traders shall not be liable for:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Trading outcomes or losses
      <br />
      ● Technical interruptions or delays
      <br />
      ● Platform downtime or unavailability
      <br />
      ● Any indirect, incidental, or consequential damages
      <br />
    </p>
    <h4>1.9 Indemnification</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Users agree to indemnify and hold harmless Zeno Traders from any claims,
      losses, or liabilities arising from misuse of the platform or violation of
      these terms.
    </p>
    <h4>1.10 Governing Law & Jurisdiction</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      These Terms shall be governed by and construed in accordance with the laws
      of the United Arab Emirates (UAE). Any disputes shall be subject to the
      exclusive jurisdiction of UAE courts.
    </p>
    <h4>1.11 Modifications</h4>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Zeno Traders reserves the right to modify these Terms & Conditions at any
      time. Continued use of the platform constitutes acceptance of the updated
      terms.
    </p>
    <h3>
      By using{' '}
      <Link
        className="font-bold text-white"
        target="_blank"
        to="www.zenotraders.com"
      >
        www.zenotraders.com
      </Link>
      , you acknowledge that you have read, understood, and agreed to the
      Privacy Policy and Terms & Conditions stated above.
    </h3>
  </TermsLayout>
)

export default Terms
