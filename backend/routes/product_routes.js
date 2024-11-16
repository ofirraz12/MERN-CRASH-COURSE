import { createProduct, getProductById, getAllProducts, deleteProductById, updateProductById, getProductsByName} from '../models/product_model.js';
import express from 'express';

const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json({ success: true, products });
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ success: false, message: 'Error retrieving products' });
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await getProductById(id);
      if (product) {
        res.json({ success: true, product });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error retrieving product by ID:', error);
      res.status(500).json({ success: false, message: 'Error retrieving product' });
    }
  });
  
  router.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const products = await getProductsByName(name);
      if (products) {
        res.json({ success: true, products });
      } else {
        res.status(404).json({ success: false, message: 'no products were found' });
      }
    } catch (error) {
      console.error('Error fetching products by name:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, img_URL } = req.body;
  
    try {
      const updatedProduct = await updateProductById(id, { name, price, img_URL });
      if (updatedProduct) {
        res.json({ success: true, product: updatedProduct });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ success: false, message: 'Error updating product' });
    }
  });
  
  router.post("/", async (req, res) => {
      const { name, price, image } = req.body; 
    
      if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
      }
    
      try {
        const newProduct = await createProduct({ name, price, img_URL: image });
    
        res.status(201).json({ success: true, data: newProduct });
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Error creating product" });
      }
  });
  
  router.delete("/:id", async (req, res) => {
      const { id } = req.params;
    
      try {
        const deletedProduct = await deleteProductById(id);
    
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
    
        res.json({ success: true, message: "Product deleted", product: deletedProduct });
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete product" });
      }
  });

export default router;