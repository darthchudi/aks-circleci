import dotenv from 'dotenv';

dotenv.config();

export default {
  api_version: process.env.API_VERSION || '/api/v1',
  node_env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  service_name: process.env.SERVICE_NAME,
};
