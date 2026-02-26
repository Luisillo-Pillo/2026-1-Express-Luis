import mysql from 'mysql2/promise';

const pool = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "Fernandito130508",
    database: "biblioteca"
});

export default pool;