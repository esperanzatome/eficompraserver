const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarId = (request, response) => {
     
    
    const {email} = request.body;
    connection.query("SELECT id FROM `registro` WHERE email=?",
       
        [email],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/recuperarIdRegistro")
.post(postRecuperarId);


module.exports = app;