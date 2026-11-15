
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql2');
let connection;

try {
    connection = mysql.createPool({
         host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};

