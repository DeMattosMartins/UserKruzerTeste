import { Router } from 'express';
import { CreateUserUseCase } from './createUserUseCase';
import { UserService } from '../../userService';    
import { createUsersRouter } from './createUserController';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createUserFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const createUserUseCase = new CreateUserUseCase(userService);
  const router = createUsersRouter(createUserUseCase);
  return router;
}