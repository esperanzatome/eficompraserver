const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const postRecuperarId = (request, response) => {
     
    
    const {email} = request.body;
    connection.query("SELECT id FROM `registro` WHERE email=?",
       
        [email],
        (error, results) => {
            
            if(error){
                
                
             
           console.log(error)
            }
            
                 
            else{
                console.log(results)
        console.log(email)
                 console.log([email])
                          const token = jwt.sign(
      { id: results[0].id, email:[email] },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
 response.status(201).json({"Usuario registrado": results,
                           token:token})
        
            }})};
            app.route("/recuperarIdRegistro")
.post(postRecuperarId);


module.exports = app;
