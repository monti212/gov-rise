import React, { useState } from 'react';
import { User, Users, MapPin, FileText, CheckCircle, ChevronRight, ChevronLeft, AlertTriangle, Phone, Mail, Globe, Shield, Camera, Upload } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Personal Information', icon: <User size={18} /> },
  { id: 2, title: 'Family Members', icon: <Users size={18} /> },
  { id: 3, title: 'Current Situation', icon: <MapPin size={18} /> },
  { id: 4, title: 'Documents', icon: <FileText size={18} /> },
  { id: 5, title: 'Review & Submit', icon: <CheckCircle size={18} /> },
];

const countries = [
  'Afghanistan', 'Congo (DRC)', 'Ethiopia', 'Eritrea', 'Iraq', 'Kenya',
  'Myanmar', 'Nigeria', 'Somalia', 'South Sudan', 'Sudan', 'Syria',
  'Uganda', 'Venezuela', 'Yemen', 'Other',
];

const destinationCountries = [
  'Australia', 'Canada', 'Denmark', 'France', 'Germany', 'Netherlands',
  'New Zealand', 'Norway', 'Sweden', 'United Kingdom', 'United States', 'Other',
];

const initialForm = {
  // Step 1
  firstName: '', lastName: '', dateOfBirth: '', gender: '', nationality: '',
  ethnicity: '', religion: '', phone: '', email: '', currentCountry: '', currentCity: '',
  // Step 2
  familyStatus: 'single', spouseName: '', spouseDob: '', children: [] as { name: string; dob: string; gender: string }[],
  separatedFamily: false, separatedMembers: '',
  // Step 3
  refugeeStatus: '', displacementDate: '', originCountry: '', flightReason: '',
  destinationCountry: '', hasPassport: false, hasTravelDoc: false,
  specialNeeds: [] as string[], additionalNeeds: '',
  // Step 4
  documents: [] as string[],
};

