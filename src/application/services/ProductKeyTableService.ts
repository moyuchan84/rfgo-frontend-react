import { ProductKeyTableRepository } from '../../domain/repositories/ProductKeyTableRepository';

export class ProductKeyTableService {
  constructor(private productKeyTableRepository: ProductKeyTableRepository) {}

  async getProductKeyTablesByProductId(productId: number): Promise<any[]> {
    return this.productKeyTableRepository.getProductKeyTablesByProductId(productId);
  }
}
