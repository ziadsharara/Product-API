// Router
import { Router } from 'express';
import {
  allProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from './product.controller.js';
const router = Router();

// APIs
// Get all products
router.get('/', allProducts);

// Add product
router.post('/', addProduct);

// Update product
router.patch('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

export default router;
