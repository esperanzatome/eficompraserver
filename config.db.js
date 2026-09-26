
const dotenv = require("dotenv");
dotenv.config();

const mysql = require('mysql2');
let connection;

try {
    connection = mysql.createPool({
         host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};

