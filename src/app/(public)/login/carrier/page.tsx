import { CarrierLoginForm } from './components/CarrierLoginForm';

export const metadata = {
  title: 'Hope Carrier login',
  robots: { index: false },
  description: 'Log in to see the prayer requests waiting for you.',
};

export default function CarrierLoginPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl hb-step-in">
          <CarrierLoginForm />
        </div>
      </div>
    </div>
  );
}
