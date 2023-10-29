import Restaurant from "./restaurant_model.js";
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Configura la conexión a la base de datos
mongoose.connect("mongodb://localhost/bdCP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
app.use(express.json());
db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));

db.once("open", async () => {
  //Create: El endpoint crea un restaurante en la base de datos con los datos enviados al backend
  
  app.post('/restaurantes', async (req, res) => {
    try{
        const restaurant = await Restaurant.create(req.body);
        res.status(200).json(restaurant);
    }catch(error){
        res.status(500).json({message: 'Error creating restaurant'});
    }});

  //Read:  El endpoint retorna los datos del restaurante que corresponde a la id proveída.

  app.get('/restaurantes/:id', async (req, res) => {
    try{
        const restaurant = await Restaurant.findById(req.params.id);
       if (restaurant && restaurant.active){
           res.status(200).json(restaurant);
         }else{
            res.status(404).json({message: 'Restaurante no encontrado'});
        }
    }catch(error){
        res.status(500).json({message: 'Error getting restaurant'});
    }});

  //Read (Cantidad): Read (cantidad) El endpoint retorna los datos de los restaurantes que correspondana la categoría proveída y/o su nombre se asemeje a la búsqueda.

 

});