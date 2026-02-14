import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, Download, Calendar, Filter, RefreshCw, ChevronDown, Printer, Share2, FileText, Clock, Users, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, HelpCircle, ArrowRight, Globe, ArrowUpRight } from 'lucide-react';
import { exportData, shareContent, printContent } from '../utils/actions';

// Australian report summary data
const summaryStats = [
  {
    title: 'Total Active Cases',
    value: '12,572',
    change: '+12%',
    trend: 'up',
    icon: <Users size={20} />,
    color: 'blue'
  },
  {
    title: 'Avg. Processing Time',
    value: '15 months',
    change: '-2 months',
    trend: 'down',
    icon: <Clock size={20} />,
    color: 'green'
  },
  {
    title: 'Approval Rate',
    value: '72%',
    change: '+4%',
    trend: 'up',
    icon: <CheckCircle size={20} />,
    color: 'green'
  },
  {
    title: 'Pending Reviews',
    value: '3,214',
    change: '+8%',
    trend: 'up',
    icon: <AlertTriangle size={20} />,
    color: 'yellow'
  }
];

// Australian case status distribution
const statusDistribution = [
  { status: 'In Progress', count: 6543, color: 'bg-blue-500' },
  { status: 'Documentation Review', count: 3215, color: 'bg-yellow-500' },
  { status: 'Interview Scheduled', count: 1845, color: 'bg-purple-500' },
  { status: 'Final Approval', count: 821, color: 'bg-green-500' },
  { status: 'Delayed', count: 148, color: 'bg-red-500' }
];

// Country data for Australian visas
const countriesData = [
  { country: 'India', count: 3247, trend: 'up', change: '+12%' },
  { country: 'China', count: 2864, trend: 'up', change: '+8%' },
  { country: 'Philippines', count: 1953, trend: 'down', change: '-3%' },
  { country: 'Vietnam', count: 1642, trend: 'up', change: '+24%' },
  { country: 'Malaysia', count: 1236, trend: 'down', change: '-5%' },
  { country: 'Indonesia', count: 831, trend: 'stable', change: '0%' },
  { country: 'Sri Lanka', count: 629, trend: 'up', change: '+7%' }
];

// Processing time data for Australian visas
const timelineData = [
  { month: 'Jan', time: 18 },
  { month: 'Feb', time: 17 },
  { month: 'Mar', time: 17.5 },
  { month: 'Apr', time: 16 },
  { month: 'May', time: 15 },
  { month: 'Jun', time: 15 }
];

// Recent Australian visa reports
const recentReports = [
  {
    id: 'R-2456',
    title: 'Australian Partner Visa Monthly Summary',
    date: 'Oct 15, 2024',
    type: 'Automated',
    pages: 15,
    format: 'PDF'
  },
  {
    id: 'R-2455',
    title: 'Australian Processing Time Analysis',
    date: 'Oct 10, 2024',
    type: 'Custom',
    pages: 8,
    format: 'PDF'
  },
  {
    id: 'R-2452',
    title: 'Approval Rate by Country (Australia)',
    date: 'Oct 5, 2024',
    type: 'Automated',
    pages: 12,
    format: 'Excel'
  },
  {
    id: 'R-2448',
    title: 'Australian Documentation Compliance Audit',
    date: 'Sep 28, 2024',
    type: 'Custom',
    pages: 22,
    format: 'PDF'
  }
];

// Scheduled Australian reports
const scheduledReports = [
  {
    id: 'SR-001',
    title: 'Weekly Australian Visa Status Update',
    frequency: 'Weekly (Mondays)',
    recipients: 5,
    nextRun: 'Oct 21, 2024'
  },
  {
    id: 'SR-002',
    title: 'Australian Monthly Performance Dashboard',
    frequency: 'Monthly (1st)',
    recipients: 12,
    nextRun: 'Nov 1, 2024'
  },
  {
    id: 'SR-003',
    title: 'Quarterly Australian Compliance Report',
    frequency: 'Quarterly',
    recipients: 8,
    nextRun: 'Jan 15, 2025'
  }
];

