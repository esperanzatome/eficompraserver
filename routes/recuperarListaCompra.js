const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarLista = (request, response) => {
     
    
    const {listaId} = request.body;
    connection.query("SELECT * FROM listascompra WHERE listaId=? ORDER BY fecha DESC ",
       
        [listaId],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/recuperarListaCompra")
.post(postRecuperarLista);


module.exports = app;