import { Router, Request, Response } from 'express';
import CreateUserUseCase from './createUserUseCase';

export function createUsersRouter(createUserUseCase: CreateUserUseCase): Router {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {

      const user = req.body;
      const users = await createUserUseCase.execute(user);

      return res.status(200).json(users);
    } catch (err: any) {

      return res.status(500).json({ error: err?.message ?? 'Erro interno' });

    }
  });

  return router;
}