const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postUserCompraLists = (request, response) => {
     
    
    const {userId} = request.body;
        connection.query(" SELECT * FROM compraeficiente.usuario WHERE userId=?", 
        [userId],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
           
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/misListasCompraGuardadas")
.post(postUserCompraLists);


module.exports = app;