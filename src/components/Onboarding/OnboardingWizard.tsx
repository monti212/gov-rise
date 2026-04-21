import React, { useState } from 'react';
import { Globe, Users, Target, Sparkles, ChevronRight, ChevronLeft, X, CheckCircle, ArrowRight, MessageSquare, Phone } from 'lucide-react';

const COUNTRIES = [
  'Afghanistan', 'Australia', 'Canada', 'Congo (DRC)', 'Ethiopia', 'Eritrea',
  'France', 'Germany', 'Iraq', 'Kenya', 'Myanmar', 'Netherlands',
  'Nigeria', 'Norway', 'Somalia', 'South Sudan', 'Sudan', 'Sweden',
  'Syria', 'Turkey', 'Uganda', 'United Kingdom', 'United States', 'Venezuela', 'Yemen', 'Other',
];

const SITUATIONS = [
  { id: 'refugee', icon: '🏕️', label: 'I am a refugee or asylum seeker', desc: 'I have fled my country and need protection or reunification with family' },
  { id: 'family', icon: '👨‍👩‍👧', label: 'I want to reunite with family abroad', desc: 'I am separated from family members in another country' },
  { id: 'caseworker', icon: '🤝', label: 'I am a caseworker or NGO supporter', desc: 'I work with refugees and need tools to manage cases' },
  { id: 'government', icon: '🏛️', label: 'I represent a government or institution', desc: 'I process visas, registrations, or refugee programs' },
  { id: 'sponsor', icon: '💼', label: 'I want to sponsor a refugee', desc: 'I want to provide sponsorship for resettlement or education' },
];

const GOALS = [
  { id: 'reunify', icon: '❤️', label: 'Reunite with family', desc: 'Find the right pathway to bring family members together' },
  { id: 'asylum', icon: '🛡️', label: 'Apply for asylum / protection', desc: 'Understand how to apply for refugee status or protection' },
  { id: 'pathways', icon: '🎓', label: 'Explore education or work pathways', desc: 'Find opportunities for education, scholarships, or employment' },
  { id: 'support', icon: '🏥', label: 'Find legal, medical, or housing support', desc: 'Connect with NGOs, lawyers, and support services' },
  { id: 'register', icon: '📋', label: 'Register or track a refugee case', desc: 'Register an individual or manage an existing case' },
];

const GUIDANCE: Record<string, Record<string, { title: string; steps: string[]; resources: string[] }>> = {
  refugee: {
    reunify: {
      title: 'Family Reunification for Refugees',
      steps: [
        'Register with UNHCR in your current location if not already done',
        'Gather proof of family relationship (birth certificates, marriage certificates)',
        'Visit the Pathways page to find the right visa type for your destination country',
        'Use Find Support to connect with a legal aid organisation',
        'Submit your application and track progress through the platform',
      ],
      resources: ['Pathways', 'Find Support', 'Information Hub'],
    },
    asylum: {
      title: 'Applying for Asylum or Protection',
      steps: [
        'Contact your nearest UNHCR office or government immigration authority',
        'Complete the refugee registration process',
        'Gather documents: ID, evidence of persecution, travel history',
        'Submit your asylum claim — use our Find Support page to get legal help',
        'Attend any required interviews with legal representation',
      ],
      resources: ['Find Support', 'Information Hub', 'Registration'],
    },
    support: {
      title: 'Finding Support Services',
      steps: [
        'Use the Find Support page to search for services in your country',
        'Filter by category: Legal Aid, Medical, Housing, Counselling',
        'Contact organisations directly or submit a help request',
        'Attend appointments and keep all correspondence documented',
      ],
      resources: ['Find Support', 'Help Center'],
    },
    default: {
      title: 'Getting Started as a Refugee',
      steps: [
        'Complete your profile and registration on the platform',
        'Visit the Information Hub to understand your rights',
        'Explore available Pathways for your situation',
        'Connect with support services through Find Support',
      ],
      resources: ['Information Hub', 'Pathways', 'Find Support'],
    },
  },
  family: {
    reunify: {
      title: 'Reuniting with Family Abroad',
      steps: [
        'Identify which country your family member is in',
        'Check the Information Hub for that country\'s reunification requirements',
        'Gather proof of relationship documents',
        'Visit Pathways to select the appropriate family visa type',
        'Get legal advice from Find Support before applying',
      ],
      resources: ['Information Hub', 'Pathways', 'Find Support'],
    },
    default: {
      title: 'Family Reunification Process',
      steps: [
        'Start with the Information Hub to research your target country',
        'Explore Pathways — family, sponsorship, and humanitarian options',
        'Use Find Support to connect with a migration lawyer',
        'Register your case to track your application progress',
      ],
      resources: ['Information Hub', 'Pathways', 'Find Support'],
    },
  },
  caseworker: {
    register: {
      title: 'Managing Refugee Cases',
      steps: [
        'Use the Registration page to add new individuals and families',
        'Track and manage cases through the Collaboration Center',
        'Connect clients with support services via Find Support',
        'Generate progress reports through the Reports section',
        'Coordinate with partner organisations through Collaboration',
      ],
      resources: ['Registration', 'Collaboration', 'Reports', 'Find Support'],
    },
    default: {
      title: 'Caseworker Tools',
      steps: [
        'Register new cases using the Registration page',
        'Use the Collaboration Center to coordinate with your team',
        'Explore the Training Portal for professional development resources',
        'Use Reports to track outcomes and generate documentation',
      ],
      resources: ['Registration', 'Collaboration', 'Training Portal', 'Reports'],
    },
  },
  default: {
    default: {
      title: 'Welcome to GovRise',
      steps: [
        'Complete your account profile in Settings',
        'Explore the Information Hub for country-specific guidance',
        'Use Pathways to discover available options',
        'Connect with support services through Find Support',
      ],
      resources: ['Information Hub', 'Pathways', 'Find Support'],
    },
  },
};

