import dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

dotenv.config();

export const config = cleanEnv(process.env, {
  GOOGLE_PLACES_API_KEY: str(),
  LOG_LEVEL: str({ default: 'info' }),
  API_TIMEOUT: num({ default: 10000 }),
});
