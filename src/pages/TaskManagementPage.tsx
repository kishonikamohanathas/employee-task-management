import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { BankTask, TaskStatus, TaskPriority, BankDepartment } from '../types';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { TaskDetailsModal } from '../components/modals/TaskDetailsModal';
import { BANK_DEPARTMENTS } from '../data/mockData';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Calendar, 
  Clock, 
  User, 
  CheckSquare, 
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const TaskManagementPage: React.FC = () => {
  const { 
    tasks, 
    role, 
    currentEmployee, 
    allEmployees, 
    updateTaskStatus 
  } = useBank();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<BankTask | null>(null);

  // Filter tasks based on role and filters
  const filteredTasks = tasks.filter(task => {
    // If logged in as employee, by default show their tasks unless they choose "all branch"
    const matchesScope = role === 'admin' 
      ? true 
      : selectedAssignee === 'all' 
        ? task.assigneeId === currentEmployee.id 
        : true;

    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.clientReference && task.clientReference.toLowerCase().includes(searchQuery.toLowerCase())) ||
      task.assigneeName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesDept = selectedDepartment === 'all' || task.department === selectedDepartment;
    const matchesAssignee = selectedAssignee === 'all' || task.assigneeId === selectedAssignee;

    return matchesScope && matchesSearch && matchesStatus && matchesPriority && matchesDept && matchesAssignee;
  });

  const kanbanColumns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'pending', label: 'Queued Directives', color: 'border-amber-400' },
    { status: 'in_progress', label: 'Under Active Work', color: 'border-sky-400' },
    { status: 'in_review', label: 'Compliance Review', color: 'border-purple-400' },
    { status: 'completed', label: 'Verified & Closed', color: 'border-emerald-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Banking Task & Directive Management
            </h1>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
              {role === 'admin' ? 'FULL INSTITUTION REGISTER' : `SCOPED TO: ${currentEmployee.name}`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track statutory audits, KYC refreshes, loan underwriting requirements, and vault balances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Table / Kanban view toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Directive</span>
          </button>
        </div>
      </div>

      {/* Search and Multi-Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search title, code (BNK-2026), or client..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-1">
            {/* Status */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>

            {/* Priority */}
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Department */}
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Divisions</option>
              {BANK_DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Assignee (visible to Admin) */}
            {role === 'admin' && (
              <select
                value={selectedAssignee}
                onChange={e => setSelectedAssignee(e.target.value)}
                className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Assignees</option>
                {allEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            )}

            {/* Reset Filters */}
            {(selectedStatus !== 'all' || selectedPriority !== 'all' || selectedDepartment !== 'all' || selectedAssignee !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedPriority('all');
                  setSelectedDepartment('all');
                  setSelectedAssignee('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline ml-auto cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main View: Table vs Kanban */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Directive Code</th>
                  <th className="py-3 px-4">Title & Specifications</th>
                  <th className="py-3 px-4">Division</th>
                  <th className="py-3 px-4">Assigned Personnel</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Compliance Due</th>
                  <th className="py-3 px-4">Checklist</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 text-xs">
                      No directives matching the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map(t => {
                    const completedChecks = t.checklist.filter(c => c.completed).length;

                    return (
                      <tr 
                        key={t.id} 
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                        onClick={() => setSelectedTask(t)}
                      >
                        {/* Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-900 whitespace-nowrap">
                          {t.taskCode}
                        </td>

                        {/* Title & Ref */}
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {t.title}
                          </div>
                          {t.clientReference && (
                            <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                              {t.clientReference}
                            </div>
                          )}
                        </td>

                        {/* Department */}
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {t.department}
                        </td>

                        {/* Assignee */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={t.assigneeAvatar}
                              alt={t.assigneeName}
                              className="w-6 h-6 rounded-full object-cover border border-slate-200"
                            />
                            <span className="font-medium text-slate-800">{t.assigneeName}</span>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <PriorityBadge priority={t.priority} />
                        </td>

                        {/* Due Date */}
                        <td className="py-3.5 px-4 font-mono whitespace-nowrap font-mono-numbers">
                          {t.dueDate}
                        </td>

                        {/* Checklist */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-600 font-mono-numbers">
                          {completedChecks}/{t.checklist.length}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <StatusBadge status={t.status} />
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedTask(t)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.status);

            return (
              <div 
                key={col.status}
                className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      {col.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white text-slate-700 px-2 py-0.5 rounded shadow-2xs">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Tasks */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                      No directives in this lane
                    </div>
                  ) : (
                    colTasks.map(t => {
                      const completedChecks = t.checklist.filter(c => c.completed).length;

                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTask(t)}
                          className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="font-mono text-[11px] font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded">
                              {t.taskCode}
                            </span>
                            <PriorityBadge priority={t.priority} />
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                            {t.title}
                          </h4>

                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <img src={t.assigneeAvatar} alt={t.assigneeName} className="w-4 h-4 rounded-full" />
                              <span className="truncate max-w-[90px]">{t.assigneeName.split(' ')[0]}</span>
                            </div>
                            <span className="font-mono text-[10px] font-mono-numbers">Due {t.dueDate.split('-').slice(1).join('/')}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};
