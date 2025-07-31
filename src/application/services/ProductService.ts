import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(createProductInput: any) {
        return await this.productRepository.createProduct(createProductInput);
    }

    async getProducts() {
        return await this.productRepository.getProducts();
    }

    async getProduct(id: number) {
        return await this.productRepository.getProduct(id);
    }

    async getProductsByProcessplanId(processplanId: number) {
        return await this.productRepository.getProductsByProcessplanId(processplanId);
    }

    async getProductsByBeolOptionId(beolOptionId: number) {
        return await this.productRepository.getProductsByBeolOptionId(beolOptionId);
    }

    async updateProduct(updateProductInput: any) {
        return await this.productRepository.updateProduct(updateProductInput);
    }

    async removeProduct(id: number) {
        return await this.productRepository.removeProduct(id);
    }
}
