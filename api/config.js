import 'dotenv/config';
import process from 'node:process';
import mysql from 'mysql2';

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 1,
    connectTimeout: 10000
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Database Connected!');
})

export default conn;
