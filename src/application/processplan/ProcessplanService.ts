import { ApolloClient } from '@apollo/client';
import { ProcessplanRepository } from '../../domain/processplan/ProcessplanRepository';
import { useRequestStore } from '../store/requestStore';

export class ProcessplanService {
  private processplanRepository: ProcessplanRepository;

  constructor(client: ApolloClient<any>) {
    this.processplanRepository = new ProcessplanRepository(client);
  }

  async getProcessplans() {
    return this.processplanRepository.getProcessplans();
  }

  async createProcessplan(designRule: string) {
    const newProcessplan = await this.processplanRepository.createProcessplan(designRule);
    // Optionally update store or perform other actions after creation
    return newProcessplan;
  }

  setSelectedProcessplan(id: number | null) {
    useRequestStore.getState().setProcessplanId(id);
  }
}
