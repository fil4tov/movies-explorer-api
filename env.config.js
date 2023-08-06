import dotenv from 'dotenv'

dotenv.config()

const DEV_SECRET_KEY = 'dev_secret_key'
const DEV_ENV = 'development'
const DEV_DB_URI = 'mongodb://127.0.0.1:27017/moviesdb'
const DEV_PORT = 3000

export const {
  PORT = DEV_PORT,
  DB_URI = DEV_DB_URI,
  SECRET_KEY = DEV_SECRET_KEY,
  NODE_ENV = DEV_ENV,
} = process.env
