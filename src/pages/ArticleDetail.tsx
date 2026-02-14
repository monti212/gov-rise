import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Bookmark, ThumbsUp, ThumbsDown, MessageCircle, Tag, Download, Printer } from 'lucide-react';
import { downloadPDF, shareContent, printContent, saveBookmark } from '../utils/actions';

export const ArticleDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get article info from URL params
  const searchParams = new URLSearchParams(location.search);
  const articleTitle = searchParams.get('title') || 'Article';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = () => {
    const articleData = getArticleData(articleTitle);
    downloadPDF(articleData.title, articleData.content);
  };

  const handleShareArticle = () => {
    shareContent(articleTitle);
  };

  const handlePrintArticle = () => {
    const articleData = getArticleData(articleTitle);
    printContent(articleData.title, articleData.content);
  };

  const handleSaveBookmark = () => {
    saveBookmark(articleTitle);
  };

  const handleThumbsUp = () => {
    // Simulate helpful feedback
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg text-white bg-green-500 z-50';
    notification.textContent = 'Thank you for your feedback!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleThumbsDown = () => {
    // Simulate not helpful feedback
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg text-white bg-blue-500 z-50';
    notification.textContent = 'We appreciate your feedback and will work to improve this content.';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleComment = () => {
    // Simulate comment functionality
    const comment = prompt('Add your comment:');
    if (comment) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 p-4 rounded-lg text-white bg-blue-500 z-50';
      notification.textContent = 'Comment submitted successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  // Mock article data
  const getArticleData = (title: string) => {
    const articles = {
      'Complete Guide to Australian Partner Visas': {
        title: 'Complete Guide to Australian Partner Visas',
        author: 'Immigration Team',
        publishDate: 'July 5, 2024',
        readTime: '12 min read',
        category: 'Visas',
        tags: ['partner visa', 'relationships', 'documentation', 'australia'],
        excerpt: 'Comprehensive information about Partner visa subclasses 309/100 and 820/801, including requirements, documentation, and process.',
        content: `
          <h2>Introduction to Australian Partner Visas</h2>
          <p>Australian partner visas allow the married spouses or de facto partners of Australian citizens, permanent residents, or eligible New Zealand citizens to live in Australia. The partner visa program is one of the most popular pathways for family reunification in Australia.</p>
          
          <h2>Types of Partner Visas</h2>
          <p>There are four main partner visa subclasses in Australia:</p>
          <ul>
            <li><strong>Subclass 309 (Partner Provisional visa):</strong> For partners applying offshore</li>
            <li><strong>Subclass 100 (Partner visa):</strong> The permanent visa granted after the provisional visa</li>
            <li><strong>Subclass 820 (Partner visa):</strong> For partners applying onshore (temporary)</li>
            <li><strong>Subclass 801 (Partner visa):</strong> The permanent visa granted after the temporary visa</li>
          </ul>
          
          <h2>Eligibility Requirements</h2>
          <p>To be eligible for a partner visa, you must:</p>
          <ul>
            <li>Be married to or in a de facto relationship with an Australian citizen, permanent resident, or eligible New Zealand citizen</li>
            <li>Have a genuine and continuing relationship</li>
            <li>Meet health and character requirements</li>
            <li>Be sponsored by your partner</li>
          </ul>
          
          <h2>Genuine Relationship Requirements</h2>
          <p>One of the most important aspects of partner visa applications is demonstrating that your relationship is genuine and continuing. The Department of Home Affairs assesses this based on four criteria:</p>
          <ol>
            <li><strong>Financial aspects:</strong> Joint bank accounts, shared expenses, financial dependence</li>
            <li><strong>Household aspects:</strong> Shared living arrangements, domestic responsibilities</li>
            <li><strong>Social context:</strong> How you present as a couple to friends, family, and the community</li>
            <li><strong>Commitment:</strong> Long-term plans, shared goals, mutual obligations</li>
          </ol>
          
          <h2>Required Documentation</h2>
          <p>Partner visa applications require extensive documentation, including:</p>
          <ul>
            <li>Identity documents (passport, birth certificate)</li>
            <li>Relationship evidence (marriage certificate, photos, correspondence)</li>
            <li>Joint financial documents (bank statements, leases, utility bills)</li>
            <li>Character documents (police clearances)</li>
            <li>Health examination results</li>
            <li>Form 47SP (application) and Form 40SP (sponsorship)</li>
          </ul>
          
          <h2>Processing Times and Costs</h2>
          <p>As of 2024, partner visa processing times are:</p>
          <ul>
            <li>Offshore applications (309/100): 12-24 months</li>
            <li>Onshore applications (820/801): 18-30 months</li>
          </ul>
          <p>The visa application charge is AUD $8,085 for most applicants, with additional costs for health examinations, police clearances, and document translations.</p>
          
          <h2>Common Challenges and Solutions</h2>
          <p>Many partner visa applications face challenges such as:</p>
          <ul>
            <li><strong>Insufficient relationship evidence:</strong> Start collecting evidence early and maintain detailed records</li>
            <li><strong>Language barriers:</strong> Use certified translation services for all non-English documents</li>
            <li><strong>Complex family situations:</strong> Consider engaging a registered migration agent</li>
            <li><strong>Long processing times:</strong> Apply for bridging visas if necessary and keep contact details updated</li>
          </ul>
          
          <h2>Tips for Success</h2>
          <p>To improve your chances of visa success:</p>
          <ul>
            <li>Provide comprehensive and well-organized evidence</li>
            <li>Be honest and consistent in all applications and interviews</li>
            <li>Respond promptly to any requests for additional information</li>
            <li>Keep detailed records of your relationship development</li>
            <li>Consider professional assistance for complex cases</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>While partner visa applications can be complex and time-consuming, proper preparation and understanding of the requirements can significantly improve your chances of success. Remember that each case is unique, and what works for one couple may not work for another. When in doubt, seek professional advice from a registered migration agent.</p>
        `,
        relatedArticles: [
          'Preparing for Your Australian Embassy Interview',
          'Understanding Australian Parent Visa Options',
          'Split Family Provisions for Refugees in Australia'
        ]
      },
      'Preparing for Your Australian Embassy Interview': {
        title: 'Preparing for Your Australian Embassy Interview',
        author: 'Immigration Team',
        publishDate: 'July 7, 2024',
        readTime: '8 min read',
        category: 'Interviews',
        tags: ['interviews', 'embassy', 'preparation', 'tips'],
        excerpt: 'Essential tips and guidelines to help you succeed in your Australian partner visa interview.',
        content: `
          <h2>Understanding the Interview Process</h2>
          <p>Embassy interviews are not required for all Australian visa applications, but may be requested in certain circumstances. When an interview is scheduled, it's typically to verify information in your application or to assess the genuineness of your relationship.</p>
          
          <h2>Who Might Be Called for an Interview?</h2>
          <p>Interviews may be requested for applications involving:</p>
          <ul>
            <li>Complex relationship circumstances</li>
            <li>Inconsistencies in application materials</li>
            <li>High-risk countries or regions</li>
            <li>First-time applicants from certain countries</li>
            <li>Cases requiring additional verification</li>
          </ul>
          
          <h2>Common Interview Questions</h2>
          <p>Partner visa interviews typically focus on:</p>
          <h3>Relationship History</h3>
          <ul>
            <li>How did you meet your partner?</li>
            <li>When did your relationship become serious?</li>
            <li>What attracted you to your partner?</li>
            <li>Describe your proposal or decision to live together</li>
          </ul>
          
          <h3>Daily Life Together</h3>
          <ul>
            <li>Describe a typical day when you're together</li>
            <li>How do you share household responsibilities?</li>
            <li>What do you do for entertainment together?</li>
            <li>How do you handle disagreements?</li>
          </ul>
          
          <h3>Future Plans</h3>
          <ul>
            <li>What are your plans once you arrive in Australia?</li>
            <li>Do you plan to have children?</li>
            <li>Where will you live in Australia?</li>
            <li>How will you support yourselves financially?</li>
          </ul>
          
          <h2>Preparation Strategies</h2>
          <h3>Before the Interview</h3>
          <ul>
            <li>Review your application thoroughly</li>
            <li>Practice with your partner to ensure consistency</li>
            <li>Prepare copies of all supporting documents</li>
            <li>Research the embassy location and procedures</li>
            <li>Plan your arrival time to avoid being late</li>
          </ul>
          
          <h3>During the Interview</h3>
          <ul>
            <li>Dress professionally and conservatively</li>
            <li>Arrive early and bring all required documents</li>
            <li>Be honest, direct, and consistent in your answers</li>
            <li>Take time to think before answering complex questions</li>
            <li>Maintain eye contact and speak clearly</li>
          </ul>
          
          <h2>What to Bring</h2>
          <p>Essential items for your interview:</p>
          <ul>
            <li>Valid passport and photocopies</li>
            <li>Interview appointment letter</li>
            <li>Original documents and certified copies</li>
            <li>Additional relationship evidence if available</li>
            <li>Translator if language assistance is needed</li>
          </ul>
          
          <h2>Red Flags to Avoid</h2>
          <p>Be careful to avoid:</p>
          <ul>
            <li>Inconsistent answers with your partner or application</li>
            <li>Seeming unprepared or unfamiliar with your partner's details</li>
            <li>Providing false or misleading information</li>
            <li>Appearing nervous or evasive</li>
            <li>Bringing unauthorized items to the embassy</li>
          </ul>
          
          <h2>After the Interview</h2>
          <p>Following your interview:</p>
          <ul>
            <li>The embassy may request additional documents</li>
            <li>Processing may continue for several months</li>
            <li>Keep your contact details updated</li>
            <li>Be patient while awaiting a decision</li>
          </ul>
          
          <h2>Final Tips</h2>
          <ul>
            <li>Be yourself and answer truthfully</li>
            <li>Remember that interviews are routine for many applications</li>
            <li>Focus on demonstrating the genuine nature of your relationship</li>
            <li>Stay calm and confident throughout the process</li>
          </ul>
        `,
        relatedArticles: [
          'Complete Guide to Australian Partner Visas',
          'Understanding Australian Parent Visa Options',
          'Document Preparation for Australian Visas'
        ]
      }
    };

    return articles[title as keyof typeof articles] || {
      title: title,
      author: 'Immigration Team',
      publishDate: 'Recent',
      readTime: '5 min read',
      category: 'General',
      tags: ['immigration', 'australia'],
      excerpt: 'Information about Australian immigration processes and requirements.',
      content: `
        <h2>Overview</h2>
        <p>This article provides important information about Australian immigration processes and requirements.</p>
        
        <h2>Key Points</h2>
        <p>Understanding the Australian immigration system is crucial for successful family reunification applications.</p>
        
        <p>For the most up-to-date information, always refer to the official Department of Home Affairs website.</p>
      `,
      relatedArticles: [
        'Australian Immigration Overview',
        'Family Visa Requirements',
        'Application Process Guide'
      ]
    };
  };

  const articleData = getArticleData(articleTitle);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleGoBack}
            className="mb-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
              {articleData.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{articleData.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{articleData.excerpt}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {articleData.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {articleData.readTime}
              </div>
              <span>{articleData.publishDate}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleSaveBookmark}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </button>
              <button 
                onClick={handlePrintArticle}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button 
                onClick={handleShareArticle}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: articleData.content }}
              />
            </div>

            {/* Tags */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {articleData.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Actions */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleThumbsUp}
                    className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful (23)
                  </button>
                  <button 
                    onClick={handleThumbsDown}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Not helpful
                  </button>
                  <button 
                    onClick={handleComment}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
                <span className="text-sm text-gray-500">Was this article helpful?</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-sm text-blue-600 hover:text-blue-800">
                    Introduction
                  </a>
                  <a href="#types" className="block text-sm text-blue-600 hover:text-blue-800">
                    Types of Partner Visas
                  </a>
                  <a href="#eligibility" className="block text-sm text-blue-600 hover:text-blue-800">
                    Eligibility Requirements
                  </a>
                  <a href="#documentation" className="block text-sm text-blue-600 hover:text-blue-800">
                    Required Documentation
                  </a>
                  <a href="#processing" className="block text-sm text-blue-600 hover:text-blue-800">
                    Processing Times
                  </a>
                  <a href="#tips" className="block text-sm text-blue-600 hover:text-blue-800">
                    Tips for Success
                  </a>
                </nav>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {articleData.relatedArticles.map((article, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/article-detail?title=${encodeURIComponent(article)}`)}
                      className="block text-sm text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                      {article}
                    </button>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Need More Help?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Get personalized assistance with your Australian visa application.
                </p>
                <button 
                  onClick={() => navigate('/support')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};