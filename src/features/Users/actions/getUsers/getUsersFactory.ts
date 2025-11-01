import { Router } from 'express';
import { createGetUsersRouter } from './getUsersController';
import { GetUsersUseCase } from './getUsersUseCase';
import { UserService } from '../../userService';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createGetUsersFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const getUsersUseCase = new GetUsersUseCase(userService);
  const router = createGetUsersRouter(getUsersUseCase);
  return router;
}