import React from 'react';
import { 
  ShieldAlert, 
  RefreshCw, 
  Home, 
  ArrowLeft, 
  LifeBuoy, 
  Lock, 
  Landmark, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  message?: string;
  onReset?: () => void;
  onGoHome?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 'ERR-404-RESOURCE_NOT_FOUND',
  title = 'Banking Resource or Directive Not Found',
  message = 'The requested banking operational record, customer file, or terminal route could not be validated against the core ledger. Please verify your clearance credentials or return to the main portal.',
  onReset,
  onGoHome
}) => {
  return (
    <div className="min-h-screen bg-[#07111e] text-slate-100 flex flex-col justify-between relative overflow-hidden p-4 sm:p-6">
      {/* Background Bank Security Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white">APEX FEDERAL BANK</div>
            <div className="text-[10px] text-blue-400 font-mono uppercase">Security Incident Protocol</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2.5 py-1 rounded">
          <Lock className="w-3.5 h-3.5" />
          <span>SESSION ISOLATED</span>
        </div>
      </header>

      {/* Center Error Card */}
      <main className="relative z-10 max-w-2xl mx-auto w-full my-auto py-8">
        <div className="bg-[#0f1d33] border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-rose-950/40 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Icon with alert halo */}
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mx-auto mb-5 shadow-lg shadow-rose-900/30 animate-pulse">
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs font-bold text-rose-300 bg-rose-950/80 border border-rose-800 mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ERROR CODE: {errorCode}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
            {message}
          </p>

          {/* Diagnostic Details Box */}
          <div className="mt-6 p-4 bg-[#081220] rounded-xl border border-slate-800 text-left font-mono text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5 mb-1.5 text-slate-300 font-semibold">
              <span>SYSTEM DIAGNOSTIC TELEMETRY</span>
              <span className="text-emerald-400 font-bold">STATUS: LOGGED</span>
            </div>
            <div>INCIDENT ID: INC-{Date.now().toString().slice(-8)}</div>
            <div>TIMESTAMP: {new Date().toISOString()}</div>
            <div>SUBSYSTEM: CORE_BANKING_ROUTER_V4</div>
            <div>INTEGRITY CHECK: FIPS-140-2 ENFORCED</div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onReset && (
              <button
                onClick={onReset}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onGoHome) {
                  onGoHome();
                } else {
                  window.location.href = '#';
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Role Selection Portal</span>
            </button>
          </div>

          {/* Help Desk Link */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <LifeBuoy className="w-3.5 h-3.5 text-slate-400" />
            <span>Need assistance? Contact Internal IT Compliance Support: <strong>ext. 4400</strong></span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full py-4 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>APEX FEDERAL BANK · SECURITY & RESILIENCE DIVISION</div>
        <div className="font-mono text-[11px]">ALL TERMINAL ATTEMPTS AUDITED UNDER FDIC § 328</div>
      </footer>
    </div>
  );
};
