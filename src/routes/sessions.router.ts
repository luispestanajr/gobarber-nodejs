import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUser.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authService = new AuthenticateUserService();

    const { user, token } = await authService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
