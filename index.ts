import express, { Express } from 'express';
import dotenv from 'dotenv';

import { people } from './routes/people';
import { planets } from './routes/planets';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) ?? 3000;
const baseUrl = process.env.BASE_URL;

app.use(`${baseUrl}/people`, people);
app.use(`${baseUrl}/planets`, planets);

app.listen(port, '0.0.0.0', 128, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;