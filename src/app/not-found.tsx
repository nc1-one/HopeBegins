import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NotFoundMessage } from '@/components/layout/NotFoundMessage';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfdfa] font-dm-sans">
      <Header />
      <main className="flex-1 px-6 pt-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <NotFoundMessage />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
