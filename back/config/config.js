import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    throw new Error("Error al cargar las variables de entorno: " + result.error);
}

export const HOST = process.env.HOST || "http://localhost";
export const PORT = process.env.PORT || 3000;

export const mysqlConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "app_correos"
};

// Configuración de MongoDB
export const mongodbUri = process.env.MONGODB_URI;
