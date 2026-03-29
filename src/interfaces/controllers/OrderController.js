const CreateOrderUseCase = require('../../usecases/CreateOrderUseCase');
const ListUserOrdersUseCase = require('../../usecases/ListUserOrdersUseCase');
const GetOrderByIdUseCase = require('../../usecases/GetOrderByIdUseCase');
const PrismaOrderRepository = require('../../infra/repositories/PrismaOrderRepository');
const PrismaCartRepository = require('../../infra/repositories/PrismaCartRepository');
const PrismaProductRepository = require('../../infra/repositories/PrismaProductRepository');
const prisma = require('../../infra/database/prisma/client');

const orderRepository = new PrismaOrderRepository();
const cartRepository = new PrismaCartRepository();
const productRepository = new PrismaProductRepository();

class OrderController {
  async create(req, res, next) {
    try {
      const { id: userId } = req.user;
      const createOrderUseCase = new CreateOrderUseCase(
        orderRepository,
        cartRepository,
        productRepository,
        prisma // Passando a instância do prisma para a transação
      );
      const order = await createOrderUseCase.execute({ userId });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res, next) {
    try {
      const { id: userId } = req.user;
      const listUserOrdersUseCase = new ListUserOrdersUseCase(orderRepository);
      const orders = await listUserOrdersUseCase.execute(userId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id: orderId } = req.params;
      const { id: userId, role: userRole } = req.user;
      const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
      const order = await getOrderByIdUseCase.execute({
        orderId,
        userId,
        userRole,
      });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