export const Reports = () => {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('all');
  const [showingChart, setShowingChart] = useState('line');
  const [emailDelivery, setEmailDelivery] = useState(true);
  const [dashboardDelivery, setDashboardDelivery] = useState(true);
  const [apiDelivery, setApiDelivery] = useState(false);

  const handleExportReport = (format: 'pdf' | 'excel' | 'csv' = 'pdf') => {
    const reportData = {
      title: 'Australian Immigration Reports & Analytics',
      dateRange,
      reportType,
      summaryStats,
      statusDistribution,
      countriesData,
      timelineData,
      generatedAt: new Date().toISOString()
    };

    if (format === 'pdf') {
      const content = generateReportHTML(reportData);
      printContent('Australian Immigration Report', content);
    } else {
      exportData(reportData, `australian_immigration_report_${new Date().toISOString().split('T')[0]}`, format === 'excel' ? 'xlsx' : 'csv');
    }
  };

  const handleShareReport = () => {
    shareContent('Australian Immigration Reports & Analytics');
  };

  const handlePrintReport = (report: any) => {
    const content = `
      <h2>Report Details</h2>
      <p><strong>Report ID:</strong> ${report.id}</p>
      <p><strong>Title:</strong> ${report.title}</p>
      <p><strong>Type:</strong> ${report.type}</p>
      <p><strong>Date:</strong> ${report.date}</p>
      <p><strong>Pages:</strong> ${report.pages}</p>
      <p><strong>Format:</strong> ${report.format}</p>
      
      <h3>Report Summary</h3>
      <p>This is a ${report.type.toLowerCase()} report containing ${report.pages} pages of Australian immigration data and analysis.</p>
    `;
    
    printContent(report.title, content);
  };

  const handleDownloadReport = (report: any) => {
    const reportContent = {
      id: report.id,
      title: report.title,
      type: report.type,
      date: report.date,
      pages: report.pages,
      format: report.format,
      content: `This is the content for ${report.title}`,
      downloadedAt: new Date().toISOString()
    };

    exportData(reportContent, `${report.id}_${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`, 'json');
  };

  const handleShareReportLink = (report: any) => {
    shareContent(report.title, `${window.location.origin}/reports/${report.id}`);
  };

  const generateReportHTML = (data: any) => {
    return `
      <h2>Executive Summary</h2>
      <p>This report provides comprehensive analytics on Australian immigration cases for the period: ${data.dateRange} days.</p>
      
      <h2>Key Metrics</h2>
      <ul>
        ${data.summaryStats.map((stat: any) => `<li><strong>${stat.title}:</strong> ${stat.value} (${stat.change})</li>`).join('')}
      </ul>
      
      <h2>Case Status Distribution</h2>
      <ul>
        ${data.statusDistribution.map((status: any) => `<li><strong>${status.status}:</strong> ${status.count.toLocaleString()} cases</li>`).join('')}
      </ul>
      
      <h2>Top Countries by Application Volume</h2>
      <ul>
        ${data.countriesData.map((country: any) => `<li><strong>${country.country}:</strong> ${country.count.toLocaleString()} applications (${country.change})</li>`).join('')}
      </ul>
      
      <h2>Processing Time Trends</h2>
      <p>Average processing times have ${data.timelineData[data.timelineData.length - 1].time < data.timelineData[0].time ? 'decreased' : 'increased'} over the analyzed period.</p>
    `;
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Australian Immigration Reports & Analytics</h1>
        <p className="text-gray-600">Comprehensive metrics and insights on the Australian family reunification process.</p>
      </div>
      
      {/* Top Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="180">Last 6 months</option>
                <option value="365">Last year</option>
                <option value="custom">Custom range</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="cases">Australian Visa Reports</option>
                <option value="performance">Performance Reports</option>
                <option value="compliance">Compliance Reports</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw size={16} />
              <span>Refresh Data</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => handleExportReport('pdf')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-md ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                stat.color === 'red' ? 'bg-red-50 text-red-600' :
                'bg-yellow-50 text-yellow-600'
              }`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <TrendingDown className="h-3 w-3 mr-1" />
                }
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Processing Time Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <LineChart className="h-5 w-5 text-blue-600 mr-2" />
              Australian Visa Processing Time Trend
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowingChart('line')}
                className={`p-1 rounded ${showingChart === 'line' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LineChart size={18} />
              </button>
              <button 
                onClick={() => setShowingChart('bar')}
                className={`p-1 rounded ${showingChart === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BarChart3 size={18} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Current Average:</span> 15 months
              </div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                Decreased by 3 months from previous period
              </div>
            </div>
            
            <div className="h-64 w-full">
              <div className="relative h-full w-full bg-gray-50 rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full">
                  <div className="flex justify-between px-6">
                    {timelineData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-500 rounded-t-sm" 
                          style={{ 
                            height: `${(item.time / 20) * 200}px`,
                            width: '30px'
                          }}
                        ></div>
                        <span className="text-xs mt-1 text-gray-600">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-4 px-2">
                  {[20, 15, 10, 5, 0].map((value, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">{value}</span>
                      <div className="w-full border-t border-gray-200 border-dashed"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 flex justify-between">
              <span>Source: Department of Home Affairs</span>
              <span>Updated: Oct 18, 2024</span>
            </div>
          </div>
        </div>
        
        {/* Case Status Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <PieChart className="h-5 w-5 text-blue-600 mr-2" />
              Australian Visa Status Distribution
            </h2>
          </div>
          <div className="p-6">
            <div className="h-48 w-48 mx-auto mb-4 relative">
              {/* Simple pie chart visualization */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div style={{ width: '100%', height: '50%', background: '#3B82F6', transformOrigin: 'bottom left', transform: 'rotate(0deg)' }}></div>
                <div style={{ width: '100%', height: '50%', background: '#EAB308', transformOrigin: 'bottom left', transform: 'rotate(90deg)' }}></div>
                <div style={{ width: '100%', height: '50%', background: '#A855F7', transformOrigin: 'top left', transform: 'rotate(180deg)' }}></div>
                <div style={{ width: '100%', height: '50%', background: '#22C55E', transformOrigin: 'top right', transform: 'rotate(270deg)' }}></div>
                <div style={{ width: '20%', height: '20%', background: '#EF4444', position: 'absolute', bottom: '40%', right: '40%' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">12,572</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-sm ${item.color} mr-2`}></div>
                    <span className="text-sm text-gray-700">{item.status}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cases by Origin Country */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 flex items-center">
            <Globe className="h-5 w-5 text-blue-600 mr-2" />
            Australian Visa Applications by Country of Origin
          </h2>
          <div className="text-sm text-gray-500">
            Showing top 7 countries
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Cases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distribution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {countriesData.map((country, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {country.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {country.count.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(country.count / 3247) * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex ${
                        country.trend === 'up' ? 'text-green-600' : 
                        country.trend === 'down' ? 'text-red-600' : 
                        'text-gray-500'
                      }`}>
                        {country.trend === 'up' && <TrendingUp size={16} />}
                        {country.trend === 'down' && <TrendingDown size={16} />}
                        {country.trend === 'stable' && <ArrowRight size={16} />}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${
                        country.trend === 'up' ? 'text-green-600' : 
                        country.trend === 'down' ? 'text-red-600' : 
                        'text-gray-500'
                      }`}>
                        {country.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              View All Countries
            </button>
          </div>
        </div>
      </div>
      
      {/* Recent Reports & Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Reports */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Recent Australian Visa Reports
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md mr-3">
                    <FileText size={18} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <span className="text-xs text-gray-500">{report.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="mr-2">ID: {report.id}</span>
                      <span className="mr-2">•</span>
                      <span className="mr-2">Type: {report.type}</span>
                      <span className="mr-2">•</span>
                      <span>{report.pages} pages</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handlePrintReport(report)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Print"
                    >
                      <Printer size={16} />
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(report)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => handleShareReportLink(report)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Share"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button 
                onClick={() => handleExportReport('pdf')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Generate New Report
              </button>
            </div>
          </div>
        </div>
        
        {/* Scheduled Reports */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              Scheduled Australian Reports
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              Manage Schedule
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {scheduledReports.map((report, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">ID: {report.id}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {report.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">Next run:</span> {report.nextRun}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Recipients:</span> {report.recipients}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-800 mb-2">Report Delivery Options</h3>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    checked={emailDelivery}
                    onChange={(e) => setEmailDelivery(e.target.checked)}
                  />
                  <label htmlFor="email" className="ml-2 text-sm text-gray-700">Email</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="dashboard" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    checked={dashboardDelivery}
                    onChange={(e) => setDashboardDelivery(e.target.checked)}
                  />
                  <label htmlFor="dashboard" className="ml-2 text-sm text-gray-700">Dashboard</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="api" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={apiDelivery}
                    onChange={(e) => setApiDelivery(e.target.checked)}
                  />
                  <label htmlFor="api" className="ml-2 text-sm text-gray-700">API</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Builder */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Custom Australian Visa Report Builder
            </h2>
            <p className="text-blue-700">Create tailored reports with specific Australian immigration metrics, date ranges, and visualizations.</p>
          </div>
          <button 
            onClick={() => handleExportReport('pdf')}
            className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-100 transition-colors px-6 py-3 rounded-lg font-medium"
          >
            Build Custom Report
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Partner Visa Progress
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Processing Time
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Application Volume
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Approval Rates
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Country of Origin Analysis
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            + More
          </span>
        </div>
      </div>
      
      {/* Report Metrics Explanation */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800 flex items-center">
            <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
            Understanding Australian Visa Report Metrics
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Processing Time</h3>
              <p className="text-gray-600 text-sm">
                Processing time measures the average duration from Australian visa application submission to final decision. 
                The trend chart shows changes over time, with lower numbers indicating improved efficiency in the Department of Home Affairs.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Approval Rate</h3>
              <p className="text-gray-600 text-sm">
                The percentage of Australian visa applications that receive final approval. This metric helps identify potential
                bottlenecks or issues in the application process when analyzed alongside documentation completeness and country of origin.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Case Status Distribution</h3>
              <p className="text-gray-600 text-sm">
                Visualizes the current breakdown of all active Australian visa cases by their status in the processing pipeline.
                Useful for resource allocation and identifying bottlenecks in specific stages of the Australian immigration process.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Country Analysis</h3>
              <p className="text-gray-600 text-sm">
                Tracks application volume by country of origin for Australian visas, helping identify trends and allocate resources 
                for translation, cultural liaison services, and specific documentation requirements for applicants from different countries.
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-center">
            <a href="javascript:void(0)" className="text-blue-600 font-medium hover:underline">
              Read the complete Australian immigration metrics documentation
            </a>
          </div>
        </div>
      </div>
      
      {/* Data Export Options */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Australian Visa Data Export Options</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-50 rounded-md text-green-600 mr-3">
                <FileText size={20} />
              </div>
              <h3 className="font-medium text-gray-800">PDF Report</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Export a formatted report with charts, tables, and explanations of Australian visa data in PDF format.
            </p>
            <button 
              onClick={() => handleExportReport('pdf')}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <Download size={14} className="mr-1" />
              Export as PDF
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
                <FileText size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Excel Data</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Export raw Australian visa data in Excel format for further analysis and custom reporting.
            </p>
            <button 
              onClick={() => handleExportReport('excel')}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <Download size={14} className="mr-1" />
              Export as Excel
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-50 rounded-md text-purple-600 mr-3">
                <Share2 size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Share Report</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Share Australian visa reports directly with team members or external stakeholders via secure link.
            </p>
            <button 
              onClick={handleShareReport}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
            >
              <Share2 size={14} className="mr-1" />
              Generate Share Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};