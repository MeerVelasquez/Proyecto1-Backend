import Restaurant from '../models/restaurant_model.js';
import {Router} from 'express';

const router = Router();

  //Create: El endpoint crea un restaurante en la base de datos con los datos enviados al backend
  
  router.post('/', async (req, res) => {
    try{
        const restaurant = await Restaurant.create(req.body);
        res.status(200).json(restaurant);
    }catch(error){
        res.status(500).json({message: 'Error creating restaurant'});
        console.log(error);
    }});

    router.get('/', async (req, res) => {
      try{
         const {status} = req.query;
         const filter = {};

           if (status !== undefined) {
               filter.status = status;
          }
          const restaurant = await Restaurant.find();
          res.status(200).json(restaurant);
      }catch(error){

          res.status(500).json({message: 'Error getting restaurant'});

      }
  });

  //Read:  El endpoint retorna los datos del restaurante que corresponde a la id proveída.

  router.get('/:id', async (req, res) => {
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

  router.get('/', async (req, res) => {
    try{
      const { category, name } = req.query;
      const filter = {};
  
      if (category) {
        filter.category = category;
      }

      if (name) {
        filter.name = { $regex: name, $options: 'i' }; 
      }
      const restaurants = await Restaurant.find(filter);
      if (restaurants.length === 0) {
        return res.status(404).json({ message: 'No se encontraron restaurantes' });
      }
      res.status(200).json(restaurants);   
    }catch(error){
      res.status(500).json({ message: 'Error al buscar restaurantes' });
    }});
  
    //Update El endpoint modifica los datos del restaurante que corresponde a la id proveída, usando los datos proveídos.

    router.put('/:id', async (req, res) => {
      const restaurantId = req.params.id;
      const restaurantData = req.body;
      try {
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, restaurantData, { new: true });
    
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurante no encontrado' });
        }
    
        res.status(200).json(restaurant);
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el restaurante' });
        
      }

    });

    //Delete El endpoint “inhabilita” un restaurante que corresponde a la id proveída.

    router.delete('/:id', async (req, res) => {
      try{
          const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
          if (!restaurant) {
              return res.status(404).json({ message: 'Restaurante no encontrado' });
            }
            res.status(200).json(restaurant);
      }catch(error){
          res.status(500).json({ message: 'Error al eliminar el restaurante' });
      }});

    
export default router;


 

