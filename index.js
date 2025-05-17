import express, { json } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'route',
});

// APIs
// Get all products
app.get('/products', (req, res, next) => {
  connection.query(`SELECT * FROM product`, function (error, results) {
    if (error) {
      return res.json({ success: false, message: error.message });
    }
    return res.json({ success: true, results });
  });
});

// Add product
app.post('/products', (req, res, next) => {
  const { name, price, description } = req.body;
  connection.query(
    `INSERT INTO product 
     (name, price, description) 
     values
     ("${name}", ${price}, "${description}")`,
    function (error, results) {
      if (error) {
        return res.json({ success: false, message: error.message });
      } else if (results.affectedRows) {
        return res.json({
          success: true,
          message: 'Product added successfully!',
        });
      } else {
        return res.json({
          success: false,
          message: 'Something went wrong!',
        });
      }
    }
  );
});

// Update product
app.patch('/products/:id', (req, res, next) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  connection.query(
    `UPDATE product set
     name = "${name}",
     price = ${price},
     description = "${description}"
     WHERE id = ${id}`,
    function (error, results) {
      if (error) {
        return res.json({ success: false, message: error.message });
      } else if (results.affectedRows) {
        return res.json({
          success: true,
          message: 'Product updated successfully!',
        });
      } else {
        return res.json({
          success: false,
          message: 'Product not found!',
        });
      }
    }
  );
});

// Delete product
app.delete('/products/:id', (req, res, next) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM product
     WHERE id = ${id}`,
    function (error, results) {
      if (error) {
        return res.json({ success: false, message: error.message });
      } else if (results.affectedRows) {
        return res.json({
          success: true,
          message: 'Product deleted successfully!',
        });
      } else {
        return res.json({
          success: false,
          message: 'Product not found!',
        });
      }
    }
  );
});

// Get certain product
app.get('/products/:id', (req, res, next) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM product
     WHERE id = ${id}`,
    function (error, results) {
      if (error) {
        return res.json({ success: false, message: error.message });
      }
      return res.json({
        success: true,
        results,
      });
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
