import Product from '../models/product_model.js';
import {Router} from 'express';

const router = Router();

    //Create: El endpoint crea un producto en la base de datos con los datos enviados al backend

    router.post('/', async (req, res) => {
        try{
            const product = await Product.create(req.body);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: 'Error creating product'});
        }});

    //Read (unidad) El endpoint retorna los datos del producto que corresponde a la id proveída. 

    router.get('/:id', async (req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: 'Error getting product'});
        }});

    //Read (lista):  El endpoint retorna los datos de los productos que correspondan a el restaurante proveído.

    router.get('/', async (req, res) => {
        try{
            const { restaurant} = req.query;
            const filter = {};
        
            if (restaurant) {
              filter.restaurant = restaurant;
            }
           
            const products = await Product.find(filter);
            if (products.length === 0) {
              return res.status(404).json({ message: 'No se encontraron productos' });
            }
            res.status(200).json(products);   
          }catch(error){
            res.status(500).json({ message: 'Error al buscar productos' });
            console.log(error);
        
        }
        });
//Update El endpoint modifica los datos del producto que corresponde a la id proveída, usando los datos proveídos

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }

  });

//Delete: El endpoint cambia el estado del producto a inactivo.
router.delete('/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
          }
          res.status(200).json(product);
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }});



export default router;