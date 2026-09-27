const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

const { connection } = require("../config.db");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAILPASSWORD      
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    }
});

const postRegistro = (request, response) => {
    const { id, email, password, alias } = request.body;
    const cleanEmail = email ? email.trim().replace(/^https?:\/\//i, '') : '';

    connection.query(
        "INSERT INTO registro (id,email,password,alias) VALUES (?,?,?,?) ", 
        [id, cleanEmail, password, alias],
        (error, results) => {
            if (error) {
                console.log("Error en la inserción (Usuario ya existe):", error.sqlMessage || error);
                
                connection.query(
                    "SELECT password, alias FROM registro WHERE email = ?",
                    [cleanEmail],
                    (selectError, selectResults) => {
                        if (selectError || !selectResults || selectResults.length === 0) {
                            console.error("Error al buscar el usuario existente:", selectError || "Usuario no encontrado");
                            return response.status(500).json({ error: "Error interno del servidor" });
                        }

                        const usuarioExistente = selectResults[0];
                        const passwordReal = usuarioExistente.password;
                        const aliasReal = usuarioExistente.alias;

                        console.log(`Intentando enviar correo de recuperación a: ${cleanEmail} con alias: ${aliasReal}`);

                        const mailOptions = {
                            from: process.env.EMAIL,
                            to: cleanEmail, 
                            subject: 'Recuperación de contraseña',
                            text: `Hola ${aliasReal} tu contraseña para Eficompra es ${passwordReal}`,
                            html: `<h1>Eficompra</h1><p>Hola!, <b>${aliasReal}</b> tu contraseña para <b>EFICOMPRA</b> es <b>${passwordReal}</b>.</p>`
                        };
                     
                        transporter.sendMail(mailOptions, (mailError, info) => {
                            if (mailError) {
                                console.error('❌ Error al enviar el correo de recuperación:', mailError);
                            } else {
                                console.log('✅ Correo de recuperación enviado con éxito:', info.response);
                            }
                        });

                        return response.status(409).json({
                            "El usuario ya está registrado": cleanEmail,
                            "error": "usuario existente"
                        });
                    }
                );

            } else {
                const filasAfectadas = results && results.affectedRows ? results.affectedRows : 1;
                
                const mailOptions = {
                    from: process.env.EMAIL, 
                    to: cleanEmail, 
                    subject: 'Confirmación de registro',
                    text: `Hola ${alias} has sido registrado en Eficompra`,
                    html: `<h1>Eficompra</h1><p>Hola!, <b>${alias}</b> has sido registrado en <b>EFICOMPRA</b>.</p>`
                };
  
                transporter.sendMail(mailOptions, (mailError, info) => {
                    if (mailError) {
                        console.error('❌ Error al enviar el correo de bienvenida:', mailError);
                    } else {
                        console.log('✅ Correo de bienvenida enviado con éxito:', info.response);
                    }
                });

                return response.status(201).json({ "Item añadido correctamente": filasAfectadas });
            }
        }
    );
};

app.route("/registro").post(postRegistro);

module.exports = app;
