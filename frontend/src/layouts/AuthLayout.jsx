import { Outlet } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-[#0a2540] via-[#0d3b66] to-[#0F6CBD] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-[#2BB673]/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0F6CBD]/20 blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-md text-center px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F6CBD] to-[#2BB673] shadow-2xl shadow-blue-500/25 mb-8">
            <Stethoscope className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">MedicosPro</h1>
          <p className="text-lg text-blue-200 mb-2">Wholesale Medical Equipment</p>
          <p className="text-sm text-blue-300/70">
            Streamline your medical equipment management with our powerful admin dashboard. Track orders, manage inventory, and grow your business.
          </p>

          {/* Floating icons */}
          <div className="mt-12 flex justify-center gap-6">
            {['📊', '🏥', '💊', '🩺', '📋'].map((emoji, i) => (
              <div key={i} className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur-sm animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2 dark:bg-slate-900">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
