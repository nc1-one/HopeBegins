import { Suspense } from 'react';
import { AdminReport } from './AdminReport';

export default function AdminReportPage() {
  // The report reads its dates from the address, which needs Suspense.
  return (
    <Suspense fallback={null}>
      <AdminReport />
    </Suspense>
  );
}
