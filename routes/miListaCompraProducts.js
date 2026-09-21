const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postListaProducts = (request, response) => {
     
    
    const {product,listaId} = request.body;
        connection.query("SELECT listaProducts FROM listascompra WHERE product=? && listaId=?", 
        [product,listaId],
        (error, results) => {
            
            if(error){
                
                
             
          console.log(error)
            }
            
                 
            else{
            //    console.log(results)
               
                response.status(201).json(results)
        
            }})
        };
            
//ruta

app.route("/miListaCompraProducts")
.post(postListaProducts);


const deleteProduct = (request, response) => {
    const { listaProducts } = request.query; // Si quieres usar query params
    // O usa request.body si decides enviar el parámetro en el cuerpo
    // const { listasdelacompra } = request.body;

    const query = "DELETE FROM listascompra WHERE listaProducts=?"
    connection.query(query, [listaProducts], (error, results) => {
        if (error) {
            console.log(error);
          
        }else{
console.log(results)
       response.status(201).json(results)
}
    });
};

app.route("/miListaCompraProducts").delete(deleteProduct);

const actualizarNombreLista=(request,response)=>{
    const {listasdelacompra,listaNameNew,listaNameOld}=request.body;
    connection.query("UPDATE compraeficiente.`?`SET listaName=? WHERE listaName=?",
        [listasdelacompra,listaNameNew,listaNameOld],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                
               
                response.status(201).json(results)
        
            }}
    )
}
app.route("/miListaCompraProducts")
.patch(actualizarNombreLista)
module.exports = app;