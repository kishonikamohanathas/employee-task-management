import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  ShieldCheck, 
  UserCheck, 
  Landmark, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  Building, 
  CheckCircle,
  FileCheck2,
  Users
} from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const { loginAs, allEmployees, setActivePage } = useBank();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(allEmployees[0]?.id || 'emp-1');

  return (
    <div className="min-h-screen bg-[#07111e] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Bank Architectural subtle patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.35),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white">APEX FEDERAL BANK</div>
            <div className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Internal Operations Portal</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            PORTAL STATUS: OPERATIONAL
          </span>
          <span>·</span>
          <span>SYSTEM TIME: 2026-10-12 EST</span>
        </div>
      </header>

      {/* Main Hero & Dual Role Selection Cards */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>SECURE RESTRICTED ACCESS ENVIRONMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Bank Employee Task & Workflow Management System
          </h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Select your operational role to access your dedicated banking console. All activities are audited according to Federal Banking Regulations and OCC standards.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Admin / Compliance Officer */}
          <div className="bg-[#0f1d33] border border-[#1e345e] hover:border-blue-500 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-xl transition-all duration-200 group relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-white">Administrator Login</h2>
                <span className="text-[10px] font-mono font-bold bg-blue-950 border border-blue-700 text-blue-300 px-2 py-0.5 rounded">
                  EXECUTIVE TIER
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Full governance console for Chief Compliance Officers, Branch Directors, and Audit Supervisors.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Issue & assign directives across all departments</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Executive analytics, overdue tasks & audit velocity</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Manage bank employee roster and clearance levels</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Review compliance sign-offs & regulatory filings</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => loginAs('admin')}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer group-hover:shadow-blue-500/40"
              >
                <span>Enter as Administrator</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-3 font-mono">
                Auto-assigned: Eleanor Vance (Chief Compliance Officer)
              </p>
            </div>
          </div>

          {/* Card 2: Bank Employee Portal */}
          <div className="bg-[#0f1d33] border border-[#1e345e] hover:border-cyan-500 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-xl transition-all duration-200 group relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                <UserCheck className="w-8 h-8" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-white">Employee Login</h2>
                <span className="text-[10px] font-mono font-bold bg-cyan-950 border border-cyan-700 text-cyan-300 px-2 py-0.5 rounded">
                  OFFICER WORKSPACE
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Personalized task workspace for Loan Officers, AML Specialists, Cash Vault Leads, and Branch Staff.
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Scoped view strictly showing My Assigned Tasks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Interactive checklists, work notes & status progression</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Personal deadlines, priority alerts & audit badges</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Officer credentials, clearance tier & profile</span>
                </div>
              </div>

              {/* Sample Persona Selector for quick testing */}
              <div className="mb-6 p-3 bg-[#081220] border border-[#172b4c] rounded-xl">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Select Employee Persona</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Demo Quick Switch</span>
                </label>
                <select
                  value={selectedEmployeeId}
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#0f1d33] border border-[#243e6c] rounded-lg text-slate-200 focus:outline-hidden focus:border-cyan-500 font-medium cursor-pointer"
                >
                  {allEmployees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} — {emp.role} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={() => loginAs('employee', selectedEmployeeId)}
                className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 transition-all cursor-pointer group-hover:shadow-cyan-500/40"
              >
                <span>Enter as Bank Employee</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-3 font-mono">
                Personalized queue scoped to selected bank officer
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-400">APEX FEDERAL CORP</span>
          <span>·</span>
          <span>Member FDIC #38914</span>
          <span>·</span>
          <span>Equal Housing Lender</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>AES-256 Bit Encryption</span>
          <span>·</span>
          <span>FIPS 140-2 Validated</span>
          <span>·</span>
          <button
            onClick={() => setActivePage('error')}
            className="hover:text-rose-400 underline cursor-pointer"
            title="Preview Banking Error Page Design"
          >
            Error Page Preview
          </button>
        </div>
      </footer>
    </div>
  );
};
