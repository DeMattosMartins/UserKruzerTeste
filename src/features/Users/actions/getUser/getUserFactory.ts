import { Router } from 'express';
import { createGetUserRouter } from './getUserController';
import { GetUserUseCase } from './getUserUseCase';
import { UserService } from '../../userService';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createGetUserFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const getUserUseCase = new GetUserUseCase(userService);
  const router = createGetUserRouter(getUserUseCase);
  return router;
}