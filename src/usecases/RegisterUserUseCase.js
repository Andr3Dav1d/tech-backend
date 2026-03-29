const bcrypt = require('bcrypt');
const AppError = require('../shared/errors/AppError');

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Este e-mail já está em uso.', 409);
    }

    if (!name || !email || !password) {
      throw new AppError('Nome, e-mail e senha são obrigatórios.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Não retornar a senha
    delete user.password;

    return user;
  }
}

module.exports = RegisterUserUseCase;
