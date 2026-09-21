const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');


dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");


const PostRecuperarUser = (req, res) => {
    const {id} = req.body;


    
   
    connection.query( `SELECT privileges FROM registro WHERE id=?`,
                [id],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json(result)}
)} 
            

app.route("/recuperarUser")
.post(PostRecuperarUser);


module.exports = app;