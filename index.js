import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import reviewRoutes from './routes/reviews.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import emailRouter from './routes/email.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30 mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30 mb', extended: true }));
app.use(cors());

app.use('/reviews', reviewRoutes);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  } else {
    return next();
  }
});

app.use('/send', emailRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log('Error connect: ', error.message));
