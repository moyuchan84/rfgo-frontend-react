import { create } from 'zustand';

import { RequestItemService } from '../services/RequestItemService';
import type { RequestItem } from '../../domain/entities/RequestItem';

interface RequestItemState {
  requestItems: RequestItem[];
  loading: boolean;
  error: Error | null;
  fetchRequestItems: (
    requestItemService: RequestItemService,
    fromTime: Date,
    endTime: Date,
  ) => Promise<void>;
}

export const useRequestItemStore = create<RequestItemState>((set) => ({
  requestItems: [],
  loading: false,
  error: null,

  fetchRequestItems: async (
    requestItemService: RequestItemService,
    fromTime: Date,
    endTime: Date,
  ) => {
    set({ loading: true, error: null });
    try {
      const data = await requestItemService.getRequestItemsByUpdateTimeRange(fromTime, endTime);
      set({ requestItems: data, loading: false });
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },
}));
