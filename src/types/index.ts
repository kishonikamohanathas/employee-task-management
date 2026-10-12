export type UserRole = 'admin' | 'employee';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'pending' | 'in_progress' | 'in_review' | 'completed' | 'overdue';

export type BankDepartment = 
  | 'Loan Underwriting'
  | 'AML & Fraud Prevention'
  | 'Branch Operations'
  | 'Commercial Credit'
  | 'Wealth & Advisory'
  | 'Risk & Regulatory Compliance';

export interface Employee {
  id: string;
  employeeCode: string; // e.g. "EMP-1042"
  name: string;
  email: string;
  phone: string;
  role: 'Officer' | 'Senior Analyst' | 'Specialist' | 'Branch Lead' | 'Manager';
  department: BankDepartment;
  branch: string; // e.g. "Downtown Headquarters #0101"
  avatarUrl: string;
  status: 'Active' | 'On Leave' | 'In Training';
  joinedDate: string;
  activeTasksCount: number;
  completedTasksCount: number;
  clearanceLevel: 'Standard' | 'Elevated' | 'Executive';
  supervisor: string;
}

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
}

export interface BankTask {
  id: string;
  taskCode: string; // e.g. "TASK-2026-891"
  title: string;
  description: string;
  department: BankDepartment;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  createdBy: string;
  createdDate: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  checklist: TaskChecklistItem[];
  comments: TaskComment[];
  clientReference?: string; // e.g. "ACC-99214 // Apex Logistics LLC"
  confidentiality: 'Internal' | 'Confidential' | 'Strictly Restricted';
}

export interface BankNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'task_assigned' | 'deadline_warning' | 'task_completed' | 'compliance_alert' | 'system';
  priority?: 'normal' | 'urgent';
  relatedTaskId?: string;
  targetRole?: 'all' | 'admin' | 'employee';
  targetEmployeeId?: string;
}

export interface ActivityLog {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'task_created' | 'status_change' | 'employee_added' | 'compliance_signoff' | 'reassigned';
}
