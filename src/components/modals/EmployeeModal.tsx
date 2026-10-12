import React, { useState, useEffect } from 'react';
import { useBank } from '../../context/BankContext';
import { Employee, BankDepartment } from '../../types';
import { BANK_DEPARTMENTS, BANK_BRANCHES } from '../../data/mockData';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Calendar,
  Clock
} from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'view';
  employee: Employee | null;
  onClose: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  mode,
  employee,
  onClose
}) => {
  const { addEmployee, updateEmployee, tasks } = useBank();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Officer' | 'Senior Analyst' | 'Specialist' | 'Branch Lead' | 'Manager'>('Officer');
  const [department, setDepartment] = useState<BankDepartment>('Loan Underwriting');
  const [branch, setBranch] = useState(BANK_BRANCHES[0]);
  const [status, setStatus] = useState<'Active' | 'On Leave' | 'In Training'>('Active');
  const [clearanceLevel, setClearanceLevel] = useState<'Standard' | 'Elevated' | 'Executive'>('Standard');
  const [supervisor, setSupervisor] = useState('David Sterling (VP Lending)');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  useEffect(() => {
    if (employee && (mode === 'edit' || mode === 'view')) {
      setName(employee.name);
      setEmail(employee.email);
      setPhone(employee.phone);
      setRole(employee.role);
      setDepartment(employee.department);
      setBranch(employee.branch);
      setStatus(employee.status);
      setClearanceLevel(employee.clearanceLevel);
      setSupervisor(employee.supervisor);
      setAvatarUrl(employee.avatarUrl);
    } else {
      setName('');
      setEmail('');
      setPhone('+1 (555) 000-0000');
      setRole('Officer');
      setDepartment('Loan Underwriting');
      setBranch(BANK_BRANCHES[0]);
      setStatus('Active');
      setClearanceLevel('Standard');
      setSupervisor('David Sterling (VP Lending)');
      setAvatarUrl('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');
    }
  }, [employee, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (mode === 'add') {
      const code = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
      addEmployee({
        employeeCode: code,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        department,
        branch,
        avatarUrl,
        status,
        joinedDate: new Date().toISOString().split('T')[0],
        clearanceLevel,
        supervisor
      });
    } else if (mode === 'edit' && employee) {
      updateEmployee(employee.id, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        department,
        branch,
        status,
        clearanceLevel,
        supervisor,
        avatarUrl
      });
    }

    onClose();
  };

  // If view mode, show executive badge & assigned tasks
  if (mode === 'view' && employee) {
    const assignedTasks = tasks.filter(t => t.assigneeId === employee.id);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
        <div 
          className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-[#0b172a] to-[#1e3a8a] text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <img
                src={employee.avatarUrl}
                alt={employee.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/80 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{employee.name}</h2>
                  <span className="text-[10px] font-mono uppercase bg-blue-500/30 border border-blue-400/40 px-2 py-0.5 rounded text-blue-200">
                    {employee.employeeCode}
                  </span>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">{employee.role} · {employee.department}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-blue-300" />
                  <span>{employee.branch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Tasks</span>
                <div className="text-base font-bold text-blue-700 mt-0.5 font-mono-numbers">
                  {assignedTasks.filter(t => t.status !== 'completed').length}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completed</span>
                <div className="text-base font-bold text-emerald-700 mt-0.5 font-mono-numbers">
                  {employee.completedTasksCount}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Clearance</span>
                <div className="text-xs font-bold text-purple-700 mt-1">
                  {employee.clearanceLevel} Tier
                </div>
              </div>
            </div>

            {/* Official Contact Info */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Official Email
                </span>
                <span className="font-semibold text-slate-800 font-mono">{employee.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Direct Extension
                </span>
                <span className="font-semibold text-slate-800 font-mono">{employee.phone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Reporting Supervisor
                </span>
                <span className="font-semibold text-slate-800">{employee.supervisor}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Appointed Date
                </span>
                <span className="font-semibold text-slate-800 font-mono-numbers">{employee.joinedDate}</span>
              </div>
            </div>

            {/* Current Active Tasks */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Current Assigned Directives ({assignedTasks.length})
              </h3>
              {assignedTasks.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                  No active directives currently assigned.
                </div>
              ) : (
                <div className="space-y-2">
                  {assignedTasks.map(t => (
                    <div key={t.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{t.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-blue-700">{t.taskCode}</span>
                          <span>·</span>
                          <span className="capitalize">{t.status.replace('_', ' ')}</span>
                          <span>·</span>
                          <span>Due {t.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add / Edit Form Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#0b172a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 border border-blue-400/30 rounded-lg">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {mode === 'add' ? 'Onboard New Bank Employee' : `Edit Profile: ${employee?.name}`}
              </h2>
              <p className="text-xs text-slate-400">Manage institutional roster and access tiers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alexander Vance"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Bank Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="alexander.vance@apexfederal.bank"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Extension
              </label>
              <input
                type="text"
                placeholder="+1 (555) 482-1100"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value as BankDepartment)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              >
                {BANK_DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role / Title
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Officer">Officer</option>
                <option value="Senior Analyst">Senior Analyst</option>
                <option value="Specialist">Specialist</option>
                <option value="Branch Lead">Branch Lead</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Operating Branch
              </label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              >
                {BANK_BRANCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Employment Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="In Training">In Training</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Clearance Tier
              </label>
              <select
                value={clearanceLevel}
                onChange={e => setClearanceLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Standard">Standard Tier</option>
                <option value="Elevated">Elevated (Lending & AML)</option>
                <option value="Executive">Executive / Audit Board</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Reporting Supervisor
              </label>
              <input
                type="text"
                placeholder="David Sterling (VP Lending)"
                value={supervisor}
                onChange={e => setSupervisor(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm cursor-pointer"
            >
              {mode === 'add' ? 'Confirm Onboarding' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
