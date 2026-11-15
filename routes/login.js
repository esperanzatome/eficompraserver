const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postLogin = (request, response) => {
     

    
    const {email,password} = request.body;
        connection.query("SELECT id,alias FROM registro WHERE email=? AND password=?", 
        [email,password],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                console.log(response, results)
  
                response.status(201).json({"El usuario existe": results})
        
            }})};
//ruta
app.route("/login")
.post(postLogin);


module.exports = app;
