import { config } from '@/config';
import { fetchWithAuth } from './api';
import type { Prayer } from '@/types/admin';

/**
 * Reads the carrier JWT from localStorage and returns an Authorization header.
 */
const authHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('carrierToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const carrierService = {
  /**
   * Carrier marks a prayer as prayed.
   */
  markAsPrayed: async (id: string, note?: string): Promise<Prayer> => {
    const payload = note ? { note } : {};
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/${id}/mark_prayed/`,
      {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload),
      }
    );
  },

  /**
   * Get all carrier prayers in a single call.
   */
  getCarrierDashboardData: async (userId: string) => {
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/carrier-dashboard/${userId}/`,
      {
        headers: authHeader(),
      }
    );
  },

  /**
   * Carrier starts praying for a request.
   */
  startPraying: async (id: string): Promise<Prayer> => {
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/${id}/start_praying/`,
      {
        method: 'POST',
        headers: authHeader(),
      }
    );
  },
};
