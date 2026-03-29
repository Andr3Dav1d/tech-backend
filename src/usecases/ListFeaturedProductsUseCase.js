class ListFeaturedProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    const products = await this.productRepository.findFeatured();
    return products;
  }
}

module.exports = ListFeaturedProductsUseCase;
