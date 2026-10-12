import React from 'react';
import { useBank, ActivePage } from '../../context/BankContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  customTrail?: string[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customTrail }) => {
  const { activePage, setActivePage, role } = useBank();

  const getPageTitle = (page: ActivePage) => {
    switch (page) {
      case 'dashboard':
        return role === 'admin' ? 'Executive Dashboard' : 'My Officer Workspace';
      case 'tasks':
        return 'Task & Directive Management';
      case 'employees':
        return 'Personnel Roster';
      case 'notifications':
        return 'Regulatory & Operations Alerts';
      case 'profile':
        return 'Employee Profile & Credentials';
      case 'role_select':
        return 'Portal Selection';
      default:
        return 'Dashboard';
    }
  };

  return (
    <nav className="flex items-center text-xs text-slate-500 mb-4 font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 sm:space-x-2">
        <li className="inline-flex items-center">
          <button
            onClick={() => setActivePage('dashboard')}
            className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors text-slate-500 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Apex Federal</span>
          </button>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="ml-1 sm:ml-2 text-slate-400 font-mono-numbers">
              {role === 'admin' ? 'Executive Compliance' : 'Branch Staff'}
            </span>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="ml-1 sm:ml-2 font-semibold text-slate-900">
              {getPageTitle(activePage)}
            </span>
          </div>
        </li>
        {customTrail && customTrail.map((crumb, idx) => (
          <li key={idx}>
            <div className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="ml-1 sm:ml-2 text-slate-700">{crumb}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
