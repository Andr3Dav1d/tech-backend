const AddToCartUseCase = require('../../usecases/AddToCartUseCase');
const GetUserCartUseCase = require('../../usecases/GetUserCartUseCase');
const UpdateCartItemUseCase = require('../../usecases/UpdateCartItemUseCase');
const RemoveFromCartUseCase = require('../../usecases/RemoveFromCartUseCase');
const PrismaCartRepository = require('../../infra/repositories/PrismaCartRepository');
const PrismaProductRepository = require('../../infra/repositories/PrismaProductRepository');

const cartRepository = new PrismaCartRepository();
const productRepository = new PrismaProductRepository();

class CartController {
  async getCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const getUserCartUseCase = new GetUserCartUseCase(cartRepository);
      const cart = await getUserCartUseCase.execute(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId, quantity } = req.body;
      const addToCartUseCase = new AddToCartUseCase(
        cartRepository,
        productRepository
      );
      const item = await addToCartUseCase.execute({
        userId,
        productId,
        quantity,
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { id: itemId } = req.params;
      const { quantity } = req.body;
      const updateCartItemUseCase = new UpdateCartItemUseCase(
        cartRepository,
        productRepository
      );
      const item = await updateCartItemUseCase.execute({
        itemId,
        quantity,
        userId,
      });
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { id: itemId } = req.params;
      const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);
      await removeFromCartUseCase.execute({ itemId, userId });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
