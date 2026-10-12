import { Employee, BankTask, BankNotification, ActivityLog, BankDepartment } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeCode: 'EMP-1042',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@apexfederal.bank',
    phone: '+1 (555) 349-2190',
    role: 'Senior Analyst',
    department: 'Loan Underwriting',
    branch: 'Downtown Headquarters #0101',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2022-03-15',
    activeTasksCount: 4,
    completedTasksCount: 52,
    clearanceLevel: 'Elevated',
    supervisor: 'David Sterling (VP Lending)'
  },
  {
    id: 'emp-2',
    employeeCode: 'EMP-1049',
    name: 'Michael Chen',
    email: 'michael.chen@apexfederal.bank',
    phone: '+1 (555) 482-9011',
    role: 'Specialist',
    department: 'AML & Fraud Prevention',
    branch: 'Downtown Headquarters #0101',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2023-01-10',
    activeTasksCount: 3,
    completedTasksCount: 68,
    clearanceLevel: 'Elevated',
    supervisor: 'Eleanor Vance (Chief Compliance Officer)'
  },
  {
    id: 'emp-3',
    employeeCode: 'EMP-1065',
    name: 'Priya Patel',
    email: 'priya.patel@apexfederal.bank',
    phone: '+1 (555) 720-3341',
    role: 'Branch Lead',
    department: 'Branch Operations',
    branch: 'Metro Financial Plaza #0104',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2021-08-01',
    activeTasksCount: 5,
    completedTasksCount: 114,
    clearanceLevel: 'Elevated',
    supervisor: 'Arthur Pendelton (Regional Director)'
  },
  {
    id: 'emp-4',
    employeeCode: 'EMP-1078',
    name: 'Marcus Vance',
    email: 'marcus.vance@apexfederal.bank',
    phone: '+1 (555) 612-8840',
    role: 'Officer',
    department: 'Commercial Credit',
    branch: 'Downtown Headquarters #0101',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2023-06-20',
    activeTasksCount: 2,
    completedTasksCount: 39,
    clearanceLevel: 'Standard',
    supervisor: 'David Sterling (VP Lending)'
  },
  {
    id: 'emp-5',
    employeeCode: 'EMP-1092',
    name: 'Elena Rostova',
    email: 'elena.rostova@apexfederal.bank',
    phone: '+1 (555) 891-2315',
    role: 'Senior Analyst',
    department: 'Wealth & Advisory',
    branch: 'West End Private Banking #0109',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2022-11-04',
    activeTasksCount: 3,
    completedTasksCount: 45,
    clearanceLevel: 'Elevated',
    supervisor: 'Helena Wright (MD Wealth)'
  },
  {
    id: 'emp-6',
    employeeCode: 'EMP-1104',
    name: 'James Thornton',
    email: 'james.thornton@apexfederal.bank',
    phone: '+1 (555) 449-7812',
    role: 'Manager',
    department: 'Risk & Regulatory Compliance',
    branch: 'Downtown Headquarters #0101',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'Active',
    joinedDate: '2020-04-18',
    activeTasksCount: 2,
    completedTasksCount: 97,
    clearanceLevel: 'Executive',
    supervisor: 'Board Audit Committee'
  },
  {
    id: 'emp-7',
    employeeCode: 'EMP-1118',
    name: 'Ananya Roy',
    email: 'ananya.roy@apexfederal.bank',
    phone: '+1 (555) 302-8877',
    role: 'Specialist',
    department: 'Loan Underwriting',
    branch: 'Northside Commercial Branch #0112',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'In Training',
    joinedDate: '2024-02-01',
    activeTasksCount: 2,
    completedTasksCount: 16,
    clearanceLevel: 'Standard',
    supervisor: 'Sarah Jenkins (Senior Analyst)'
  },
  {
    id: 'emp-8',
    employeeCode: 'EMP-1123',
    name: 'Daniel Hayes',
    email: 'daniel.hayes@apexfederal.bank',
    phone: '+1 (555) 918-4422',
    role: 'Officer',
    department: 'Branch Operations',
    branch: 'Metro Financial Plaza #0104',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'On Leave',
    joinedDate: '2023-09-12',
    activeTasksCount: 0,
    completedTasksCount: 31,
    clearanceLevel: 'Standard',
    supervisor: 'Priya Patel (Branch Lead)'
  }
];

