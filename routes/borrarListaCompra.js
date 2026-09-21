const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");







const deleteList = (request, response) => {
    const { usuarioListaId } = request.query; 

    const query = "DELETE FROM usuario WHERE usuarioListaId = ?"; 
    connection.query(query, [usuarioListaId], (error, results) => {
        if (error) {
            console.log(error);
           
            return response.status(500).json({ error: "Error en la consulta" });
        }else{

       
response.status(200).json({ message: "Usuario-lista eliminada con éxito" })}
    });
};

app.route("/borrarListaCompra").delete(deleteList);

const postRecuperarLista = (request, response) => {
     
    
    const {listasdelacompra, userId} = request.body;
    connection.query("SELECT usuarioListaId FROM usuario WHERE listasdelacompra=? && userId=?",
       
        [listasdelacompra, userId],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
        console.log(results)
                response.status(201).json(results)
        
            }})};
            app.route("/borrarListaCompra")
.post(postRecuperarLista);


module.exports = app;