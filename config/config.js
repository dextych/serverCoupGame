import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    modelsDir: process.env.MODELS_DIR,
    client: process.env.CLIENT_URL,
    db: {
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES_IN
    }
}