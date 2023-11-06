import express from "express";
import './db.js';
import mongoose from "mongoose";
import userRouter from './routes/user.ep.js';
import productRouter from './routes/product.ep.js';
import restaurantRouter from './routes/restaurant.ep.js';
import orderRouter from './routes/order.ep.js';

const app = express();
const port = 3000;

//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));
app.use(express.json());
// app.use(express.bodyParser());
  

  app.use("/usuarios",userRouter);
  app.use("/productos",productRouter);
  app.use("/restaurantes",restaurantRouter);
  app.use("/pedidos",orderRouter);

    app.get('/', (req, res) => {
        res.send('Bienvenido a PseudoRappi')
    });
    

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});