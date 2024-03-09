import express from 'express';
import * as dotenv from 'dotenv';
import { initializeDatabase } from './src/config';
import { identityRouter } from './src/v1/routes';
import { userRouter } from './src/v1/routes';
import { messageRouter } from './src/v1/routes';
import { swaggerDocs as swaggerDocsV1 } from './src/v1/swagger';

const bootstrap = async () => {
  const app = express();
  dotenv.config()

  app.use(express.json());
  app.use('/api/v1', userRouter);
  app.use('/api/v1', identityRouter);
  app.use('/api/v1', messageRouter);

  app.get('/check-health', async (req, res) => {
    const message = 'Api Up!';
    res.status(200).json({ message });
  });

  await initializeDatabase();

  app.listen(process.env.PORT, () => {
    swaggerDocsV1(app)
    console.log('🚀 API Running:', true);
  });
};

bootstrap();
