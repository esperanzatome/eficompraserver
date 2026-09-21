const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const { getSocket } = require('../socket');
app.use(cors());
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");


const updateRegistro = (req,resp) =>{
    const {id} =req.body
     connection.query("UPDATE compraeficiente.registro SET privileges = 0 WHERE id=?; ", 
        [id],
        (error, results) => {
             if (error) {
            console.log(error);
            return resp.status(500).json({ error: error.message });
        }
         const io = getSocket();
         // Emitir un evento a través de Socket.IO para notificar a los demás usuarios
            io.emit('privilegiosRevocados', { userId: id }); // Notificar a todos los clientes conectados

        resp.status(201).json({ message: 'Privilegios revocados' });
        })
}
app.route("/revocarPrivilegios")
.post(updateRegistro)

module.exports = app;