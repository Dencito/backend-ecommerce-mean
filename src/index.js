const express = require('express');
const cors = require("cors")
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const { db } = require('./utils/db');


const app = express();
const port = process.env.PORT;


app.use(cors())

app.get("/pruebas", (req, res)=> {
  return {message: "Hola esto es una prueba"}
})


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

db.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
})




