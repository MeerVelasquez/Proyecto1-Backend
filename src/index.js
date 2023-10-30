import express from "express";
import './db.js';
import userRouter from './routes/user.ep.js';
import productRouter from './routes/product.ep.js';
import restaurantRouter from './routes/restaurant.ep.js';
// import orderRouter from './routes/order.ep.js';

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Bienvenido a PseudoRappi')
});

app.use(userRouter);
app.use(productRouter);
app.use(restaurantRouter);
// app.use(orderRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })