const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRegistro = (request, response) => {
      // Configuración del transporte
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
        auth: {
          user: process.env.EMAIL, // Tu correo electrónico
          pass:  process.env.EMAILPASSWORD      // Tu contraseña o token de aplicación
        }
    });

    
    const {id,email,password,alias} = request.body;
        connection.query("INSERT INTO registro (id,email,password,alias) VALUES (?,?,?,?) ", 
        [id,email,password,alias],
        (error, results) => {
            
            if(error){
                console.log(error)
                
             
            response.status(201).json({"El usuario ya está registrado": email,
                "contraseña": password,
                "error":"usuario existente"
            })
            
                 // Configuración del correo
        const mailOptions = {
            from: process.env.EMAIL, // Dirección del remitente
            to: [email], // Dirección del destinatario
            subject: 'Recuperación de contraseña',
            text: `Hola ${[alias]} tu contraseña para Eficompra es ${password}`,
            html: `<h1>Eficompra</h1><p>Hola!, <b>${[alias]}</b> tu contraseña para <b>EFICOMPRA</b> es
            ${password}.</p>`
        };
            // Enviar el correo
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.error('Error al enviar el correo:', error);
                } else {
                console.log('Correo enviado con éxito:', info.response);
                }
            });
            return email
            }else{
                
               
                response.status(201).json({"Item añadido correctamente": results.affectedRows})

               // Configuración del correo
        const mailOptions = {
            from: process.env.EMAIL, // Dirección del remitente
            to: [email], // Dirección del destinatario
            subject: 'Confirmación de registro',
            text: `Hola ${[alias]} has sido registrado en Eficompra`,
            html: `<h1>Eficompra</h1><p>Hola!, <b>${[alias]}</b> has sido registrado en <b>EFICOMPRA</b>.</p>`
        };
  

                // Enviar el correo
                transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                        console.error('Error al enviar el correo:', error);
                        } else {
                        console.log('Correo enviado con éxito:', info.response);
                        }
                });
                return email

                
            }
            
        }
    )}

//ruta
app.route("/registro")
.post(postRegistro);

module.exports = app;