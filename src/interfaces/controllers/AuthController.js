const RegisterUserUseCase = require('../../usecases/RegisterUserUseCase');
const LoginUserUseCase = require('../../usecases/LoginUserUseCase');
const PrismaUserRepository = require('../../infra/repositories/PrismaUserRepository');

const userRepository = new PrismaUserRepository();

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const registerUserUseCase = new RegisterUserUseCase(userRepository);
      const user = await registerUserUseCase.execute({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const loginUserUseCase = new LoginUserUseCase(userRepository);
      const result = await loginUserUseCase.execute({ email, password });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
