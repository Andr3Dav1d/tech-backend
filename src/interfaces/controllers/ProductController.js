const CreateProductUseCase = require('../../usecases/CreateProductUseCase');
const ListProductsUseCase = require('../../usecases/ListProductsUseCase');
const GetProductByIdUseCase = require('../../usecases/GetProductByIdUseCase');
const UpdateProductUseCase = require('../../usecases/UpdateProductUseCase');
const DeleteProductUseCase = require('../../usecases/DeleteProductUseCase');
const ListFeaturedProductsUseCase = require('../../usecases/ListFeaturedProductsUseCase');
const PrismaProductRepository = require('../../infra/repositories/PrismaProductRepository');

const productRepository = new PrismaProductRepository();

class ProductController {
  async create(req, res, next) {
    try {
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const product = await createProductUseCase.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const listProductsUseCase = new ListProductsUseCase(productRepository);
      const products = await listProductsUseCase.execute(req.query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
      const product = await getProductByIdUseCase.execute(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      const product = await updateProductUseCase.execute(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleteProductUseCase = new DeleteProductUseCase(productRepository);
      await deleteProductUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async featured(req, res, next) {
    try {
      const listFeaturedProductsUseCase = new ListFeaturedProductsUseCase(
        productRepository
      );
      const products = await listFeaturedProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
