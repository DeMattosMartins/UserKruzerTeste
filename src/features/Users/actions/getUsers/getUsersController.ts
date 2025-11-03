import { Router, Request, Response } from 'express';
import { GetUsersUseCase } from './getUsersUseCase';

export function createGetUsersRouterController(getUsersUseCase: GetUsersUseCase): Router {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {

      const filters = req.query || {};
      const users = await getUsersUseCase.execute(filters);

      return res.status(200).json(users);
    } catch (err: any) {

      return res.status(500).json({ error: err?.message ?? 'Erro interno' });

    }
  });

  return router;
}