import type { RequestItem } from '../entities/RequestItem';

export interface RequestItemRepository {
  getRequestItemsByUpdateTimeRange(fromTime: Date, endTime: Date): Promise<RequestItem[]>;
}
