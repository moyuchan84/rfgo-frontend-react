import { ProductKeyTableRepository } from '../../domain/repositories/ProductKeyTableRepository';

export class ProductKeyTableService {
  constructor(private productKeyTableRepository: ProductKeyTableRepository) {}

  async getProductKeyTablesByProductId(productId: number): Promise<any[]> {
    const keyTables =
      await this.productKeyTableRepository.getProductKeyTablesByProductId(productId);
    return keyTables.map((table) => {
      try {
        return {
          ...table,
          keyTableJson: table.keyTableJson,
        };
      } catch (e) {
        console.error('Failed to parse keyTableJson for table:', table, e);
        return {
          ...table,
          keyTableJson: [],
        };
      }
    });
  }
}
