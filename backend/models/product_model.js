import { client } from '../config/db.js';
import {generateUniqueId} from '../utils/generateUniqueId.js'

async function createProduct({ name, price, img_URL }) {
    const PR_id = await generateUniqueId();
  
    const query = 'INSERT INTO products (PR_id, name, price, img_URL) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [PR_id, name, price, img_URL];
  
    try {
      const result = await client.query(query, values);
      return result.rows[0]; 
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  

async function getProductById(productId) {
  const query = 'SELECT * FROM products WHERE id = $1';
  const values = [productId];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

async function getProductsByName(name) {
  const query = `
    SELECT * 
    FROM products
    WHERE name ILIKE $1 -- Exact match
       OR name ILIKE $2 -- Prefix match
       OR name ILIKE $3 -- Partial match
    ORDER BY 
      (name ILIKE $1) DESC,  -- Exact match first
      (name ILIKE $2) DESC,  -- Prefix match second
      (name ILIKE $3) DESC;  -- Partial match last
  `;
  const values = [name, `${name}%`, `%${name}%`];

  try {
    const result = await client.query(query, values);
    return result.rows; // Returns the ordered results
  } catch (error) {
    console.error('Error fetching products by name:', error);
    throw error;
  }
}




async function getAllProducts() {
  const query = 'SELECT * FROM products';

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function getLastProductId() {
    const query = 'SELECT id FROM products ORDER BY id DESC LIMIT 1';
    try {
      const result = await client.query(query);
      return result.rows[0] ? result.rows[0].id : 0;
    } catch (error) {
      console.error('Error fetching last product ID:', error);
      throw error;
    }
  }

async function deleteProductById(productId) {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
  const values = [productId];

  try {
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      console.log(`No product found with id: ${productId}`);
      return null; 
    }

    console.log(`Deleted product with id: ${productId}`);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    throw error;
  }
}

async function updateProductById(id, { name, price, img_URL }) {
  const query = `
    UPDATE products
    SET name = COALESCE($2, name), 
        price = COALESCE($3, price), 
        img_URL = COALESCE($4, img_URL)
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, name, price, img_URL];

  try {
    const result = await client.query(query, values);
    return result.rows[0]; // Returns the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}
  
export { createProduct, getProductById, getAllProducts, getLastProductId, deleteProductById, updateProductById, getProductsByName };
