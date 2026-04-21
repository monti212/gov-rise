import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Phone, ChevronRight, Users, BookOpen, Heart, Lock, Globe, ArrowRight, Plus, X, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '../utils/supabase';

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

type UascCase = {
  id: string;
  child_name: string;
  date_of_birth: string | null;
  gender: string | null;
  nationality: string | null;
  origin_country: string | null;
  guardian_name: string | null;
  guardian_role: string | null;
  current_location: string | null;
  family_tracing: boolean;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700',
  family_found: 'bg-yellow-100 text-yellow-700',
  reunified: 'bg-green-100 text-green-700',
  resettled: 'bg-purple-100 text-purple-700',
  closed: 'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  family_found: 'Family Found',
  reunified: 'Reunified',
  resettled: 'Resettled',
  closed: 'Closed',
};

const BLANK_FORM = {
  child_name: '',
  date_of_birth: '',
  gender: '',
  nationality: '',
  origin_country: '',
  guardian_name: '',
  guardian_role: '',
  current_location: '',
  family_tracing: false,
  notes: '',
};

export const UASC = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Supabase state
  const [cases, setCases] = useState<UascCase[]>([]);
  const [loadingCases, setLoadingCases] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const fetchCases = async () => {
    setLoadingCases(true);
    const { data, error } = await supabase
      .from('uasc_cases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error && data) setCases(data as UascCase[]);
    setLoadingCases(false);
  };

  useEffect(() => {
    if (accessGranted) fetchCases();
  }, [accessGranted]);

  const handleSubmitCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!form.child_name.trim()) { setFormError('Child name is required.'); return; }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('uasc_cases').insert({
      caseworker_id: user?.id ?? null,
      child_name: form.child_name.trim(),
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      nationality: form.nationality || null,
      origin_country: form.origin_country || null,
      guardian_name: form.guardian_name || null,
      guardian_role: form.guardian_role || null,
      current_location: form.current_location || null,
      family_tracing: form.family_tracing,
      notes: form.notes || null,
      status: 'active',
    });
    if (error) {
      setFormError(error.message);
    } else {
      setFormSuccess(true);
      setForm(BLANK_FORM);
      fetchCases();
      setTimeout(() => { setFormSuccess(false); setShowRegisterForm(false); }, 2000);
    }
    setSubmitting(false);
  };

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
              { label: 'Active Cases on Platform', value: loadingCases ? '…' : cases.filter(c => c.status === 'active').length.toString(), color: 'text-green-600' },
              { label: 'Total Cases Registered', value: loadingCases ? '…' : cases.length.toString(), color: 'text-purple-600' },
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
            <button
              onClick={() => { setShowRegisterForm(true); setFormError(''); setFormSuccess(false); }}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap ml-4">
              Start Registration <ArrowRight size={14} className="ml-1.5" />
            </button>
          </div>

          {/* Cases List */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Registered Cases</h3>
              <button onClick={fetchCases} className="text-gray-400 hover:text-gray-600">
                <RefreshCw size={15} />
              </button>
            </div>
            {loadingCases ? (
              <div className="flex items-center justify-center py-10 text-gray-400">
                <Loader2 size={20} className="animate-spin mr-2" /> Loading cases…
              </div>
            ) : cases.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm">No cases registered yet.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cases.map(c => (
                  <div key={c.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{c.child_name}</p>
                      <p className="text-xs text-gray-500">{c.nationality ?? '—'} · {c.current_location ?? 'Location unknown'} · {new Date(c.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[c.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABELS[c.status] ?? c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Register Case Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900 text-lg">Register UASC Case</h2>
              <button onClick={() => setShowRegisterForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {formSuccess ? (
              <div className="flex flex-col items-center justify-center py-10">
                <CheckCircle size={40} className="text-green-500 mb-3" />
                <p className="font-semibold text-gray-900">Case Registered</p>
                <p className="text-sm text-gray-500">The case has been saved successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitCase} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Child's Full Name *</label>
                    <input value={form.child_name} onChange={e => setForm(f => ({ ...f, child_name: e.target.value }))} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" value={form.date_of_birth} onChange={e => setForm(f => ({ ...f, date_of_birth: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                    <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select…</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="undisclosed">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nationality</label>
                    <input value={form.nationality} onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Syrian" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Country of Origin</label>
                    <input value={form.origin_country} onChange={e => setForm(f => ({ ...f, origin_country: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Syria" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Guardian Name</label>
                    <input value={form.guardian_name} onChange={e => setForm(f => ({ ...f, guardian_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="If applicable" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Guardian Role</label>
                    <select value={form.guardian_role} onChange={e => setForm(f => ({ ...f, guardian_role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select…</option>
                      <option value="parent">Parent</option>
                      <option value="relative">Relative</option>
                      <option value="legal_guardian">Legal Guardian</option>
                      <option value="ngo">NGO Worker</option>
                      <option value="caseworker">Caseworker</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Current Location</label>
                    <input value={form.current_location} onChange={e => setForm(f => ({ ...f, current_location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Country or facility name" />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={form.family_tracing} onChange={e => setForm(f => ({ ...f, family_tracing: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">Family tracing has been initiated</span>
                    </label>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                    <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any additional information about the case…" />
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{formError}</div>
                )}

                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setShowRegisterForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={submitting}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium flex items-center">
                    {submitting ? <><Loader2 size={14} className="animate-spin mr-2" />Saving…</> : <><Plus size={14} className="mr-1.5" />Register Case</>}
                  </button>
                </div>
              </form>
            )}
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
