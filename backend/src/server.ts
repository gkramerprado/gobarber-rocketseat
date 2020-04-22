import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';

import './database';

const app = express();
const port = 3333;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
