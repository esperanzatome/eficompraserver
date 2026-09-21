const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getProductos = (request, response) => {
    connection.query
("SELECT name,category FROM `palabras-lista`ORDER BY name ASC", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/palabrasLista")
.get(getProductos);

module.exports = app;