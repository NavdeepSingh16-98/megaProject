import dotenv from 'dotenv'
dotenv.config();


const config = {
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY || '30d',
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT,
    SMTP_MAIL_HOST:process.env.HOST,
SMTP_MAIL_PORT:process.env.PORT,
SMTP_MAIL_USERNAME:process.env.USERNAME,
SMTP_MAIL_PASSWORD:process.env.PASSWORD,
SMTP_MAIL_EMAIL:process.env.EMAIL
}

export default config