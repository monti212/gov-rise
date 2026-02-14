import React, { useState } from 'react';
import { Search, MessageCircle, HelpCircle, FileText, Phone, Mail, Clock, ChevronDown, CheckCircle, AlertCircle, User, BookOpen, MapPin, Filter } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChatInterface } from '../components/Chat/ChatInterface';

// Australian support tickets
const tickets = [
  {
    id: 'T-1234',
    subject: 'Australian Partner Visa Requirements',
    status: 'Open',
    priority: 'Medium',
    category: 'Documentation',
    createdAt: 'Jul 10, 2024',
    lastUpdated: '2 days ago',
    assignedTo: 'Support Team'
  },
  {
    id: 'T-1235',
    subject: 'Interview Scheduling for Australian Embassy',
    status: 'In Progress',
    priority: 'High',
    category: 'Interviews',
    createdAt: 'Jul 12, 2024',
    lastUpdated: '1 day ago',
    assignedTo: 'Support Team'
  },
];

// Australian FAQs
const faqs = [
  {
    id: 1,
    question: 'What documents are required for an Australian partner visa?',
    answer: 'For Australian partner visas (subclasses 309/100 or 820/801), you need identity documents (passport, birth certificate), relationship evidence (joint accounts, photos, lease agreements), character documents (police clearances), health examinations, Form 47SP (application), Form 40SP (sponsorship), and evidence of genuine relationship. For de facto relationships, you must provide evidence of 12 months of cohabitation unless registered or exceptional circumstances exist.',
    category: 'Documentation'
  },
  {
    id: 2,
    question: 'How long does the Australian partner visa process usually take?',
    answer: 'Processing times for Australian partner visas vary significantly. As of 2023-24, partner visas (subclasses 309/100 for offshore applicants) take approximately 12-24 months to process. Onshore partner visas (subclasses 820/801) typically take 18-30 months. These timeframes are affected by application volumes, completeness of documentation, and additional processing requirements like security checks.',
    category: 'Process'
  },
  {
    id: 3,
    question: 'What happens during the Australian embassy interview?',
    answer: 'The Australian embassy interview verifies your identity, relationship to the family member, and application details. Questions typically focus on your relationship history, living arrangements, and future plans. Both partners may be interviewed separately to verify consistency in responses. Bring original documents and be prepared to explain any unusual circumstances in your relationship or application.',
    category: 'Interviews'
  },
  {
    id: 4,
    question: 'How can I check the status of my Australian visa application?',
    answer: 'You can check your Australian visa application status through your ImmiAccount, which provides real-time updates. Alternatively, you can contact the Department of Home Affairs using your Transaction Reference Number (TRN) or application ID. For applications lodged through an agent, your migration agent can check the status on your behalf.',
    category: 'Application Status'
  },
  {
    id: 5,
    question: 'What is the split family provision for refugees in Australia?',
    answer: 'The split family provision allows refugees in Australia to propose immediate family members (spouse/de facto partner and dependent children) for a Class XB visa under Australia\'s Humanitarian Program. The relationship must have existed before the proposer arrived in Australia and been declared to the Department. Applications are made using Form 681, and there is no visa application charge.',
    category: 'Humanitarian Visas'
  }
];

// Australian knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'Complete Guide to Australian Partner Visas',
    excerpt: 'Comprehensive information about Partner visa subclasses 309/100 and 820/801, including requirements, documentation, and process.',
    category: 'Visas',
    readTime: '12 min read',
    author: 'Immigration Team',
    date: 'Jul 5, 2024'
  },
  {
    id: 2,
    title: 'Preparing for Your Australian Embassy Interview',
    excerpt: 'Essential tips and guidelines to help you succeed in your Australian partner visa interview.',
    category: 'Interviews',
    readTime: '8 min read',
    author: 'Immigration Team',
    date: 'Jul 7, 2024'
  },
  {
    id: 3,
    title: 'Understanding Australian Parent Visa Options',
    excerpt: 'A comparison of standard and contributory parent visa options for Australia, including costs, wait times, and requirements.',
    category: 'Visas',
    readTime: '10 min read',
    author: 'Immigration Team',
    date: 'Jul 10, 2024'
  },
  {
    id: 4,
    title: 'Split Family Provisions for Refugees in Australia',
    excerpt: 'Information on how refugees in Australia can bring immediate family members under the humanitarian program.',
    category: 'Humanitarian',
    readTime: '7 min read',
    author: 'Immigration Team',
    date: 'Jul 12, 2024'
  }
];

