# GovRise Platform Documentation

**Version:** 1.0  
**Last Updated:** April 2026  
**Platform:** GovRise Family Reunification Platform  
**Focus:** Australian Family Visa Management

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Authentication & Session Management](#2-authentication--session-management)
3. [Dashboard — Home](#3-dashboard--home)
4. [Information Hub](#4-information-hub)
5. [Training Portal](#5-training-portal)
6. [Collaboration Center](#6-collaboration-center)
7. [Support System](#7-support-system)
8. [Reports & Analytics](#8-reports--analytics)
9. [Settings](#9-settings)
10. [Help Center](#10-help-center)
11. [AI Assistant](#11-ai-assistant)
12. [Realtime Data Engine](#12-realtime-data-engine)
13. [Navigation & Layout](#13-navigation--layout)
14. [Current Limitations & Roadmap](#14-current-limitations--roadmap)

---

## 1. Platform Overview

GovRise is a web-based platform designed to assist visa officers, migration agents, legal advisors, and support staff in managing Australian family reunification visa cases. It centralises case tracking, document resources, team collaboration, training, support, and reporting into a single interface.

**Primary Use Case:** Managing and tracking Australian family visa applications across the Partner, Child, Parent, and Humanitarian visa streams.

**Technology Stack:**
- Frontend: React 18 + TypeScript
- Styling: Tailwind CSS
- Routing: React Router v6
- Build Tool: Vite
- State: React Context API + `useState`
- Persistence: Browser `localStorage`

---

## 2. Authentication & Session Management

### Login
Users log in with a username and password via the Login Page.

- **Default credentials:** `admin` / `govrise2024`
- Credentials are validated against values stored in `localStorage` under the key `govrise-credentials`
- Failed logins are rejected without account lockout in the current version

### Sessions
- On successful login, a session object is written to `localStorage` under `govrise-session`
- Sessions expire automatically after **24 hours**
- On app load, the platform checks for an existing valid session and restores it — users do not need to log in again within the 24-hour window
- On logout, the session is cleared immediately

### User Profiles
- Each user has a profile stored in `localStorage` under `govrise-profile-{username}`
- Profile fields: Full Name, Email, Job Title, Phone, Time Zone, Language
- Profiles persist across sessions and are editable from the Settings page

---

## 3. Dashboard — Home

**Route:** `/`

The Home dashboard is the central landing page after login. It provides an at-a-glance overview of the platform's key metrics and quick access to resources.

### Stat Cards (Realtime)
Four metric cards are displayed at the top of the dashboard. All four update automatically in realtime:

| Metric | Description | Update Frequency |
|---|---|---|
| **Active Applications** | Total number of family visa applications currently being processed | Every 5 seconds |
| **Avg. Processing Time** | Current average time to process a visa application (months) | Static (15 months) |
| **Approval Rate** | Percentage of applications approved | Every 20 seconds |
| **Support Requests** | Number of open support tickets | Every 6 seconds |

### Australian Visa Processing Overview
A panel displaying current processing time ranges for each visa subclass:
- Partner Visa (309/100): 12–24 months
- Partner Visa (820/801): 18–30 months
- Child Visa (101): 12–16 months
- Parent Visa (103): 30+ years
- Contributory Parent (143): 3–4 years
- Humanitarian Split Family (202): 18–24 months

Includes a time range selector (Last 30 Days / Last 90 Days / Last Year) and an Export button.

### AI Assistant
An embedded chat panel on the right side of the dashboard. See [Section 11 — AI Assistant](#11-ai-assistant) for full details.

### Australian Visa Resources
A grid of four quick-access resource cards linking to:
- Australian Family Visa Guide
- Document Checklist
- Home Affairs Contact Directory
- Online Training Courses

### Australian Migration Program Updates
An informational banner summarising the current migration program allocation (52,500 family visa places for 2023–24) with a Learn More button.

---

## 4. Information Hub

**Route:** `/information-hub`

The Information Hub is the platform's knowledge library. It is organised into three tabs.

### Tab 1 — Countries
Displays a card for Australia with:
- Country flag and name
- Processing time range (12–18 months)
- Requirements level (High)
- A "View Details" link navigating to `/country-detail/australia`

**Country Detail Page** (`/country-detail/:country`) provides a full breakdown of:
- All visa types with subclass numbers, processing times, and fees
- Step-by-step application process
- Required documents checklist
- Key contacts (Department of Home Affairs)

### Tab 2 — Resources
Four resource cards covering:
1. Australian Visa Requirements — full documentation guide
2. Family Stream Migration Guide — visa stream options
3. Department of Home Affairs Directory — office contacts
4. Australian Family Visa FAQ — common questions

Each card navigates to a Resource Detail page (`/resource-detail`) that renders the full content with options to download as PDF, print, share, or bookmark.

### Tab 3 — FAQs
Seven frequently asked questions specific to Australian family visas, covering:
- Family reunification definition and eligibility
- Processing timelines
- Partner visa documentation
- Children and dependent visa requirements
- Parent visa options
- Sponsorship requirements
- Document translation requirements

FAQs are expandable (accordion-style). A search bar at the top filters across all three tabs simultaneously.

---

## 5. Training Portal

**Route:** `/training`

The Training Portal provides structured learning content for staff and agents navigating the Australian visa process.

### Courses (6 Available)

| Course | Level | Duration | Students | Rating |
|---|---|---|---|---|
| Australian Family Visa Essentials | Beginner | 3h | 1,245 | 4.8 |
| Australian Partner Visa Documentation Guide | Intermediate | 4.5h | 892 | 4.6 |
| Australian Embassy Interview Preparation | Intermediate | 2.5h | 1,563 | 4.9 |
| Cultural Integration in Australia | All Levels | 6h | 756 | 4.7 |
| Financial Planning for Australian Migration | Intermediate | 2h | 634 | 4.5 |
| Mental Health & Wellbeing During Migration | All Levels | 3h | 428 | 4.8 |

### Learning Paths
Two structured learning paths group courses into recommended sequences:
1. **Australian Visa Officer Track** — Fundamentals → Documentation → Interview
2. **Family Support Specialist Track** — Integration → Mental Health → Financial Planning

### Features
- **Search:** Filter courses by keyword across title, description, and tags
- **Category filter:** All, Fundamentals, Legal, Preparation, Integration, Wellbeing, Financial
- **Sort by:** Most Popular, Highest Rated, Newest, Duration
- **Course Detail Page** (`/course-detail`): Full syllabus, learning objectives, instructor info, and enrolment

---

## 6. Collaboration Center

**Route:** `/collaboration`

The Collaboration Center allows teams to jointly manage visa cases, communicate, share documents, and coordinate events.

### Stat Cards (Realtime)
Four cards at the top update in realtime:

| Metric | Description | Update Frequency |
|---|---|---|
| **Active Team Members** | Count of team members currently online | Every 10 seconds |
| **Active Cases** | Number of open cases | Reflects live case list |
| **Messages This Week** | Running count of messages exchanged | Every 8 seconds |
| **Shared Documents** | Number of documents shared across the team | Static (4) |

### Tab 1 — Cases
Displays all active visa cases with:
- Case ID, family name, status, priority
- Number of family members involved
- Progress bar (percentage complete) — **updates in realtime every 7 seconds**
- Last update timestamp — updates to "just now" / "1 minute ago" in realtime
- Due date

**Search** filters cases by family name or case ID. **Priority filter** filters by High / Medium / Low.

Each case links to a detail view. Cases currently tracked:
- C-2387: Rahman Family — In Progress (High priority)
- C-2412: Singh Family — Documentation Review (Medium)
- C-2390: Liu Family — Interview Scheduled (High)
- C-2401: Gonzalez Family — Document Collection (Low)

### Tab 2 — Team Members
Displays team member cards with:
- Name, role, avatar initials
- **Online / Away status** — updates in realtime every 10 seconds
- **Last active timestamp** — updates dynamically

Current team:
- David Wilson — Australian Visa Specialist
- Priya Sharma — Legal Advisor (AU)
- James Thompson — Translator (AU)

### Tab 3 — Shared Documents
Lists documents shared across the team:
- File name, size, type (PDF / Document / Archive / Spreadsheet)
- Owner, share date, number of collaborators

Documents currently listed: Rahman Family Partner Visa documents, Embassy Interview Notes, Translated Certificates, Visa Status Updates spreadsheet.

### Tab 4 — Events
Upcoming scheduled events with date, time (AEST), type (Virtual Meeting / Deadline / Conference Room), and attendee count:
- Australian Case Review Meeting
- Embassy Interview Preparation — Rahman Family
- Australian Document Submission Deadline
- Australian Visa Monthly Progress Review

---

## 7. Support System

**Route:** `/support`

The Support System is the help desk and knowledge base for users encountering issues or needing guidance.

### Tab 1 — Support Tickets
Displays open and in-progress support tickets:

| Field | Description |
|---|---|
| Ticket ID | Unique identifier (e.g. T-1234) |
| Subject | Issue description |
| Status | Open / In Progress / Resolved |
| Priority | High / Medium / Low |
| Category | Documentation / Interviews / etc. |
| Created / Updated | Timestamps |
| Assigned To | Responsible team or agent |

Current open tickets:
- T-1234: Australian Partner Visa Requirements (Medium / Documentation)
- T-1235: Interview Scheduling for Australian Embassy (High / Interviews)

### Tab 2 — FAQs
Five Australian immigration-specific FAQs with expandable answers:
1. Required documents for Australian partner visa
2. Processing timelines for partner visas
3. What happens during an embassy interview
4. How to check visa application status via ImmiAccount
5. Split family provision for refugees (Class XB visa / Form 681)

### Tab 3 — Knowledge Base
Four in-depth articles:
- Partner Visa Requirements Guide
- Australian Embassy Interview Tips
- Document Translation Requirements
- ImmiAccount Navigation Guide

Each article links to a full Article Detail page (`/article-detail`) with ratings, user feedback (thumbs up/down), comments, share, print, and bookmark functionality.

### Tab 4 — Contact Information
Direct contact details for support channels:
- Email support
- Phone support
- Office address
- Operating hours (AEST)

### Embedded AI Assistant
The Support System page includes the AI Assistant chat panel at the bottom for immediate self-service guidance. See [Section 11](#11-ai-assistant).

---

## 8. Reports & Analytics

**Route:** `/reports`

The Reports page provides analytics and insights across all active cases and visa processing data.

### Summary Stat Cards (Realtime)
Four cards at the top, all pulling from the realtime data engine:

| Metric | Update Frequency |
|---|---|
| Total Active Cases | Every 5 seconds |
| Avg. Processing Time | Static (15 months) |
| Approval Rate | Every 20 seconds |
| Pending Reviews | Every 4 seconds |

### Processing Time Trend Chart
A visual chart (toggleable between Line and Bar view) showing average processing time month-by-month from January to June. Includes a chart type toggle and export options.

### Case Status Distribution (Realtime)
A breakdown of all cases by current stage, with progress bars. Updates every 5 seconds as cases advance through stages:

| Stage | Starting Count |
|---|---|
| In Progress | 6,543 |
| Documentation Review | 3,215 |
| Interview Scheduled | 1,845 |
| Final Approval | 821 |
| Delayed | 148 |

### Applications by Country (Realtime)
A ranked list of top source countries by application volume with trend indicators (up / down / stable). Updates every 8 seconds:

| Country | Applications | Trend |
|---|---|---|
| India | 3,247 | ↑ |
| China | 2,864 | ↑ |
| Philippines | 1,953 | ↓ |
| Vietnam | 1,642 | ↑ |
| Malaysia | 1,236 | ↓ |
| Indonesia | 831 | → |
| Sri Lanka | 629 | ↑ |

### Recent Reports
A list of previously generated reports available for download or sharing:
- R-2456: Australian Partner Visa Monthly Summary (PDF, 15 pages)
- R-2455: Australian Processing Time Analysis (PDF, 8 pages)
- R-2452: Approval Rate by Country (Excel, 12 pages)
- R-2448: Documentation Compliance Audit (PDF, 22 pages)

Each report supports: Download, Print, and Share Link actions.

### Scheduled Reports
Three automated report schedules:
- SR-001: Weekly Australian Visa Status Update (Mondays, 5 recipients)
- SR-002: Monthly Performance Dashboard (1st of month, 12 recipients)
- SR-003: Quarterly Compliance Report (Quarterly, 8 recipients)

### Export Options
The full report can be exported as:
- **PDF** — via browser print dialog
- **Excel (.xlsx)** — downloaded as a structured file
- **CSV** — flat data export

### Delivery Settings
Toggle switches for report delivery methods:
- Email Delivery (on by default)
- Dashboard Delivery (on by default)
- API Delivery (off by default)

---

## 9. Settings

**Route:** `/settings`

The Settings page allows users to configure their account, security, notifications, and display preferences. Changes are saved to `localStorage` and persist across sessions.

### Tab 1 — Profile
Editable fields:
- Full Name
- Email Address
- Job Title
- Phone Number
- Time Zone (defaults to Australia/Sydney)
- Language (defaults to English)

Saving the profile updates both the in-memory user state and `localStorage`.

### Tab 2 — Security
- **Change Username:** Enter current credentials and a new username
- **Change Password:** Enter current password, new password, and confirmation (with show/hide toggles)
- **Two-Factor Authentication (2FA):** Toggle to enable/disable (UI only in current version)
- **Data Sharing:** Toggle to opt in/out of anonymised data sharing
- **Activity Logging:** Toggle to enable/disable session activity logs

### Tab 3 — Notifications
Toggle switches for notification types:
- Email Notifications
- Push Notifications
- Case Updates
- Document Reminders
- Weekly Reports
- System Announcements

### Tab 4 — Display
- **Dark Mode:** Toggle (UI only in current version)
- **Compact View:** Reduces padding and card sizes
- **High Contrast Mode:** Toggle for accessibility

---

## 10. Help Center

**Route:** `/help`

The Help Center provides onboarding guides, video tutorials, user documentation, and FAQs for platform users.

### Getting Started Guides (4)
Step-by-step beginner guides:
1. Overview of Australian Family Visas (5 min read)
2. Setting Up Your Australian Visa Application (3 min read)
3. Creating Your First Australian Partner Visa Application (7 min read)
4. Understanding Australian Visa Timeline (6 min read)

Each guide is expandable inline and supports Share and Bookmark actions.

### Video Tutorials (4)
- Australian Visa Platform Tour
- How to Submit Partner Visa Documents
- Tracking Your Application Status
- Working with Your Case Team

Each tutorial card shows estimated watch time and links to a playback page.

### User Guides
Downloadable documentation covering advanced platform usage. Supports PDF download, print, and share.

### FAQs
Searchable list of platform-specific (not immigration-specific) questions about using GovRise itself.

### Search
A global search bar at the top of the Help Center filters across all four sections simultaneously.

---

## 11. AI Assistant

The AI Assistant is embedded in two places:
- **Home Dashboard** — right-hand panel
- **Support System** — bottom of the support page

### Current Behaviour
The assistant is a conversational chat interface. The user types a question, presses Enter or the Send button, and receives a response after a 1-second simulated delay.

**Current responses are pre-written and selected at random from a pool of three answers**, all relating to Australian visa documentation, processing times, and migration agent referrals. The assistant does not actually understand or analyse user input — it returns a fixed response regardless of what is asked.

### What the AI Currently Knows
- Australian Partner Visa document requirements
- Offshore vs onshore processing times (309/100: 12–24 months; 820/801: 18–30 months)
- How to find a MARA-registered migration agent

### Disclaimer
The interface displays the following disclaimer beneath the chat input:
> *"The AI assistant provides general guidance on Australian visas. For specific legal advice, please consult a migration agent."*

### What Is Planned (Not Yet Built)
To make the AI genuinely useful and accurate, the following would be implemented:

**RAG (Retrieval-Augmented Generation):**
1. Upload source documents (PDFs, Word files) and URLs (Department of Home Affairs pages)
2. Documents are parsed and split into chunks
3. Each chunk is converted to a vector embedding and stored in a vector database (e.g. Supabase pgvector)
4. When a user asks a question, the most relevant chunks are retrieved
5. Those chunks are passed as context to a real AI model (e.g. Claude API) which generates an accurate, grounded answer

This approach means the AI answers **from your actual documents** rather than from guesses or generic responses.

---

## 12. Realtime Data Engine

**File:** `src/context/RealtimeContext.tsx`

All realtime data is managed through a single React Context provider (`RealtimeProvider`) that wraps the authenticated application. Every page that displays live stats reads from this shared context — meaning all pages stay in sync with the same data.

### How It Works
The `RealtimeProvider` initialises state with baseline values and runs a set of `setInterval` timers. Each timer updates a specific piece of state on its own schedule, triggering React re-renders across all subscribed components.

### Data Points & Update Schedules

| Data Point | Update Interval | Behaviour |
|---|---|---|
| Active Applications | 5 seconds | +1 to +2 per tick |
| Pending Reviews | 4 seconds | Fluctuates ±3 to +5, clamped 3,100–3,400 |
| Support Requests | 6 seconds | Fluctuates ±1 to +2, clamped 470–520 |
| Messages This Week | 8 seconds | +1 per tick |
| Approval Rate | 20 seconds | Drifts ±1%, clamped 69–75% |
| Country Application Counts | 8 seconds | Each country shifts by a random delta |
| Case Status Distribution | 5 seconds | Applications advance through processing stages |
| Team Member Status / Last Active | 10 seconds | Status flips online ↔ away with 12% probability |
| Case Progress & Last Update | 7 seconds | Progress increments 0–1%, lastUpdate refreshes |
| New Notifications | 15 seconds | A new unread notification is prepended to the list |

### Shared State
The following are shared across all pages via context:

- `activeApplications` → Home stat card, Reports stat card
- `approvalRate` → Home stat card, Reports stat card
- `supportRequests` → Home stat card
- `pendingReviews` → Reports stat card
- `messagesThisWeek` → Collaboration stat card
- `sharedDocuments` → Collaboration stat card
- `countriesData` → Reports country table
- `statusDistribution` → Reports status breakdown
- `teamMembers` → Collaboration team tab (status + lastActive)
- `cases` → Collaboration cases tab (progress + lastUpdate)
- `notifications` / `setNotifications` → Header bell icon + notification panel

### Important Note
The current realtime engine simulates live activity using timers and random number generation. It does not connect to a real backend or database. All numbers are computed locally in the browser. See [Section 14](#14-current-limitations--roadmap) for the planned upgrade path.

---

## 13. Navigation & Layout

### Sidebar
The left sidebar contains 8 navigation items:
1. Home
2. Information Hub
3. Training Portal
4. Collaboration
5. Support System
6. Reports
7. Settings
8. Help Center

The sidebar is responsive:
- **Mobile:** 16px wide (icon-only)
- **Desktop:** 64px wide (icon + label)

The active route is highlighted. The user's name and role are displayed at the bottom of the sidebar.

### Header
The top header contains:
- **GovRise logo / wordmark** (left)
- **Search bar** (centre-left, hidden on mobile)
- **Notifications bell** — shows unread count badge; clicking opens the notification panel with full notification list, read/unread state, mark-all-read, and individual dismiss
- **User menu** — shows display name and avatar; dropdown contains Sign Out

### Notifications Panel
- Displays up to 15 notifications (older ones are dropped as new ones arrive)
- Priority-coded with a left border: red (high), yellow (medium), green (low)
- Unread notifications have a blue background and a blue dot indicator
- Clicking a notification marks it as read
- New live notifications arrive every 15 seconds and are prepended to the list

### Footer
Persistent footer across all pages with:
- Copyright notice
- Links: Privacy Policy, Terms of Service, Contact

### Utility Actions (available across multiple pages)
Reusable utility functions in `src/utils/actions.ts`:

| Function | What It Does |
|---|---|
| `downloadFile()` | Triggers a generic file download |
| `downloadPDF()` | Converts HTML content to a printable PDF |
| `shareContent()` | Uses Web Share API (with clipboard fallback) |
| `exportData()` | Exports data as CSV or JSON |
| `printContent()` | Opens a print dialog with formatted content |
| `saveBookmark()` | Saves a bookmark entry to localStorage |

---

## 14. Current Limitations & Roadmap

### Current Limitations

| Area | Current State | Impact |
|---|---|---|
| **Data** | All data is hardcoded or randomly generated | No real applications, no real users |
| **AI** | Pre-written responses cycled at random | Cannot answer real questions accurately |
| **Authentication** | Single local user, credentials in localStorage | Not suitable for multiple real users |
| **Persistence** | localStorage only | Data lost on browser clear; no cross-device access |
| **Backend** | None | No API, no database, no server |
| **2FA / Security** | Toggle exists, not functional | No real security enforcement |
| **Dark Mode** | Toggle exists, not functional | No theme changes applied |
| **File Upload** | Paperclip icon in chat, not functional | Cannot attach documents |
| **Search** | Filters local data only | Cannot search across real records |

### Recommended Next Steps

**1. Real Backend + Database (Supabase)**
Replace localStorage and fake data with a real PostgreSQL database. Supabase provides:
- Real tables for applications, cases, users, documents, notifications
- Realtime WebSocket subscriptions (replaces the timer engine)
- Row-level security for multi-user access
- File storage for uploaded documents

**2. Real AI with Document Training (RAG)**
Replace the mock chat with a real AI pipeline:
- Parse and index real documents (Home Affairs PDFs, policy pages)
- Store embeddings in Supabase pgvector
- Connect to Claude API (Anthropic) for response generation
- Answers are grounded in your actual uploaded content

**3. Multi-User Authentication**
Replace the single-user localStorage auth with Supabase Auth or a dedicated auth provider supporting:
- Multiple user accounts with roles (admin, officer, agent)
- Real password hashing
- Functional 2FA

**4. File Upload & Document Management**
Enable real document uploads stored in Supabase Storage, linked to specific cases.

---

*This documentation reflects the platform as built in April 2026. For questions or contributions, contact the GovRise development team.*
