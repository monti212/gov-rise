import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Paperclip, Search, Filter, ChevronDown, Clock, FileText, PlusCircle, Share2, Video, CheckCircle } from 'lucide-react';
import { useRealtime } from '../context/RealtimeContext';

// Australian shared documents
const sharedDocuments = [
  {
    id: 1,
    name: 'Rahman Family Australian Partner Visa Documents.pdf',
    size: '8.5 MB',
    type: 'PDF',
    owner: 'David Wilson',
    shared: 'Oct 15, 2024',
    collaborators: 4
  },
  {
    id: 2,
    name: 'Australian Embassy Interview Notes.docx',
    size: '1.2 MB',
    type: 'Document',
    owner: 'Priya Sharma',
    shared: 'Oct 12, 2024',
    collaborators: 3
  },
  {
    id: 3,
    name: 'Translated Australian Certificates.zip',
    size: '14.3 MB',
    type: 'Archive',
    owner: 'James Thompson',
    shared: 'Oct 10, 2024',
    collaborators: 5
  },
  {
    id: 4,
    name: 'Australian Visa Status Updates.xlsx',
    size: '3.7 MB',
    type: 'Spreadsheet',
    owner: 'David Wilson',
    shared: 'Oct 8, 2024',
    collaborators: 7
  }
];

// Australian upcoming events
const events = [
  {
    id: 1,
    title: 'Australian Case Review Meeting',
    date: 'Nov 25, 2024',
    time: '10:00 AM - 11:30 AM AEST',
    type: 'Virtual Meeting',
    attendees: 5
  },
  {
    id: 2,
    title: 'Embassy Interview Preparation - Rahman Family',
    date: 'Nov 27, 2024',
    time: '2:00 PM - 3:30 PM AEST',
    type: 'Virtual Meeting',
    attendees: 6
  },
  {
    id: 3,
    title: 'Australian Document Submission Deadline',
    date: 'Dec 5, 2024',
    time: 'All Day',
    type: 'Deadline',
    attendees: null
  },
  {
    id: 4,
    title: 'Australian Visa Monthly Progress Review',
    date: 'Dec 10, 2024',
    time: '9:00 AM - 11:00 AM AEST',
    type: 'Conference Room A',
    attendees: 8
  }
];

// Australian partner organizations
const partnerOrganizations = [
  {
    id: 1,
    name: 'Australian Legal Aid',
    type: 'Legal Services',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 2,
    name: 'Refugee Council of Australia',
    type: 'NGO',
    logo: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 3,
    name: 'Australian Multicultural Foundation',
    type: 'Family Services',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 4,
    name: 'Department of Home Affairs',
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80'
  }
];

