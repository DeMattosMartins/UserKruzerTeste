import { Router, Request, Response } from 'express';
import { GetUserUseCase } from './getUserUseCase';

export function createGetUserRouter(getUserUseCase: GetUserUseCase): Router {
  const router = Router();

  router.get('/:id', async (req: Request, res: Response) => {
    try {

      const id = req.params.id;
      const user = await getUserUseCase.execute(id);

      return res.status(200).json(user);
    } catch (err: any) {    
        
      return res.status(500).json({ error: err?.message ?? 'Erro interno' });

    }
  });

  return router;
}   