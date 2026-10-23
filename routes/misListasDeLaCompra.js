const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();


const {connection} = require("../config.db");

const postCompraList = (request, response) => {
     
    
    const {listaId,userId} = request.body;
   
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
                  console.error("Error en la base de datos al hacer PATCH:", error);
            
                return response.status(500).json({ 
                    success: false, 
                    message: "Error interno en la base de datos", 
                    details: error.message 
                });
                
             
          
            }
            
                 
            else{
                
               
          return response.status(200).json({ 
                success: true, 
                message: "Estado de la lista actualizado", 
                results: results 
            });
        
            }}
    )
}
app.route("/misListasDeLaCompra")
.patch(actualizarEstadoLista)

module.exports = app;
