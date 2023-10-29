const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/bdCP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
app.use(express.json());
db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));

db.once("open", async () => {

    const productSchema = mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
        price: { type: Number, required: true },
        active: {type: Boolean, default: true},
     });
    
    const Product = mongoose.model('product', productSchema);

    //Create: El endpoint crea un producto en la base de datos con los datos enviados al backend

    app.post('/productos', async (req, res) => {
        try{
            const product = await Product.create(req.body);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: 'Error creating product'});
        }});

    //Read (unidad) El endpoint retorna los datos del producto que corresponde a la id proveída. 

    app.get('/productos/:id', async (req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: 'Error getting product'});
        }});

    //Read (lista):  El endpoint retorna los datos de los productos que correspondan a el restaurante y/o categoría proveída.

    app.get('/productos', async (req, res) => {
        try{
            const { category, name } = req.query;
            const filter = {};
        
            if (category) {
              filter.category = category;
            }
      
            if (name) {
              filter.name = { $regex: name, $options: 'i' }; 
            }
            const products = await Product.find(filter);
            if (products.length === 0) {
              return res.status(404).json({ message: 'No se encontraron productos' });
            }
            res.status(200).json(restaurants);   
          }catch(error){
            res.status(500).json({ message: 'Error al buscar productos' });
        
        }
        });
//Update El endpoint modifica los datos del producto que corresponde a la id proveída, usando los datos proveídos

app.put('/productos/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    try {
      const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }

  });

//Delete: El endpoint cambia el estado del producto a inactivo.
app.delete('/products/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
          }
          res.status(200).json(product);
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }});



});