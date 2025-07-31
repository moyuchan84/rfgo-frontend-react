import { ProcessplanRepository } from '../../domain/repositories/ProcessplanRepository';

export class ProcessplanService {
    private processplanRepository: ProcessplanRepository;

    constructor(processplanRepository: ProcessplanRepository) {
        this.processplanRepository = processplanRepository;
    }

    async createProcessplan(createProcessplanInput: any) {
        return await this.processplanRepository.createProcessplan(createProcessplanInput);
    }

    async getProcessplans() {
        return await this.processplanRepository.getProcessplans();
    }

    async getProcessplan(id: number) {
        return await this.processplanRepository.getProcessplan(id);
    }

    async updateProcessplan(updateProcessplanInput: any) {
        return await this.processplanRepository.updateProcessplan(updateProcessplanInput);
    }

    async removeProcessplan(id: number) {
        return await this.processplanRepository.removeProcessplan(id);
    }
}
