import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Clock, FileText, AlertCircle, CheckCircle, Info, X, LogOut } from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  jobTitle: string;
  phone: string;
  timeZone: string;
  language: string;
}

interface User {
  username: string;
  isAuthenticated: boolean;
  profile: UserProfile;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

interface Notification {
  id: string;
  type: 'case_update' | 'document_reminder' | 'interview' | 'policy_update' | 'system' | 'support' | 'training';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Sample Australian immigration notifications
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'case_update',
    title: 'Partner Visa Application Update',
    message: 'Your Australian Partner Visa application (ID: AU-PV-2024-1234) has moved to document review stage.',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'document_reminder',
    title: 'Document Submission Reminder',
    message: 'Police clearance certificates are due in 5 days for your Australian visa application.',
    timestamp: '1 day ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'interview',
    title: 'Embassy Interview Scheduled',
    message: 'Your interview at the Australian Embassy has been scheduled for December 15, 2024, 10:00 AM.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'high'
  },
  {
    id: '4',
    type: 'policy_update',
    title: 'Australian Immigration Policy Update',
    message: 'New processing time estimates released for Partner Visa applications: 12-24 months.',
    timestamp: '3 days ago',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'support',
    title: 'Support Ticket Response',
    message: 'Your support ticket about document translation has been resolved. View response.',
    timestamp: '4 days ago',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '6',
    type: 'training',
    title: 'Course Completion Certificate',
    message: 'Congratulations! Your certificate for "Australian Partner Visa Essentials" is ready for download.',
    timestamp: '5 days ago',
    isRead: true,
    priority: 'low'
  },
  {
    id: '7',
    type: 'system',
    title: 'Scheduled Maintenance',
    message: 'The Australian visa portal will undergo maintenance on November 30, 2024, 2:00-4:00 AM AEST.',
    timestamp: '1 week ago',
    isRead: false,
    priority: 'low'
  }
];

export const Header = ({ user, onLogout }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'case_update':
        return <FileText size={16} className="text-blue-600" />;
      case 'document_reminder':
        return <AlertCircle size={16} className="text-orange-600" />;
      case 'interview':
        return <Clock size={16} className="text-purple-600" />;
      case 'policy_update':
        return <Info size={16} className="text-blue-600" />;
      case 'support':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'training':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'system':
        return <AlertCircle size={16} className="text-gray-600" />;
      default:
        return <Bell size={16} className="text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Get display name - use full name if available, otherwise username
  const getDisplayName = () => {
    return user.profile.fullName || user.username;
  };

  // Get display role - use job title if available, otherwise default
  const getDisplayRole = () => {
    return user.profile.jobTitle || 'Australian Visa User';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-blue-700">GovRise</h1>
        <div className="relative w-64 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.isRead ? 'bg-blue-50' : 'bg-white'
                      } hover:bg-gray-50 cursor-pointer transition-colors`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-gray-700 font-medium mb-1">No notifications</h4>
                    <p className="text-gray-500 text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <button className="w-full text-center text-blue-600 text-sm font-medium hover:text-blue-800">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-300 mx-1"></div>
        
        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-2 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 hidden md:block truncate max-w-32">
              {getDisplayName()}
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="text-sm font-medium text-gray-900 truncate">{getDisplayName()}</div>
                <div className="text-xs text-gray-500 truncate">{getDisplayRole()}</div>
                {user.profile.email && (
                  <div className="text-xs text-gray-400 truncate mt-1">{user.profile.email}</div>
                )}
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};