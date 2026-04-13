import React, { useState } from 'react';
import { Search, Globe, FileText, BookOpen, MapPin, HelpCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const countries = [
  { id: 1,  name: 'Australia',     flag: '🇦🇺', processingTime: '12–24 months',  requirements: 'High',   region: 'Oceania',       visaTypes: 'Partner, Child, Parent, Humanitarian' },
  { id: 2,  name: 'Germany',       flag: '🇩🇪', processingTime: '6–12 months',   requirements: 'High',   region: 'Europe',        visaTypes: 'Family Reunification, Refugee Family' },
  { id: 3,  name: 'Canada',        flag: '🇨🇦', processingTime: '12–24 months',  requirements: 'High',   region: 'North America', visaTypes: 'Spousal, Family Class, Refugee' },
  { id: 4,  name: 'United Kingdom',flag: '🇬🇧', processingTime: '6–18 months',   requirements: 'High',   region: 'Europe',        visaTypes: 'Family Visa, Refugee Family Reunion' },
  { id: 5,  name: 'France',        flag: '🇫🇷', processingTime: '4–12 months',   requirements: 'Medium', region: 'Europe',        visaTypes: 'Family Reunification, Protection Status' },
  { id: 6,  name: 'Sweden',        flag: '🇸🇪', processingTime: '6–24 months',   requirements: 'Medium', region: 'Europe',        visaTypes: 'Residence Permit, Refugee Family' },
  { id: 7,  name: 'Netherlands',   flag: '🇳🇱', processingTime: '6–18 months',   requirements: 'Medium', region: 'Europe',        visaTypes: 'MVV, Family Reunification' },
  { id: 8,  name: 'USA',           flag: '🇺🇸', processingTime: '12–36 months',  requirements: 'High',   region: 'North America', visaTypes: 'IR, F-Series, Refugee/Asylee' },
  { id: 9,  name: 'Turkey',        flag: '🇹🇷', processingTime: '3–9 months',    requirements: 'Medium', region: 'Asia/Europe',   visaTypes: 'Family Residence, Temporary Protection' },
  { id: 10, name: 'Kenya',         flag: '🇰🇪', processingTime: '3–12 months',   requirements: 'Low',    region: 'Africa',        visaTypes: 'Refugee Status, UNHCR Resettlement' },
  { id: 11, name: 'Jordan',        flag: '🇯🇴', processingTime: '3–12 months',   requirements: 'Low',    region: 'Middle East',   visaTypes: 'Refugee Registration, UNHCR Mandate' },
  { id: 12, name: 'Lebanon',       flag: '🇱🇧', processingTime: '3–18 months',   requirements: 'Low',    region: 'Middle East',   visaTypes: 'UNHCR Registration, Temporary Stay' },
  { id: 13, name: 'South Africa',  flag: '🇿🇦', processingTime: '6–18 months',   requirements: 'Medium', region: 'Africa',        visaTypes: 'Asylum, Refugee Permit, Family Visa' },
  { id: 14, name: 'Uganda',        flag: '🇺🇬', processingTime: '3–9 months',    requirements: 'Low',    region: 'Africa',        visaTypes: 'Refugee Status, UNHCR Resettlement' },
];

// Australian resources
const resources = [
  {
    id: 1,
    title: 'Australian Visa Requirements',
    description: 'Complete guide to Australia\'s family reunification visa requirements and process.',
    category: 'Documentation',
    icon: <FileText size={20} />,
  },
  {
    id: 2,
    title: 'Family Stream Migration Guide',
    description: 'Information on Australia\'s Family Stream Migration Program and visa options.',
    category: 'Legal',
    icon: <BookOpen size={20} />,
  },
  {
    id: 3,
    title: 'Department of Home Affairs Directory',
    description: 'Contact information for Australian Department of Home Affairs offices.',
    category: 'Contact',
    icon: <MapPin size={20} />,
  },
  {
    id: 4,
    title: 'Australian Family Visa FAQ',
    description: 'Answers to commonly asked questions about family visas for Australia.',
    category: 'Help',
    icon: <HelpCircle size={20} />,
  },
];

// Australia-specific FAQs
const faqs = [
  {
    question: 'What is family reunification?',
    answer: 'Family reunification is the process that allows refugees and immigrants who have been granted asylum to bring qualifying family members to join them in their new country of residence.',
  },
  {
    question: 'Who qualifies for family reunification in Australia?',
    answer: 'For Australia, typically spouses, dependent children under 18, and in some cases, other dependent family members may qualify. Australia offers several visa categories for family reunification including Partner visas, Child visas, Parent visas, and other Family visas for siblings, aged dependent relatives, and remaining relatives.',
  },
  {
    question: 'How long does the process usually take for Australian visas?',
    answer: 'Processing times for Australian family visas vary significantly. As of 2023-24, partner visas (subclasses 820/801 and 309/100) typically take 12-24 months to process. Child visas may take 12-18 months, while Parent visas can take several years, particularly Contributory Parent visas. Processing times are impacted by application volumes, completeness of documentation, and security checks.',
  },
  {
    question: 'What documents are typically required for Australian family visas?',
    answer: 'Common requirements include identity documents (passports, birth certificates), proof of relationship (marriage certificates, family books), character documents, health examinations, and evidence of the genuine nature of relationships. For partner visas, evidence of the relationship being genuine and continuing is particularly important.',
  },
  {
    question: 'What are the specific requirements for Australia\'s humanitarian program?',
    answer: 'Australia offers the "split family" provisions under the Refugee and Humanitarian Program. Proposers must have arrived on a refugee or humanitarian visa (subclasses 200, 201, 202, 203, 204, 866), and be applying for immediate family members (spouse/de facto partner or dependent children). The relationship must have existed before the proposer arrived in Australia and been declared to the Department of Home Affairs. Applications are lodged through Form 681.',
  },
  {
    question: 'What visa options are available for family reunification in Australia?',
    answer: 'Australia offers multiple visa options: Partner visas (subclasses 820/801 for onshore and 309/100 for offshore applicants), Child visas (subclasses 101, 102, 445), Parent visas (subclasses 103, 173, 143, 884), and Other Family visas for specific relationships. The Refugee and Humanitarian Program also has split family provisions for eligible refugees.',
  },
  {
    question: 'Are there any fee waivers for Australian family visas?',
    answer: 'Fee waivers are generally not available for standard family visa applications, which can be costly. However, for those who arrived under the Refugee and Humanitarian Program, split family applications under this program have no visa application charge.',
  },
];

export const InformationHub = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('countries');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [regionFilter, setRegionFilter] = useState('All');

  const regions = ['All', ...Array.from(new Set(countries.map(c => c.region)))];

  // Filter countries based on search term and region
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All' || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });
  
  // Filter resources based on search term
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (countryName: string) => {
    navigate(`/country-detail/${countryName.toLowerCase()}`);
  };

  const handleViewResource = (resourceTitle: string) => {
    navigate(`/resource-detail?title=${encodeURIComponent(resourceTitle)}&type=Documentation`);
  };

  const handleChatWithAI = () => {
    navigate('/support?tab=chat');
  };

  const handleContactSupport = () => {
    navigate('/support?tab=contact');
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Information Hub</h1>
        <p className="text-gray-600">Country-by-country guidance on family reunification pathways, visa requirements, processing times, and key authorities — covering 14 countries across 6 regions.</p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search countries, resources, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('countries')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'countries'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Countries
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'resources'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQ
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Countries Tab */}
        {activeTab === 'countries' && (
          <div className="p-4">
            {/* Region filter pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    regionFilter === r
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Types</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCountries.map((country) => (
                    <tr key={country.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="text-sm font-medium text-gray-900">{country.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{country.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{country.processingTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          country.requirements === 'High'   ? 'bg-red-100 text-red-800' :
                          country.requirements === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                              'bg-green-100 text-green-800'
                        }`}>
                          {country.requirements}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{country.visaTypes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewDetails(country.name)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="mb-3 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-md text-blue-600">{resource.icon}</div>
                  <h3 className="font-medium text-gray-800">{resource.title}</h3>
                </div>
                <div className="mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {resource.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                <button
                  onClick={() => handleViewResource(resource.title)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View Resource
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="p-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-blue-900">Need personalized assistance with Australian visa applications?</h3>
            <p className="text-blue-700">Connect with our support team for guidance on the Australian family reunification process.</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleChatWithAI}
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
            >
              Chat with AI
            </button>
            <button 
              onClick={handleContactSupport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};