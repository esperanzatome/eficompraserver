const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const { connection } = require("../config.db");


const enviarEmailBrevo = async ({ toEmail, toName, subject, htmlContent }) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: {
                name: 'Eficompra',
                email: process.env.BREVO_SENDER_EMAIL // Debe ser tu correo verificado en Brevo
            },
            to: [{ email: toEmail, name: toName || toEmail }],
            subject: subject,
            htmlContent: htmlContent
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
};

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

                        
                        enviarEmailBrevo({
                            toEmail: cleanEmail,
                            toName: aliasReal,
                            subject: 'Recuperación de contraseña',
                            htmlContent: `<h1>Eficompra</h1><p>Hola!, <b>${aliasReal}</b> tu contraseña para <b>EFICOMPRA</b> es <b>${passwordReal}</b>.</p>`
                        })
                        .then((data) => console.log('✅ Correo de recuperación enviado con éxito:', data.messageId))
                        .catch((err) => console.error('❌ Error al enviar el correo de recuperación:', err.message));

                        return response.status(409).json({
                            "El usuario ya está registrado": cleanEmail,
                            "error": "usuario existente"
                        });
                    }
                );

            } else {
                const filasAfectadas = results && results.affectedRows ? results.affectedRows : 1;
                

                enviarEmailBrevo({
                    toEmail: cleanEmail,
                    toName: alias,
                    subject: 'Confirmación de registro',
                    htmlContent: `<h1>Eficompra</h1><p>Hola!, <b>${alias}</b> has sido registrado en <b>EFICOMPRA</b>.</p>`
                })
                .then((data) => console.log('✅ Correo de bienvenida enviado con éxito:', data.messageId))
                .catch((err) => console.error('❌ Error al enviar el correo de bienvenida:', err.message));

                return response.status(201).json({ "Item añadido correctamente": filasAfectadas });
            }
        }
    );
};

app.route("/registro").post(postRegistro);

module.exports = app;
