const { Router } = require('express');
const authRoutes = require('./auth.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');
// Importar outras rotas aqui

const router = Router();

// Health check
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Tech Store API is running!',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
// Usar outras rotas aqui

module.exports = router;
