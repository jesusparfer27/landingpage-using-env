import mysql from 'mysql2/promise';

import { mysqlConfig } from '../config/config.js';

// const db = await mysql.createConnection({

// });

const mysqldb = await mysql.createConnection(mysqlConfig)


export default mysqldb