import React from 'react';
import { FileText, ChevronRight, AlertTriangle } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the GovRise platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Platform.

These Terms apply to all users including refugees, asylum seekers, family members, caseworkers, NGO staff, government officials, and sponsors ("Users").`,
  },
  {
    title: '2. Platform Purpose',
    content: `GovRise is a humanitarian support platform designed to:

• Provide information and guidance on family reunification pathways
• Connect refugees and displaced persons with legal, medical, and social support
• Facilitate refugee registration and case management
• Support caseworkers and NGOs in managing client cases
• Enable sponsorship matching and education/work pathway exploration

The Platform does not constitute legal advice. Information provided is for guidance purposes only. Users should seek qualified legal advice for their specific circumstances.`,
  },
  {
    title: '3. User Accounts and Registration',
    content: `**Account Creation:** Users must provide accurate, complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials.

**Eligibility:** The Platform is available to individuals aged 18 and over. Accounts for minors must be created and managed by a responsible adult guardian or authorised caseworker.

**Account Security:** You must notify us immediately of any unauthorised use of your account. GovRise is not liable for losses arising from unauthorised account access where you have not followed security best practices.

**Account Termination:** We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent purposes.`,
  },
  {
    title: '4. Acceptable Use',
    content: `Users agree NOT to:

• Provide false or misleading information in registrations or applications
• Impersonate another person or organisation
• Use the Platform to harass, threaten, or harm other users
• Attempt to access data belonging to other users
• Use automated tools to scrape or extract Platform data
• Upload malicious files, malware, or harmful content
• Use the Platform for any commercial purpose not authorised by GovRise
• Interfere with the Platform's security or technical systems
• Use the Platform in violation of any applicable law

Violations may result in immediate account suspension and referral to relevant authorities.`,
  },
  {
    title: '5. Data Accuracy and User Responsibilities',
    content: `Users are responsible for the accuracy of information they submit. Providing false information in refugee registration or visa-related processes may have serious legal consequences including:

• Rejection of visa or protection applications
• Criminal charges for fraud or misrepresentation
• Deportation or detention

GovRise is not responsible for outcomes resulting from inaccurate user-submitted information.`,
  },
  {
    title: '6. Caseworker and NGO Responsibilities',
    content: `Caseworkers and NGO staff using the Platform agree to:

• Access only data for clients under their active case management
• Maintain client confidentiality in accordance with professional obligations
• Not share client data outside the Platform without explicit consent
• Report any suspected safeguarding concerns immediately
• Comply with their organisation's data protection policies
• Complete any required GovRise training for professional users

Organisations are responsible for the actions of their staff on the Platform.`,
  },
  {
    title: '7. Child Protection (UASC)',
    content: `The UASC section of the Platform contains sensitive data relating to unaccompanied and separated children. Users accessing this section agree to:

• Access only in their capacity as a responsible adult guardian, caseworker, or legal representative
• Never share child data outside authorised channels
• Report any safeguarding concerns to the relevant authority immediately
• Comply with all child protection laws and professional standards

Misuse of the UASC section may result in immediate account termination and referral to child protection authorities.`,
  },
  {
    title: '8. Intellectual Property',
    content: `All content on the Platform including text, graphics, logos, and software is the property of GovRise or its licensors and is protected by copyright law. Users may not reproduce, distribute, or modify Platform content without written permission.

User-submitted content (documents, case notes, messages) remains the property of the submitting user. By submitting content, you grant GovRise a limited licence to process and store that content for the purposes described in our Privacy Policy.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `To the maximum extent permitted by law, GovRise is not liable for:

• Outcomes of visa or asylum applications, regardless of Platform guidance used
• Decisions made by government authorities or third-party organisations
• Loss of data resulting from events beyond our reasonable control
• Indirect, consequential, or incidental damages arising from Platform use
• Actions of third-party support providers matched through the Platform

The Platform is provided "as is" without warranties of any kind beyond those implied by law.`,
  },
  {
    title: '10. Third-Party Services',
    content: `The Platform may link to or integrate with third-party services including government immigration portals, NGO systems, and legal databases. GovRise does not control and is not responsible for third-party content, privacy practices, or availability. Use of third-party services is at your own risk and subject to their own terms.`,
  },
  {
    title: '11. Memoranda of Understanding (MoU)',
    content: `Partner organisations (NGOs, legal aid providers, government agencies) operating on the Platform are required to enter into a Memorandum of Understanding with GovRise covering:

• Data sharing and protection obligations
• Safeguarding and child protection commitments
• Professional standards and code of conduct
• Reporting and accountability mechanisms
• Dispute resolution procedures

MoUs are reviewed annually and may be terminated for non-compliance.`,
  },
  {
    title: '12. Changes to Terms',
    content: `We may update these Terms periodically. Significant changes will be notified to users via email and platform notification. Continued use of the Platform after notification constitutes acceptance of updated Terms. If you do not accept updated Terms, you must discontinue use and may request account deletion.`,
  },
  {
    title: '13. Governing Law',
    content: `These Terms are governed by the laws of New South Wales, Australia. Any disputes arising from these Terms or Platform use will be subject to the exclusive jurisdiction of the courts of New South Wales, unless otherwise required by applicable law in your jurisdiction.`,
  },
  {
    title: '14. Contact',
    content: `For questions about these Terms:

**GovRise Legal Team**
Email: legal@govrise.org
Postal: GovRise Legal, PO Box 1234, Sydney NSW 2000, Australia`,
  },
];

export const TermsOfService = () => (
  <div className="h-full">
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-purple-100 rounded-lg">
          <FileText size={20} className="text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Terms of Service</h1>
      </div>
      <p className="text-gray-500 text-sm">Last updated: January 2025 · Effective: January 2025</p>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
      <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-yellow-800">
        <strong>Important:</strong> GovRise does not provide legal advice. Information on this platform is for guidance purposes only. Please consult a qualified lawyer for advice on your specific situation.
      </p>
    </div>

    <div className="max-w-3xl space-y-6">
      {sections.map((section, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
            <ChevronRight size={16} className="text-purple-500 mr-1.5" />
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
