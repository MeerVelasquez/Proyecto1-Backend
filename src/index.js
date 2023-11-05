import express from "express";
// import './db.js';
import mongoose from "mongoose";
import userRouter from './routes/user.ep.js';
import productRouter from './routes/product.ep.js';
import restaurantRouter from './routes/restaurant.ep.js';
// import orderRouter from './routes/order.ep.js';

const app = express();
const port = 3000;
const db = await mongoose.connect("mongodb://localhost:3000/bdCP", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(restaurantRouter);
// app.use(orderRouter);


db.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)
    app.get('/', (req, res) => {
        res.send('Bienvenido a PseudoRappi')
    });
    
  })


