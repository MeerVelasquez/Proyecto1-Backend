import User from '../models/user_model.js';
import {Router} from 'express';

const router = Router();
    //Create: El endpoint crea un usuario en la base de datos con los datos enviados al backend.

    router.post('/usuarios', async (req, res) => {
        try{
            const user = await User.create(req.body);
            res.status(200).json(user);
        }catch(error){
            res.status(500).json({message: 'Error creating user'});
        }
    });

    //Read: El endpoint retorna los datos del usuario que corresponden a las credenciales (correo y contraseña).

    router.post('/usuarios/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.status(200).json({ message: 'Autenticación exitosa' });
      }
    );

 //Read: autenticación de usuario por id 

 router.get('/usuarios/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
       if (user && user.active){
           res.status(200).json(user);
         }else{
            res.status(404).json({message: 'Usuario no encontrado'});
        }
    }catch(error){
        res.status(500).json({message: 'Error getting user'});
    }
}
 );
 //Update: El endpoint actualiza los datos del usuario que corresponden al id
 router.put('/usuarios/:id', async (req, res) => {
      const userId = req.params.id;
      const userData = req.body;

      try{
        const user = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          res.status(200).json(user);
      }
        catch(error){
            res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
 });

 //Delete: El endpoint “inhabilita” un usuario que corresponde a la id proveída.

    router.delete('/usuarios/:id', async (req, res) => {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
              }
              res.status(200).json(user);
        }catch(error){
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    });


export default router;




