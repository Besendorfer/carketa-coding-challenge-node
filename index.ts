import express, { Express } from 'express';
import dotenv from 'dotenv';

import { people } from './routes/people';
import { planets } from './routes/planets';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

app.use(`${baseUrl}/people`, people);
app.use(`${baseUrl}/planets`, planets);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});