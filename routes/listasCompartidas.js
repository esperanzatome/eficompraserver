const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");
const postListaCompartidaUserId = (request, response) => {
      
             const {listasdelacompra} = request.body;
                 connection.query("SELECT userId FROM usuario WHERE listasdelacompra=? ", 
                 [listasdelacompra],
                 (error, results) => {
                     
                     if(error){
                         console.log(error)
                         
                     
                     
                         
                    
                     }else{
                         
                        
                         response.status(201).json(results)
        
                 
         
                         
         
                         
                     }
                     
                 }
             )}
   
   
   app.route("/listasCompartidas")
.post(postListaCompartidaUserId);
/*
const postListaCompartida = (request, response) => {
     
    
    const {listaId,user,comprado} = request.body;
        connection.query("INSERT IGNORE `listas-compartidas` (listaId,user,comprado) VALUES (?,?,?) ", 
        [listaId,user,comprado],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
            
                response.status(201).json(results)
        
            }})};
ruta
app.route("/listasCompartidas")
.post(postListaCompartida);
*/
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