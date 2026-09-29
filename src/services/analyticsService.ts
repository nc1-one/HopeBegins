import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface ImpactData {
  subscribers: number;
  listeners: number;
  journeys: number;
  carriers: number;
  lives_touched: number;
  prayers?: number;
  war_room_users?: number;
}

export const analyticsService = {
  getImpactData: async (): Promise<ImpactData> => {
    return fetchWithAuth(`${config.API_URL}/analytics/impact/`);
  },
  recordClick: async (linkName: string): Promise<void> => {
    try {
      await fetchWithAuth(`${config.API_URL}/analytics/click/`, {
        method: 'POST',
        body: JSON.stringify({ link_name: linkName }),
      });
    } catch (error) {
      console.error(`Failed to record click for ${linkName}:`, error);
    }
  },
};