export const INITIAL_TASKS: BankTask[] = [
  {
    id: 'task-1',
    taskCode: 'BNK-2026-904',
    title: 'Conduct Enhanced Due Diligence on $4.8M Cross-Border Wire',
    description: 'Perform Tier-3 source-of-wealth verification and sanctions screening against OFAC lists for an incoming correspondent wire transfer directed to Apex Global Maritime Corp.',
    department: 'AML & Fraud Prevention',
    priority: 'urgent',
    status: 'in_progress',
    assigneeId: 'emp-2',
    assigneeName: 'Michael Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Eleanor Vance (Chief Compliance Officer)',
    createdDate: '2026-10-10',
    dueDate: '2026-10-13',
    estimatedHours: 6,
    actualHours: 3.5,
    confidentiality: 'Strictly Restricted',
    clientReference: 'TXN-9021-INTL // Apex Maritime Corp',
    checklist: [
      { id: 'c1', text: 'Pull SWIFT MT103 and MT202 documentation', completed: true },
      { id: 'c2', text: 'Cross-check ultimate beneficial owners against World-Check', completed: true },
      { id: 'c3', text: 'Obtain notarized invoice and bill of lading', completed: false },
      { id: 'c4', text: 'Submit SAR escalation or release authorization memo', completed: false }
    ],
    comments: [
      {
        id: 'cm-1',
        authorName: 'Eleanor Vance',
        authorRole: 'Chief Compliance Officer',
        authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-10 14:20',
        content: 'Flagged via automated real-time transaction monitoring engine. Flag code: AML-HIGH-VOL.'
      },
      {
        id: 'cm-2',
        authorName: 'Michael Chen',
        authorRole: 'AML Specialist',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-11 09:45',
        content: 'Beneficiary documentation submitted. Currently verifying correspondent intermediary bank in Zurich.'
      }
    ]
  },
  {
    id: 'task-2',
    taskCode: 'BNK-2026-908',
    title: 'Underwrite Commercial Real Estate Loan Application #CRE-8820',
    description: 'Comprehensive risk and cash-flow underwriting for a $12.5M multi-family residential construction facility in the Downtown Innovation District. Calculate DSCR, LTV, and borrower liquidity.',
    department: 'Loan Underwriting',
    priority: 'high',
    status: 'in_progress',
    assigneeId: 'emp-1',
    assigneeName: 'Sarah Jenkins',
    assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdBy: 'David Sterling (VP Lending)',
    createdDate: '2026-10-08',
    dueDate: '2026-10-14',
    estimatedHours: 12,
    actualHours: 8,
    confidentiality: 'Confidential',
    clientReference: 'CRE-8820 // Solstice Development Partners',
    checklist: [
      { id: 'c5', text: 'Audit 3-year audited financial statements & tax returns', completed: true },
      { id: 'c6', text: 'Independent third-party commercial appraisal review', completed: true },
      { id: 'c7', text: 'Phase I Environmental Site Assessment sign-off', completed: true },
      { id: 'c8', text: 'Prepare Credit Committee executive memorandum', completed: false }
    ],
    comments: [
      {
        id: 'cm-3',
        authorName: 'Sarah Jenkins',
        authorRole: 'Senior Analyst',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-09 11:15',
        content: 'Appraised value came in at $18.2M, which yields a conservative 68.6% LTV. Solid sponsor balance sheet.'
      }
    ]
  },
  {
    id: 'task-3',
    taskCode: 'BNK-2026-911',
    title: 'Daily Cash Vault & Dual-Control Balancing - Branch #0104',
    description: 'Execute mandatory end-of-day dual-custody audit of main cash vault, smart safes, and ATM cassette reserves. Reconcile ledger differences in core banking mainframe.',
    department: 'Branch Operations',
    priority: 'urgent',
    status: 'pending',
    assigneeId: 'emp-3',
    assigneeName: 'Priya Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Arthur Pendelton (Regional Director)',
    createdDate: '2026-10-12',
    dueDate: '2026-10-12',
    estimatedHours: 2,
    confidentiality: 'Confidential',
    clientReference: 'BRANCH-VAULT-0104',
    checklist: [
      { id: 'c9', text: 'Dual-key entrance verification with secondary vault officer', completed: false },
      { id: 'c10', text: 'Physical count of 4 ATM cassettes and currency dispenses', completed: false },
      { id: 'c11', text: 'Teller drawer batch closing & check image clearing', completed: false },
      { id: 'c12', text: 'Generate GL #1010 balancing sign-off sheet', completed: false }
    ],
    comments: []
  },
  {
    id: 'task-4',
    taskCode: 'BNK-2026-885',
    title: 'Q3 OCC Regulatory Capital Adequacy & Stress Test Report',
    description: 'Prepare quarterly Dodd-Frank Act Stress Testing (DFAST) submission. Reconcile Common Equity Tier 1 (CET1) ratios against hypothetical economic downturn scenarios.',
    department: 'Risk & Regulatory Compliance',
    priority: 'high',
    status: 'in_review',
    assigneeId: 'emp-6',
    assigneeName: 'James Thornton',
    assigneeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Eleanor Vance (Chief Compliance Officer)',
    createdDate: '2026-10-01',
    dueDate: '2026-10-15',
    estimatedHours: 24,
    actualHours: 22,
    confidentiality: 'Strictly Restricted',
    clientReference: 'OCC-REG-Q3-2026',
    checklist: [
      { id: 'c13', text: 'Extract loan loss reserve projections from credit model', completed: true },
      { id: 'c14', text: 'Run severe macroeconomic shock simulator', completed: true },
      { id: 'c15', text: 'External auditor peer check and variance analysis', completed: true },
      { id: 'c16', text: 'Obtain Chief Risk Officer formal endorsement', completed: false }
    ],
    comments: [
      {
        id: 'cm-4',
        authorName: 'James Thornton',
        authorRole: 'Manager',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-11 16:30',
        content: 'Draft completed and uploaded to compliance repository. CET1 remains safely above 13.4% even under adverse stress scenario.'
      }
    ]
  },
  {
    id: 'task-5',
    taskCode: 'BNK-2026-879',
    title: 'Annual KYC Refresh for Ultra-High-Net-Worth Portfolio #W-09',
    description: 'Conduct periodic recertification for 14 Tier-1 Private Banking accounts ($20M+ AUM). Review source of funds, PEP (Politically Exposed Person) declarations, and trust structures.',
    department: 'Wealth & Advisory',
    priority: 'medium',
    status: 'completed',
    assigneeId: 'emp-5',
    assigneeName: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Helena Wright (MD Wealth)',
    createdDate: '2026-09-28',
    dueDate: '2026-10-10',
    estimatedHours: 10,
    actualHours: 9.5,
    confidentiality: 'Confidential',
    clientReference: 'PORTFOLIO-UHNW-9901',
    checklist: [
      { id: 'c17', text: 'Request updated beneficial ownership certificates', completed: true },
      { id: 'c18', text: 'Screen family trust trustees against sanctions radar', completed: true },
      { id: 'c19', text: 'Update risk profiling questionnaires & investment policy', completed: true },
      { id: 'c20', text: 'Archive customer identity verifications in secure vault', completed: true }
    ],
    comments: [
      {
        id: 'cm-5',
        authorName: 'Elena Rostova',
        authorRole: 'Senior Analyst',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-10 17:00',
        content: 'All 14 accounts certified without red flags. Client wealth files updated in core CRM.'
      }
    ]
  },
  {
    id: 'task-6',
    taskCode: 'BNK-2026-860',
    title: 'Audit Escrow Tax & Insurance Disbursements - Q3 Cycle',
    description: 'Verify 4,200 mortgage escrow accounts for automated county property tax and hazard insurance premium disbursements. Reconcile escrow surpluses and shortage notices.',
    department: 'Loan Underwriting',
    priority: 'medium',
    status: 'overdue',
    assigneeId: 'emp-1',
    assigneeName: 'Sarah Jenkins',
    assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdBy: 'David Sterling (VP Lending)',
    createdDate: '2026-09-25',
    dueDate: '2026-10-09',
    estimatedHours: 8,
    actualHours: 7,
    confidentiality: 'Internal',
    clientReference: 'ESCROW-Q3-BATCH-42',
    checklist: [
      { id: 'c21', text: 'Verify tax authority batch file transmissions', completed: true },
      { id: 'c22', text: 'Identify shortage cushions exceeding RESPA statutory limits', completed: true },
      { id: 'c23', text: 'Send borrower notification letters for payment adjustments', completed: false }
    ],
    comments: [
      {
        id: 'cm-6',
        authorName: 'Sarah Jenkins',
        authorRole: 'Senior Analyst',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-10 08:30',
        content: 'Delayed due to late county assessor tax schedule receipt. Finishing mailing notices today.'
      }
    ]
  },
  {
    id: 'task-7',
    taskCode: 'BNK-2026-920',
    title: 'Commercial Revolving Credit Facility Review - Horizon Health',
    description: 'Analyze annual renewal for Horizon Healthcare Systems $7.5M working capital line of credit. Examine accounts receivable aging report and EBITDA covenant compliance.',
    department: 'Commercial Credit',
    priority: 'medium',
    status: 'pending',
    assigneeId: 'emp-4',
    assigneeName: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdBy: 'David Sterling (VP Lending)',
    createdDate: '2026-10-11',
    dueDate: '2026-10-18',
    estimatedHours: 8,
    confidentiality: 'Confidential',
    clientReference: 'COMM-CRED-772 // Horizon Health',
    checklist: [
      { id: 'c24', text: 'Obtain trailing 12-month audited income statements', completed: false },
      { id: 'c25', text: 'Review borrowing base certificate & eligible receivables', completed: false },
      { id: 'c26', text: 'Check UCC-1 financing statement perfection with Secretary of State', completed: false }
    ],
    comments: []
  },
  {
    id: 'task-8',
    taskCode: 'BNK-2026-924',
    title: 'Investigate ATM Cash Dispenser Skimming Alert - Terminal 4B',
    description: 'Physical security sensor trigger at Metro Plaza branch drive-through ATM #04B. Inspect card bezel, review camera footage between 22:00-04:00, and isolate machine if compromised.',
    department: 'Branch Operations',
    priority: 'urgent',
    status: 'in_progress',
    assigneeId: 'emp-3',
    assigneeName: 'Priya Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Arthur Pendelton (Regional Director)',
    createdDate: '2026-10-12',
    dueDate: '2026-10-12',
    estimatedHours: 3,
    actualHours: 1.5,
    confidentiality: 'Confidential',
    clientReference: 'INCIDENT-ATM-04B-SEC',
    checklist: [
      { id: 'c27', text: 'Lock terminal software and disable public card reader', completed: true },
      { id: 'c28', text: 'Physical inspection with branch security supervisor', completed: true },
      { id: 'c29', text: 'Review high-resolution overhead DVR footage', completed: false },
      { id: 'c30', text: 'Submit Physical Security incident report to FinCEN officer', completed: false }
    ],
    comments: [
      {
        id: 'cm-7',
        authorName: 'Priya Patel',
        authorRole: 'Branch Lead',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        timestamp: '2026-10-12 08:15',
        content: 'Tamper switch was triggered by routine technician maintenance, but conducting full verification protocol.'
      }
    ]
  },
  {
    id: 'task-9',
    taskCode: 'BNK-2026-895',
    title: 'Customer Onboarding & PEP Risk Screening: Sovereign Trust',
    description: 'Conduct Level 2 AML review on new trust account registration involving international public trustees. Assess FATCA requirements and beneficial owner tax residencies.',
    department: 'AML & Fraud Prevention',
    priority: 'high',
    status: 'completed',
    assigneeId: 'emp-2',
    assigneeName: 'Michael Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdBy: 'Eleanor Vance (Chief Compliance Officer)',
    createdDate: '2026-10-04',
    dueDate: '2026-10-09',
    estimatedHours: 5,
    actualHours: 4.5,
    confidentiality: 'Strictly Restricted',
    clientReference: 'ACC-NEW-SOVEREIGN-99',
    checklist: [
      { id: 'c31', text: 'Verify Trust Deed and Trustee identity documents', completed: true },
      { id: 'c32', text: 'Check W-8BEN-E tax forms', completed: true },
      { id: 'c33', text: 'Perform LexisNexis negative news scan', completed: true }
    ],
    comments: []
  },
  {
    id: 'task-10',
    taskCode: 'BNK-2026-930',
    title: 'Train Junior Underwriters on Automated Decisioning System v3',
    description: 'Host interactive training session for newly onboarded lending analysts on the AI-assisted scoring pipeline, adverse action notice compliance, and manual override criteria.',
    department: 'Loan Underwriting',
    priority: 'low',
    status: 'pending',
    assigneeId: 'emp-1',
    assigneeName: 'Sarah Jenkins',
    assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdBy: 'David Sterling (VP Lending)',
    createdDate: '2026-10-11',
    dueDate: '2026-10-22',
    estimatedHours: 4,
    confidentiality: 'Internal',
    checklist: [
      { id: 'c34', text: 'Prepare training slides and test case sample files', completed: false },
      { id: 'c35', text: 'Setup sandbox access credentials for Ananya Roy', completed: false },
      { id: 'c36', text: 'Conduct 2-hour practical review webinar', completed: false }
    ],
    comments: []
  }
];

