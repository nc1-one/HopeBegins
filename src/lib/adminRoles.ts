/**
 * Who can open what in the admin panel. The server checks the same rules;
 * this only decides what to show.
 *
 * 'admin' is the super admin. 'staff' admins see everything except the
 * financials and the admin team.
 */
export type AdminRole = 'admin' | 'staff';

export const isAdminRole = (role: unknown): role is AdminRole =>
  role === 'admin' || role === 'staff';

const SUPER_ADMIN_PATHS = ['/admin/donations', '/admin/team'];

export const isSuperAdminPath = (pathname: string) =>
  SUPER_ADMIN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
