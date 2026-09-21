const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const {connection} = require("../config.db");

const postUserCompraList = (request, response) => {
     
    
    const {id} = request.body;
        connection.query(" SELECT listasdelacompra FROM usuario WHERE id=? ORDER BY listasdelacompra DESC LIMIT 1;", 
        [id],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
           
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/listasCompraUser")
.post(postUserCompraList);

const getUserCompraList=(request,response)=> {
     
    
    const {id} = request.body;
        connection.query(" SELECT* FROM usuario WHERE id=? ORDER BY listasdelacompra;", 
        [id],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
           
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/listasCompraUser")
.get(getUserCompraList);


const deleteList=(request,response)=>{
    const {listasdelacompra} = request.query;
const query = "DELETE FROM `compraeficiente`.`usuario` WHERE (`listasdelacompra` = ?)";
connection.query(query, [listasdelacompra], (error, results) => {
    if (error) {
        console.log(error);
        return response.status(500).json({ error: "Error en la consulta" });
    }

    if (results.affectedRows === 0) {
        return response.status(404).json({ error: "Lista no encontrada" });
    }

    response.status(200).json({ message: "Lista eliminada con éxito" });
});
};


app.route("/listasCompraUser")
.delete(deleteList);

module.exports = app;