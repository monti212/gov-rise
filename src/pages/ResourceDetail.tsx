import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Share2, Clock, User, BookOpen, ExternalLink, Printer, Bookmark } from 'lucide-react';
import { downloadPDF, shareContent, printContent, saveBookmark } from '../utils/actions';

export const ResourceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get resource info from URL params
  const searchParams = new URLSearchParams(location.search);
  const resourceTitle = searchParams.get('title') || 'Resource';
  const resourceType = searchParams.get('type') || 'Documentation';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = () => {
    const resourceData = getResourceData(resourceTitle);
    const content = `
      <h2>About This Resource</h2>
      <p>${resourceData.description}</p>
      
      ${resourceData.content.sections.map(section => `
        <h2>${section.title}</h2>
        <p>${section.content}</p>
      `).join('')}
      
      <h2>Additional Resources</h2>
      <ul>
        ${resourceData.content.resources.map(resource => `<li>${resource}</li>`).join('')}
      </ul>
      
      <h2>Related Links</h2>
      <ul>
        ${resourceData.content.relatedLinks.map(link => `<li>${link}</li>`).join('')}
      </ul>
    `;
    
    downloadPDF(resourceData.title, content);
  };

  const handleShareResource = () => {
    shareContent(resourceTitle);
  };

  const handlePrintResource = () => {
    const resourceData = getResourceData(resourceTitle);
    const content = `
      <p><strong>Category:</strong> ${resourceData.category}</p>
      <p><strong>Last Updated:</strong> ${resourceData.lastUpdated}</p>
      <p><strong>Author:</strong> ${resourceData.author}</p>
      <p><strong>Read Time:</strong> ${resourceData.readTime}</p>
      
      <h2>Description</h2>
      <p>${resourceData.description}</p>
      
      ${resourceData.content.sections.map(section => `
        <h2>${section.title}</h2>
        <p>${section.content}</p>
      `).join('')}
      
      <h2>Additional Resources</h2>
      <ul>
        ${resourceData.content.resources.map(resource => `<li>${resource}</li>`).join('')}
      </ul>
    `;
    
    printContent(resourceData.title, content);
  };

  const handleSaveBookmark = () => {
    saveBookmark(resourceTitle);
  };

  // Mock resource data based on title
  const getResourceData = (title: string) => {
    const resources = {
      'Australian Family Visa Guide': {
        title: 'Australian Family Visa Guide',
        type: 'Documentation',
        author: 'Immigration Team',
        lastUpdated: 'October 2024',
        readTime: '12 min read',
        category: 'Legal Requirements',
        description: 'A comprehensive guide covering all aspects of Australian family visa applications, including requirements, processes, and helpful tips.',
        content: {
          sections: [
            {
              title: 'Introduction to Australian Family Visas',
              content: 'Australia\'s Family Stream Migration Program enables Australian citizens, permanent residents, and eligible New Zealand citizens to sponsor certain family members to come to Australia. The program is designed to reunite families while ensuring Australia\'s migration intake aligns with national interests.'
            },
            {
              title: 'Types of Family Visas',
              content: 'The main categories include Partner visas (subclasses 309/100 for offshore and 820/801 for onshore), Child visas (101, 102, 445), Parent visas (103, 173, 143, 884), and Other Family visas for specific relationships. Each has distinct requirements and processing procedures.'
            },
            {
              title: 'Eligibility Requirements',
              content: 'All family visa applications require proof of relationship, health examinations, character requirements, and meeting specific criteria for the visa subclass. Partner visas additionally require evidence of a genuine and continuing relationship.'
            },
            {
              title: 'Application Process',
              content: 'Applications are lodged online through ImmiAccount. The process involves document preparation, online submission, biometrics collection, health examinations, and assessment by the Department of Home Affairs. Processing times vary significantly by visa type.'
            },
            {
              title: 'Required Documentation',
              content: 'Essential documents include identity documents (passport, birth certificate), relationship evidence (marriage certificates, joint accounts, photos), character documents (police clearances), and health examination results. All non-English documents must be accompanied by certified translations.'
            },
            {
              title: 'Common Challenges and Solutions',
              content: 'Applicants often face challenges with relationship evidence, document authenticity, health examinations, and lengthy processing times. Proper preparation, engaging qualified migration agents, and maintaining detailed records can help overcome these challenges.'
            }
          ],
          resources: [
            'Form 47SP - Application for Migration to Australia by Other Family Members',
            'Form 40SP - Sponsorship for Migration to Australia',
            'Document Checklist for Family Visas',
            'Health Examination Requirements Guide',
            'Character Requirements Information'
          ],
          relatedLinks: [
            'Department of Home Affairs Website',
            'ImmiAccount Portal',
            'Find a Migration Agent',
            'Health Examination Panel Doctors',
            'Document Translation Services'
          ]
        }
      },
      'Document Checklist': {
        title: 'Document Checklist for Australian Family Visas',
        type: 'Checklist',
        author: 'Immigration Team',
        lastUpdated: 'September 2024',
        readTime: '8 min read',
        category: 'Documentation',
        description: 'Essential documents needed for Australian family visa applications, organized by visa type and applicant category.',
        content: {
          sections: [
            {
              title: 'Universal Documents (All Family Visas)',
              content: 'Every family visa application requires certain core documents: valid passport, birth certificate, national identity card (if available), passport-style photographs, and Form 80 (Personal Particulars for Assessment). These form the foundation of your application.'
            },
            {
              title: 'Partner Visa Specific Documents',
              content: 'Partner visas require extensive relationship evidence including marriage certificate (if married), evidence of cohabitation (lease agreements, utility bills), joint financial accounts, photos together spanning the relationship, correspondence between partners, and statements from family and friends.'
            },
            {
              title: 'Child Visa Documents',
              content: 'Child visa applications need birth certificate showing parent details, custody documents (if applicable), evidence of dependency, educational enrollment records, and consent from other parent (if not accompanying).'
            },
            {
              title: 'Parent Visa Documentation',
              content: 'Parent visas require proof of Australian citizen/permanent resident child, evidence of financial support arrangements, health insurance details, and balance of family test documentation showing more children in Australia than other countries.'
            },
            {
              title: 'Health and Character Requirements',
              content: 'All applicants must complete health examinations by approved panel doctors and provide police clearances from every country lived in for 12+ months since age 16. Military service records may also be required.'
            },
            {
              title: 'Document Preparation Tips',
              content: 'Ensure all documents are certified copies or originals, obtain certified translations for non-English documents, organize documents chronologically, and keep digital copies as backups. Quality document preparation significantly impacts application success.'
            }
          ],
          resources: [
            'Document Certification Guidelines',
            'Approved Translation Services',
            'Health Examination Locations',
            'Police Clearance Requirements by Country',
            'Photo Specification Guidelines'
          ],
          relatedLinks: [
            'Document Upload Portal',
            'Find Panel Doctors',
            'Translation Service Directory',
            'Police Clearance Information',
            'Certified Copy Services'
          ]
        }
      },
      'Home Affairs Contact Directory': {
        title: 'Department of Home Affairs Contact Directory',
        type: 'Contact Information',
        author: 'Immigration Team',
        lastUpdated: 'November 2024',
        readTime: '5 min read',
        category: 'Support',
        description: 'Complete contact information for Australian Department of Home Affairs offices and services.',
        content: {
          sections: [
            {
              title: 'National Contact Centre',
              content: 'The Department of Home Affairs operates a national contact centre accessible from within Australia on 131 881. International callers can use +61 2 6196 0196. The centre operates Monday to Friday, 8:30 AM to 4:30 PM Australian Eastern Time.'
            },
            {
              title: 'State and Territory Offices',
              content: 'Major cities have Department offices for in-person appointments: Sydney (Parramatta), Melbourne (Collins Street), Brisbane (Adelaide Street), Perth (Wellington Street), Adelaide (Grenfell Street), and Canberra (Civic). Appointments are required for most services.'
            },
            {
              title: 'Online Services',
              content: 'Most services are available through ImmiAccount at immi.homeaffairs.gov.au. This includes application lodgment, status checking, document upload, and communication with the Department. The portal is available 24/7 except during maintenance windows.'
            },
            {
              title: 'Embassy and Consulate Network',
              content: 'Australian embassies and consulates worldwide handle visa applications and provide consular services. Major posts include London, New York, Beijing, New Delhi, Jakarta, and Manila. Each has specific operating hours and appointment requirements.'
            },
            {
              title: 'Specialized Services',
              content: 'Dedicated contact lines exist for specific services: Global Feedback Unit for complaints (134 794), Freedom of Information requests, and urgent travel situations. Business hours and response times vary by service type.'
            },
            {
              title: 'Emergency Contacts',
              content: 'For urgent situations involving Australian citizens overseas, contact the Consular Emergency Centre on +61 2 6261 3305. For immigration emergencies within Australia, contact the status resolution service or local Department office.'
            }
          ],
          resources: [
            'Office Location Maps',
            'Appointment Booking System',
            'Emergency Contact Numbers',
            'Embassy Contact Database',
            'Service Hour Information'
          ],
          relatedLinks: [
            'Department of Home Affairs Website',
            'ImmiAccount Portal',
            'Embassy Locator',
            'Appointment Booking',
            'Emergency Services'
          ]
        }
      }
    };

    return resources[title as keyof typeof resources] || {
      title: title,
      type: resourceType,
      author: 'Immigration Team',
      lastUpdated: 'Recent',
      readTime: '5 min read',
      category: 'General',
      description: 'Information and guidance related to Australian immigration processes.',
      content: {
        sections: [
          {
            title: 'Overview',
            content: 'This resource provides important information about Australian immigration processes and requirements. It covers key aspects that applicants need to understand when navigating the family reunification system.'
          },
          {
            title: 'Key Information',
            content: 'Australian immigration operates under strict guidelines and requirements. All applicants must meet health, character, and relationship requirements as applicable to their visa type.'
          }
        ],
        resources: [
          'Official Forms and Documents',
          'Application Guidelines',
          'Processing Information'
        ],
        relatedLinks: [
          'Department of Home Affairs',
          'Support Services',
          'Additional Resources'
        ]
      }
    };
  };

  const resourceData = getResourceData(resourceTitle);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className="mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{resourceData.title}</h1>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {resourceData.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {resourceData.readTime}
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {resourceData.type}
                  </div>
                  <span>Updated {resourceData.lastUpdated}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleSaveBookmark}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                title="Save Bookmark"
              >
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={handlePrintResource}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                title="Print"
              >
                <Printer className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                title="Download PDF"
              >
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={handleShareResource}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resource Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-md mr-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">About This Resource</h2>
              <p className="text-blue-800">{resourceData.description}</p>
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-blue-200 text-blue-900 text-sm rounded-full">
                  {resourceData.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="prose max-w-none">
            {resourceData.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Additional Resources */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
            <div className="space-y-3">
              {resourceData.content.resources.map((resource, index) => (
                <div key={index} className="flex items-center">
                  <FileText className="h-4 w-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">{resource}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Links</h3>
            <div className="space-y-3">
              {resourceData.content.relatedLinks.map((link, index) => (
                <div key={index} className="flex items-center">
                  <ExternalLink className="h-4 w-4 text-blue-600 mr-3" />
                  <button className="text-blue-600 hover:text-blue-800 hover:underline text-left">
                    {link}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>
          <button 
            onClick={handleShareResource}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Resource
          </button>
        </div>
      </div>
    </div>
  );
};