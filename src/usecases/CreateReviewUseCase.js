const AppError = require('../shared/errors/AppError');

class CreateReviewUseCase {
  constructor(reviewRepository, productRepository) {
    this.reviewRepository = reviewRepository;
    this.productRepository = productRepository;
  }

  async execute({ rating, comment, userId, productId }) {
    if (!rating || !userId || !productId) {
      throw new AppError('Rating, userId e productId são obrigatórios.');
    }

    if (rating < 1 || rating > 5) {
      throw new AppError('O rating deve ser um valor entre 1 e 5.');
    }

    const productExists = await this.productRepository.findById(productId);
    if (!productExists) {
      throw new AppError('Produto não encontrado.', 404);
    }

    // Opcional: Verificar se o usuário já avaliou este produto.

    const review = await this.reviewRepository.create({
      rating,
      comment,
      userId,
      productId,
    });

    return review;
  }
}

module.exports = CreateReviewUseCase;
