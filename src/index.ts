import dotenv from 'dotenv';
import App from './app';
import { handleErrorMessage } from './utils';

dotenv.config();

const startServer = async () => {
  try {
    const server = new App();
    await server.start();
  } catch (error) {
    handleErrorMessage('Error starting the server:', error as Error)
    process.exit(1);
  }
};

startServer();