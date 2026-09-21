const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");


const PostOtorgarPrivilegios = (req, res) => {
    const {id} = req.body;


    
   
    connection.query( "UPDATE compraeficiente.registro SET privileges = 1 WHERE id=?; ", 
        [id],
        (error, results) => {
             if (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Privilegios otorgados' });
        })
}
app.route("/otorgarPrivilegios")
.post(PostOtorgarPrivilegios)

module.exports = app;