export const Collaboration = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const { teamMembers, cases, messagesThisWeek, sharedDocuments } = useRealtime();
  
  // Filtered cases based on search and filters
  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = 
      caseItem.family.toLowerCase().includes(searchTerm.toLowerCase()) || 
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = 
      filterPriority === 'all' || 
      caseItem.priority.toLowerCase() === filterPriority.toLowerCase();
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Australian Visa Collaboration Center</h1>
        <p className="text-gray-600">Collaborate with team members and partners to manage Australian family visa cases efficiently.</p>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-md bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>
            <span className="text-sm font-medium flex items-center text-green-600">
              <ChevronDown className="h-3 w-3 mr-1 transform rotate-180" />
              +12%
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{teamMembers.filter(m => m.status === 'online').length}</h3>
            <p className="text-gray-500 text-sm">Active Team Members</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-md bg-green-50 text-green-600">
              <FileText size={20} />
            </div>
            <span className="text-sm font-medium flex items-center text-green-600">
              <ChevronDown className="h-3 w-3 mr-1 transform rotate-180" />
              +5%
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{cases.length}</h3>
            <p className="text-gray-500 text-sm">Active Cases</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-md bg-purple-50 text-purple-600">
              <MessageSquare size={20} />
            </div>
            <span className="text-sm font-medium flex items-center text-green-600">
              <ChevronDown className="h-3 w-3 mr-1 transform rotate-180" />
              +18%
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{messagesThisWeek}</h3>
            <p className="text-gray-500 text-sm">Messages This Week</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-md bg-yellow-50 text-yellow-600">
              <Paperclip size={20} />
            </div>
            <span className="text-sm font-medium flex items-center text-red-600">
              <ChevronDown className="h-3 w-3 mr-1" />
              -3%
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{sharedDocuments}</h3>
            <p className="text-gray-500 text-sm">Shared Documents</p>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('cases')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cases'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Cases
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'team'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Shared Documents
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Events
          </button>
        </nav>
      </div>
      
      {/* Search & Filters */}
      {activeTab === 'cases' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="md:flex justify-between">
            <div className="relative mb-4 md:mb-0 md:w-1/3">
              <input
                type="text"
                placeholder="Search Australian visa cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex space-x-4">
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
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Active Australian Visa Cases</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                <PlusCircle size={16} className="mr-2" />
                New Case
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Family
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {caseItem.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caseItem.family}</div>
                        <div className="text-xs text-gray-500">{caseItem.members} members</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          caseItem.priority === 'High' ? 'bg-red-100 text-red-800' :
                          caseItem.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${caseItem.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">{caseItem.progress}% complete</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                          <button className="text-blue-600 hover:text-blue-900">Share</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Australian Visa Team Members</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                <PlusCircle size={16} className="mr-2" />
                Invite Member
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {teamMembers.map(member => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${member.avatarColor} rounded-full flex items-center justify-center ${member.textColor} font-medium mr-3`}>
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <span className={`inline-flex h-2 w-2 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Clock size={14} className="mr-1" />
                    <span>Last active: {member.lastActive}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Australian Visas</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Documentation</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-50 transition-colors">
                      Message
                    </button>
                    <button className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-3">Australian Partner Organizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {partnerOrganizations.map(org => (
                  <div key={org.id} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                    <img 
                      src={org.logo} 
                      alt={org.name} 
                      className="w-10 h-10 object-cover rounded-full mr-3" 
                    />
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{org.name}</h4>
                      <p className="text-xs text-gray-500">{org.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Shared Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Australian Visa Documents</h2>
              <div className="flex space-x-3">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Paperclip size={16} className="mr-2" />
                  Upload
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                  <Share2 size={16} className="mr-2" />
                  Request Documents
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shared
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collaborators
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sharedDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-md text-blue-600 flex items-center justify-center">
                            <FileText size={16} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs text-gray-500">{doc.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.shared}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-2">
                            {[...Array(Math.min(doc.collaborators, 3))].map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                                {String.fromCharCode(65 + i)}
                              </div>
                            ))}
                          </div>
                          {doc.collaborators > 3 && (
                            <span className="text-xs text-gray-500">+{doc.collaborators - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Download</button>
                          <button className="text-blue-600 hover:text-blue-900">Share</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing {sharedDocuments.length} of {sharedDocuments.length} documents</p>
            </div>
          </div>
        )}
        
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Australian Visa Events</h2>
              <div className="flex space-x-3">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Calendar size={16} className="mr-2" />
                  View Calendar
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                  <PlusCircle size={16} className="mr-2" />
                  Schedule Event
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {events.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="sm:flex justify-between items-start">
                    <div className="mb-3 sm:mb-0">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{event.date}, {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{event.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end">
                      {event.attendees && (
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Users size={14} className="mr-1" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        {event.type === 'Virtual Meeting' && (
                          <button className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 transition-colors flex items-center">
                            <Video size={14} className="mr-1" />
                            Join
                          </button>
                        )}
                        <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-5 border-t border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <Video size={18} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Start Video Meeting</span>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <Calendar size={18} className="text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Schedule Embassy Interview</span>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <CheckCircle size={18} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Send Visa Update</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Integration Hub */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="md:flex items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Australian External Systems Integration
            </h3>
            <p className="text-blue-700 mb-4">
              Connect with Department of Home Affairs, embassy systems, legal platforms, and translation services to streamline the Australian visa process.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-800">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Secure data sharing</span>
              </div>
              <div className="flex items-center text-blue-800">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Automated updates</span>
              </div>
              <div className="flex items-center text-blue-800">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Real-time notifications</span>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-white text-blue-600 border border-blue-300 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              Explore Integration Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};