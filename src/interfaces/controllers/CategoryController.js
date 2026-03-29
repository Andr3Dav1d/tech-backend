const CreateCategoryUseCase = require('../../usecases/CreateCategoryUseCase');
const ListCategoriesUseCase = require('../../usecases/ListCategoriesUseCase');
const PrismaCategoryRepository = require('../../infra/repositories/PrismaCategoryRepository');

const categoryRepository = new PrismaCategoryRepository();

class CategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
      const category = await createCategoryUseCase.execute({ name });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
      const categories = await listCategoriesUseCase.execute();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
