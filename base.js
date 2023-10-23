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

    //Schema Restaurante
    //Schema Usuario 
    //Schema Pedido
    //Schema Producto

    //No tener un delete como tal sino un estado de activo o inactivo

});