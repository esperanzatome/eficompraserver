const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postCrearLista = (request, response) => {
     
    
    const {listaId,product,fecha} = request.body;
    connection.query("INSERT INTO listascompra (listaId, product, fecha) SELECT ?, ?, NOW() WHERE NOT EXISTS (SELECT 1 FROM listascompra WHERE listaId = ? AND product = ?)",
       
        [listaId,product,listaId,product],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        
                response.status(201).json(results)
        
            }})};
            app.route("/miListaCompra")
.post(postCrearLista);


module.exports = app;