import { BeolOptionRepository } from '../../domain/repositories/BeolOptionRepository';

export class BeolOptionService {
  private beolOptionRepository: BeolOptionRepository;

  constructor(beolOptionRepository: BeolOptionRepository) {
    this.beolOptionRepository = beolOptionRepository;
  }

  async createBeolOption(createBeolOptionInput: any) {
    return await this.beolOptionRepository.createBeolOption(createBeolOptionInput);
  }

  async getBeolOptions() {
    return await this.beolOptionRepository.getBeolOptions();
  }

  async getBeolOption(id: number) {
    return await this.beolOptionRepository.getBeolOption(id);
  }

  async getBeolOptionsByProcessplanId(processplanId: number) {
    return await this.beolOptionRepository.getBeolOptionsByProcessplanId(processplanId);
  }

  async updateBeolOption(updateBeolOptionInput: any) {
    return await this.beolOptionRepository.updateBeolOption(updateBeolOptionInput);
  }

  async removeBeolOption(id: number) {
    return await this.beolOptionRepository.removeBeolOption(id);
  }
}