'use client';

import { ForgotPasswordForm } from './components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl hb-step-in">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
