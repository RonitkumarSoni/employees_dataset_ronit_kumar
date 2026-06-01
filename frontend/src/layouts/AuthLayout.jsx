import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const AuthLayout = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (isAuthenticated && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-stretch text-white relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/10 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]"></div>

      {/* Left side: Premium Branding panel (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-slate-950/40 border-r border-slate-800/50 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <CorporateFareIcon className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent">
            Aegis Analytics
          </span>
        </div>

        <div className="max-w-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-400 bg-primary-950/50 border border-primary-800/30 px-3 py-1 rounded-full">
            Enterprise Management
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-6 leading-tight">
            Managing Talent, <br />
            Visualizing Growth.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Gain deep insights into organizational metrics, track task progress, analyze skill distributions, and manage your workforce with our premium analytics suite.
          </p>
        </div>

        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Aegis Analytics. All rights reserved.
        </div>
      </div>

      {/* Right side: Card and Form (Outlet) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40">
          {/* Logo show on mobile only */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
              <CorporateFareIcon className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent">
              Aegis Analytics
            </span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
