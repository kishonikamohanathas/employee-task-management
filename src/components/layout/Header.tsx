import React, { useState, useRef, useEffect } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Bell, 
  Search, 
  Menu, 
  Building2, 
  ChevronDown, 
  ShieldCheck, 
  User, 
  LogOut, 
  Check, 
  ExternalLink,
  Users
} from 'lucide-react';
import { BANK_BRANCHES } from '../../data/mockData';

export const Header: React.FC = () => {
  const { 
    role, 
    currentEmployee, 
    allEmployees, 
    setCurrentEmployee, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    activePage, 
    setActivePage, 
    toggleSidebar, 
    loginAs, 
    logout 
  } = useBank();

  const [selectedBranch, setSelectedBranch] = useState(BANK_BRANCHES[0]);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEmployeeSwitcher, setShowEmployeeSwitcher] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const empRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setShowBranchMenu(false);
      }
      if (empRef.current && !empRef.current.contains(event.target as Node)) {
        setShowEmployeeSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications relevant to current user
  const relevantNotifications = notifications.filter(n => {
    if (role === 'admin') return true;
    if (n.targetRole === 'admin') return false;
    if (n.targetEmployeeId && n.targetEmployeeId !== currentEmployee.id) return false;
    return true;
  });

  const unreadCount = relevantNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 lg:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile menu toggle + Branch Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Bank Branch Selector */}
        <div className="relative" ref={branchRef}>
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span className="hidden sm:inline font-mono-numbers">{selectedBranch}</span>
            <span className="sm:hidden font-mono-numbers">{selectedBranch.split('#')[1] || 'HQ'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showBranchMenu && (
            <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase border-b border-slate-100">
                Authorized Operating Branches
              </div>
              {BANK_BRANCHES.map(branch => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setShowBranchMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedBranch === branch ? 'text-blue-800 font-semibold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="truncate">{branch}</span>
                  {selectedBranch === branch && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Search / Audit Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div 
          onClick={() => setActivePage('tasks')} 
          className="w-full flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-xs text-slate-400 cursor-pointer transition-colors"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span>Search tasks by code (e.g. BNK-2026), client, or account...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 shadow-2xs">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Role Badge, Quick Switcher, Notifications, User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Active Role Indicator & Switch Button */}
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border bg-slate-50 text-slate-800 border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>{role === 'admin' ? 'Admin / Compliance' : 'Bank Officer'}</span>
          </div>

          <button
            onClick={() => {
              if (role === 'admin') {
                loginAs('employee', currentEmployee.id);
              } else {
                loginAs('admin');
              }
            }}
            className="px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors cursor-pointer border border-blue-200"
            title="Switch between Admin and Employee experience"
          >
            Switch to {role === 'admin' ? 'Employee' : 'Admin'}
          </button>
        </div>

        {/* If in Employee mode: Switch active sample employee */}
        {role === 'employee' && (
          <div className="relative" ref={empRef}>
            <button
              onClick={() => setShowEmployeeSwitcher(!showEmployeeSwitcher)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Switch logged-in employee persona"
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden lg:inline">{currentEmployee.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showEmployeeSwitcher && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-40">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase border-b border-slate-100">
                  Switch Active Employee Persona
                </div>
                {allEmployees.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setShowEmployeeSwitcher(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-slate-50 transition-colors ${
                      currentEmployee.id === emp.id ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <img src={emp.avatarUrl} alt={emp.name} className="w-6 h-6 rounded-full object-cover" />
                    <div className="flex-1 truncate">
                      <div className="truncate font-medium">{emp.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{emp.department}</div>
                    </div>
                    {currentEmployee.id === emp.id && <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {relevantNotifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No notifications at this time.
                  </div>
                ) : (
                  relevantNotifications.slice(0, 5).map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.relatedTaskId) {
                          setActivePage('tasks');
                        }
                        setShowNotifications(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="mt-1">
                        <span className={`block w-2 h-2 rounded-full ${!notif.read ? 'bg-blue-600' : 'bg-slate-300'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-xs font-semibold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActivePage('notifications');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Alerts & Directives</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src={role === 'admin' 
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' 
                  : currentEmployee.avatarUrl
                }
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {role === 'admin' ? 'E. Vance (Admin)' : currentEmployee.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {role === 'admin' ? 'CHIEF COMPLIANCE' : currentEmployee.employeeCode}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">
                  {role === 'admin' ? 'Compliance Admin Console' : currentEmployee.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {role === 'admin' ? 'admin@apexfederal.bank' : currentEmployee.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActivePage('profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>My Profile & Clearance</span>
                </button>
                <button
                  onClick={() => {
                    setActivePage('role_select');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Switch Role / Portal</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
