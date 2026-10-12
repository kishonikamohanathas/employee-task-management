import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Key, 
  Bell, 
  Smartphone, 
  CheckCircle2, 
  Award, 
  FileCheck, 
  Save, 
  Landmark,
  BadgeCheck
} from 'lucide-react';

export const MyProfilePage: React.FC = () => {
  const { currentEmployee, updateEmployee, role, showToast } = useBank();

  // Profile editable fields
  const [phone, setPhone] = useState(currentEmployee.phone);
  const [email, setEmail] = useState(currentEmployee.email);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsUrgentAlerts, setSmsUrgentAlerts] = useState(true);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee(currentEmployee.id, {
      phone,
      email
    });
    showToast('Profile and contact parameters updated');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters with numbers and symbols', 'warning');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Banking credential password successfully renewed');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Bank Officer Profile & Security Credentials
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Verify digital clearance tiers, contact parameters, and multi-factor authentication protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official Bank Identity Badge Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#0b172a] to-[#162a4d] text-white rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden text-center">
            {/* Top Seal */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
                  APEX FEDERAL BANK
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                ACTIVE
              </span>
            </div>

            {/* Photo & Hologram */}
            <div className="relative inline-block mx-auto mb-4">
              <img
                src={role === 'admin' 
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  : currentEmployee.avatarUrl
                }
                alt={currentEmployee.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/80 shadow-lg mx-auto"
              />
              <div className="absolute bottom-1 right-1 p-1 bg-blue-600 rounded-full border-2 border-[#0b172a]" title="Verified Bank Officer">
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-white">
              {role === 'admin' ? 'Eleanor Vance' : currentEmployee.name}
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              {role === 'admin' ? 'Chief Compliance Officer' : currentEmployee.role}
            </p>

            <div className="mt-2 inline-block font-mono text-xs font-bold text-slate-300 bg-black/40 px-3 py-1 rounded border border-white/10">
              {role === 'admin' ? 'ADMIN-CCO-001' : currentEmployee.employeeCode}
            </div>

            {/* Badge Specs */}
            <div className="mt-6 pt-4 border-t border-white/10 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Division:</span>
                <span className="font-semibold text-slate-200">
                  {role === 'admin' ? 'Compliance & Audit' : currentEmployee.department}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Branch:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[150px]">
                  {role === 'admin' ? 'Downtown HQ #0101' : currentEmployee.branch}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Clearance:</span>
                <span className="font-bold text-emerald-400">
                  {role === 'admin' ? 'Executive Level 4' : `${currentEmployee.clearanceLevel} Tier`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Appointed:</span>
                <span className="font-mono text-slate-300 font-mono-numbers">
                  {currentEmployee.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              Active Banking Certifications
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">FinCEN AML/CFT Certified</div>
                  <div className="text-[10px] text-slate-500 font-mono">Recertified: 2026-04 · Valid to 2027</div>
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Dodd-Frank Wall Street Compliance</div>
                  <div className="text-[10px] text-slate-500 font-mono">Annual OCC Standard Clearance</div>
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Dual-Control Cash Custody Authorization</div>
                  <div className="text-[10px] text-slate-500 font-mono">Vault Key Master Card #881</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Edit Details & Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Professional & Contact Parameters */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-700" />
              Professional & Contact Parameters
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Extension / Direct Line
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Operating Branch
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentEmployee.branch}
                    className="w-full px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Direct Supervisor
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentEmployee.supervisor}
                    className="w-full px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Contact Details</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Account Security & Two-Factor Authentication */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Security & Access Authentication
            </h3>

            <div className="space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Two-Factor Authentication (FIDO2 / Hardware Token)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Required for all banking transactions, wire releases, and loan approvals.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    showToast(twoFactorEnabled ? '2FA disabled (Warning: Non-compliant)' : '2FA hardware token active', twoFactorEnabled ? 'warning' : 'success');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    twoFactorEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <span className="bg-white w-4 h-4 rounded-full shadow-md" />
                </button>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Advisory Notification Channels
                </h4>

                <label className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg cursor-pointer">
                  <span className="text-xs font-medium text-slate-700">
                    Instant email dispatches for urgent regulatory directives
                  </span>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={e => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg cursor-pointer">
                  <span className="text-xs font-medium text-slate-700">
                    SMS alerts for cash vault variances & ATM sensor flags
                  </span>
                  <input
                    type="checkbox"
                    checked={smsUrgentAlerts}
                    onChange={e => setSmsUrgentAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Password Update Form */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-700" />
              Update Banking Portal Password
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    New Password (Min 8 chars)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Rotate Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
