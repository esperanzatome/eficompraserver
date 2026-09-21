const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postCompraList = (request, response) => {
     
    
    const {listaId,userId} = request.body;
      //  connection.query("INSERT IGNORE usuario (id,listasdelacompra,comprado) VALUES (?,?,?) ", 
      connection.query("INSERT listasnuevas (listaId,userId) VALUES (?,?) ", 
      [listaId,userId],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
            
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/misListasDeLaCompra")
.post(postCompraList);

const getCompraList=(request,response)=> {
     
    
 
        connection.query("SELECT LAST_INSERT_ID()", 
     
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
           
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/misListasDeLaCompra")
.get(getCompraList);
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

module.exports = app;