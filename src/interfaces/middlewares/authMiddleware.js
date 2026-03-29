const jwt = require('jsonwebtoken');
const AppError = require('../../shared/errors/AppError');
const prisma = require('../../infra/database/prisma/client');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Token de autenticação não fornecido.', 401));
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return next(new AppError('Usuário não encontrado.', 404));
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    return next();
  } catch (error) {
    return next(new AppError('Token inválido.', 401));
  }
}

module.exports = authMiddleware;
