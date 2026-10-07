import { AdminLoginForm } from './components/AdminLoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false },
  description: 'Access the HopeBegins management dashboard.',
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mb-12 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-poppins tracking-tight uppercase">
            HopeBegins
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] mt-1">
            Administration
          </p>
        </div>
      </div>

      <AdminLoginForm />

      <footer className="mt-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
        © 2026 HOPEBEGINS. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
