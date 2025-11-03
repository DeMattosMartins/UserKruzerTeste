import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createGetUsersFactory } from './features/Users/actions/getUsers/getUsersFactory';
import { createDeleteUserFactory } from './features/Users/actions/deleteUser/deleteUserFactory';
import { createUserFactory } from './features/Users/actions/createUser/createUserFactory';
import { createGetUserFactory } from './features/Users/actions/getUser/getUserFactory';
import { createUpdateUserFactory } from './features/Users/actions/updateUser/updateUserFactory';

dotenv.config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

async function conectarMongo() {
  try {
    await mongoose.connect(String(MONGO_URI));
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
}
conectarMongo();

app.use('/Users', createGetUsersFactory());       // GET
app.use('/Users', createUserFactory());           // POST
app.use('/Users', createDeleteUserFactory()); // DELETE
app.use('/Users', createGetUserFactory());    // GET
app.use('/Users', createUpdateUserFactory()); // PUT

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: err.message ?? 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});