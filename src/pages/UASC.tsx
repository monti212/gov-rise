import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Phone, Mail, ChevronRight, Users, BookOpen, Heart, Lock, Globe, FileText, HelpCircle, ArrowRight } from 'lucide-react';

// Gate: must confirm they are a responsible adult or authorised supporter
const AccessGate = ({ onConfirm }: { onConfirm: (role: string) => void }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="max-w-lg w-full bg-white border border-yellow-200 rounded-xl shadow-md p-8">
      <div className="flex items-center justify-center mb-5">
        <div className="p-3 bg-yellow-100 rounded-full">
          <Shield size={32} className="text-yellow-600" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Protected Section</h2>
      <p className="text-gray-600 text-center text-sm mb-6">
        This section contains sensitive information about unaccompanied and separated children (UASC).
        It is intended for responsible adults, caseworkers, NGO staff, and authorised supporters only.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <AlertTriangle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          By continuing, you confirm that you are accessing this section on behalf of a child in your care,
          as an authorised caseworker, or as an NGO/legal professional supporting minors.
        </p>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-3">I am accessing this section as a:</p>
      <div className="space-y-3">
        {[
          { role: 'guardian', label: 'Parent or Legal Guardian', desc: 'I have legal responsibility for the child' },
          { role: 'caseworker', label: 'Caseworker / NGO Staff', desc: 'I work for an organisation supporting the child' },
          { role: 'legal', label: 'Legal Representative', desc: 'I am the child\'s lawyer or advocate' },
          { role: 'government', label: 'Government Official', desc: 'I am an authorised government officer' },
        ].map(opt => (
          <button
            key={opt.role}
            onClick={() => onConfirm(opt.role)}
            className="w-full text-left border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm group-hover:text-blue-700">{opt.label}</p>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-5">
        Access to this section is logged for safeguarding purposes.
      </p>
    </div>
  </div>
);

const resources = [
  {
    title: 'Legal Guardianship & Representation',
    icon: <Shield size={20} />,
    color: 'bg-blue-50 text-blue-600',
    items: [
      'Every UASC has the right to a legal guardian appointed by the state',
      'Guardian must be present at all immigration interviews',
      'Child must not be detained with adults',
      'Legal aid is available free of charge for all UASC',
    ],
  },
  {
    title: 'Family Tracing & Reunification',
    icon: <Users size={20} />,
    color: 'bg-green-50 text-green-600',
    items: [
      'UNHCR and ICRC provide free family tracing services',
      'DNA testing available where documents are missing',
      'Best interests determination (BID) required before any decision',
      'Reunification prioritised with parents, then extended family',
    ],
  },
  {
    title: 'Education & Welfare',
    icon: <BookOpen size={20} />,
    color: 'bg-purple-50 text-purple-600',
    items: [
      'All UASC have the right to enrol in school immediately on arrival',
      'Language support and catch-up programs available',
      'Psychosocial support must be provided alongside education',
      'Youth mentorship programs available through partner NGOs',
    ],
  },
  {
    title: 'Healthcare & Mental Health',
    icon: <Heart size={20} />,
    color: 'bg-red-50 text-red-600',
    items: [
      'Immediate health screening on arrival',
      'Trauma-informed mental health support available',
      'Child-specific medical care pathways',
      'Referral to specialist UASC health services',
    ],
  },
];

const processingSteps = [
  { step: 1, title: 'Age Assessment', desc: 'An independent age assessment is conducted if age is disputed. Child is presumed minor until proven otherwise.' },
  { step: 2, title: 'Guardian Appointed', desc: 'A legal guardian is appointed within 24–48 hours of identification as UASC.' },
  { step: 3, title: 'Best Interests Determination', desc: 'A formal BID process assesses the child\'s needs, safety, and best pathway forward.' },
  { step: 4, title: 'Accommodation & Support', desc: 'Child is placed in appropriate child-friendly accommodation, never in adult detention.' },
  { step: 5, title: 'Asylum / Protection Claim', desc: 'A protection claim is lodged on behalf of the child with full legal representation.' },
  { step: 6, title: 'Family Tracing', desc: 'Parallel family tracing is initiated through UNHCR, ICRC, and national authorities.' },
  { step: 7, title: 'Durable Solution', desc: 'A durable solution is identified: family reunification, local integration, or resettlement.' },
];

const emergencyContacts = [
  { name: 'UNHCR Child Protection Hotline', phone: '+41 22 739 8111', available: '24/7' },
  { name: 'Save the Children Australia', phone: '+61 2 8006 4600', available: 'Mon–Fri 9am–5pm' },
  { name: 'ICRC Family Links', phone: '+41 22 734 6001', available: '24/7' },
  { name: 'Australian Children\'s Commissioner', phone: '1800 020 080', available: 'Mon–Fri 9am–5pm AEST' },
];

export const UASC = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleConfirm = (role: string) => {
    setUserRole(role);
    setAccessGranted(true);
  };

  if (!accessGranted) {
    return (
      <div className="h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Unaccompanied & Separated Children (UASC)</h1>
          <p className="text-gray-600">Specialised support and guidance for unaccompanied minors and their authorised supporters.</p>
        </div>
        <AccessGate onConfirm={handleConfirm} />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Unaccompanied & Separated Children (UASC)</h1>
        <p className="text-gray-600">Support, rights, and pathways for unaccompanied minors.</p>
      </div>

      {/* Access Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center space-x-3">
        <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          Access granted as <strong>{userRole === 'guardian' ? 'Parent / Legal Guardian' : userRole === 'caseworker' ? 'Caseworker / NGO Staff' : userRole === 'legal' ? 'Legal Representative' : 'Government Official'}</strong>.
          This session is logged for safeguarding compliance.
        </p>
        <button onClick={() => setAccessGranted(false)} className="ml-auto text-xs text-green-700 underline whitespace-nowrap">Change role</button>
      </div>

      {/* Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <AlertTriangle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-900">Child Safety First</p>
          <p className="text-sm text-yellow-800">
            If a child is in immediate danger, contact emergency services immediately. Do not delay formal reporting while seeking information on this platform.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'process', label: 'Process & Steps' },
            { id: 'rights', label: 'Rights & Resources' },
            { id: 'contacts', label: 'Emergency Contacts' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Children Supported Globally', value: '2.4M+', color: 'text-blue-600' },
              { label: 'Active Cases on Platform', value: '347', color: 'text-green-600' },
              { label: 'Partner Organisations', value: '18', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Lock size={16} className="mr-2 text-blue-600" /> Who is a UASC?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start"><ChevronRight size={14} className="mr-1.5 mt-0.5 text-blue-500 flex-shrink-0" /> A child under 18 separated from both parents and other relatives</li>
                <li className="flex items-start"><ChevronRight size={14} className="mr-1.5 mt-0.5 text-blue-500 flex-shrink-0" /> Not cared for by an adult who is responsible by law or custom</li>
                <li className="flex items-start"><ChevronRight size={14} className="mr-1.5 mt-0.5 text-blue-500 flex-shrink-0" /> May have crossed borders alone or with unrelated adults</li>
                <li className="flex items-start"><ChevronRight size={14} className="mr-1.5 mt-0.5 text-blue-500 flex-shrink-0" /> Includes children separated from parents but living with other relatives</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Globe size={16} className="mr-2 text-green-600" /> Immediate Actions Required
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start"><CheckCircle size={14} className="mr-1.5 mt-0.5 text-green-500 flex-shrink-0" /> Register the child with UNHCR or national authority within 24hrs</li>
                <li className="flex items-start"><CheckCircle size={14} className="mr-1.5 mt-0.5 text-green-500 flex-shrink-0" /> Ensure safe, child-appropriate accommodation</li>
                <li className="flex items-start"><CheckCircle size={14} className="mr-1.5 mt-0.5 text-green-500 flex-shrink-0" /> Conduct health screening including psychosocial assessment</li>
                <li className="flex items-start"><CheckCircle size={14} className="mr-1.5 mt-0.5 text-green-500 flex-shrink-0" /> Initiate family tracing procedures immediately</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Register a Child for Support</h3>
              <p className="text-sm text-blue-700">Start the formal registration and case management process for a UASC in your care.</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap ml-4">
              Start Registration <ArrowRight size={14} className="ml-1.5" />
            </button>
          </div>
        </div>
      )}

      {/* Process Tab */}
      {activeTab === 'process' && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-6">Standard UASC Processing Steps</h2>
          <div className="space-y-4">
            {processingSteps.map((s) => (
              <div key={s.step} className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{s.step}</div>
                <div className="flex-1 pb-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900 mb-0.5">{s.title}</p>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rights & Resources Tab */}
      {activeTab === 'rights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${res.color}`}>{res.icon}</div>
                <h3 className="font-semibold text-gray-900">{res.title}</h3>
              </div>
              <ul className="space-y-2">
                {res.items.map((item, j) => (
                  <li key={j} className="flex items-start text-sm text-gray-600">
                    <CheckCircle size={13} className="mr-2 mt-0.5 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Emergency Contacts Tab */}
      {activeTab === 'contacts' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {emergencyContacts.map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{c.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Phone size={13} className="mr-2 text-gray-400" /> {c.phone}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <CheckCircle size={11} className="mr-1.5 text-green-500" /> {c.available}
                </div>
                <a href={`tel:${c.phone.replace(/\s/g, '')}`}
                  className="mt-3 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Call Now
                </a>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <div className="flex items-start space-x-3">
              <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Child in Immediate Danger?</p>
                <p className="text-sm text-red-800 mb-3">Call emergency services immediately. Do not wait.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:000" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">Call 000 (Australia)</a>
                  <a href="tel:112" className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Call 112 (International)</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
