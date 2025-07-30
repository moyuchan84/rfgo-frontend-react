import { ApolloClient } from '@apollo/client';
import { ProductRepository } from '../../domain/product/ProductRepository';
import { useRequestStore } from '../store/requestStore';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(client: ApolloClient<any>) {
    this.productRepository = new ProductRepository(client);
  }

  async getProductsByBeolOptionId(beolOptionId: number) {
    return this.productRepository.getProductsByBeolOptionId(beolOptionId);
  }

  async getProductsByProcessplanId(processplanId: number) {
    return this.productRepository.getProductsByProcessplanId(processplanId);
  }

  async createProduct(
    beolOptionId: number,
    processplanId: number,
    productName: string,
    partId: string,
  ) {
    const newProduct = await this.productRepository.createProduct(
      beolOptionId,
      processplanId,
      productName,
      partId,
    );
    // Optionally update store or perform other actions after creation
    return newProduct;
  }

  setSelectedProductId(id: number | null) {
    useRequestStore.getState().setProductId(id);
  }
}
