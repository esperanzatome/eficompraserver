const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");


const PostCreateUser = (req, res) => {
    const { username,password} = req.body;

 const query = `CREATE USER ?@'%' IDENTIFIED BY ?`;
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
}
               

app.route("/crearUsuario")
.post(PostCreateUser);


module.exports = app;