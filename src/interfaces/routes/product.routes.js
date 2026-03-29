const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const reviewRoutes = require('./review.routes');

const productRoutes = Router();

productRoutes.use('/:id/reviews', reviewRoutes);


productRoutes.get('/', ProductController.index);
productRoutes.get('/featured', ProductController.featured);
productRoutes.get('/:id', ProductController.show);

productRoutes.post(
  '/',
  authMiddleware,
  adminMiddleware,
  ProductController.create
);
productRoutes.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  ProductController.update
);
productRoutes.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  ProductController.delete
);

module.exports = productRoutes;