type FormData = typeof initialForm;

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      {STEPS.map((step) => (
        <div key={step.id} className="flex flex-col items-center flex-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
            step.id < current ? 'bg-blue-600 border-blue-600 text-white' :
            step.id === current ? 'bg-white border-blue-600 text-blue-600' :
            'bg-white border-gray-300 text-gray-400'
          }`}>
            {step.id < current ? <CheckCircle size={16} /> : step.id}
          </div>
          <p className={`text-xs mt-1 text-center hidden md:block ${step.id === current ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
            {step.title}
          </p>
        </div>
      ))}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
      <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${((current - 1) / (total - 1)) * 100}%` }} />
    </div>
  </div>
);

const Step1 = ({ form, update }: { form: FormData; update: (k: string, v: string) => void }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
        <input value={form.firstName} onChange={e => update('firstName', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
        <input value={form.lastName} onChange={e => update('lastName', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
        <input type="date" value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
        <select value={form.gender} onChange={e => update('gender', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select gender</option>
          <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
        <select value={form.nationality} onChange={e => update('nationality', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select nationality</option>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ethnicity</label>
        <input value={form.ethnicity} onChange={e => update('ethnicity', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input value={form.phone} onChange={e => update('phone', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+XX XXXXXXXXXX" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Country *</label>
        <select value={form.currentCountry} onChange={e => update('currentCountry', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select country</option>
          {[...countries, ...destinationCountries].filter((v, i, a) => a.indexOf(v) === i).sort().map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current City / Camp</label>
        <input value={form.currentCity} onChange={e => update('currentCity', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City or camp name" />
      </div>
    </div>
  </div>
);

const Step2 = ({ form, update, updateObj }: { form: FormData; update: (k: string, v: any) => void; updateObj: (k: string, i: number, f: string, v: string) => void }) => {
  const addChild = () => update('children', [...form.children, { name: '', dob: '', gender: '' }]);
  const removeChild = (i: number) => update('children', form.children.filter((_, idx) => idx !== i));

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Family Members</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Family Status *</label>
          <select value={form.familyStatus} onChange={e => update('familyStatus', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="single">Single</option>
            <option value="married">Married / Partner</option>
            <option value="widowed">Widowed</option>
            <option value="divorced">Divorced / Separated</option>
          </select>
        </div>

        {form.familyStatus === 'married' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spouse / Partner Name</label>
              <input value={form.spouseName} onChange={e => update('spouseName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Date of Birth</label>
              <input type="date" value={form.spouseDob} onChange={e => update('spouseDob', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">Children</label>
            <button onClick={addChild} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add Child</button>
          </div>
          {form.children.map((child, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
              <input value={child.name} onChange={e => updateObj('children', i, 'name', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full name" />
              <input type="date" value={child.dob} onChange={e => updateObj('children', i, 'dob', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex gap-2">
                <select value={child.gender} onChange={e => updateObj('children', i, 'gender', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
                <button onClick={() => removeChild(i)} className="text-red-400 hover:text-red-600 text-sm px-2">✕</button>
              </div>
            </div>
          ))}
          {form.children.length === 0 && <p className="text-sm text-gray-400 italic">No children added yet.</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked={form.separatedFamily} onChange={e => update('separatedFamily', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">I have family members I am separated from</span>
          </label>
          {form.separatedFamily && (
            <textarea value={form.separatedMembers} onChange={e => update('separatedMembers', e.target.value)}
              className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3} placeholder="Describe separated family members (names, relationship, last known location)..." />
          )}
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ form, update }: { form: FormData; update: (k: string, v: any) => void }) => {
  const needs = ['Medical care', 'Mental health support', 'Disability support', 'Child protection', 'Legal aid', 'Interpreter', 'Housing', 'Food assistance'];
  const toggleNeed = (need: string) => {
    const current = form.specialNeeds;
    update('specialNeeds', current.includes(need) ? current.filter(n => n !== need) : [...current, need]);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Situation</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Refugee / Protection Status *</label>
          <select value={form.refugeeStatus} onChange={e => update('refugeeStatus', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select status</option>
            <option>UNHCR Registered Refugee</option>
            <option>Asylum Seeker (application pending)</option>
            <option>Internally Displaced Person (IDP)</option>
            <option>Stateless Person</option>
            <option>Not yet registered</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin *</label>
            <select value={form.originCountry} onChange={e => update('originCountry', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select country</option>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Displacement</label>
            <input type="date" value={form.displacementDate} onChange={e => update('displacementDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Reason for Fleeing</label>
          <select value={form.flightReason} onChange={e => update('flightReason', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select reason</option>
            <option>Armed conflict / War</option>
            <option>Persecution (religion, ethnicity, politics)</option>
            <option>Gender-based violence</option>
            <option>Natural disaster</option>
            <option>Extreme poverty / famine</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desired Destination Country</label>
          <select value={form.destinationCountry} onChange={e => update('destinationCountry', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select country</option>
            {destinationCountries.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {needs.map(need => (
              <button key={need} onClick={() => toggleNeed(need)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  form.specialNeeds.includes(need) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}>
                {need}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4 = ({ form, update }: { form: FormData; update: (k: string, v: any) => void }) => {
  const docTypes = [
    'Passport', 'National ID card', 'Birth certificate', 'Marriage certificate',
    'UNHCR registration card', 'Asylum seeker card', 'Police/court records',
    'Medical records', 'Educational certificates', 'Employment records',
  ];
  const toggle = (doc: string) => {
    const current = form.documents;
    update('documents', current.includes(doc) ? current.filter(d => d !== doc) : [...current, doc]);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Documents Available</h2>
      <p className="text-sm text-gray-500 mb-4">Select all documents you currently have access to. You can upload copies later.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {docTypes.map(doc => (
          <label key={doc} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <input type="checkbox" checked={form.documents.includes(doc)} onChange={() => toggle(doc)}
              className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">{doc}</span>
          </label>
        ))}
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
        <Upload size={32} className="mx-auto text-gray-400 mb-3" />
        <p className="text-sm font-medium text-gray-700 mb-1">Upload Document Scans</p>
        <p className="text-xs text-gray-500">PDF, JPG, PNG — max 10MB each. Documents are encrypted and stored securely.</p>
        <button className="mt-3 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          Choose Files
        </button>
      </div>
    </div>
  );
};

const Step5 = ({ form }: { form: FormData }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Review & Submit</h2>
    <div className="space-y-4 mb-6">
      {[
        { title: 'Personal Information', items: [
          `Name: ${form.firstName} ${form.lastName}`,
          `Date of Birth: ${form.dateOfBirth || 'Not provided'}`,
          `Nationality: ${form.nationality || 'Not provided'}`,
          `Current Location: ${form.currentCity}, ${form.currentCountry}`,
        ]},
        { title: 'Family', items: [
          `Status: ${form.familyStatus}`,
          form.children.length > 0 ? `Children: ${form.children.length}` : 'No children listed',
          form.separatedFamily ? 'Has separated family members' : 'No separated family',
        ]},
        { title: 'Situation', items: [
          `Status: ${form.refugeeStatus || 'Not provided'}`,
          `Origin: ${form.originCountry || 'Not provided'}`,
          `Destination: ${form.destinationCountry || 'Not provided'}`,
          form.specialNeeds.length > 0 ? `Special needs: ${form.specialNeeds.join(', ')}` : 'No special needs indicated',
        ]},
        { title: 'Documents', items: form.documents.length > 0 ? form.documents : ['No documents selected'] },
      ].map((section, i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2 text-sm">{section.title}</h3>
          <ul className="space-y-1">
            {section.items.map((item, j) => (
              <li key={j} className="text-sm text-gray-600 flex items-start">
                <CheckCircle size={13} className="mr-2 mt-0.5 text-green-500 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Your data is encrypted and stored securely. It will only be shared with authorised caseworkers, legal representatives, and government agencies as required for your case.
        </p>
      </div>
    </div>

    <label className="flex items-start space-x-3 cursor-pointer">
      <input type="checkbox" className="w-4 h-4 mt-0.5 text-blue-600 rounded" />
      <span className="text-sm text-gray-700">
        I confirm the information provided is accurate to the best of my knowledge. I consent to this data being used to process my registration and match me with appropriate support services.
      </span>
    </label>
  </div>
);

export const Registration = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const updateObj = (key: string, index: number, field: string, value: string) => {
    setForm(prev => {
      const arr = [...(prev[key as keyof FormData] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-xl shadow-md p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted</h2>
          <p className="text-gray-600 mb-4">Your registration has been received. A caseworker will review your details and contact you within 2–5 business days.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 mb-1">Reference Number</p>
            <p className="font-mono font-bold text-blue-600 text-lg">GR-{Date.now().toString().slice(-8)}</p>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Refugee Registration</h1>
        <p className="text-gray-600">Register individuals and families to access support, case management, and family reunification services.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ProgressBar current={step} total={STEPS.length} />

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          {step === 1 && <Step1 form={form} update={update} />}
          {step === 2 && <Step2 form={form} update={update} updateObj={updateObj} />}
          {step === 3 && <Step3 form={form} update={update} />}
          {step === 4 && <Step4 form={form} update={update} />}
          {step === 5 && <Step5 form={form} />}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </button>
          {step < STEPS.length ? (
            <button onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Next <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <CheckCircle size={16} className="mr-1.5" /> Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
