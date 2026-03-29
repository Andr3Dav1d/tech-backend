// Interface (contrato) para o repositório de avaliações.
class ReviewRepository {
  async create(review) {
    throw new Error('Method not implemented');
  }

  async findByProduct(productId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ReviewRepository;
