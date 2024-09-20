import mysql from 'mysql2/promise';
import { mysqlConfig } from '../config/config.js';

let mysqldb;
try {
    mysqldb = await mysql.createConnection(mysqlConfig);
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

export default mysqldb;
