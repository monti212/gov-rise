import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, Play, FileText, MessageCircle, Lightbulb, Globe, Clock, CheckCircle, ArrowRight, ChevronDown, ChevronUp, Heart, Share2, ThumbsUp, ThumbsDown, Bookmark, ArrowUpRight, Smartphone, Video } from 'lucide-react';
import { downloadPDF, shareContent, printContent, saveBookmark, exportData } from '../utils/actions';
import { useNavigate } from 'react-router-dom';

export const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);

  // Categories
  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: <Lightbulb size={20} /> },
    { id: 'tutorials', name: 'Video Tutorials', icon: <Play size={20} /> },
    { id: 'user-guides', name: 'User Guides', icon: <BookOpen size={20} /> },
    { id: 'faq', name: 'FAQs', icon: <HelpCircle size={20} /> }
  ];

  // Australian getting started guides
  const gettingStartedGuides = [
    {
      id: 1,
      title: 'Overview of Australian Family Visas',
      description: 'Learn about the various family visa options available for Australia.',
      difficulty: 'Beginner',
      readTime: '5 min read',
      topics: ['visas', 'overview', 'Australia']
    },
    {
      id: 2,
      title: 'Setting Up Your Australian Visa Application',
      description: 'Complete your profile and configure your account settings for Australian applications.',
      difficulty: 'Beginner',
      readTime: '3 min read',
      topics: ['account', 'profile', 'settings']
    },
    {
      id: 3,
      title: 'Creating Your First Australian Partner Visa Application',
      description: 'Learn how to create and manage a new partner visa application for Australia.',
      difficulty: 'Beginner',
      readTime: '7 min read',
      topics: ['visa', 'management', 'documentation']
    },
    {
      id: 4,
      title: 'Understanding Australian Visa Timeline',
      description: 'A guide to the Australian partner visa timeline and key milestones.',
      difficulty: 'Intermediate',
      readTime: '6 min read',
      topics: ['timeline', 'milestones', 'process']
    }
  ];

  // Australian video tutorials
  const videoTutorials = [
    {
      id: 1,
      title: 'Australian Visa Platform Tour',
      description: 'A comprehensive tour of the GovRise platform for Australian visa applications.',
      duration: '8:25',
      thumbnail: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      title: 'Document Upload for Australian Partner Visas',
      description: 'Step-by-step guide to uploading and managing documents for Australian partner visas.',
      duration: '5:12',
      thumbnail: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      title: 'Working with Australian Visa Team Members',
      description: 'How to effectively collaborate with team members on Australian visa cases.',
      duration: '6:45',
      thumbnail: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      title: 'Australian Embassy Interview Preparation',
      description: 'Tips and advice for preparing for Australian immigration interviews.',
      duration: '10:30',
      thumbnail: 'https://images.unsplash.com/photo-1573497491765-55a64cc0144c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  // Australian user guides
  const userGuides = [
    {
      id: 1,
      title: 'Complete Australian Visa User Manual',
      description: 'The comprehensive guide to all features of the platform for Australian visa applications.',
      format: 'PDF',
      pages: 42,
      updated: 'Oct 10, 2024'
    },
    {
      id: 2,
      title: 'Australian Partner Visa Document Requirements',
      description: 'Detailed information on document requirements for Australian partner visas.',
      format: 'PDF',
      pages: 18,
      updated: 'Oct 5, 2024'
    },
    {
      id: 3,
      title: 'Australian Visa Case Worker Quick Reference',
      description: 'A handy reference guide for case workers with common tasks and procedures for Australian visas.',
      format: 'PDF',
      pages: 12,
      updated: 'Sep 28, 2024'
    },
    {
      id: 4,
      title: 'Australian Immigration Reporting Guide',
      description: 'How to use the reporting system to generate insights about your Australian visa cases.',
      format: 'PDF',
      pages: 15,
      updated: 'Sep 22, 2024'
    }
  ];

  // Australian FAQs
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password. If you don\'t receive the email, check your spam folder or contact support.',
      category: 'Account'
    },
    {
      id: 2,
      question: 'How can I invite team members to collaborate on an Australian visa case?',
      answer: 'You can invite team members from the case details page. Click on the "Collaborators" tab, then click "Add Collaborator". Enter their email address and select the appropriate permission level. They will receive an email invitation to join the case.',
      category: 'Collaboration'
    },
    {
      id: 3,
      question: 'What file formats are supported for Australian visa document uploads?',
      answer: 'The platform supports PDF, JPG, PNG, and TIFF formats for document uploads. Each file should be less than 5MB in size. For larger documents, we recommend splitting them into multiple files or compressing them before uploading.',
      category: 'Documents'
    },
    {
      id: 4,
      question: 'How can I generate an Australian visa status report?',
      answer: 'To generate an Australian visa status report, go to the Reports section, select "Case Status Report" from the report types, choose the cases you want to include, select your preferred format (PDF or Excel), and click "Generate Report".',
      category: 'Reports'
    },
    {
      id: 5,
      question: 'Can I use the platform on mobile devices?',
      answer: 'Yes, the GovRise platform is fully responsive and works on smartphones and tablets. You can also download our dedicated mobile app for iOS and Android for an optimized mobile experience with additional features like push notifications.',
      category: 'Access'
    },
    {
      id: 6,
      question: 'How is my data protected when applying for Australian visas?',
      answer: 'We employ industry-standard security measures including encryption, secure access controls, regular security audits, and compliance with Australian and international data protection regulations. All data is encrypted both in transit and at rest.',
      category: 'Security'
    }
  ];

  // Australian glossary terms
  const glossaryTerms = [
    {
      term: 'Partner Visa',
      definition: 'Australian visas (subclasses 309/100 or 820/801) that allow the spouse or de facto partner of an Australian citizen, permanent resident, or eligible New Zealand citizen to live in Australia.'
    },
    {
      term: 'Bridging Visa',
      definition: 'A temporary visa that allows you to remain lawfully in Australia after your current substantive visa ceases and while your new visa application is being processed.'
    },
    {
      term: 'Genuine Relationship',
      definition: 'A core requirement for partner visas where applicants must demonstrate that their relationship is genuine and continuing, not entered into solely for migration purposes.'
    },
    {
      term: 'ImmiAccount',
      definition: 'The Department of Home Affairs\' online application system used to apply for most Australian visas and to check application status.'
    },
    {
      term: 'Sponsor',
      definition: 'An Australian citizen, permanent resident, or eligible New Zealand citizen who supports a family member\'s visa application, often providing an undertaking of support.'
    },
    {
      term: 'TRN (Transaction Reference Number)',
      definition: 'A unique identifier assigned to an Australian visa application that can be used to check the status of the application.'
    }
  ];

  // Mobile app resources for Australian users
  const mobileAppResources = [
    {
      platform: 'iOS',
      appStoreName: 'App Store',
      appStoreUrl: 'javascript:void(0)',
      features: [
        'Australian visa status notifications',
        'Document scanning and upload',
        'Offline access to key information',
        'Secure messaging with team members'
      ]
    },
    {
      platform: 'Android',
      appStoreName: 'Google Play',
      appStoreUrl: 'javascript:void(0)',
      features: [
        'Australian visa status notifications',
        'Document scanning and upload',
        'Offline access to key information',
        'Secure messaging with team members'
      ]
    }
  ];

  // Download handler for user guides
  const handleDownloadGuide = (guide: typeof userGuides[0]) => {
    const content = `
      <h1>${guide.title}</h1>
      <p><strong>Description:</strong> ${guide.description}</p>
      <p><strong>Format:</strong> ${guide.format}</p>
      <p><strong>Pages:</strong> ${guide.pages}</p>
      <p><strong>Last Updated:</strong> ${guide.updated}</p>
      
      <h2>Document Overview</h2>
      <p>This comprehensive guide provides detailed information about Australian visa applications and processes.</p>
      
      <h2>Table of Contents</h2>
      <ol>
        <li>Introduction to Australian Immigration</li>
        <li>Family Visa Categories</li>
        <li>Application Procedures</li>
        <li>Document Requirements</li>
        <li>Processing Times and Expectations</li>
        <li>Common Challenges and Solutions</li>
        <li>Resources and Contacts</li>
      </ol>
      
      <h2>Key Features</h2>
      <ul>
        <li>Step-by-step instructions</li>
        <li>Practical examples and case studies</li>
        <li>Official forms and templates</li>
        <li>Contact information and resources</li>
        <li>Frequently asked questions</li>
      </ul>
      
      <h2>Important Notes</h2>
      <p>This guide is designed to assist with Australian visa applications. Always refer to the official Department of Home Affairs website for the most current information and requirements.</p>
    `;
    
    downloadPDF(guide.title, content);
  };

  // Video tutorial handler (simulate download/viewing)
  const handleWatchTutorial = (video: typeof videoTutorials[0]) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg text-white bg-blue-500 z-50';
    notification.textContent = `Opening video: ${video.title}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  // Guide expansion handler with download content
  const getGuideContent = (guide: typeof gettingStartedGuides[0]) => {
    switch (guide.title) {
      case 'Overview of Australian Family Visas':
        return `
          <h2>Australian Family Visa Categories</h2>
          <ul>
            <li>Partner Visas (309/100 & 820/801)</li>
            <li>Child Visas (101, 102, 445)</li>
            <li>Parent Visas (103, 173, 143, 884)</li>
            <li>Other Family Visas (114, 117, 835, 838)</li>
            <li>Humanitarian Split Family (202)</li>
          </ul>
          
          <h2>Key Requirements</h2>
          <p>All family visa applications require meeting health, character, and relationship requirements as applicable to the specific visa subclass.</p>
        `;
      case 'Setting Up Your Australian Visa Application':
        return `
          <h2>Initial Setup Steps</h2>
          <ol>
            <li>Create an ImmiAccount</li>
            <li>Complete your profile information</li>
            <li>Upload identity documents</li>
            <li>Set up payment methods</li>
            <li>Configure notification preferences</li>
          </ol>
          
          <h2>Important Tips</h2>
          <p>Ensure all information is accurate as changes may delay processing.</p>
        `;
      default:
        return `
          <h2>Getting Started Guide</h2>
          <p>This guide provides essential information for beginning your Australian visa application journey.</p>
          
          <h2>Next Steps</h2>
          <ul>
            <li>Review visa requirements</li>
            <li>Gather necessary documents</li>
            <li>Complete application forms</li>
            <li>Submit application</li>
          </ul>
        `;
    }
  };

  const handleDownloadGuideContent = (guide: typeof gettingStartedGuides[0]) => {
    const content = `
      <p><strong>Difficulty:</strong> ${guide.difficulty}</p>
      <p><strong>Read Time:</strong> ${guide.readTime}</p>
      <p><strong>Description:</strong> ${guide.description}</p>
      
      ${getGuideContent(guide)}
      
      <h2>Related Topics</h2>
      <ul>
        ${guide.topics.map(topic => `<li>${topic}</li>`).join('')}
      </ul>
    `;
    
    downloadPDF(guide.title, content);
  };

  // FAQ export handler
  const handleExportFAQs = () => {
    exportData(faqs, 'australian_visa_faqs', 'json');
  };

  const handleDownloadGlossary = () => {
    const content = `
      <h1>Australian Immigration Glossary</h1>
      <p>Essential terms and definitions for understanding Australian immigration processes.</p>
      
      ${glossaryTerms.map(term => `
        <h2>${term.term}</h2>
        <p>${term.definition}</p>
      `).join('')}
    `;
    
    downloadPDF('Australian Immigration Glossary', content);
  };

  // Navigation handlers for links
  const handleViewAllDocumentation = () => {
    navigate('/information-hub');
  };

  const handleViewAllVideos = () => {
    navigate('/training');
  };

  const handleViewAllGuides = () => {
    // Create a comprehensive guide with all getting started content
    const allGuidesContent = gettingStartedGuides.map(guide => `
      <h1>${guide.title}</h1>
      <p><strong>Description:</strong> ${guide.description}</p>
      <p><strong>Difficulty:</strong> ${guide.difficulty}</p>
      <p><strong>Read Time:</strong> ${guide.readTime}</p>
      ${getGuideContent(guide)}
    `).join('<hr style="margin: 40px 0;">');
    
    downloadPDF('Australian Visa Getting Started Guides', allGuidesContent);
  };

  const handleViewAllFAQs = () => {
    navigate('/support?tab=faq');
  };

  // Filter based on search term
  const filterBySearch = (items: any[], searchFields: string[]) => {
    if (!searchTerm) return items;
    
    return items.filter(item => 
      searchFields.some(field => 
        item[field].toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredGuides = filterBySearch(gettingStartedGuides, ['title', 'description']);
  const filteredVideos = filterBySearch(videoTutorials, ['title', 'description']);
  const filteredManuals = filterBySearch(userGuides, ['title', 'description']);
  const filteredFaqs = filterBySearch(faqs, ['question', 'answer', 'category']);

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Australian Immigration Help Center</h1>
        <p className="text-gray-600">Find resources and guides to help you with Australian family visa applications.</p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for Australian visa help, articles, videos, and guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <div className="absolute right-3 top-3 text-xs text-gray-500">
            {searchTerm ? 'Press Enter to search' : 'Type to search'}
          </div>
        </div>
      </div>
      
      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <a 
            key={category.id} 
            href={`#${category.id}`}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
              {category.icon}
            </div>
            <h3 className="font-medium text-gray-800">{category.name}</h3>
          </a>
        ))}
      </div>
      
      {/* Getting Started Guides */}
      <div id="getting-started" className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="font-semibold text-gray-800">Getting Started with Australian Visas</h2>
            </div>
            <button 
              onClick={handleViewAllGuides}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Download All Guides
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {filteredGuides.length > 0 ? (
            <div className="space-y-4">
              {filteredGuides.map((guide, index) => (
                <div key={guide.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === index ? null : index)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{guide.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span className="mr-3">{guide.readTime}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                    </div>
                    {expandedGuide === index ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                  
                  {expandedGuide === index && (
                    <div className="px-4 py-3">
                      <p className="text-gray-600 mb-4">{guide.description}</p>
                      
                      {/* Content preview */}
                      <div className="space-y-3 mb-4">
                        <h4 className="font-medium text-gray-800">Key Points:</h4>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Understanding Australian visa options and requirements</li>
                          <li>Key features and navigational elements of the platform</li>
                          <li>Recommended workflow for optimal results</li>
                          <li>Tips for efficient use of the platform for Australian visas</li>
                        </ul>
                        
                        <h4 className="font-medium text-gray-800 pt-2">Related Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {guide.topics.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <ThumbsUp size={16} className="mr-1" />
                            <span className="text-sm">Helpful</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <ThumbsDown size={16} className="mr-1" />
                            <span className="text-sm">Not helpful</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => saveBookmark(guide.title)}
                            className="flex items-center text-gray-500 hover:text-gray-700"
                          >
                            <Bookmark size={16} className="mr-1" />
                            <span className="text-sm">Save</span>
                          </button>
                          <button 
                            onClick={() => shareContent(guide.title)}
                            className="flex items-center text-gray-500 hover:text-gray-700"
                          >
                            <Share2 size={16} className="mr-1" />
                            <span className="text-sm">Share</span>
                          </button>
                          <button 
                            onClick={() => handleDownloadGuideContent(guide)}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <FileText size={16} className="mr-1" />
                            <span className="text-sm">Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleViewAllGuides}
              className="text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              View all Australian visa guides
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Tutorials */}
      <div id="tutorials" className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Play className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="font-semibold text-gray-800">Australian Visa Video Tutorials</h2>
          </div>
        </div>
        
        <div className="p-6">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <button 
                        onClick={() => handleWatchTutorial(video)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Play className="h-6 w-6 text-blue-600 ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                    <button 
                      onClick={() => handleWatchTutorial(video)}
                      className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                    >
                      Watch Tutorial
                      <ArrowUpRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No videos found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleViewAllVideos}
              className="text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              Browse Australian visa video library
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* User Guides & Manuals */}
      <div id="user-guides" className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="font-semibold text-gray-800">Australian Visa Guides & Manuals</h2>
            </div>
            <button 
              onClick={() => {
                // Export all guides metadata
                exportData(userGuides, 'australian_visa_guides_list', 'json');
              }}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Export List
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {filteredManuals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredManuals.map((guide) => (
                <div key={guide.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="mb-3 flex items-center">
                    <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
                      <FileText size={20} />
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {guide.format}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{guide.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{guide.pages} pages</span>
                    <span>Updated: {guide.updated}</span>
                  </div>
                  <button 
                    onClick={() => handleDownloadGuide(guide)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleViewAllDocumentation}
              className="text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              View all Australian visa documentation
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Frequently Asked Questions */}
      <div id="faq" className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="font-semibold text-gray-800">Australian Visa Frequently Asked Questions</h2>
            </div>
            <button 
              onClick={handleExportFAQs}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Export FAQs
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {filteredFaqs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="p-1 bg-blue-50 rounded-full text-blue-600 mr-3 mt-0.5">
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No FAQs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleViewAllFAQs}
              className="text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              View all Australian visa FAQs
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Glossary */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="font-semibold text-gray-800">Australian Immigration Glossary</h2>
            </div>
            <button 
              onClick={handleDownloadGlossary}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Download Glossary
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossaryTerms.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-3">
                <h3 className="font-medium text-gray-900">{item.term}</h3>
                <p className="text-gray-600 text-sm">{item.definition}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleDownloadGlossary}
              className="text-blue-600 font-medium hover:underline inline-flex items-center"
            >
              View full Australian immigration glossary
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile App Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-blue-200">
          <div className="flex items-center">
            <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="font-semibold text-blue-800">Australian Visa Mobile App</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="md:flex justify-between items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                GovRise Australian Visa Mobile App
              </h3>
              <p className="text-blue-700 mb-4">
                Access your Australian visa application on the go with our mobile app. Stay updated with push notifications, upload documents, and manage your case from anywhere.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mobileAppResources.map((app, index) => (
                  <div key={index} className="bg-white rounded-lg border border-blue-200 p-4">
                    <h4 className="font-medium text-blue-800 mb-2">{app.platform} App</h4>
                    <ul className="text-sm text-blue-700 space-y-1 mb-3">
                      {app.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a 
                      href="javascript:void(0)" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Download from {app.appStoreName}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="w-60 h-80 bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-800 shadow-lg">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-b-lg z-10"></div>
                  <div className="h-full bg-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="h-12 w-12 mx-auto mb-2" />
                      <h4 className="font-bold">GovRise</h4>
                      <p className="text-sm">Australian Visa App</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Need Additional Help with Australian Visas?
            </h2>
            <p className="text-gray-600">
              Our Australian visa specialists are here to assist with your specific questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="javascript:void(0)" className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
              Live Chat
            </a>
            <a href="javascript:void(0)" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <HelpCircle className="h-5 w-5 mr-2" />
              Contact Australian Visa Support
            </a>
          </div>
        </div>
      </div>
      
      {/* Support Community */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
            <Globe size={24} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Join Our Australian Visa Community Forum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with other users, share experiences, and get advice on Australian visa applications from the GovRise community.
          </p>
        </div>
        <div className="flex justify-center">
          <a href="javascript:void(0)" className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Heart className="h-5 w-5 mr-2 text-pink-500" />
            Join the Community
          </a>
        </div>
      </div>
    </div>
  );
};