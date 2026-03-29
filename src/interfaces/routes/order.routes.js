const { Router } = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.post('/', OrderController.create);
orderRoutes.get('/', OrderController.index);
orderRoutes.get('/:id', OrderController.show);

module.exports = orderRoutes;
