import express, { json } from 'express';
import productRouter from './src/modules/product/product.router.js';
const app = express();
app.use(express.json());
const port = 3000;

// product APIs
app.use('/products', productRouter);

// user APIs
// app.use('/user', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
