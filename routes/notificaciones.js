const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const { getSocket } = require('../socket');
app.use(cors());

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postNotification = (request, response) => {
     
    
    const {emisor,receptor,accion,fecha} = request.body;
 
      connection.query("INSERT notificaciones (emisor,receptor,accion,fecha) VALUES (?,?,?,NOW()) ", 
      [emisor,receptor,accion,fecha],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                 const io = getSocket();
         
            io.emit('notificacionEnviada', { receptor: receptor }); 
            
                response.status(201).json({ message:  'Notificación enviada' })
        
            }})};
//ruta
app.route("/notificaciones")
.post(postNotification);

const deleteNotificacion = (request, response) => {
    const { idnotificaciones } = request.query;

    const query = "DELETE FROM notificaciones WHERE idnotificaciones=?"
    connection.query(query, [idnotificaciones], (error, results) => {
        if (error) {
            console.log(error);
            console.log([idnotificaciones]);
            return response.status(500).json({ error: "Error en la consulta" });
        }else{

       
response.status(200).json({ message: "Notificación eliminada con éxito" })}
    });
};
//ruta
app.route("/notificaciones")
.delete(deleteNotificacion);

module.exports = app;