import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { BankTask, TaskStatus, TaskPriority } from '../../types';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/ConfirmModal';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Shield, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Send, 
  Trash2, 
  ArrowRight,
  Building,
  Check
} from 'lucide-react';

interface TaskDetailsModalProps {
  task: BankTask | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, isOpen, onClose }) => {
  const { 
    updateTaskStatus, 
    updateTaskPriority, 
    toggleChecklistItem, 
    addTaskComment, 
    reassignTask, 
    deleteTask, 
    allEmployees, 
    role 
  } = useBank();

  const [newComment, setNewComment] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [selectedAssigneeId, setSelectedAssigneeId] = useState('');

  if (!isOpen || !task) return null;

  const completedChecklistCount = task.checklist.filter(c => c.completed).length;
  const checklistPercentage = task.checklist.length > 0 
    ? Math.round((completedChecklistCount / task.checklist.length) * 100)
    : 0;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addTaskComment(task.id, newComment);
    setNewComment('');
  };

  const handleReassign = () => {
    if (selectedAssigneeId && selectedAssigneeId !== task.assigneeId) {
      reassignTask(task.id, selectedAssigneeId);
    }
    setIsEditingAssignee(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div 
          className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#0b172a] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 font-bold">
                {task.taskCode}
              </span>
              <span className="text-xs text-slate-400">
                {task.department}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300 font-medium">
                {task.confidentiality}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
            {/* Title & Core Meta */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.status} />
                  <PriorityBadge priority={task.priority} />
                </div>

                {/* Quick Status Updater */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Move Status:</span>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                    className="text-xs font-semibold px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {task.title}
              </h1>

              {task.clientReference && (
                <div className="mt-2 text-xs font-mono text-blue-800 bg-blue-50 px-2.5 py-1 rounded inline-block border border-blue-200/60">
                  REF: {task.clientReference}
                </div>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Due Date</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1 font-mono-numbers">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{task.dueDate}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Est. Hours</div>
                <div className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1 font-mono-numbers">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{task.estimatedHours} hrs {task.actualHours ? `(${task.actualHours} logged)` : ''}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Issued By</div>
                <div className="font-medium text-slate-800 mt-0.5 truncate">
                  {task.createdBy}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Security Tier</div>
                <div className="font-medium text-slate-800 mt-0.5 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>{task.confidentiality}</span>
                </div>
              </div>
            </div>

            {/* Assignee Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Assigned Personnel
                </span>
                {role === 'admin' && !isEditingAssignee && (
                  <button
                    onClick={() => {
                      setSelectedAssigneeId(task.assigneeId);
                      setIsEditingAssignee(true);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
                  >
                    Reassign Personnel
                  </button>
                )}
              </div>

              {isEditingAssignee ? (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedAssigneeId}
                    onChange={e => setSelectedAssigneeId(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {allEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} — {emp.role} ({emp.department})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleReassign}
                    className="px-3 py-1.5 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingAssignee(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img
                    src={task.assigneeAvatar}
                    alt={task.assigneeName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{task.assigneeName}</div>
                    <div className="text-xs text-slate-500">
                      {allEmployees.find(e => e.id === task.assigneeId)?.role || 'Bank Officer'} · {task.department}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Operational Directive Details
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>

            {/* Interactive Compliance Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-blue-700" />
                  Mandatory Compliance Checklist ({completedChecklistCount}/{task.checklist.length})
                </h3>
                <span className="text-xs font-semibold text-slate-600 font-mono-numbers">
                  {checklistPercentage}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>

              <div className="space-y-2">
                {task.checklist.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(task.id, item.id)}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                      item.completed 
                        ? 'bg-emerald-50/50 border-emerald-200/60 text-slate-800' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      item.completed 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {item.completed && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`text-xs leading-snug font-medium flex-1 ${
                      item.completed ? 'line-through text-slate-500' : 'text-slate-800'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Notes & Comments Thread */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                Audit Trail & Officer Notes ({task.comments.length})
              </h3>

              <div className="space-y-3 mb-4">
                {task.comments.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                    No officer notes attached yet. Record initial findings below.
                  </p>
                ) : (
                  task.comments.map(c => (
                    <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <img src={c.authorAvatar} alt={c.authorName} className="w-5 h-5 rounded-full object-cover" />
                          <span className="font-bold text-slate-800">{c.authorName}</span>
                          <span className="text-[10px] text-slate-500">({c.authorRole})</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-sans pl-7">
                        {c.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Record an audit note, verification result, or memo..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Record Note</span>
                </button>
              </form>
            </div>

            {/* Bottom Actions: Delete & Close */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {role === 'admin' ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Task Record</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Confirm Task Deletion"
        message={`Are you sure you want to permanently delete task "${task.taskCode}: ${task.title}"? This action will remove the record from banking audits.`}
        confirmLabel="Delete Task"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};
