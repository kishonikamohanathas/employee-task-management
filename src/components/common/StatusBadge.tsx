import React from 'react';
import { TaskStatus, TaskPriority } from '../../types';

interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Completed
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50/80 px-2 py-0.5 rounded border border-sky-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
          In Progress
        </span>
      );
    case 'in_review':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50/80 px-2 py-0.5 rounded border border-purple-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
          In Review
        </span>
      );
    case 'overdue':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          Overdue
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          Pending
        </span>
      );
  }
};

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  switch (priority) {
    case 'urgent':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          Urgent
        </span>
      );
    case 'high':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          High
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Medium
        </span>
      );
    case 'low':
    default:
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          Low
        </span>
      );
  }
};
