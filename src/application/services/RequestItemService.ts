import type { RequestItemRepository } from '../../domain/repositories/RequestItemRepository';

export class RequestItemService {
  private requestItemRepository: RequestItemRepository;

  constructor(requestItemRepository: RequestItemRepository) {
    this.requestItemRepository = requestItemRepository;
  }

  async getRequestItemsByUpdateTimeRange(fromTime: Date, endTime: Date) {
    return await this.requestItemRepository.getRequestItemsByUpdateTimeRange(fromTime, endTime);
  }
}
