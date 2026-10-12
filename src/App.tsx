import React from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { TaskManagementPage } from './pages/TaskManagementPage';
import { EmployeeManagementPage } from './pages/EmployeeManagementPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { ErrorPage } from './pages/ErrorPage';

const MainLayout: React.FC = () => {
  const { role, activePage, setActivePage, sidebarCollapsed, toggleSidebar } = useBank();

  // If user navigated to error page
  if (activePage === 'error') {
    return (
      <ErrorPage
        errorCode="SEC-404-ROUTE_NOT_FOUND"
        title="Banking Operational Route Unverified"
        message="The requested system terminal or file record is either quarantined or does not match active bank security clearance protocols."
        onReset={() => setActivePage('dashboard')}
        onGoHome={() => setActivePage('role_select')}
      />
    );
  }

  // If user is on role selection page or has not chosen a role yet
  if (!role || activePage === 'role_select') {
    return (
      <>
        <RoleSelectionPage />
        <ToastContainer />
      </>
    );
  }

  // Render active page component
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
      case 'tasks':
        return <TaskManagementPage />;
      case 'employees':
        return <EmployeeManagementPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <MyProfilePage />;
      default:
        return role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex">
      {/* Collapsible Banking Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Backdrop */}
      {!sidebarCollapsed && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Breadcrumbs />
          {renderPage()}
        </main>
      </div>

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <BankProvider>
        <MainLayout />
      </BankProvider>
    </ErrorBoundary>
  );
}
