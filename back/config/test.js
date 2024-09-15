import mysql from 'mysql2/promise';
import { mysqlConfig } from '../config/config.js';

const testConnection = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        console.log('Conexión exitosa a la base de datos');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

testConnection();
