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
                
  
                       const token = jwt.sign(
      { id: Object.values(response.data)[0][0].id, email: Object.values(response.data)[0][0].email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
 response.status(201).json({"El usuario existe": results,
                           token:token})

  
            }})};
//ruta
app.route("/login")
.post(postLogin);


module.exports = app;
