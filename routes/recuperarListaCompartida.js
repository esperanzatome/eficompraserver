const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarListaCompartida = (request, response) => {
     
    
    const {listasdelacompra} = request.body;
        connection.query("SELECT * FROM usuario WHERE listasdelacompra=?", 
        [listasdelacompra],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
            
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/recuperarListaCompartida")
.post(postRecuperarListaCompartida);
/*
const actualizarEstadoLista=(request,response)=>{
    const {comprado,listasdelacompra}=request.body;
    connection.query("UPDATE compraeficiente.usuario SET comprado=? WHERE listasdelacompra=?",
        [comprado,listasdelacompra],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
               
                response.status(201).json(results)
        
            }}
    )
}
app.route("/misListasDeLaCompra")
.patch(actualizarEstadoLista)
*/
module.exports = app;