export const INITIAL_NOTIFICATIONS: BankNotification[] = [
  {
    id: 'notif-1',
    title: 'Urgent Directive Assigned',
    message: 'You have been assigned to: "Conduct Enhanced Due Diligence on $4.8M Cross-Border Wire". Due within 24 hours.',
    timestamp: '15 mins ago',
    read: false,
    type: 'task_assigned',
    priority: 'urgent',
    relatedTaskId: 'task-1',
    targetEmployeeId: 'emp-2'
  },
  {
    id: 'notif-2',
    title: 'Compliance Deadline Alert',
    message: 'Task BNK-2026-860 (Audit Escrow Tax & Insurance Disbursements) is past its scheduled completion date. Immediate sign-off required.',
    timestamp: '1 hour ago',
    read: false,
    type: 'deadline_warning',
    priority: 'urgent',
    relatedTaskId: 'task-6',
    targetEmployeeId: 'emp-1'
  },
  {
    id: 'notif-3',
    title: 'Task Approved & Verified',
    message: 'Manager sign-off completed for BNK-2026-879: Annual KYC Refresh for Ultra-High-Net-Worth Portfolio.',
    timestamp: '3 hours ago',
    read: false,
    type: 'task_completed',
    relatedTaskId: 'task-5',
    targetEmployeeId: 'emp-5'
  },
  {
    id: 'notif-4',
    title: 'Dual-Control Vault Balancing Pending',
    message: 'Reminder: Daily dual-custody vault closing must be logged before 17:30 EST today.',
    timestamp: '4 hours ago',
    read: true,
    type: 'compliance_alert',
    relatedTaskId: 'task-3',
    targetEmployeeId: 'emp-3'
  },
  {
    id: 'notif-5',
    title: 'Q3 OCC Regulatory Submission Ready for Review',
    message: 'James Thornton submitted task BNK-2026-885 for Executive Officer review.',
    timestamp: 'Yesterday at 16:30',
    read: true,
    type: 'system',
    relatedTaskId: 'task-4',
    targetRole: 'admin'
  },
  {
    id: 'notif-6',
    title: 'System Security Patch Scheduled',
    message: 'Core Banking mainframe will undergo scheduled maintenance this Sunday between 01:00 - 04:00 EST.',
    timestamp: '2 days ago',
    read: true,
    type: 'system',
    targetRole: 'all'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    actorName: 'Priya Patel',
    actorRole: 'Branch Lead',
    action: 'initiated incident inspection on',
    target: 'ATM Terminal 4B Skimming Sensor Alert',
    timestamp: '32 mins ago',
    type: 'status_change'
  },
  {
    id: 'act-2',
    actorName: 'Eleanor Vance',
    actorRole: 'Chief Compliance Officer',
    action: 'created high-priority AML directive',
    target: 'BNK-2026-904 // $4.8M SWIFT Verification',
    timestamp: '1 hour ago',
    type: 'task_created'
  },
  {
    id: 'act-3',
    actorName: 'James Thornton',
    actorRole: 'Risk Manager',
    action: 'submitted for executive signoff',
    target: 'Q3 OCC Regulatory Capital Adequacy Report',
    timestamp: '3 hours ago',
    type: 'compliance_signoff'
  },
  {
    id: 'act-4',
    actorName: 'Sarah Jenkins',
    actorRole: 'Senior Analyst',
    action: 'updated underwriting model on',
    target: 'CRE-8820 // Solstice Development ($12.5M)',
    timestamp: '5 hours ago',
    type: 'status_change'
  },
  {
    id: 'act-5',
    actorName: 'David Sterling',
    actorRole: 'VP Lending',
    action: 'assigned new credit review to',
    target: 'Marcus Vance // Horizon Health Credit Facility',
    timestamp: 'Yesterday at 17:10',
    type: 'reassigned'
  },
  {
    id: 'act-6',
    actorName: 'Arthur Pendelton',
    actorRole: 'Regional Director',
    action: 'added new personnel to roster',
    target: 'Ananya Roy (Loan Underwriting Dept)',
    timestamp: '2 days ago',
    type: 'employee_added'
  }
];

export const BANK_DEPARTMENTS: BankDepartment[] = [
  'Loan Underwriting',
  'AML & Fraud Prevention',
  'Branch Operations',
  'Commercial Credit',
  'Wealth & Advisory',
  'Risk & Regulatory Compliance'
];

export const BANK_BRANCHES = [
  'Downtown Headquarters #0101',
  'Metro Financial Plaza #0104',
  'West End Private Banking #0109',
  'Northside Commercial Branch #0112',
  'Midtown Executive Tower #0115'
];
