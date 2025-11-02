import { Router, Request, Response } from 'express';
import UpdateUserUseCase from './updateUserUseCase';

export function createUpdateUserController(updateUserUseCase: UpdateUserUseCase): Router {
  const router = Router();

  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userUpdated = await updateUserUseCase.execute({ ...req.body }, id);

      return res.status(200).json(userUpdated);
    } catch (err: any) {

      return res.status(500).json({ error: err?.message ?? 'Erro interno' });
    }
  });

  return router;
}