import { Router } from 'express';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { UserService } from '../../userService';
import { createDeleteUserRouterController } from './deleteUserControllerr';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createDeleteUserFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const deleteUserUseCase = new DeleteUserUseCase(userService);
  const router = createDeleteUserRouterController(deleteUserUseCase);
  return router;
}