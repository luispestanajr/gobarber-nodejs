import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  const teste = 'ola mundo';
  return response.json({ message: 'Hello GoStack' });
});

export default routes;
