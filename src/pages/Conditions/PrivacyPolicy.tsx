import {Link} from 'react-router-dom'

import {DescriptionComponent, HeadingComponent} from '@/components'
import TermsLayout from '@/layouts/TermsLayout'

const PrivacyPolicy = () => (
  <TermsLayout>
    <HeadingComponent
      className="text-3xl!"
      singleLineContent="Privacy Policy"
      type="h5"
    />
    <div className="company">Zeno Traders FZ LLC</div>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      {' '}
      This document governs the use of{' '}
      <Link
        className="font-bold text-white"
        target="_blank"
        to="www.zenotraders.com"
      >
        www.zenotraders.com
      </Link>
      , operated by Zeno Traders FZ LLC, a company registered in the United Arab
      Emirates (UAE).
    </p>
    <DescriptionComponent
      singleLineContent=" These policies are structured in accordance with industry-standard proprietary
            trading firm practices (similar to FTMO-style, HyroTrader, BitFunded models)
            and apply to all users accessing or using our services."
    />
    <HeadingComponent className="" singleLineContent="1. Privacy Policy" />
    <h3>1.1 Introduction</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Zeno Traders FZ LLC (“Zeno Traders”, “we”, “us”, “our”) respects your
      privacy and is committed to protecting the personal information you
      provide while using our website and services.
    </p>
    <h3>1.2 Information We Collect</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      We may collect the following categories of information:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      {' '}
      <strong className="text-white">● Personal Information :</strong> Name,
      email address, contact details
      <br />
      <strong className="text-white">● Account Information :</strong> Login
      credentials, challenge participation data
      <br />
      <strong className="text-white">● Payment Information :</strong>{' '}
      Transaction references only (we do not store full card or sensitive
      payment data)
      <br />
      <strong className="text-white">● Technical Information :</strong> IP
      address, device type, browser information, and usage logs
    </p>
    <h3>1.3 Use of Information</h3>
    Collected information is used to:
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Provide access to simulated trading challenges <br />
      ● Process payments and account setup <br />
      ● Communicate important service-related updates <br />
      ● Improve platform performance and security <br />● Comply with applicable
      legal and regulatory obligations{' '}
    </p>
    <h3>1.4 Simulated Trading Disclaimer</h3>
    <div className="note">
      <p className="text-text-hint-color font-bureau leading-7 text-15">
        All trading activities conducted on Zeno Traders are performed
        exclusively in a simulated or demo trading environment.
      </p>
      <p className="text-text-hint-color font-bureau leading-7 text-15">
        No real funds are deposited, traded, or managed by users on our
        platform.
      </p>
    </div>
    <h3>1.5 Data Sharing</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      We do not sell or rent personal data. Information may be shared only with:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● Payment service providers
      <br />
      ● Technology and infrastructure partners
      <br />
      ● Legal or regulatory authorities when required by law
      <br />
    </p>
    <h3>1.6 Data Security</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      We implement industry-standard security measures to protect user
      information. However, no method of internet transmission or electronic
      storage is 100% secure, and absolute security cannot be guaranteed.
    </p>
    <h3>1.7 Data Retention</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      User data is retained only for as long as necessary to fulfill the
      purposes outlined in this policy or to comply with applicable legal
      requirements.
    </p>
    <h3>1.8 User Rights</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Users may request access, correction, or deletion of their personal data
      by contacting our support team.
    </p>
    <h3>1.9 Restricted Jurisdictions</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      Our services are not available to individuals or entities located in
      restricted or sanctioned jurisdictions, including but not limited to:
    </p>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      ● United States of America (USA)
      <br />
      ● Iran
      <br />
      ● North Korea
      <br />
      ● Any jurisdiction subject to international sanctions
      <br />
    </p>
    <h3>1.10 Policy Updates</h3>
    <p className="text-text-hint-color font-bureau leading-7 text-15">
      We reserve the right to update this Privacy Policy at any time. Continued
      use of the website constitutes acceptance of the revised policy.
    </p>
  </TermsLayout>
)

export default PrivacyPolicy
