const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const {connection} = require("../config.db");

const postUsuario = (request, response) => {
     
    
    const {userId,alias,listasdelacompra,comprado,listaName} = request.body;
         connection.query("INSERT IGNORE usuario (userId,alias,listasdelacompra,comprado,listaName) VALUES (?,?,?,?,?) ",
        [userId,alias,listasdelacompra,comprado,listaName],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
           
                response.status(201).json(results)
        
            }})};
//ruta
app.route("/usuario")
.post(postUsuario);

const actualizarNombreLista=(request,response)=>{
    const {listaName,listasdelacompra}=request.body;
    connection.query("UPDATE usuario SET listaName=? WHERE listasdelacompra=?",
        [listaName,listasdelacompra],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
               
                response.status(201).json(results)
        
            }}
    )
}
app.route("/usuario")
.patch(actualizarNombreLista)



const deleteList = (request, response) => {
    const { listaProducts } = request.query; // Si quieres usar query params
    // O usa request.body si decides enviar el parámetro en el cuerpo
    // const { listasdelacompra } = request.body;

    const query = "DELETE FROM listascompra WHERE listaProducts=?"; 
    connection.query(query, [listaProducts], (error, results) => {
        if (error) {
            console.log(error);
         
            return response.status(500).json({ error: "Error en la consulta" });
        }else{

       
response.status(200).json({ message: "Usuario-lista eliminado con éxito" })}
    });
};

app.route("/usuario").delete(deleteList);

/*

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
*/
module.exports = app;