const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarAlias = (request, response) => {
     
    
    const {id} = request.body;
    connection.query("SELECT alias FROM `registro` WHERE id=?",
       
        [id],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/recuperarAlias")
.post(postRecuperarAlias);


module.exports = app;