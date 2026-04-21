import React, { useState } from 'react';
import { GraduationCap, Briefcase, Heart, Users, ChevronRight, CheckCircle, Clock, Star, BookOpen, Globe, ArrowRight } from 'lucide-react';

const pathwayCategories = [
  { id: 'family', label: 'Family Reunification', icon: <Heart size={18} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  { id: 'work', label: 'Work Opportunities', icon: <Briefcase size={18} /> },
  { id: 'sponsorship', label: 'Sponsorship', icon: <Users size={18} /> },
];

const familyPathways = [
  {
    title: 'Immediate Family Reunification',
    description: 'Reunite with spouse, children, or parents already in the destination country.',
    eligibility: ['Proof of family relationship', 'Sponsor must be a resident/citizen', 'Health and character checks'],
    processingTime: '6–18 months',
    difficulty: 'Medium',
    countries: ['Australia', 'Canada', 'Germany', 'UK'],
  },
  {
    title: 'Humanitarian Family Visa',
    description: 'For refugees and asylum seekers seeking to bring family members in urgent need.',
    eligibility: ['Refugee or protection visa holder', 'Family member in danger', 'UNHCR referral (some countries)'],
    processingTime: '3–12 months',
    difficulty: 'High',
    countries: ['Australia', 'Sweden', 'Netherlands'],
  },
  {
    title: 'Split Family Program',
    description: 'Dedicated program for families separated due to conflict or displacement.',
    eligibility: ['Documented separation due to conflict', 'Registered with relevant authority', 'DNA evidence if available'],
    processingTime: '4–10 months',
    difficulty: 'Medium',
    countries: ['Australia', 'Norway', 'Denmark'],
  },
];

const educationPathways = [
  {
    title: 'Student Visa Pathway',
    description: 'Study at an accredited institution as a pathway to residency.',
    eligibility: ['Acceptance letter from institution', 'English/language proficiency', 'Financial support evidence'],
    processingTime: '4–8 weeks',
    difficulty: 'Low',
    countries: ['Australia', 'Canada', 'Germany', 'UK', 'USA'],
  },
  {
    title: 'Refugee Scholarship Programs',
    description: 'Dedicated scholarship programs for refugees at universities worldwide.',
    eligibility: ['UNHCR refugee status', 'Secondary school completion', 'Academic merit'],
    processingTime: '2–6 months',
    difficulty: 'Medium',
    countries: ['Australia', 'Canada', 'Germany', 'Netherlands'],
  },
  {
    title: 'Vocational Training Pathway',
    description: 'Skills-based training programs leading to employment and residency.',
    eligibility: ['Age 18–45', 'Basic language skills', 'Commitment to program'],
    processingTime: '1–3 months',
    difficulty: 'Low',
    countries: ['Germany', 'Sweden', 'Australia'],
  },
];

const workPathways = [
  {
    title: 'Skilled Worker Visa',
    description: 'For refugees with recognised skills and qualifications in demand.',
    eligibility: ['Skills assessment', 'Language proficiency test', 'Points-based eligibility'],
    processingTime: '3–12 months',
    difficulty: 'Medium',
    countries: ['Australia', 'Canada', 'Germany', 'UK'],
  },
  {
    title: 'Employer Sponsorship',
    description: 'An employer sponsors your visa in exchange for employment.',
    eligibility: ['Job offer from approved employer', 'Relevant qualifications', 'Health checks'],
    processingTime: '2–6 months',
    difficulty: 'Medium',
    countries: ['Australia', 'UK', 'Canada', 'USA'],
  },
  {
    title: 'Seasonal Work Program',
    description: 'Short-term agricultural or seasonal work as a pathway to longer stay.',
    eligibility: ['Physical fitness', 'No criminal record', 'Valid travel document'],
    processingTime: '2–4 weeks',
    difficulty: 'Low',
    countries: ['Australia', 'New Zealand', 'Canada'],
  },
];

const sponsorshipPathways = [
  {
    title: 'Private Sponsorship',
    description: 'Community groups or individuals sponsor a refugee family for resettlement.',
    eligibility: ['Sponsor group approval', 'Financial commitment', 'Support plan submission'],
    processingTime: '6–18 months',
    difficulty: 'Medium',
    countries: ['Canada', 'Australia', 'UK', 'USA'],
  },
  {
    title: 'Community Refugee Integration',
    description: 'Join an existing community sponsorship program for guided integration support.',
    eligibility: ['UNHCR referral', 'Community sponsor available', 'Integration agreement'],
    processingTime: '4–12 months',
    difficulty: 'Low',
    countries: ['Canada', 'Australia', 'Germany'],
  },
  {
    title: 'Corporate Sponsorship Program',
    description: 'Companies sponsor skilled refugees as employees with full relocation support.',
    eligibility: ['Relevant skills match', 'Company approved sponsor status', 'Employment contract'],
    processingTime: '3–9 months',
    difficulty: 'Medium',
    countries: ['Germany', 'Netherlands', 'Canada'],
  },
];

const difficultyColor: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

export const Pathways = () => {
  const [activeTab, setActiveTab] = useState('family');

  const getPathways = () => {
    switch (activeTab) {
      case 'family': return familyPathways;
      case 'education': return educationPathways;
      case 'work': return workPathways;
      case 'sponsorship': return sponsorshipPathways;
      default: return familyPathways;
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Pathways</h1>
        <p className="text-gray-600">Explore available pathways for family reunification, education, work, and sponsorship programs.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Heart size={20} />, color: 'bg-rose-50 text-rose-600', label: 'Family Pathways', value: '3' },
          { icon: <GraduationCap size={20} />, color: 'bg-blue-50 text-blue-600', label: 'Education Options', value: '3' },
          { icon: <Briefcase size={20} />, color: 'bg-green-50 text-green-600', label: 'Work Programs', value: '3' },
          { icon: <Users size={20} />, color: 'bg-purple-50 text-purple-600', label: 'Sponsorship Types', value: '3' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className={`p-2 rounded-md ${stat.color} inline-flex mb-2`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-2 md:space-x-8 overflow-x-auto">
          {pathwayCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === cat.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {getPathways().map((pathway, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-base">{pathway.title}</h3>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${difficultyColor[pathway.difficulty]}`}>
                  {pathway.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{pathway.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock size={14} className="mr-1.5 text-gray-400" />
                Processing: <span className="ml-1 font-medium text-gray-700">{pathway.processingTime}</span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Eligibility</p>
                <ul className="space-y-1">
                  {pathway.eligibility.map((req, j) => (
                    <li key={j} className="flex items-start text-sm text-gray-600">
                      <CheckCircle size={14} className="mr-1.5 mt-0.5 text-green-500 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Available In</p>
                <div className="flex flex-wrap gap-1">
                  {pathway.countries.map((c, j) => (
                    <span key={j} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center">
                      <Globe size={10} className="mr-1" />{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                Learn More <ArrowRight size={14} className="ml-1.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Help Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">Not sure which pathway is right for you?</h3>
            <p className="text-blue-700 text-sm">Our AI assistant can guide you based on your country, situation, and documents available.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center">
              <Star size={16} className="mr-2" /> Get AI Guidance
            </button>
            <button className="bg-white border border-blue-300 text-blue-600 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors flex items-center">
              <Users size={16} className="mr-2" /> Talk to a Caseworker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
