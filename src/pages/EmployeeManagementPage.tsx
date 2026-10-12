import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { Employee, BankDepartment } from '../types';
import { EmployeeModal } from '../components/modals/EmployeeModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit2, 
  Trash2, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { BANK_DEPARTMENTS } from '../data/mockData';

export const EmployeeManagementPage: React.FC = () => {
  const { 
    allEmployees, 
    deleteEmployee, 
    role, 
    loginAs 
  } = useBank();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [targetEmployee, setTargetEmployee] = useState<Employee | null>(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  // Filter logic
  const filteredEmployees = allEmployees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalStaff = allEmployees.length;
  const activeStaff = allEmployees.filter(e => e.status === 'Active').length;
  const onLeaveStaff = allEmployees.filter(e => e.status === 'On Leave').length;
  const averageTaskLoad = Math.round(
    (allEmployees.reduce((acc, curr) => acc + curr.activeTasksCount, 0) / (totalStaff || 1)) * 10
  ) / 10;

  const handleOpenAdd = () => {
    setModalMode('add');
    setTargetEmployee(null);
    setIsEmployeeModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setModalMode('edit');
    setTargetEmployee(emp);
    setIsEmployeeModalOpen(true);
  };

  const handleOpenView = (emp: Employee) => {
    setModalMode('view');
    setTargetEmployee(emp);
    setIsEmployeeModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metric Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Bank Personnel & Roster Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain authorized bank staff credentials, department allocations, and operational clearances.
          </p>
        </div>

        {role === 'admin' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Onboard New Personnel</span>
          </button>
        )}
      </div>

      {/* Roster Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Staff
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono-numbers">
            {totalStaff}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Authorized bank officers</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active on Duty
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono-numbers">
            {activeStaff}
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Operational readiness</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            On Leave / Training
          </div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1 font-mono-numbers">
            {onLeaveStaff + allEmployees.filter(e => e.status === 'In Training').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Temporary relief status</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Avg Directives Load
          </div>
          <div className="text-2xl font-extrabold text-blue-700 mt-1 font-mono-numbers">
            {averageTaskLoad}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Directives per officer</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, ID (EMP-1042), or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Division:</span>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Divisions ({allEmployees.length})</option>
              {BANK_DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="text-xs font-semibold px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="In Training">In Training</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bank Employee Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Bank Officer</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Role & Division</th>
                <th className="py-3 px-4">Operating Branch</th>
                <th className="py-3 px-4">Workload</th>
                <th className="py-3 px-4">Clearance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No bank employees match the specified filters.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{emp.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{emp.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {emp.employeeCode}
                    </td>

                    {/* Role & Division */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{emp.role}</div>
                      <div className="text-[11px] text-slate-500">{emp.department}</div>
                    </td>

                    {/* Branch */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{emp.branch}</span>
                      </div>
                    </td>

                    {/* Workload */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        emp.activeTasksCount === 0 
                          ? 'bg-slate-100 text-slate-600'
                          : emp.activeTasksCount >= 4 
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {emp.activeTasksCount} active
                      </span>
                    </td>

                    {/* Clearance */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        emp.clearanceLevel === 'Executive'
                          ? 'text-purple-700'
                          : emp.clearanceLevel === 'Elevated'
                            ? 'text-blue-700'
                            : 'text-slate-600'
                      }`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {emp.clearanceLevel}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        emp.status === 'Active' 
                          ? 'text-emerald-700' 
                          : emp.status === 'On Leave'
                            ? 'text-amber-700'
                            : 'text-sky-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          emp.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        {emp.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenView(emp)}
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="View Officer Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {role === 'admin' && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit Details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEmployeeToDelete(emp)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Remove Personnel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Quick switch to this officer's dashboard */}
                        <button
                          onClick={() => loginAs('employee', emp.id)}
                          className="hidden sm:inline-block px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 cursor-pointer ml-1"
                          title="Simulate logging in as this employee"
                        >
                          Login as
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        mode={modalMode}
        employee={targetEmployee}
        onClose={() => setIsEmployeeModalOpen(false)}
      />

      <ConfirmModal
        isOpen={Boolean(employeeToDelete)}
        title="Remove Employee from Roster"
        message={`Are you sure you want to remove ${employeeToDelete?.name} (${employeeToDelete?.employeeCode}) from the authorized bank personnel roster?`}
        confirmLabel="Remove Personnel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setEmployeeToDelete(null)}
      />
    </div>
  );
};
