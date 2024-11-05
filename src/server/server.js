import express from 'express';
const app = express();
import path from 'path';
import techRouter from './routes/tech.js'

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist'));
});

app.use('/tech', techRouter)

app.use('*', (req, res) => {
  console.log('hitting 404 message');
  return res.sendStatus(404);
});

app.use('/', (err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObject = Object.assign({}, defaultError, err);
  console.log(errorObject.log);
  return res.status(errorObject.status).json(errorObject.message);
});

app.listen(3000, () => console.log('Listening on port 3000'));
