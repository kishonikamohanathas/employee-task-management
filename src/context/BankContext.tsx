import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Employee, 
  BankTask, 
  BankNotification, 
  ActivityLog, 
  TaskStatus, 
  TaskPriority, 
  BankDepartment 
} from '../types';
import { 
  INITIAL_EMPLOYEES, 
  INITIAL_TASKS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ACTIVITY_LOGS 
} from '../data/mockData';

export type ActivePage = 
  | 'role_select'
  | 'dashboard'
  | 'tasks'
  | 'employees'
  | 'notifications'
  | 'profile'
  | 'error';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface BankContextType {
  role: UserRole | null;
  currentEmployee: Employee;
  allEmployees: Employee[];
  tasks: BankTask[];
  notifications: BankNotification[];
  activities: ActivityLog[];
  activePage: ActivePage;
  sidebarCollapsed: boolean;
  toasts: Toast[];
  
  // Navigation & session
  loginAs: (role: UserRole, employeeId?: string) => void;
  logout: () => void;
  setActivePage: (page: ActivePage) => void;
  toggleSidebar: () => void;
  setCurrentEmployee: (employee: Employee) => void;
  
  // Task Actions
  createTask: (taskData: Omit<BankTask, 'id' | 'taskCode' | 'createdDate' | 'comments'>) => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  updateTaskPriority: (taskId: string, priority: TaskPriority) => void;
  reassignTask: (taskId: string, newAssigneeId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleChecklistItem: (taskId: string, checklistId: string) => void;
  addTaskComment: (taskId: string, commentText: string) => void;
  
  // Employee Actions
  addEmployee: (employeeData: Omit<Employee, 'id' | 'activeTasksCount' | 'completedTasksCount'>) => void;
  updateEmployee: (employeeId: string, updatedData: Partial<Employee>) => void;
  deleteEmployee: (employeeId: string) => void;
  
  // Notification Actions
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (notificationId: string) => void;
  
  // UI Helpers
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start on role_select with two large cards as requested
  const [role, setRole] = useState<UserRole | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('role_select');
  const [allEmployees, setAllEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tasks, setTasks] = useState<BankTask[]>(INITIAL_TASKS);
  const [notifications, setNotifications] = useState<BankNotification[]>(INITIAL_NOTIFICATIONS);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(INITIAL_EMPLOYEES[0]); // Sarah Jenkins default
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Update employee task counts dynamically
  useEffect(() => {
    setAllEmployees(prev => prev.map(emp => {
      const activeCount = tasks.filter(t => t.assigneeId === emp.id && t.status !== 'completed').length;
      const completedCount = tasks.filter(t => t.assigneeId === emp.id && t.status === 'completed').length;
      return {
        ...emp,
        activeTasksCount: activeCount,
        completedTasksCount: (emp.completedTasksCount || 0) > completedCount ? emp.completedTasksCount : completedCount
      };
    }));
  }, [tasks]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const loginAs = (selectedRole: UserRole, employeeId?: string) => {
    setRole(selectedRole);
    if (selectedRole === 'employee') {
      const target = allEmployees.find(e => e.id === employeeId) || allEmployees[0];
      setCurrentEmployee(target);
    }
    setActivePage('dashboard');
    showToast(`Logged in successfully as ${selectedRole === 'admin' ? 'Administrator' : 'Employee'}`);
  };

  const logout = () => {
    setRole(null);
    setActivePage('role_select');
    showToast('Logged out of secure banking portal', 'info');
  };

  const createTask = (taskData: Omit<BankTask, 'id' | 'taskCode' | 'createdDate' | 'comments'>) => {
    const randomCode = `BNK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTask: BankTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      taskCode: randomCode,
      createdDate: new Date().toISOString().split('T')[0],
      comments: []
    };

    setTasks(prev => [newTask, ...prev]);

    // Add activity log
    const newActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      actorName: role === 'admin' ? 'Compliance Administrator' : currentEmployee.name,
      actorRole: role === 'admin' ? 'System Admin' : currentEmployee.role,
      action: 'created directive',
      target: `${newTask.taskCode} // ${newTask.title}`,
      timestamp: 'Just now',
      type: 'task_created'
    };
    setActivities(prev => [newActivity, ...prev]);

    // Send notification to assignee
    const newNotif: BankNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Directive Assigned',
      message: `You have been assigned task ${newTask.taskCode}: "${newTask.title}". Due date: ${newTask.dueDate}.`,
      timestamp: 'Just now',
      read: false,
      type: 'task_assigned',
      priority: newTask.priority === 'urgent' ? 'urgent' : 'normal',
      relatedTaskId: newTask.id,
      targetEmployeeId: newTask.assigneeId
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Task ${randomCode} created and assigned to ${newTask.assigneeName}`);
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));

    const statusLabel = newStatus.replace('_', ' ').toUpperCase();
    const newActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      actorName: role === 'admin' ? 'Administrator' : currentEmployee.name,
      actorRole: role === 'admin' ? 'Compliance Admin' : currentEmployee.role,
      action: `updated status to ${statusLabel} on`,
      target: `${task.taskCode} // ${task.title}`,
      timestamp: 'Just now',
      type: 'status_change'
    };
    setActivities(prev => [newActivity, ...prev]);

    if (newStatus === 'completed') {
      const notif: BankNotification = {
        id: `notif-${Date.now()}`,
        title: 'Task Marked Completed',
        message: `${task.taskCode} has been verified and marked as completed by ${currentEmployee.name}.`,
        timestamp: 'Just now',
        read: false,
        type: 'task_completed',
        relatedTaskId: task.id,
        targetRole: 'admin'
      };
      setNotifications(prev => [notif, ...prev]);
    }

    showToast(`Task ${task.taskCode} status updated to ${newStatus.replace('_', ' ')}`);
  };

  const updateTaskPriority = (taskId: string, priority: TaskPriority) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, priority } : t));
    showToast(`Priority updated to ${priority.toUpperCase()}`, 'info');
  };

  const reassignTask = (taskId: string, newAssigneeId: string) => {
    const assignee = allEmployees.find(e => e.id === newAssigneeId);
    if (!assignee) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          assigneeId: assignee.id,
          assigneeName: assignee.name,
          assigneeAvatar: assignee.avatarUrl
        };
      }
      return t;
    }));

    showToast(`Reassigned to ${assignee.name}`);
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast(`Task ${task ? task.taskCode : ''} removed from records`, 'warning');
  };

  const toggleChecklistItem = (taskId: string, checklistId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedList = t.checklist.map(item => 
          item.id === checklistId ? { ...item, completed: !item.completed } : item
        );
        return { ...t, checklist: updatedList };
      }
      return t;
    }));
  };

  const addTaskComment = (taskId: string, commentText: string) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `cm-${Date.now()}`,
      authorName: role === 'admin' ? 'Administrator' : currentEmployee.name,
      authorRole: role === 'admin' ? 'Admin & Compliance' : currentEmployee.role,
      authorAvatar: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' 
        : currentEmployee.avatarUrl,
      timestamp: 'Just now',
      content: commentText.trim()
    };

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, comments: [...t.comments, newComment] };
      }
      return t;
    }));

    showToast('Internal note recorded');
  };

  const addEmployee = (employeeData: Omit<Employee, 'id' | 'activeTasksCount' | 'completedTasksCount'>) => {
    const newEmp: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
      activeTasksCount: 0,
      completedTasksCount: 0
    };

    setAllEmployees(prev => [...prev, newEmp]);

    const newActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      actorName: 'Administrator',
      actorRole: 'System Admin',
      action: 'onboarded new personnel',
      target: `${newEmp.name} (${newEmp.department})`,
      timestamp: 'Just now',
      type: 'employee_added'
    };
    setActivities(prev => [newActivity, ...prev]);

    showToast(`Added ${newEmp.name} to banking personnel directory`);
  };

  const updateEmployee = (employeeId: string, updatedData: Partial<Employee>) => {
    setAllEmployees(prev => prev.map(e => {
      if (e.id === employeeId) {
        const updated = { ...e, ...updatedData };
        if (currentEmployee.id === employeeId) {
          setCurrentEmployee(updated);
        }
        return updated;
      }
      return e;
    }));
    showToast('Personnel profile updated');
  };

  const deleteEmployee = (employeeId: string) => {
    const target = allEmployees.find(e => e.id === employeeId);
    if (!target) return;
    setAllEmployees(prev => prev.filter(e => e.id !== employeeId));
    showToast(`${target.name} removed from personnel roster`, 'warning');
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <BankContext.Provider
      value={{
        role,
        currentEmployee,
        allEmployees,
        tasks,
        notifications,
        activities,
        activePage,
        sidebarCollapsed,
        toasts,
        loginAs,
        logout,
        setActivePage,
        toggleSidebar,
        setCurrentEmployee,
        createTask,
        updateTaskStatus,
        updateTaskPriority,
        reassignTask,
        deleteTask,
        toggleChecklistItem,
        addTaskComment,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        showToast,
        removeToast
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
