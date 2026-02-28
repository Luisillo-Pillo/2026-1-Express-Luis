import mysql from 'mysql/promise.js';


const dfConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Fernandito130508',
    database: ''
}

const pool = mysql.createConnection(dbConfig);

export default pool;