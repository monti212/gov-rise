import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: '1. Introduction',
    content: `GovRise ("we", "our", "us") is committed to protecting the privacy and security of all users of this platform, with particular regard to the sensitive nature of refugee and family reunification data. This Privacy Policy explains how we collect, use, store, and protect your personal information in accordance with applicable data protection laws including the Australian Privacy Act 1988, GDPR (where applicable), and UNHCR data protection principles.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect the following categories of personal information:

**Identity Data:** Full name, date of birth, gender, nationality, ethnicity (optional), and identifying documents.

**Contact Data:** Email address, phone number, and current location/address.

**Case Data:** Refugee status, displacement history, family composition, and details of separated family members.

**Document Data:** Scanned copies of passports, identification cards, birth certificates, and other supporting documents you upload.

**Account Data:** Username, encrypted password, session tokens, and account preferences.

**Usage Data:** Pages visited, features used, and actions taken within the platform (for security and improvement purposes).`,
  },
  {
    title: '3. How We Use Your Information',
    content: `Your information is used exclusively for the following purposes:

• To process refugee registrations and case management
• To match individuals with appropriate legal, medical, and NGO support services
• To facilitate family reunification applications and pathway guidance
• To communicate with you regarding your case status and platform updates
• To comply with legal obligations and cooperate with authorised government agencies
• To improve platform security and functionality
• To generate anonymised statistical reports on refugee populations and needs

We do not sell, rent, or share your personal information with third parties for commercial purposes.`,
  },
  {
    title: '4. Legal Basis for Processing',
    content: `We process your personal data on the following legal bases:

• **Consent:** Where you have given explicit consent for specific processing activities
• **Legitimate Interests:** To provide and improve the platform services
• **Legal Obligation:** Where required by law or by authorised government agencies
• **Vital Interests:** In emergency situations where processing is necessary to protect life
• **Public Task:** Where processing is necessary for humanitarian operations in the public interest`,
  },
  {
    title: '5. Data Sharing',
    content: `Your data may be shared with the following parties only where necessary and with appropriate safeguards:

• **Government Authorities:** Department of Home Affairs and equivalent national agencies, where legally required for visa and refugee processing
• **UNHCR:** United Nations High Commissioner for Refugees, for registration and resettlement coordination
• **Legal Aid Partners:** Authorised legal organisations assisting with your case, with your consent
• **NGO Partners:** Vetted non-governmental organisations providing support services you have requested
• **Medical Providers:** Healthcare organisations where you have requested medical support

All data sharing is governed by data processing agreements and subject to strict confidentiality obligations.`,
  },
  {
    title: '6. Data Security',
    content: `We implement robust technical and organisational security measures including:

• Encryption of all data in transit (TLS 1.3) and at rest (AES-256)
• Secure authentication with session management and automatic expiry
• Access controls limiting data access to authorised personnel only
• Regular security audits and penetration testing
• Incident response procedures for data breaches
• Secure document storage with access logging

Despite these measures, no system is 100% secure. We will notify you promptly in the event of any breach affecting your data.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal data for the following periods:

• **Active Case Data:** For the duration of your case plus 7 years after closure
• **Account Data:** For as long as your account remains active plus 2 years
• **Document Copies:** For the duration of your case plus 5 years
• **Anonymised Statistical Data:** Indefinitely for research and reporting purposes

You may request deletion of your data at any time, subject to legal retention requirements.`,
  },
  {
    title: '8. Your Rights',
    content: `Depending on your jurisdiction, you have the following rights regarding your personal data:

• **Right of Access:** Request a copy of all personal data we hold about you
• **Right to Rectification:** Correct inaccurate or incomplete data
• **Right to Erasure:** Request deletion of your data where legally permissible
• **Right to Portability:** Receive your data in a machine-readable format
• **Right to Object:** Object to specific types of processing
• **Right to Restriction:** Limit how we process your data
• **Right to Withdraw Consent:** Withdraw consent at any time without affecting prior processing

To exercise any of these rights, contact us at privacy@govrise.org.`,
  },
  {
    title: '9. Cookies and Tracking',
    content: `We use only essential cookies required for platform functionality, including session management and security tokens. We do not use advertising or tracking cookies. Your language preference is stored in your browser's local storage. You may clear this at any time through your browser settings.`,
  },
  {
    title: '10. Children\'s Privacy',
    content: `We recognise the heightened sensitivity of data relating to children, particularly unaccompanied and separated children (UASC). All data relating to minors is subject to additional protections:

• Access is restricted to authorised guardians, caseworkers, and legal representatives
• All access to child data is logged for safeguarding purposes
• Children's data is never used for any purpose beyond direct case support
• Special care is taken in cross-border data transfers involving children's data`,
  },
  {
    title: '11. Contact Us',
    content: `For privacy-related questions, data requests, or complaints:

**GovRise Privacy Officer**
Email: privacy@govrise.org
Postal: GovRise Privacy, PO Box 1234, Sydney NSW 2000, Australia

If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.`,
  },
];

export const PrivacyPolicy = () => (
  <div className="h-full">
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Shield size={20} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
      </div>
      <p className="text-gray-500 text-sm">Last updated: January 2025 · Effective: January 2025</p>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
      <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-800">
        GovRise handles sensitive personal and refugee data with the highest standards of care. This policy explains your rights and our obligations under Australian and international data protection law.
      </p>
    </div>

    <div className="max-w-3xl space-y-6">
      {sections.map((section, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
            <ChevronRight size={16} className="text-blue-500 mr-1.5" />
            {section.title}
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  </div>
);
