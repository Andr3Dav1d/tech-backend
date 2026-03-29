const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../shared/errors/AppError');

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('E-mail e senha são obrigatórios.');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas.', 401);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Não retornar a senha
    delete user.password;

    return {
      user,
      token,
    };
  }
}

module.exports = LoginUserUseCase;
