const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postCompraListNew = (request, response) => {
     
    
    const {id,listasdelacompra,comprado} = request.body;
        connection.query("INSERT usuario (id,listasdelacompra,comprado) VALUES (?,?,?) ", 
        [id,listasdelacompra,comprado],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
            
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/misListasDeLaCompraNuevas")
.post(postCompraListNew)


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
app.route("/misListasDeLaCompraNuevas")
.patch(actualizarEstadoLista)

module.exports = app;