import dotenv from 'dotenv'

dotenv.config()

const DEV_SECRET_KEY = 'dev_secret_key'
const DEV_ENV = 'development'
const DEV_DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb'
const DEV_PORT = 3000

export const {
  PORT = DEV_PORT,
  DB_URI = DEV_DB_URI,
  NODE_ENV = DEV_ENV,
} = process.env

const ENV_KEY = process.env.SECRET_KEY
export const SECRET_KEY = NODE_ENV === 'production' ? ENV_KEY : DEV_SECRET_KEY
