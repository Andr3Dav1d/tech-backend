const { Router } = require('express');
const ReviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middlewares/authMiddleware');

const reviewRoutes = Router({ mergeParams: true });

reviewRoutes.get('/', ReviewController.index);
reviewRoutes.post('/', authMiddleware, ReviewController.create);

module.exports = reviewRoutes;
