import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import expressPlayground from 'graphql-playground-middleware-express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors());
app.use(
  '/graphql',
  createHandler({
    schema,
  })
);
app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }));
app.listen(port, console.log(`Server runing on port ${port}`));
