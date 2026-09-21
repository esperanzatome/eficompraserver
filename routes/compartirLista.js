const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarUserData = (request, response) => {
     
    
    const {listasdelacompra} = request.body;
    connection.query("SELECT * FROM `compraeficiente`.`usuario` WHERE listasdelacompra= ? ",
       
        [listasdelacompra],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/recuperarUserData")
.post(postRecuperarUserData);


module.exports = app;