// Australian support contacts
const supportContacts = [
  {
    id: 1,
    name: 'Australian Visa Support',
    department: 'Family Visa Team',
    email: 'support@govrise.org',
    phone: '+61 2 1234 5678',
    hours: 'Mon-Fri, 9:00 AM - 5:00 PM AEST'
  },
  {
    id: 2,
    name: 'Document Assistance',
    department: 'Documentation Team',
    email: 'documents@govrise.org',
    phone: '+61 2 2345 6789',
    hours: 'Mon-Fri, 8:30 AM - 4:30 PM AEST'
  },
  {
    id: 3,
    name: 'Australian Legal Support',
    department: 'Legal Department',
    email: 'legal@govrise.org',
    phone: '+61 2 3456 7890',
    hours: 'Tue & Thu, 10:00 AM - 3:00 PM AEST'
  }
];

export const SupportSystem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      ticket.status.toLowerCase() === filterStatus.toLowerCase();
    
    const matchesPriority = 
      filterPriority === 'all' || 
      ticket.priority.toLowerCase() === filterPriority.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq => 
    searchTerm === '' || 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter knowledge base articles based on search
  const filteredArticles = knowledgeBaseArticles.filter(article => 
    searchTerm === '' || 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatWithAI = () => {
    setActiveTab('chat');
  };

  const handleCreateTicket = () => {
    navigate('/no-data?action=Create Support Ticket&source=support-system');
  };

  const handleScheduleConsultation = () => {
    navigate('/no-data?action=Schedule Consultation&source=support-system');
  };

  const handleBrowseArticles = () => {
    setActiveTab('knowledge');
  };

  const handleStartChat = () => {
    setActiveTab('chat');
  };

  const handleNewTicket = () => {
    navigate('/no-data?action=Create New Ticket&source=support-system');
  };

  const handleViewTicket = (ticketId: string) => {
    navigate(`/no-data?action=View Ticket ${ticketId}&source=support-system`);
  };

  const handleUpdateTicket = (ticketId: string) => {
    navigate(`/no-data?action=Update Ticket ${ticketId}&source=support-system`);
  };

  const handleUploadFiles = () => {
    navigate('/no-data?action=Upload Documents&source=support-system');
  };

  const handleCheckTicketStatus = () => {
    navigate('/no-data?action=Check Ticket Status&source=support-system');
  };

  const handleSubmitTicket = () => {
    navigate('/no-data?action=Submit Support Ticket&source=support-system');
  };

  const handleReadArticle = (articleTitle: string) => {
    navigate(`/no-data?action=${encodeURIComponent(`Read Article: ${articleTitle}`)}&source=support-system`);
  };

  const handleConnectHumanAgent = () => {
    navigate('/no-data?action=Connect with Human Agent&source=support-system');
  };

  const handleCallNow = (contactName: string) => {
    navigate(`/no-data?action=${encodeURIComponent(`Call ${contactName}`)}&source=support-system`);
  };

  const handleEmail = (contactName: string) => {
    navigate(`/no-data?action=${encodeURIComponent(`Email ${contactName}`)}&source=support-system`);
  };

  const handleViewOnMap = (officeName: string) => {
    navigate(`/no-data?action=${encodeURIComponent(`View ${officeName} on Map`)}&source=support-system`);
  };

  const handleEmergencySupport = () => {
    navigate('/no-data?action=Emergency Support&source=support-system');
  };

  const handleBrowseTemplates = () => {
    navigate('/no-data?action=Browse Australian Visa Form Templates&source=support-system');
  };

  const handleViewVideoLibrary = () => {
    navigate('/no-data?action=View Video Tutorial Library&source=support-system');
  };

  const handleJoinCommunity = () => {
    navigate('/no-data?action=Join Australian Immigration Community&source=support-system');
  };

  const handleSubmitFeedback = () => {
    navigate('/no-data?action=Submit Support Feedback&source=support-system');
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Support System</h1>
        <p className="text-gray-600">Get assistance with your family reunification process for Australia through our comprehensive support resources.</p>
      </div>
      
      {/* Quick Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-medium text-gray-800">Chat with AI Assistant</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Get instant answers to common questions about Australian family visas and reunification.</p>
          <button 
            onClick={handleStartChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors"
          >
            Start Chat
          </button>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-50 rounded-md text-green-600 mr-3">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-medium text-gray-800">Create Support Ticket</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Submit a detailed request for assistance with your Australian visa application.</p>
          <button 
            onClick={handleCreateTicket}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium transition-colors"
          >
            New Ticket
          </button>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-purple-50 rounded-md text-purple-600 mr-3">
              <Phone size={20} />
            </div>
            <h3 className="font-medium text-gray-800">Schedule Consultation</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Book a one-on-one session with an Australian visa specialist or legal advisor.</p>
          <button 
            onClick={handleScheduleConsultation}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm font-medium transition-colors"
          >
            Book Appointment
          </button>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-orange-50 rounded-md text-orange-600 mr-3">
              <FileText size={20} />
            </div>
            <h3 className="font-medium text-gray-800">Australian Visa Knowledge Base</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">Browse our extensive documentation on Australian family and humanitarian visas.</p>
          <button 
            onClick={handleBrowseArticles}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm font-medium transition-colors"
          >
            Browse Articles
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for help with Australian visa questions..."
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
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Support Tickets
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
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'knowledge'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'chat'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Live Chat
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contact Info
          </button>
        </nav>
      </div>
      
      {/* Ticket Filters - Only shown for the tickets tab */}
      {activeTab === 'tickets' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="md:flex justify-between items-center">
            <h3 className="font-medium text-gray-800 mb-3 md:mb-0">Filter Tickets:</h3>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Support Tickets Tab */}
        {activeTab === 'tickets' && (
          <div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Australian Visa Support Tickets</h2>
              <button 
                onClick={handleNewTicket}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <MessageCircle size={16} className="mr-2" />
                New Ticket
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ticket.subject}</div>
                        <div className="text-xs text-gray-500">Created on {ticket.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'Pending' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewTicket(ticket.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleUpdateTicket(ticket.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-10 text-center">
                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-700 mb-1">No tickets found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 md:flex justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-500">Need to upload documents for your Australian visa application?</p>
                <button 
                  onClick={handleUploadFiles}
                  className="flex items-center mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  <FileText size={16} className="mr-1" />
                  <span>Upload Files</span>
                </button>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center text-gray-500 text-sm mr-6">
                  <div className="mr-2 w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Average response time: 12 hours</span>
                </div>
                <div>
                  <button 
                    onClick={handleCheckTicketStatus}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Check Ticket Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Australian Visa Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to the most common questions about the Australian family reunification process.</p>
            </div>
            
            <div className="space-y-2">
              {filteredFaqs.map((faq, index) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <HelpCircle size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Was this answer helpful?</div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-50">
                            Yes
                          </button>
                          <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm hover:bg-gray-100">
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-blue-900">Can't find answers to your Australian visa questions?</h3>
                  <p className="text-blue-700">Submit a support ticket and our team will assist you personally.</p>
                </div>
                <button 
                  onClick={handleSubmitTicket}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Submit a Ticket
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Australian Immigration Knowledge Base</h2>
              <p className="text-gray-600">Browse our library of articles, guides, and resources for Australian visa applications.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.map(article => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3 flex-shrink-0">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="mr-2">{article.category}</span>
                        <span className="mr-2">•</span>
                        <Clock size={12} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      By {article.author} • {article.date}
                    </div>
                    <button 
                      onClick={() => handleReadArticle(article.title)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <h3 className="font-medium text-gray-800 mb-2">Popular Categories</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                    Partner Visas
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                    Parent Visas
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                    Humanitarian
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                    Documentation
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <h3 className="font-medium text-blue-900 mb-2">Australian Visa Updates</h3>
                <p className="text-blue-700 text-sm mb-2">Stay updated with the latest changes to Australian immigration policy</p>
                <button className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded text-sm font-medium hover:bg-blue-100 transition-colors">
                  View Latest
                </button>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                <h3 className="font-medium text-green-900 mb-2">Subscribe to Updates</h3>
                <p className="text-green-700 text-sm mb-2">Get notified about Australian immigration changes</p>
                <button className="bg-white text-green-600 border border-green-300 px-4 py-2 rounded text-sm font-medium hover:bg-green-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Live Chat Tab */}
        {activeTab === 'chat' && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="md:flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 mb-2 md:mb-0">
                  Chat with our Australian Visa AI Assistant
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Online now</span>
                  </div>
                  <button 
                    onClick={handleConnectHumanAgent}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    Connect with Human Agent
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">About AI Assistant</h3>
                    <p className="text-blue-700 text-sm">
                      Our AI assistant can help answer questions about Australian family and humanitarian visas, 
                      document requirements, and general procedures. For complex issues or case-specific 
                      questions, please create a support ticket to connect with a human agent.
                    </p>
                  </div>
                </div>
              </div>
              
              <ChatInterface />
              
              <div className="mt-6">
                <div className="text-gray-600 text-sm mb-4">
                  <p className="font-medium mb-2">Common questions about Australian visas:</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      What documents do I need for a partner visa?
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      How long is the processing time in Australia?
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      What happens in an Australian embassy interview?
                    </button>
                    <button className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      How can I check my Australian visa status?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Australian Support Contact Information</h2>
              <p className="text-gray-600">Connect with our Australian visa experts through various channels.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {supportContacts.map(contact => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-1">{contact.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{contact.department}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 mr-3" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-500 mr-3" />
                      <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{contact.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex space-x-3">
                    <button 
                      onClick={() => handleCallNow(contact.name)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                    >
                      Call Now
                    </button>
                    <button 
                      onClick={() => handleEmail(contact.name)}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded font-medium hover:bg-gray-50 transition-colors"
                    >
                      Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Australian Offices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Sydney Office</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    123 Immigration Street<br />
                    Sydney, NSW 2000<br />
                    Australia
                  </p>
                  <button 
                    onClick={() => handleViewOnMap('Sydney Office')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    View on Map
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Melbourne Office</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    456 Visa Avenue<br />
                    Melbourne, VIC 3000<br />
                    Australia
                  </p>
                  <button 
                    onClick={() => handleViewOnMap('Melbourne Office')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    View on Map
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Brisbane Office</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    789 Migration Road<br />
                    Brisbane, QLD 4000<br />
                    Australia
                  </p>
                  <button 
                    onClick={() => handleViewOnMap('Brisbane Office')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-blue-900">Need Emergency Assistance?</h3>
                  <p className="text-blue-700">Our Australian support team is available for urgent visa inquiries.</p>
                </div>
                <button 
                  onClick={handleEmergencySupport}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Phone size={18} className="mr-2" />
                  Emergency Support
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Self-Help Resources */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Australian Visa Self-Help Resources</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
                <FileText size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Australian Visa Form Templates</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Access Form 47SP, Form 40SP, and other templates needed for Australian family visa applications.
            </p>
            <button 
              onClick={handleBrowseTemplates}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              Browse Templates
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-50 rounded-md text-green-600 mr-3">
                <BookOpen size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Video Tutorials</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Watch step-by-step guides for completing Australian visa applications and preparing for interviews.
            </p>
            <button 
              onClick={handleViewVideoLibrary}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              View Video Library
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-50 rounded-md text-purple-600 mr-3">
                <User size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Australian Immigration Community</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Connect with others applying for Australian family visas and share experiences.
            </p>
            <button 
              onClick={handleJoinCommunity}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
      
      {/* Feedback Section */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How was your Australian visa support experience?
          </h3>
          <p className="text-blue-700 mb-4">
            We're constantly working to improve our support system for Australian visa applicants. Please share your feedback.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            {[1, 2, 3, 4, 5].map(rating => (
              <button 
                key={rating}
                className="w-10 h-10 rounded-full bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center"
              >
                {rating}
              </button>
            ))}
          </div>
          <button 
            onClick={handleSubmitFeedback}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};