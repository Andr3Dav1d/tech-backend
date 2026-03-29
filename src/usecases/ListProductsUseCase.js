class ListProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(queryParams) {
    const products = await this.productRepository.findAll(queryParams);
    return products;
  }
}

module.exports = ListProductsUseCase;
