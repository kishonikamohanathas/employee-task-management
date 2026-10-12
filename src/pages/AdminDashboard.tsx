import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { EmployeeModal } from '../components/modals/EmployeeModal';
import { TaskDetailsModal } from '../components/modals/TaskDetailsModal';
import { BankTask } from '../types';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  UserPlus, 
  ArrowUpRight, 
  Download, 
  ShieldAlert, 
  Activity, 
  Layers, 
  ChevronRight, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { BANK_DEPARTMENTS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { 
    allEmployees, 
    tasks, 
    activities, 
    setActivePage, 
    showToast 
  } = useBank();

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<BankTask | null>(null);

  // Core KPI Calculations
  const totalEmployees = allEmployees.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const inReviewTasks = tasks.filter(t => t.status === 'in_review').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;

  // Urgent tasks
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed');

  // Department distribution
  const departmentStats = BANK_DEPARTMENTS.map(dept => {
    const deptTasks = tasks.filter(t => t.department === dept);
    return {
      department: dept,
      total: deptTasks.length,
      completed: deptTasks.filter(t => t.status === 'completed').length,
      pending: deptTasks.filter(t => t.status !== 'completed').length
    };
  });

  const handleExportCSV = () => {
    const headers = ['Task Code', 'Title', 'Department', 'Assignee', 'Priority', 'Status', 'Due Date'];
    const rows = tasks.map(t => [
      t.taskCode,
      `"${t.title.replace(/"/g, '""')}"`,
      t.department,
      t.assigneeName,
      t.priority,
      t.status,
      t.dueDate
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_bank_tasks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Task register exported to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Compliance & Operations Dashboard
            </h1>
            <span className="text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">
              ADMINISTRATIVE CONSOLE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time branch directive velocity, staff capacity, and regulatory audit compliance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download CSV audit log"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddEmployeeOpen(true)}
            className="px-3 py-2 text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>
          <button
            onClick={() => setIsCreateTaskOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Directive</span>
          </button>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Personnel */}
        <div 
          onClick={() => setActivePage('employees')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Personnel
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono-numbers">
            {totalEmployees}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
            <span className="text-emerald-600 font-semibold">100%</span> active branch roster
          </div>
        </div>

        {/* Total Directives */}
        <div 
          onClick={() => setActivePage('tasks')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Directives
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono-numbers">
            {totalTasks}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Across 6 bank divisions
          </div>
        </div>

        {/* Pending & In Review */}
        <div 
          onClick={() => setActivePage('tasks')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending / In Review
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2 font-mono-numbers">
            {pendingTasks + inReviewTasks}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium font-mono-numbers">
            {pendingTasks} queued · {inReviewTasks} awaiting signoff
          </div>
        </div>

        {/* Completed Directives */}
        <div 
          onClick={() => setActivePage('tasks')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Verified Completed
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2 font-mono-numbers">
            {completedTasks}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium font-mono-numbers">
            {Math.round((completedTasks / (totalTasks || 1)) * 100)}% audit closure rate
          </div>
        </div>

        {/* Overdue / Flags */}
        <div 
          onClick={() => setActivePage('tasks')}
          className="col-span-2 sm:col-span-1 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-rose-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Overdue / Escalated
            </span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 mt-2 font-mono-numbers">
            {overdueTasks}
          </div>
          <div className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
            {overdueTasks > 0 ? 'Requires immediate action' : 'Zero overdue items'}
          </div>
        </div>
      </div>

      {/* Analytics Charts & Department Workload Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Departmental Workload Allocation */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Workload & Directive Distribution by Banking Division
              </h2>
              <p className="text-xs text-slate-500">Live allocation across specialized departments</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Total: {totalTasks} Tasks</span>
          </div>

          <div className="space-y-3.5">
            {departmentStats.map((stat, idx) => {
              const maxTasks = Math.max(...departmentStats.map(s => s.total), 1);
              const percentage = Math.round((stat.total / maxTasks) * 100);

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{stat.department}</span>
                    <span className="font-mono text-slate-500 font-medium">
                      <strong className="text-slate-900 font-mono-numbers">{stat.total}</strong> directives ({stat.completed} completed)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                    {/* Completed Portion */}
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(stat.completed / maxTasks) * 100}%` }}
                      title={`${stat.completed} completed`}
                    />
                    {/* Active Pending Portion */}
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${(stat.pending / maxTasks) * 100}%` }}
                      title={`${stat.pending} pending`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span> Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span> Active / In Progress
              </span>
            </div>
            <button
              onClick={() => setActivePage('tasks')}
              className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Department Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chart 2: Status Breakdown Donut & Velocity Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
              Directive Status Matrix
            </h2>
            <p className="text-xs text-slate-500 mb-4">Current state of open bank requirements</p>

            {/* Custom Interactive Status Visualizer */}
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> In Progress
                </span>
                <span className="font-bold text-slate-900 font-mono-numbers">{inProgressTasks}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Under Compliance Review
                </span>
                <span className="font-bold text-slate-900 font-mono-numbers">{inReviewTasks}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Queued / Pending
                </span>
                <span className="font-bold text-slate-900 font-mono-numbers">{pendingTasks}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Audit Signed / Completed
                </span>
                <span className="font-bold text-slate-900 font-mono-numbers">{completedTasks}</span>
              </div>
              <div className="p-3 bg-rose-50/60 rounded-lg flex items-center justify-between text-xs border border-rose-100">
                <span className="flex items-center gap-2 text-rose-800 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Overdue Threshold
                </span>
                <span className="font-bold text-rose-800 font-mono-numbers">{overdueTasks}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-blue-50/60 border border-blue-200/60 rounded-lg text-xs">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-700" />
              <span>Operational Efficiency: 94.2%</span>
            </div>
            <p className="text-slate-600 mt-1 leading-snug">
              Average task turnaround is currently 1.8 business days across all branches.
            </p>
          </div>
        </div>
      </div>

      {/* Urgent Directives & Live Audit Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Directives */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Urgent Action Directives ({urgentTasks.length})
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Immediate Escalation
            </span>
          </div>

          <div className="space-y-3">
            {urgentTasks.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                All urgent directives have been cleared.
              </div>
            ) : (
              urgentTasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTask(t)}
                  className="p-3.5 bg-rose-50/30 hover:bg-rose-50/60 border border-rose-200/60 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded">
                      {t.taskCode}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500">Due {t.dueDate}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors">
                    {t.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2">
                    <div className="flex items-center gap-2">
                      <img src={t.assigneeAvatar} alt={t.assigneeName} className="w-4 h-4 rounded-full" />
                      <span className="font-medium">{t.assigneeName}</span>
                    </div>
                    <span className="text-slate-400">{t.department}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Operational Activity Log */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Regulatory & Operational Audit Log
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Live feed</span>
          </div>

          <div className="space-y-3.5">
            {activities.slice(0, 5).map(act => (
              <div key={act.id} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <div className="flex-1">
                  <div className="text-slate-800">
                    <strong className="text-slate-900">{act.actorName}</strong> ({act.actorRole}) {act.action}{' '}
                    <span className="font-semibold text-blue-900">{act.target}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {act.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      />

      <EmployeeModal
        isOpen={isAddEmployeeOpen}
        mode="add"
        employee={null}
        onClose={() => setIsAddEmployeeOpen(false)}
      />

      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};
