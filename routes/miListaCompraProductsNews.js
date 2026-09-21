const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");


const postCompraProductsNews = (request, response) => {
     
    
    const {listasdelacompra,product,listaName} = request.body;
        connection.query("INSERT IGNORE compraeficiente.`?` (product,listaName,fecha) VALUES (?,?,NOW()) ", 
        [listasdelacompra,product,listaName],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
           console.log([listasdelacompra])
            }
            
                 
            else{
                
               
                response.status(201).json(results)
        
            }})};
            
//ruta

app.route("/miListaCompraProductsNews")
.post(postCompraProductsNews);
module.exports = app;

