const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarNotificaciones = (request, response) => {
     
 
    const {receptor} = request.body;
    connection.query("SELECT * FROM notificaciones WHERE receptor= ? ",
       
        [receptor],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/recuperarNotificaciones")
.post(postRecuperarNotificaciones);

module.exports=app