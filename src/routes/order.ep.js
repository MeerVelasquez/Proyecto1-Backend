import Order from '../models/order_model.js';
import {Router} from 'express';
import User from '../models/user_model.js';
import Restaurant from '../models/restaurant_model.js';

const router = Router();

// Create El endpoint crea un pedido de un usuario a un restaurante en la base de datos con los datos enviados al backend.

router.post('/', async (req, res) => {
    try{
        await User.findById(req.body.user);
        await Restaurant.findById(req.body.restaurant);
        const order = await Order.create(req.body);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message: 'Error creating order'});
    }});

//Read (unidad) El endpoint retorna los datos del pedido que corresponde a la id proveída. 

router.get('/:id', async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message: 'Error getting order'});
    }});

// Read (cantidad): El endpoint retorna los datos de los pedidos realizados por el usuario 
//proveído, enviados por el usuario proveído, pedidos a un 
//restaurante proveído, y/o entre las fechas proveídas.
//Read (cantidad) El endpoint retorna los datos de los pedidos enviados, pero sin aceptar.
router.get('/', async (req, res) => {
    try{
        const { user, restaurant, status} = req.query;
        const filter = {};
    
        if (user) {
          filter.user = user;
        }
    
        if (restaurant) {
          filter.restaurant = restaurant;
        }

        if (status) {
            filter.status = status;
         }


    
    
        const orders = await Order.find(filter);
        res.status(200).json(orders);   
      }catch(error){
        res.status(500).json({ message: 'Error al buscar pedidos' });
      }});

// Read (cantidad) El endpoint retorna los datos de los pedidos enviados, pero sin aceptar.



// Update: El endpoint modifica los datos del pedido que corresponde a la id 
//proveída, usando los datos proveídos, a menos que este ya haya sido enviado

router.put('/:id', async (req, res) => {
    const pedidoId = req.params.id;
    const nuevosDatos = req.body;

  try {
    const pedido = await Order.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    if (pedido.status === 'sent') {
      return res.status(400).json({ error: 'No puedes modificar un pedido enviado' });
    }

    pedido.set(nuevosDatos);
    await pedido.save();
    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al actualizar el pedido' });
  }
});

// Delete El endpoint “inhabilita” un pedido que corresponde a la id proveída.

router.delete('/:id', async (req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
          }
          res.status(200).json(order);
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }});

export default router;