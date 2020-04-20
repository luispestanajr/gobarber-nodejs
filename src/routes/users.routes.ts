import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUser.service';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatar.service';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const avatarService = new UpdateUserAvatarService();

    const user = await avatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json({ user });
  },
);

export default usersRouter;
