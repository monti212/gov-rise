import React, { useState } from 'react';
import { Search, Phone, Mail, Globe, MapPin, Star, Filter, CheckCircle, MessageSquare, Users, Scale, Heart, Building2, ChevronDown } from 'lucide-react';

const categories = ['All', 'Legal Aid', 'NGO', 'Government', 'Medical', 'Counselling', 'Housing'];

const supportProviders = [
  {
    id: 1,
    name: 'Refugee Legal Aid Society',
    category: 'Legal Aid',
    description: 'Free legal assistance for refugees navigating asylum, family reunification, and visa processes.',
    services: ['Asylum applications', 'Family reunification', 'Visa advice', 'Court representation'],
    phone: '+61 2 9264 9595',
    email: 'help@refugeelegal.org',
    website: 'refugeelegal.org',
    location: 'Sydney, Australia',
    languages: ['English', 'Arabic', 'Somali', 'French'],
    rating: 4.9,
    reviews: 214,
    available: true,
    icon: <Scale size={20} />,
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    name: 'Refugee Council of Australia',
    category: 'NGO',
    description: 'Peak body supporting refugees and asylum seekers through advocacy, information, and direct support.',
    services: ['Case management', 'Document assistance', 'Resettlement support', 'Community referrals'],
    phone: '+61 2 9211 9333',
    email: 'support@refugeecouncil.org.au',
    website: 'refugeecouncil.org.au',
    location: 'Melbourne, Australia',
    languages: ['English', 'Swahili', 'Turkish', 'Dari'],
    rating: 4.8,
    reviews: 389,
    available: true,
    icon: <Users size={20} />,
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    name: 'Department of Home Affairs',
    category: 'Government',
    description: 'Official Australian government body handling visa applications, immigration, and refugee programs.',
    services: ['Visa applications', 'Refugee processing', 'Identity verification', 'Travel documents'],
    phone: '131 881',
    email: 'enquiries@homeaffairs.gov.au',
    website: 'homeaffairs.gov.au',
    location: 'Nationwide, Australia',
    languages: ['English'],
    rating: 3.9,
    reviews: 1042,
    available: true,
    icon: <Building2 size={20} />,
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    name: 'Médecins Sans Frontières (MSF)',
    category: 'Medical',
    description: 'Emergency medical care and mental health support for refugees and displaced persons.',
    services: ['Medical consultations', 'Mental health support', 'Emergency care', 'Referral services'],
    phone: '+61 2 8570 2600',
    email: 'medical@msf.org.au',
    website: 'msf.org.au',
    location: 'Sydney & Melbourne',
    languages: ['English', 'Arabic', 'French', 'Somali'],
    rating: 4.9,
    reviews: 156,
    available: true,
    icon: <Heart size={20} />,
    iconBg: 'bg-red-100 text-red-600',
  },
  {
    id: 5,
    name: 'Multicultural Australia',
    category: 'Counselling',
    description: 'Trauma-informed counselling and settlement services for refugees and asylum seekers.',
    services: ['Trauma counselling', 'Settlement support', 'Family therapy', 'Community programs'],
    phone: '+61 7 3337 5400',
    email: 'info@multiculturalaustralia.org.au',
    website: 'multiculturalaustralia.org.au',
    location: 'Brisbane, Australia',
    languages: ['English', 'Arabic', 'Swahili', 'French', 'Turkish'],
    rating: 4.7,
    reviews: 98,
    available: false,
    icon: <MessageSquare size={20} />,
    iconBg: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 6,
    name: 'Community Housing Australia',
    category: 'Housing',
    description: 'Emergency and transitional housing support for newly arrived refugees and asylum seekers.',
    services: ['Emergency housing', 'Transitional accommodation', 'Housing advice', 'Tenancy support'],
    phone: '+61 3 9347 6166',
    email: 'housing@cha.org.au',
    website: 'communityhousing.org.au',
    location: 'Nationwide, Australia',
    languages: ['English', 'Arabic', 'Somali'],
    rating: 4.5,
    reviews: 73,
    available: true,
    icon: <MapPin size={20} />,
    iconBg: 'bg-orange-100 text-orange-600',
  },
];

export const FindSupport = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = supportProviders.filter(provider => {
    const matchesCategory = activeCategory === 'All' || provider.category === activeCategory;
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAvailable = !showAvailableOnly || provider.available;
    return matchesCategory && matchesSearch && matchesAvailable;
  });

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Find Support</h1>
        <p className="text-gray-600">Connect with lawyers, NGOs, government agencies, and other support services near you.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Legal Services', value: '1', color: 'bg-blue-50 text-blue-600', icon: <Scale size={18} /> },
          { label: 'NGO Partners', value: '1', color: 'bg-green-50 text-green-600', icon: <Users size={18} /> },
          { label: 'Gov Agencies', value: '1', color: 'bg-purple-50 text-purple-600', icon: <Building2 size={18} /> },
          { label: 'Medical & Other', value: '3', color: 'bg-red-50 text-red-600', icon: <Heart size={18} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className={`p-2 rounded-md ${stat.color} inline-flex mb-2`}>{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, service, or keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={e => setShowAvailableOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-600">Available now only</span>
          </label>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} support provider{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filtered.map(provider => (
          <div key={provider.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg ${provider.iconBg}`}>{provider.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <span className="text-xs text-gray-500">{provider.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${provider.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-xs text-gray-500">{provider.available ? 'Available' : 'Busy'}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{provider.description}</p>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {provider.services.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{s}</span>
                ))}
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {provider.languages.map((lang, i) => (
                  <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{lang}</span>
                ))}
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={13} className="mr-2 text-gray-400 flex-shrink-0" />
                  {provider.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone size={13} className="mr-2 text-gray-400 flex-shrink-0" />
                  {provider.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail size={13} className="mr-2 text-gray-400 flex-shrink-0" />
                  {provider.email}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Star size={14} className="mr-1 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-gray-800 mr-1">{provider.rating}</span>
                <span>({provider.reviews} reviews)</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <MessageSquare size={14} className="mr-1.5" /> Request Help
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Phone size={14} className="mr-1.5" /> Call
                </button>
                <a
                  href={`https://${provider.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Globe size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
            <Phone size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">In immediate danger or emergency?</h3>
            <p className="text-red-700 text-sm mb-3">If you or your family are in immediate danger, contact emergency services or the UNHCR emergency line immediately.</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:000" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Call 000 (Australia)
              </a>
              <a href="tel:+41227398111" className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                UNHCR: +41 22 739 8111
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
