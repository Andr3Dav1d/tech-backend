const CreateReviewUseCase = require('../../usecases/CreateReviewUseCase');
const ListReviewsByProductUseCase = require('../../usecases/ListReviewsByProductUseCase');
const PrismaReviewRepository = require('../../infra/repositories/PrismaReviewRepository');
const PrismaProductRepository = require('../../infra/repositories/PrismaProductRepository');

const reviewRepository = new PrismaReviewRepository();
const productRepository = new PrismaProductRepository();

class ReviewController {
  async create(req, res, next) {
    try {
      const { id: productId } = req.params;
      const { id: userId } = req.user;
      const { rating, comment } = req.body;

      const createReviewUseCase = new CreateReviewUseCase(
        reviewRepository,
        productRepository
      );

      const review = await createReviewUseCase.execute({
        rating,
        comment,
        userId,
        productId,
      });

      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { id: productId } = req.params;
      const listReviewsByProductUseCase = new ListReviewsByProductUseCase(
        reviewRepository
      );
      const reviews = await listReviewsByProductUseCase.execute(productId);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
