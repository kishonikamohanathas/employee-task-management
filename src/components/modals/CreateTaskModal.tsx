import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { TaskPriority, BankDepartment, TaskChecklistItem } from '../../types';
import { BANK_DEPARTMENTS } from '../../data/mockData';
import { X, Plus, Trash2, Shield, Calendar, Clock, User, Briefcase } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const { allEmployees, createTask, role } = useBank();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<BankDepartment>('Loan Underwriting');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState(allEmployees[0]?.id || '');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [estimatedHours, setEstimatedHours] = useState(6);
  const [clientReference, setClientReference] = useState('');
  const [confidentiality, setConfidentiality] = useState<'Internal' | 'Confidential' | 'Strictly Restricted'>('Confidential');
  
  // Checklist builder
  const [checklistItems, setChecklistItems] = useState<{ id: string; text: string; completed: boolean }[]>([
    { id: '1', text: 'Verify primary KYC identification documents', completed: false },
    { id: '2', text: 'Cross-check account balance and transaction history in core ledger', completed: false }
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');

  if (!isOpen) return null;

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklistItems(prev => [
      ...prev,
      { id: `c-${Date.now()}`, text: newChecklistText.trim(), completed: false }
    ]);
    setNewChecklistText('');
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedEmp = allEmployees.find(e => e.id === assigneeId) || allEmployees[0];

    createTask({
      title: title.trim(),
      description: description.trim(),
      department,
      priority,
      status: 'pending',
      assigneeId: selectedEmp.id,
      assigneeName: selectedEmp.name,
      assigneeAvatar: selectedEmp.avatarUrl,
      createdBy: role === 'admin' ? 'Chief Compliance Officer' : 'Branch Supervisor',
      dueDate,
      estimatedHours: Number(estimatedHours) || 4,
      checklist: checklistItems,
      clientReference: clientReference.trim() || undefined,
      confidentiality
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0b172a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 border border-blue-400/30 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold">Issue New Bank Directive / Task</h2>
              <p className="text-xs text-slate-400">Deploy workflow requirement to authorized branch personnel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Directive Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Task / Directive Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Audit Commercial Credit Facility #CRE-9920"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium"
            />
          </div>

          {/* Department & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Department
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value as BankDepartment)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium cursor-pointer"
              >
                {BANK_DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Operational Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium cursor-pointer"
              >
                <option value="low">Low (Routine)</option>
                <option value="medium">Medium (Standard Business Day)</option>
                <option value="high">High (Compliance Sensitive)</option>
                <option value="urgent">Urgent (Immediate Mandate / 24h)</option>
              </select>
            </div>
          </div>

          {/* Assignee & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Assign Personnel
              </label>
              <select
                value={assigneeId}
                onChange={e => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium cursor-pointer"
              >
                {allEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role} ({emp.activeTasksCount} active tasks)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Compliance Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Account/Client Reference & Confidentiality Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Client / Ledger Reference
              </label>
              <input
                type="text"
                placeholder="e.g. ACC-49102 // Vanguard Logistics"
                value={clientReference}
                onChange={e => setClientReference(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Est. Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={estimatedHours}
                  onChange={e => setEstimatedHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  Security Tier
                </label>
                <select
                  value={confidentiality}
                  onChange={e => setConfidentiality(e.target.value as any)}
                  className="w-full px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
                >
                  <option value="Internal">Internal</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Strictly Restricted">Strictly Restricted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Task Specifications & Regulatory Scope
            </label>
            <textarea
              rows={3}
              placeholder="Provide exact banking procedures, compliance benchmarks, or underwriting rules to be applied..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 leading-relaxed font-sans"
            />
          </div>

          {/* Operational Checklist Builder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mandatory Audit Checklist Items ({checklistItems.length})
            </label>
            <div className="space-y-2 mb-2">
              {checklistItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-700 font-medium">{item.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChecklistItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add audit step (e.g. Verify dual signature sign-off)"
                value={newChecklistText}
                onChange={e => setNewChecklistText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChecklistItem();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Create Task & Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
