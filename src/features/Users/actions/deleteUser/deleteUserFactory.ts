import { Router } from 'express';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { UserService } from '../../userService';
import { createDeleteUserRouter } from './deleteUserControllerr';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createDeleteUserFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const deleteUserUseCase = new DeleteUserUseCase(userService);
  const router = createDeleteUserRouter(deleteUserUseCase);
  return router;
}