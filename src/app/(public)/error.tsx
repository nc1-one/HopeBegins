'use client';

import { ErrorMessage } from '@/components/layout/ErrorMessage';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-6 pt-10 pb-24">
      <div className="max-w-5xl mx-auto">
        <ErrorMessage error={error} reset={reset} />
      </div>
    </div>
  );
}
