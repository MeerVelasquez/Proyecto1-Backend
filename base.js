import User from './user/user_model';
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
  app.get('/usuarios', async (req, res) => {
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
  );
}

);