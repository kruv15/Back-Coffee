import dotenv from "dotenv"

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  BCRYPT_ROUNDS: Number.parseInt(process.env.BCRYPT_ROUNDS),
  NODE_ENV: process.env.NODE_ENV,
}

export default config