const resourceLinks: Record<string, string> = {
  'Pathways': '/pathways',
  'Find Support': '/find-support',
  'Information Hub': '/information-hub',
  'Registration': '/registration',
  'Collaboration': '/collaboration',
  'Help Center': '/help',
  'Training Portal': '/training',
  'Reports': '/reports',
};

interface Props {
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const OnboardingWizard = ({ onClose, onNavigate }: Props) => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [situation, setSituation] = useState('');
  const [goal, setGoal] = useState('');

  const getGuidance = () => {
    const situationMap = GUIDANCE[situation] || GUIDANCE.default;
    return situationMap[goal] || situationMap.default || GUIDANCE.default.default;
  };

  const canNext = () => {
    if (step === 1) return country !== '';
    if (step === 2) return situation !== '';
    if (step === 3) return goal !== '';
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Sparkles size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">GovRise Guide</h2>
              <p className="text-xs text-gray-500">Step {step} of 4</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Country */}
          {step === 1 && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Globe size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Where are you currently located?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-5">Select your current country so we can tailor guidance to your location.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
                {COUNTRIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`p-2.5 text-sm rounded-lg border text-left transition-colors ${
                      country === c ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Situation */}
          {step === 2 && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Users size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">What best describes your situation?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-5">This helps us provide the most relevant guidance for your circumstances.</p>
              <div className="space-y-3">
                {SITUATIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSituation(s.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                      situation === s.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className={`font-medium text-sm ${situation === s.id ? 'text-blue-800' : 'text-gray-900'}`}>{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                      {situation === s.id && <CheckCircle size={18} className="text-blue-600 ml-auto flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goal */}
          {step === 3 && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Target size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">What is your main goal?</h3>
              </div>
              <p className="text-gray-500 text-sm mb-5">Select the primary thing you are trying to achieve right now.</p>
              <div className="space-y-3">
                {GOALS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                      goal === g.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{g.icon}</span>
                      <div>
                        <p className={`font-medium text-sm ${goal === g.id ? 'text-blue-800' : 'text-gray-900'}`}>{g.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{g.desc}</p>
                      </div>
                      {goal === g.id && <CheckCircle size={18} className="text-blue-600 ml-auto flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Guidance */}
          {step === 4 && (() => {
            const guidance = getGuidance();
            return (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles size={20} className="text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Your Personalised Guidance</h3>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mb-5">
                  <p className="text-xs text-blue-500 uppercase tracking-wider font-medium mb-1">Based on your answers</p>
                  <p className="font-semibold text-blue-900">{guidance.title}</p>
                  <p className="text-xs text-blue-700 mt-1">{country} · {SITUATIONS.find(s => s.id === situation)?.label}</p>
                </div>

                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">Recommended Steps</h4>
                  <ol className="space-y-2">
                    {guidance.steps.map((step, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-gray-700">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">Start With These Sections</h4>
                  <div className="flex flex-wrap gap-2">
                    {guidance.resources.map(resource => (
                      <button
                        key={resource}
                        onClick={() => { onClose(); onNavigate(resourceLinks[resource] || '/'); }}
                        className="flex items-center px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        {resource} <ArrowRight size={12} className="ml-1.5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start space-x-3">
                  <MessageSquare size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Need more help?</p>
                    <p className="text-xs text-gray-500 mt-0.5">Our caseworkers are available to provide personalised assistance with your specific case.</p>
                    <button
                      onClick={() => { onClose(); onNavigate('/find-support'); }}
                      className="mt-2 text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      Talk to a caseworker <ChevronRight size={12} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-between items-center">
          <button
            onClick={() => step === 1 ? onClose() : setStep(s => s - 1)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={15} className="mr-1" /> {step === 1 ? 'Skip' : 'Back'}
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Continue <ChevronRight size={15} className="ml-1" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <CheckCircle size={15} className="mr-1.5" /> Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
