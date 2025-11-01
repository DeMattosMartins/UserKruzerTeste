import { Router } from 'express';
import { createUpdateUserController } from './updateUserController';
import { UpdateUserUseCase } from './updateUserUseCase';
import { UserService } from '../../userService';

// se no futuro quiser trocar o UserService por um que use repository, troque aqui
export function createUpdateUserFactory(): Router {
  const userService = new UserService(); // usa o service que já fala com o model
  const updateUserUseCase = new UpdateUserUseCase(userService);
  const router = createUpdateUserController(updateUserUseCase);
  return router;
}