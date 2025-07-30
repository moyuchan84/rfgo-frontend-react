import { ApolloClient } from '@apollo/client';
import { BeolOptionRepository } from '../../domain/beol-option/BeolOptionRepository';
import { useRequestStore } from '../store/requestStore';

export class BeolOptionService {
  private beolOptionRepository: BeolOptionRepository;

  constructor(client: ApolloClient<any>) {
    this.beolOptionRepository = new BeolOptionRepository(client);
  }

  async getBeolOptionsByProcessplanId(processplanId: number) {
    return this.beolOptionRepository.getBeolOptionsByProcessplanId(processplanId);
  }

  async createBeolOption(processplanId: number, optionName: string) {
    const newBeolOption = await this.beolOptionRepository.createBeolOption(processplanId, optionName);
    // Optionally update store or perform other actions after creation
    return newBeolOption;
  }

  setSelectedBeolOption(id: number | null) {
    useRequestStore.getState().setBeolOptionId(id);
  }
}
