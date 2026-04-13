import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CountryData {
  country: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export interface StatusItem {
  status: string;
  count: number;
  color: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  textColor: string;
  status: 'online' | 'away' | 'offline';
  lastActive: string;
}

export interface Case {
  id: string;
  family: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  members: number;
  lastUpdate: string;
  progress: number;
  dueDate: string;
}

export interface Notification {
  id: string;
  type: 'case_update' | 'document_reminder' | 'interview' | 'policy_update' | 'system' | 'support' | 'training';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface RealtimeContextType {
  activeApplications: number;
  processingTime: number;
  approvalRate: number;
  supportRequests: number;
  pendingReviews: number;
  messagesThisWeek: number;
  sharedDocuments: number;
  countriesData: CountryData[];
  statusDistribution: StatusItem[];
  teamMembers: TeamMember[];
  cases: Case[];
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export const useRealtime = () => {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error('useRealtime must be used within RealtimeProvider');
  return ctx;
};

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const initialCountriesData: CountryData[] = [
  { country: 'India', count: 3247, trend: 'up', change: '+12%' },
  { country: 'China', count: 2864, trend: 'up', change: '+8%' },
  { country: 'Philippines', count: 1953, trend: 'down', change: '-3%' },
  { country: 'Vietnam', count: 1642, trend: 'up', change: '+24%' },
  { country: 'Malaysia', count: 1236, trend: 'down', change: '-5%' },
  { country: 'Indonesia', count: 831, trend: 'stable', change: '0%' },
  { country: 'Sri Lanka', count: 629, trend: 'up', change: '+7%' },
];

const initialStatusDistribution: StatusItem[] = [
  { status: 'In Progress', count: 6543, color: 'bg-blue-500' },
  { status: 'Documentation Review', count: 3215, color: 'bg-yellow-500' },
  { status: 'Interview Scheduled', count: 1845, color: 'bg-purple-500' },
  { status: 'Final Approval', count: 821, color: 'bg-green-500' },
  { status: 'Delayed', count: 148, color: 'bg-red-500' },
];

const initialTeamMembers: TeamMember[] = [
  { id: 1, name: 'David Wilson', role: 'Australian Visa Specialist', avatar: 'DW', avatarColor: 'bg-blue-100', textColor: 'text-blue-600', status: 'online', lastActive: 'Just now' },
  { id: 2, name: 'Priya Sharma', role: 'Legal Advisor (AU)', avatar: 'PS', avatarColor: 'bg-green-100', textColor: 'text-green-600', status: 'online', lastActive: '5m ago' },
  { id: 3, name: 'James Thompson', role: 'Translator (AU)', avatar: 'JT', avatarColor: 'bg-purple-100', textColor: 'text-purple-600', status: 'away', lastActive: '1h ago' },
];

const initialCases: Case[] = [
  { id: 'C-2387', family: 'Rahman Family', status: 'In Progress', priority: 'High', members: 4, lastUpdate: '2 hours ago', progress: 65, dueDate: 'Dec 15, 2024' },
  { id: 'C-2412', family: 'Singh Family', status: 'Documentation Review', priority: 'Medium', members: 3, lastUpdate: '1 day ago', progress: 40, dueDate: 'Jan 10, 2025' },
  { id: 'C-2390', family: 'Liu Family', status: 'Interview Scheduled', priority: 'High', members: 5, lastUpdate: '3 days ago', progress: 80, dueDate: 'Nov 28, 2024' },
  { id: 'C-2401', family: 'Gonzalez Family', status: 'Document Collection', priority: 'Low', members: 4, lastUpdate: '5 days ago', progress: 25, dueDate: 'Feb 12, 2025' },
];

const initialNotifications: Notification[] = [
  { id: '1', type: 'case_update', title: 'Partner Visa Application Update', message: 'Your Australian Partner Visa application (ID: AU-PV-2024-1234) has moved to document review stage.', timestamp: '2 hours ago', isRead: false, priority: 'high' },
  { id: '2', type: 'document_reminder', title: 'Document Submission Reminder', message: 'Police clearance certificates are due in 5 days for your Australian visa application.', timestamp: '1 day ago', isRead: false, priority: 'high' },
  { id: '3', type: 'interview', title: 'Embassy Interview Scheduled', message: 'Your interview at the Australian Embassy has been scheduled for December 15, 2024, 10:00 AM.', timestamp: '2 days ago', isRead: true, priority: 'high' },
  { id: '4', type: 'policy_update', title: 'Australian Immigration Policy Update', message: 'New processing time estimates released for Partner Visa applications: 12-24 months.', timestamp: '3 days ago', isRead: false, priority: 'medium' },
  { id: '5', type: 'support', title: 'Support Ticket Response', message: 'Your support ticket about document translation has been resolved. View response.', timestamp: '4 days ago', isRead: true, priority: 'medium' },
  { id: '6', type: 'training', title: 'Course Completion Certificate', message: 'Congratulations! Your certificate for "Australian Partner Visa Essentials" is ready for download.', timestamp: '5 days ago', isRead: true, priority: 'low' },
  { id: '7', type: 'system', title: 'Scheduled Maintenance', message: 'The Australian visa portal will undergo maintenance on November 30, 2024, 2:00-4:00 AM AEST.', timestamp: '1 week ago', isRead: false, priority: 'low' },
];

const liveNotificationPool: Omit<Notification, 'id' | 'timestamp' | 'isRead'>[] = [
  { type: 'case_update', title: 'New Application Submitted', message: 'A new family visa application has been submitted and is pending initial review.', priority: 'medium' },
  { type: 'document_reminder', title: 'Document Verification Complete', message: 'Document verification for case C-2387 (Rahman Family) has been completed successfully.', priority: 'high' },
  { type: 'policy_update', title: 'Processing Queue Update', message: 'The Partner Visa processing queue has been updated. Current wait time: 14-16 months.', priority: 'medium' },
  { type: 'case_update', title: 'Case Status Changed', message: 'Case C-2412 (Singh Family) has progressed to interview scheduling stage.', priority: 'high' },
  { type: 'support', title: 'New Support Ticket Opened', message: 'A new support ticket has been opened regarding document translation requirements.', priority: 'low' },
  { type: 'interview', title: 'Interview Reminder', message: 'Upcoming embassy interview for Liu Family (Case C-2390) in 3 days. Preparation materials available.', priority: 'high' },
  { type: 'case_update', title: 'Application Under Assessment', message: 'Case C-2401 (Gonzalez Family) documents are now under assessment by the case officer.', priority: 'medium' },
];

let liveNotifCounter = 200;

export const RealtimeProvider = ({ children }: { children: ReactNode }) => {
  const [activeApplications, setActiveApplications] = useState(12572);
  const [processingTime] = useState(15);
  const [approvalRate, setApprovalRate] = useState(72);
  const [supportRequests, setSupportRequests] = useState(485);
  const [pendingReviews, setPendingReviews] = useState(3214);
  const [messagesThisWeek, setMessagesThisWeek] = useState(24);
  const [sharedDocuments] = useState(4);
  const [countriesData, setCountriesData] = useState<CountryData[]>(initialCountriesData);
  const [statusDistribution, setStatusDistribution] = useState<StatusItem[]>(initialStatusDistribution);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    // Active applications: +1 every 5 seconds
    const appTimer = setInterval(() => {
      setActiveApplications(prev => prev + rand(1, 2));
    }, 5000);

    // Pending reviews fluctuate every 4 seconds
    const pendingTimer = setInterval(() => {
      setPendingReviews(prev => clamp(prev + rand(-3, 5), 3100, 3400));
    }, 4000);

    // Support requests fluctuate every 6 seconds
    const supportTimer = setInterval(() => {
      setSupportRequests(prev => clamp(prev + rand(-1, 2), 470, 520));
    }, 6000);

    // Messages this week: +1 every 8 seconds
    const messagesTimer = setInterval(() => {
      setMessagesThisWeek(prev => prev + 1);
    }, 8000);

    // Approval rate drifts slightly every 20 seconds
    const approvalTimer = setInterval(() => {
      setApprovalRate(prev => clamp(prev + rand(-1, 1), 69, 75));
    }, 20000);

    // Country counts shift every 8 seconds
    const countriesTimer = setInterval(() => {
      setCountriesData(prev =>
        prev.map(c => {
          const delta = rand(-10, 18);
          const newCount = Math.max(c.count + delta, 100);
          return {
            ...c,
            count: newCount,
            trend: delta > 3 ? 'up' : delta < -3 ? 'down' : 'stable',
            change: delta >= 0 ? `+${delta}` : `${delta}`,
          };
        })
      );
    }, 8000);

    // Status distribution: applications advance through stages every 5 seconds
    const statusTimer = setInterval(() => {
      setStatusDistribution(prev => {
        const updated = prev.map(item => ({ ...item }));
        const advancing = rand(1, 4);
        if (updated[0].count > advancing) {
          updated[0].count -= advancing;
          updated[1].count += advancing;
        }
        const stage2 = rand(0, 2);
        if (updated[1].count > stage2) {
          updated[1].count -= stage2;
          updated[2].count += stage2;
        }
        updated[0].count += rand(1, 3);
        return updated;
      });
    }, 5000);

    // Team member lastActive updates every 10 seconds
    const lastActiveOptions = ['Just now', '1m ago', '2m ago', '3m ago', '5m ago'];
    const awayOptions = ['15m ago', '30m ago', '45m ago', '1h ago'];
    const teamTimer = setInterval(() => {
      setTeamMembers(prev =>
        prev.map(member => {
          const flip = Math.random() < 0.12;
          const newStatus = flip
            ? member.status === 'online' ? 'away' : 'online'
            : member.status;
          const newLastActive = newStatus === 'online'
            ? lastActiveOptions[rand(0, 2)]
            : awayOptions[rand(0, 3)];
          return { ...member, status: newStatus, lastActive: newLastActive };
        })
      );
    }, 10000);

    // Case progress: advances every 7 seconds
    const updateLabels = ['just now', '1 minute ago', '2 minutes ago', '5 minutes ago'];
    const casesTimer = setInterval(() => {
      setCases(prev =>
        prev.map(c => ({
          ...c,
          progress: Math.min(c.progress + rand(0, 1), 99),
          lastUpdate: updateLabels[rand(0, 1)],
        }))
      );
    }, 7000);

    // New live notification every 15 seconds
    const notifTimer = setInterval(() => {
      const template = liveNotificationPool[rand(0, liveNotificationPool.length - 1)];
      const newNotif: Notification = {
        id: `live-${liveNotifCounter++}`,
        type: template.type,
        title: template.title,
        message: template.message,
        timestamp: 'just now',
        isRead: false,
        priority: template.priority,
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 15));
    }, 15000);

    return () => {
      clearInterval(appTimer);
      clearInterval(pendingTimer);
      clearInterval(supportTimer);
      clearInterval(messagesTimer);
      clearInterval(approvalTimer);
      clearInterval(countriesTimer);
      clearInterval(statusTimer);
      clearInterval(teamTimer);
      clearInterval(casesTimer);
      clearInterval(notifTimer);
    };
  }, []);

  return (
    <RealtimeContext.Provider
      value={{
        activeApplications,
        processingTime,
        approvalRate,
        supportRequests,
        pendingReviews,
        messagesThisWeek,
        sharedDocuments,
        countriesData,
        statusDistribution,
        teamMembers,
        cases,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};
