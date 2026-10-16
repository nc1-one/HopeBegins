import { CarrierLoginForm } from './components/CarrierLoginForm';

export const metadata = {
  title: 'Carrier Login',
  robots: { index: false },
  description: 'Access the Hope Carrier dashboard and start praying.',
};

export default function CarrierLoginPage() {
  return (
    <div className="min-h-[calc(100svh-5rem)] bg-[#fcfdfa] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#b4c392]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mb-12 flex flex-col items-center gap-4 hb-step-in">
        <div className="text-center">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 font-poppins tracking-tighter uppercase italic">
            HopeBegins
          </h1>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mt-1 pr-1 border-r-2 border-[#b4c392]">
            Carrier Portal
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center hb-step-in">
        <CarrierLoginForm />
      </div>

      <footer className="mt-12 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
        © 2026 HOPEBEGINS. STANDING IN THE GAP.
      </footer>
    </div>
  );
}
