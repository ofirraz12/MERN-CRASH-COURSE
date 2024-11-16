import axios from 'axios';

const fetchAllProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products');
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const searchProducts = async (term) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/products/search/${term}`);
        return response.data.products;
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
};

const addProduct = async (productData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export { fetchAllProducts, searchProducts, addProduct, deleteProduct, updateProduct };
