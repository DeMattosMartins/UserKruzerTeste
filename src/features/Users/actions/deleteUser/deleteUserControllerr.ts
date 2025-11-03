import { Router, Request, Response } from 'express';
import { DeleteUserUseCase } from './deleteUserUseCase';

export function createDeleteUserRouter(deleteUserUseCase: DeleteUserUseCase): Router {
  const router = Router();

  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedUser = await deleteUserUseCase.execute(String(id));

      return res.status(200).json({deleted: deletedUser});
    } catch (err: any) {

      return res.status(500).json({ error: err?.message ?? 'Erro interno' });

    }
  });

  return router;
}