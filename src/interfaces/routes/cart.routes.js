const { Router } = require('express');
const CartController = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');

const cartRoutes = Router();

cartRoutes.use(authMiddleware);

cartRoutes.get('/', CartController.getCart);
cartRoutes.post('/', CartController.addToCart);
cartRoutes.put('/:id', CartController.updateCartItem);
cartRoutes.delete('/:id', CartController.removeFromCart);

module.exports = cartRoutes;
