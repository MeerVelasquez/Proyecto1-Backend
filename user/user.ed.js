import User from './user_model.js';



//CRUD estudiante metodo READ
export async function getUserId (req, res){
    try{
        const user = await User.findById(req.params.id);
       if (user && user.active){
           res.status(200).json(user);

         }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error getting user'});
    }
}