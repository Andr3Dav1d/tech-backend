class ListReviewsByProductUseCase {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async execute(productId) {
    const reviews = await this.reviewRepository.findByProduct(productId);
    return reviews;
  }
}

module.exports = ListReviewsByProductUseCase;
