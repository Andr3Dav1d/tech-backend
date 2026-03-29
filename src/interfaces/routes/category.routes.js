const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const categoryRoutes = Router();

categoryRoutes.get('/', CategoryController.index);
categoryRoutes.post(
  '/',
  authMiddleware,
  adminMiddleware,
  CategoryController.create
);

module.exports = categoryRoutes;
