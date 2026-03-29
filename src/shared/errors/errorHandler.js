const AppError = require('./AppError');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Erros do Prisma
  if (err.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        return res.status(409).json({
          status: 'error',
          message: `O campo '${err.meta.target.join(', ')}' já está em uso.`,
        });
      case 'P2025': // Record to delete does not exist
        return res.status(404).json({
          status: 'error',
          message: 'O registro que você tentou deletar não existe.',
        });
      // Adicionar outros códigos de erro do Prisma conforme necessário
    }
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

module.exports = errorHandler;
