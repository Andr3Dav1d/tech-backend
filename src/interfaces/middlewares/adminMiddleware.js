const AppError = require('../../shared/errors/AppError');

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return next(new AppError('Acesso negado. Rota exclusiva para administradores.', 403));
  }
  return next();
}

module.exports = adminMiddleware;
