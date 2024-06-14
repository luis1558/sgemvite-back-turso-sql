import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Crear el cliente usando la URL y el token
const client = createClient({
  url: databaseUrl,
  authToken: authToken,
});

export default client;