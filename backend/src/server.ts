import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from './config/upload';
import routes from './routes/index';

import './database';
import AppError from './errors/AppError';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
