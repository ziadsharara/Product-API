import { connection } from './../../../db/connection.js ';

export const allProducts = (req, res, next) => {
  connection.query(`SELECT * FROM product`, function (error, results) {
    if (error) {
      return res.json({ success: false, message: error.message });
    }
    return res.json({ success: true, results });
  });
};

export const addProduct = (req, res, next) => {
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
};

export const updateProduct = (req, res, next) => {
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
};

export const deleteProduct = (req, res, next) => {
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
};
