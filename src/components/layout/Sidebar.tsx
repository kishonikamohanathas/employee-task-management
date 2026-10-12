import React from 'react';
import { useBank, ActivePage } from '../../context/BankContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Bell, 
  UserCheck, 
  LogOut, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Landmark,
  ArrowRightLeft,
  ShieldAlert
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    role, 
    activePage, 
    setActivePage, 
    sidebarCollapsed, 
    toggleSidebar, 
    tasks, 
    notifications, 
    currentEmployee, 
    logout 
  } = useBank();

  // Scoped metrics
  const pendingTasksCount = role === 'admin' 
    ? tasks.filter(t => t.status === 'pending' || t.status === 'in_review').length
    : tasks.filter(t => t.assigneeId === currentEmployee.id && (t.status === 'pending' || t.status === 'in_review')).length;

  const relevantUnreadNotifs = notifications.filter(n => {
    if (n.read) return false;
    if (role === 'admin') return true;
    if (n.targetRole === 'admin') return false;
    if (n.targetEmployeeId && n.targetEmployeeId !== currentEmployee.id) return false;
    return true;
  }).length;

  const navItems = [
    {
      id: 'dashboard' as ActivePage,
      label: role === 'admin' ? 'Admin Dashboard' : 'My Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'tasks' as ActivePage,
      label: role === 'admin' ? 'Task Management' : 'My Assigned Tasks',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeType: 'amber',
    },
    {
      id: 'employees' as ActivePage,
      label: role === 'admin' ? 'Employee Roster' : 'Bank Staff Directory',
      icon: Users,
      badge: null,
    },
    {
      id: 'notifications' as ActivePage,
      label: 'Notifications & Alerts',
      icon: Bell,
      badge: relevantUnreadNotifs > 0 ? relevantUnreadNotifs : null,
      badgeType: 'rose',
    },
    {
      id: 'profile' as ActivePage,
      label: 'My Bank Profile',
      icon: UserCheck,
      badge: null,
    },
  ];

  return (
    <aside
      className={`fixed lg:static top-0 bottom-0 left-0 z-40 flex flex-col bg-[#0b172a] text-slate-100 transition-all duration-300 ease-in-out border-r border-[#1e2e4a] ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#1b2b48] bg-[#081220]">
        <div className={`flex items-center gap-3 overflow-hidden ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shrink-0 shadow-md border border-blue-400/20">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5 truncate">
                APEX FEDERAL
              </div>
              <div className="text-[10px] text-blue-300 font-medium tracking-wider uppercase truncate">
                BANK OPERATIONS
              </div>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1a2844] rounded-md transition-colors cursor-pointer hidden lg:block"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role Indicator Banner */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 mx-3 my-3 bg-[#11223f] border border-[#1d3560] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
              Active Environment
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-xs font-bold text-white mt-0.5 truncate">
            {role === 'admin' ? 'Compliance Administrator' : currentEmployee.name}
          </div>
          <div className="text-[11px] text-slate-400 truncate mt-0.5">
            {role === 'admin' ? 'Full Supervisory Clearance' : currentEmployee.department}
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#142340]'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-300'}`} />
              
              {!sidebarCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!sidebarCollapsed && item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm ${
                    item.badgeType === 'rose'
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-400 text-amber-950'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Switch Portal & Error Page Preview inside Nav */}
        <div className="pt-2 mt-2 border-t border-[#1b2b48] space-y-1">
          <button
            onClick={() => setActivePage('role_select')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-[#142340] transition-colors cursor-pointer ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Switch Portal"
          >
            <ArrowRightLeft className="w-4 h-4 text-slate-400 shrink-0" />
            {!sidebarCollapsed && <span>Switch Portal Role</span>}
          </button>

          <button
            onClick={() => setActivePage('error')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Preview Banking Error Page"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400/80 shrink-0" />
            {!sidebarCollapsed && <span>Error Page Design</span>}
          </button>
        </div>
      </nav>

      {/* Sidebar Footer / Security Badge & Logout */}
      <div className="p-3 border-t border-[#1b2b48] bg-[#081220]">
        {!sidebarCollapsed && (
          <div className="mb-3 px-2 py-1.5 bg-[#0e1b32] rounded border border-[#1b2f54] text-[10px] text-slate-400 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">FDIC Insured · Tier-4 Secure</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {sidebarCollapsed ? (
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-[#142340] rounded-lg transition-colors cursor-pointer"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Terminate Session</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
