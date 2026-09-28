const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const { connection } = require("../config.db");


const resend = new Resend(process.env.RESEND_API_KEY);

const postRegistro = (request, response) => {
    const { id, email, password, alias } = request.body;
    const cleanEmail = email ? email.trim().replace(/^https?:\/\//i, '') : '';

    connection.query(
        "INSERT INTO registro (id,email,password,alias) VALUES (?,?,?,?) ", 
        [id, cleanEmail, password, alias],
        async (error, results) => {
            if (error) {
                console.log("Error en la inserción (Usuario ya existe):", error.sqlMessage || error);
                
                connection.query(
                    "SELECT password, alias FROM registro WHERE email = ?",
                    [cleanEmail],
                    async (selectError, selectResults) => {
                        if (selectError || !selectResults || selectResults.length === 0) {
                            console.error("Error al buscar el usuario existente:", selectError || "Usuario no encontrado");
                            return response.status(500).json({ error: "Error interno del servidor" });
                        }

                        const usuarioExistente = selectResults[0];
                        const passwordReal = usuarioExistente.password;
                        const aliasReal = usuarioExistente.alias;

                        console.log(`Intentando enviar correo de recuperación a: ${cleanEmail} con alias: ${aliasReal}`);

                  
                        try {
                            const { data, error: resendError } = await resend.emails.send({
                                from: 'Eficompra <onboarding@resend.dev>', 
                                to: cleanEmail,
                                subject: 'Recuperación de contraseña',
                                html: `<h1>Eficompra</h1><p>Hola!, <b>${aliasReal}</b> tu contraseña para <b>EFICOMPRA</b> es <b>${passwordReal}</b>.</p>`
                            });

                            if (resendError) {
                                console.error('❌ Error al enviar el correo de recuperación:', resendError);
                            } else {
                                console.log('✅ Correo de recuperación enviado con éxito:', data.id);
                            }
                        } catch (mailCatchError) {
                            console.error('❌ Error crítico en el envío del correo:', mailCatchError);
                        }

                        return response.status(409).json({
                            error: "usuario existente",
                            mensaje: "El usuario ya está registrado. Se ha enviado un correo con tu contraseña.",
                            email: cleanEmail
                        });
                    }
                );

            } else {
                const filasAfectadas = results && results.affectedRows ? results.affectedRows : 1;
                
                try {
                    const { data, error: resendError } = await resend.emails.send({
                        from: 'Eficompra <onboarding@resend.dev>',
                        to: cleanEmail,
                        subject: 'Confirmación de registro',
                        html: `<h1>Eficompra</h1><p>Hola!, <b>${alias}</b> has sido registrado en <b>EFICOMPRA</b>.</p>`
                    });

                    if (resendError) {
                        console.error('❌ Error al enviar el correo de bienvenida:', resendError);
                    } else {
                        console.log('✅ Correo de bienvenida enviado con éxito:', data.id);
                    }
                } catch (mailCatchError) {
                    console.error('❌ Error crítico en el envío del correo de bienvenida:', mailCatchError);
                }

                return response.status(201).json({ "Item añadido correctamente": filasAfectadas });
            }
        }
    );
};

app.route("/registro").post(postRegistro);

module.exports = app;
