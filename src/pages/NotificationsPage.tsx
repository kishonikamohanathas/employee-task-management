import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { TaskDetailsModal } from '../components/modals/TaskDetailsModal';
import { BankTask, BankNotification } from '../types';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ArrowRight,
  ShieldAlert,
  Info,
  Calendar
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearNotification, 
    tasks, 
    role, 
    currentEmployee 
  } = useBank();

  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'task_assigned' | 'deadline_warning' | 'task_completed'>('all');
  const [selectedTask, setSelectedTask] = useState<BankTask | null>(null);

  // Filter scoped notifications
  const scopedNotifications = notifications.filter(n => {
    if (role === 'admin') return true;
    if (n.targetRole === 'admin') return false;
    if (n.targetEmployeeId && n.targetEmployeeId !== currentEmployee.id) return false;
    return true;
  });

  const filteredNotifications = scopedNotifications.filter(n => {
    if (filterTab === 'all') return true;
    if (filterTab === 'unread') return !n.read;
    if (filterTab === 'task_assigned') return n.type === 'task_assigned';
    if (filterTab === 'deadline_warning') return n.type === 'deadline_warning';
    if (filterTab === 'task_completed') return n.type === 'task_completed';
    return true;
  });

  const unreadCount = scopedNotifications.filter(n => !n.read).length;

  const handleOpenTask = (taskId?: string) => {
    if (!taskId) return;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Regulatory Alerts & Operations Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="text-[11px] font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time compliance advisories, audit deadline warnings, and directive status dispatches.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterTab === 'all' 
              ? 'bg-blue-700 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Notifications ({scopedNotifications.length})
        </button>
        <button
          onClick={() => setFilterTab('unread')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterTab === 'unread' 
              ? 'bg-blue-700 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilterTab('task_assigned')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterTab === 'task_assigned' 
              ? 'bg-blue-700 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          New Directives
        </button>
        <button
          onClick={() => setFilterTab('deadline_warning')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterTab === 'deadline_warning' 
              ? 'bg-blue-700 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Deadline Warnings
        </button>
        <button
          onClick={() => setFilterTab('task_completed')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filterTab === 'task_completed' 
              ? 'bg-blue-700 text-white shadow-xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Completion Signoffs
        </button>
      </div>

      {/* Notifications Stream */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map(notif => {
            let Icon = Info;
            let iconColor = 'text-blue-600 bg-blue-50';
            let borderColor = 'border-slate-200/80';

            if (notif.type === 'deadline_warning' || notif.priority === 'urgent') {
              Icon = AlertTriangle;
              iconColor = 'text-rose-600 bg-rose-50';
              borderColor = 'border-rose-200 bg-rose-50/20';
            } else if (notif.type === 'task_completed') {
              Icon = CheckCircle2;
              iconColor = 'text-emerald-600 bg-emerald-50';
            } else if (notif.type === 'task_assigned') {
              Icon = Clock;
              iconColor = 'text-sky-600 bg-sky-50';
            }

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 bg-white ${borderColor} ${
                  !notif.read ? 'ring-1 ring-blue-500/30 shadow-xs' : ''
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-bold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {notif.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    {notif.relatedTaskId && (
                      <button
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          handleOpenTask(notif.relatedTaskId);
                        }}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect Related Directive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {!notif.read && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => clearNotification(notif.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 font-medium ml-auto flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Details Modal if opened from notification */}
      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};
