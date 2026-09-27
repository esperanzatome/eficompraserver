const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

const { connection } = require("../config.db");

const postRegistro = (request, response) => {
  
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAILPASSWORD      
        }
    });

    const { id, email, password, alias } = request.body;
    
    connection.query(
        "INSERT INTO registro (id,email,password,alias) VALUES (?,?,?,?) ", 
        [id, email, password, alias],
        (error, results) => {
            
            if (error) {
                console.log("Error en la inserción (Usuario ya existe):", error);
                
                // 1. Configuramos las opciones del correo de recuperación
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: [email], 
                    subject: 'Recuperación de contraseña',
                    text: `Hola ${alias} tu contraseña para Eficompra es ${password}`,
                    html: `<h1>Eficompra</h1><p>Hola!, <b>${alias}</b> tu contraseña para <b>EFICOMPRA</b> es ${password}.</p>`
                };
     
                transporter.sendMail(mailOptions, (mailError, info) => {
                    if (mailError) {
                        console.error('Error al enviar el correo de recuperación:', mailError);
                    } else {
                        console.log('Correo de recuperación enviado con éxito:', info.response);
                    }
                });

              
                response.status(200).json({ 
                    "El usuario ya está registrado": email,
                    "error": "usuario existente"
                });
                
              
                return;

            } else {
            
                
                const mailOptions = {
                    from: process.env.EMAIL, 
                    to: [email], 
                    subject: 'Confirmación de registro',
                    text: `Hola ${alias} has sido registrado en Eficompra`,
                    html: `<h1>Eficompra</h1><p>Hola!, <b>${alias}</b> has sido registrado en <b>EFICOMPRA</b>.</p>`
                };
  
          
                transporter.sendMail(mailOptions, (mailError, info) => {
                    if (mailError) {
                        console.error('Error al enviar el correo de bienvenida:', mailError);
                    } else {
                        console.log('Correo de bienvenida enviado con éxito:', info.response);
                    }
                });

             
                response.status(201).json({ "Item añadido correctamente": results.affectedRows });
                return;
            }
        }
    );
};


app.route("/registro").post(postRegistro);

module.exports = app;
