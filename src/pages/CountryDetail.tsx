import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Users, AlertCircle, CheckCircle, Globe, MapPin, Phone, Mail } from 'lucide-react';

export const CountryDetail = () => {
  const navigate = useNavigate();
  const { country } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Australia-specific data
  const countryData = {
    name: 'Australia',
    flag: '🇦🇺',
    processingTime: '12-18 months',
    requirements: 'High',
    overview: 'Australia offers various family visa options under the Family Stream Migration Program, designed to reunite families with Australian citizens, permanent residents, and eligible New Zealand citizens.',
    visaTypes: [
      {
        name: 'Partner Visas (309/100 & 820/801)',
        description: 'For married spouses and de facto partners of Australian citizens or permanent residents',
        processingTime: '12-24 months',
        cost: 'AUD $8,085',
        requirements: ['Genuine relationship evidence', 'Health examinations', 'Character requirements', 'English language (some cases)']
      },
      {
        name: 'Child Visas (101 & 102)',
        description: 'For dependent children of Australian citizens or permanent residents',
        processingTime: '12-16 months',
        cost: 'AUD $2,855',
        requirements: ['Birth certificate', 'Dependency evidence', 'Health examinations', 'Character documents']
      },
      {
        name: 'Parent Visas (103 & 143)',
        description: 'For parents of Australian citizens or permanent residents',
        processingTime: '30+ years (103) / 3-4 years (143)',
        cost: 'AUD $4,850 (103) / AUD $47,755 (143)',
        requirements: ['Balance of family test', 'Health examinations', 'Character requirements', 'Assurance of support']
      },
      {
        name: 'Humanitarian (Split Family 202)',
        description: 'For immediate family members of refugees already in Australia',
        processingTime: '18-24 months',
        cost: 'No charge',
        requirements: ['Relationship existed before arrival', 'Declared to Department', 'Form 681', 'Identity documents']
      }
    ],
    keyRequirements: [
      {
        title: 'Identity Documents',
        description: 'Valid passport, birth certificate, national identity card',
        importance: 'Essential'
      },
      {
        title: 'Relationship Evidence',
        description: 'Marriage certificates, joint bank accounts, photos, correspondence',
        importance: 'Critical for Partner Visas'
      },
      {
        title: 'Health Examinations',
        description: 'Medical examinations by panel doctors approved by Australian Government',
        importance: 'Mandatory'
      },
      {
        title: 'Character Requirements',
        description: 'Police clearances from all countries lived in for 12+ months since age 16',
        importance: 'Mandatory'
      },
      {
        title: 'English Language',
        description: 'May be required for some visa types or can reduce visa costs',
        importance: 'Varies by visa type'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Eligibility Check',
        description: 'Confirm you meet the basic requirements for your chosen visa type',
        timeframe: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Document Preparation',
        description: 'Gather and prepare all required documents, including translations',
        timeframe: '4-8 weeks'
      },
      {
        step: 3,
        title: 'Online Application',
        description: 'Submit application through ImmiAccount with all supporting documents',
        timeframe: '1-2 days'
      },
      {
        step: 4,
        title: 'Biometrics & Medical',
        description: 'Complete biometric collection and health examinations if required',
        timeframe: '2-4 weeks'
      },
      {
        step: 5,
        title: 'Assessment',
        description: 'Department of Home Affairs reviews application and may request additional information',
        timeframe: '6-18 months'
      },
      {
        step: 6,
        title: 'Decision',
        description: 'Receive decision on visa application',
        timeframe: 'Varies'
      }
    ],
    contacts: [
      {
        name: 'Department of Home Affairs',
        type: 'Government Agency',
        phone: '131 881',
        email: 'info@homeaffairs.gov.au',
        website: 'https://immi.homeaffairs.gov.au',
        hours: '8:30 AM - 4:30 PM AEST'
      },
      {
        name: 'Australian Embassy (General)',
        type: 'Embassy',
        phone: 'Varies by location',
        email: 'Varies by location',
        website: 'https://www.dfat.gov.au',
        hours: 'Varies by location'
      }
    ],
    tips: [
      'Start document collection early as some documents take time to obtain',
      'Ensure all documents are certified copies or originals',
      'Get professional translations for non-English documents',
      'Keep detailed records of your relationship development for partner visas',
      'Consider engaging a registered migration agent for complex cases',
      'Apply for police clearances early as they have validity periods',
      'Keep your ImmiAccount updated with current contact details'
    ],
    updates: [
      {
        date: 'March 2024',
        title: 'Processing Time Changes',
        description: 'Updated processing times for partner visas now 12-24 months for most applications.'
      },
      {
        date: 'January 2024',
        title: 'Fee Increases',
        description: 'Visa application charges increased by 6% across most family visa categories.'
      },
      {
        date: 'November 2023',
        title: 'Health Examination Updates',
        description: 'New health examination requirements for certain countries introduced.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className="mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <span className="text-4xl mr-3">{countryData.flag}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{countryData.name} Immigration Details</h1>
                  <p className="text-gray-600">Complete guide to family reunification in Australia</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Average Processing Time</div>
              <div className="text-xl font-semibold text-blue-600">{countryData.processingTime}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">{countryData.overview}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Processing Time</span>
              </div>
              <p className="text-blue-700">12-24 months average</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Success Rate</span>
              </div>
              <p className="text-green-700">85% approval rate</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-900">Annual Intake</span>
              </div>
              <p className="text-purple-700">52,500 family visas</p>
            </div>
          </div>
        </div>

        {/* Visa Types */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Visa Types</h2>
          <div className="space-y-6">
            {countryData.visaTypes.map((visa, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{visa.name}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {visa.processingTime}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{visa.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Application Cost</h4>
                    <p className="text-gray-600">{visa.cost}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Key Requirements</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {visa.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-sm">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Requirements */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Requirements</h2>
            <div className="space-y-4">
              {countryData.keyRequirements.map((req, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-md mr-3 mt-1">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{req.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        req.importance === 'Essential' || req.importance === 'Mandatory' 
                          ? 'bg-red-100 text-red-800' 
                          : req.importance === 'Critical for Partner Visas'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {req.importance}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Process</h2>
            <div className="space-y-4">
              {countryData.process.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <span className="text-xs text-gray-500">{step.timeframe}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countryData.contacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-1">{contact.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{contact.type}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{contact.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{contact.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{contact.website}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{contact.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips and Recent Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Helpful Tips */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Helpful Tips</h2>
            <div className="space-y-3">
              {countryData.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Updates</h2>
            <div className="space-y-4">
              {countryData.updates.map((update, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900">{update.title}</h3>
                    <span className="text-xs text-gray-500">{update.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{update.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};