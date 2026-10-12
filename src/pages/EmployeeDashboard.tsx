import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { TaskDetailsModal } from '../components/modals/TaskDetailsModal';
import { BankTask, TaskStatus } from '../types';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Bell
} from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const { 
    currentEmployee, 
    tasks, 
    updateTaskStatus, 
    toggleChecklistItem, 
    notifications, 
    setActivePage 
  } = useBank();

  const [selectedTask, setSelectedTask] = useState<BankTask | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'in_progress' | 'pending' | 'completed'>('all');

  // STRICTLY SCOPED TO THIS EMPLOYEE!
  const myTasks = tasks.filter(t => t.assigneeId === currentEmployee.id);

  const myPending = myTasks.filter(t => t.status === 'pending').length;
  const myInProgress = myTasks.filter(t => t.status === 'in_progress').length;
  const myInReview = myTasks.filter(t => t.status === 'in_review').length;
  const myCompleted = myTasks.filter(t => t.status === 'completed').length;
  const myOverdue = myTasks.filter(t => t.status === 'overdue').length;

  // Filtered task list
  const filteredTasks = myTasks.filter(t => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'in_progress') return t.status === 'in_progress' || t.status === 'in_review';
    if (taskFilter === 'pending') return t.status === 'pending';
    if (taskFilter === 'completed') return t.status === 'completed';
    return true;
  });

  // Top active task for quick checklist view
  const activeFocusTask = myTasks.find(t => t.status === 'in_progress') || myTasks.find(t => t.status === 'pending') || myTasks[0];

  // Employee's personal notifications
  const myNotifications = notifications.filter(n => 
    !n.targetRole && (n.targetEmployeeId === currentEmployee.id || !n.targetEmployeeId)
  );

  return (
    <div className="space-y-6">
      {/* Officer Personal Welcome Header */}
      <div className="bg-gradient-to-r from-[#0b172a] via-[#102242] to-[#1e3a8a] text-white p-6 rounded-2xl border border-slate-700 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentEmployee.avatarUrl}
              alt={currentEmployee.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/60 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Welcome back, {currentEmployee.name}
                </h1>
                <span className="text-[10px] font-mono bg-blue-400/20 border border-blue-300/30 text-blue-200 px-2 py-0.5 rounded uppercase">
                  {currentEmployee.employeeCode}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1 flex items-center gap-2">
                <span>{currentEmployee.role}</span>
                <span>·</span>
                <span>{currentEmployee.department}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Building2 className="w-3.5 h-3.5" />
                  {currentEmployee.branch}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('profile')}
              className="px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Clearance: {currentEmployee.clearanceLevel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Personal Performance KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Workload */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              My Active Queue
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono-numbers">
            {myTasks.filter(t => t.status !== 'completed').length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Assigned directly to your queue
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Under Active Review
            </span>
            <div className="p-2 bg-sky-50 text-sky-700 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 mt-2 font-mono-numbers">
            {myInProgress + myInReview}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium font-mono-numbers">
            {myInProgress} working · {myInReview} submitted
          </div>
        </div>

        {/* Completed This Cycle */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Verified Completed
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2 font-mono-numbers">
            {myCompleted}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Audit signs confirmed</span>
          </div>
        </div>

        {/* Compliance Rating */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              On-Time Rating
            </span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-2 font-mono-numbers">
            {myOverdue === 0 ? '100%' : '88.5%'}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            {myOverdue > 0 ? `${myOverdue} overdue item requires action` : 'All deadlines in compliance'}
          </div>
        </div>
      </div>

      {/* Main Grid: My Tasks Queue + Active Focus Directive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Tasks Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  My Assigned Banking Directives ({myTasks.length})
                </h2>
                <p className="text-xs text-slate-500">Only showing directives assigned to your personnel ID</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setTaskFilter('all')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    taskFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({myTasks.length})
                </button>
                <button
                  onClick={() => setTaskFilter('in_progress')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    taskFilter === 'in_progress' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Active ({myInProgress + myInReview})
                </button>
                <button
                  onClick={() => setTaskFilter('pending')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    taskFilter === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Queued ({myPending})
                </button>
                <button
                  onClick={() => setTaskFilter('completed')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    taskFilter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Done ({myCompleted})
                </button>
              </div>
            </div>

            {/* Task Cards List */}
            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
                  No directives found matching this filter.
                </div>
              ) : (
                filteredTasks.map(t => {
                  const completedChecks = t.checklist.filter(c => c.completed).length;
                  const percent = t.checklist.length > 0 
                    ? Math.round((completedChecks / t.checklist.length) * 100) 
                    : 0;

                  return (
                    <div
                      key={t.id}
                      className="p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded">
                            {t.taskCode}
                          </span>
                          <StatusBadge status={t.status} />
                          <PriorityBadge priority={t.priority} />
                        </div>
                        <div className="text-xs font-mono font-medium text-slate-500 flex items-center gap-1 font-mono-numbers">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Due {t.dueDate}</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => setSelectedTask(t)}
                        className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        {t.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {t.description}
                      </p>

                      {/* Checklist Progress Bar */}
                      {t.checklist.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                            <span>Checklist Progress</span>
                            <span className="font-mono font-semibold">{completedChecks}/{t.checklist.length} ({percent}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Quick Card Controls */}
                      <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="text-[11px] text-slate-400 font-mono">
                          {t.confidentiality}
                        </div>

                        <div className="flex items-center gap-2">
                          {t.status === 'pending' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'in_progress')}
                              className="px-2.5 py-1 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              Start Working
                            </button>
                          )}

                          {t.status === 'in_progress' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'in_review')}
                              className="px-2.5 py-1 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              Submit for Review
                            </button>
                          )}

                          {t.status === 'in_review' && (
                            <button
                              onClick={() => updateTaskStatus(t.id, 'completed')}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedTask(t)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-white rounded-lg border border-slate-200 transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Active Directive Checklist & Personal Notifications */}
        <div className="space-y-6">
          {/* Active Directive Focus Panel */}
          {activeFocusTask && (
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Active Priority Focus
                </span>
                <span className="font-mono text-xs text-slate-400">{activeFocusTask.taskCode}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {activeFocusTask.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {activeFocusTask.description}
              </p>

              {/* Interactive checklist directly on dashboard */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Immediate Checklist Steps:
                </h4>
                <div className="space-y-2">
                  {activeFocusTask.checklist.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(activeFocusTask.id, item.id)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                        item.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {item.completed && <Check className="w-3 h-3" />}
                      </div>
                      <span className={`text-xs leading-snug ${
                        item.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedTask(activeFocusTask)}
                className="w-full mt-4 py-2 px-3 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Open Full Directive & Add Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Personal Notifications Snippet */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Personal Alerts & Memos
                </h3>
              </div>
              <button
                onClick={() => setActivePage('notifications')}
                className="text-xs text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {myNotifications.slice(0, 3).map(notif => (
                <div key={notif.id} className="p-3 bg-slate-50 rounded-lg text-xs">
                  <div className="font-bold text-slate-800">{notif.title}</div>
                  <div className="text-slate-600 mt-0.5 leading-snug">{notif.message}</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{notif.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};
