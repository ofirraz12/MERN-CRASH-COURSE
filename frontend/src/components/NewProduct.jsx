// NewProduct.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from './context/addProductContext';  // Import context
import { addProduct } from '../../api';
import '../styles/componentStyle/product/NewProduct.css'

function NewProduct( {refreshProducts} ) {
    const [newProductName, setNewProductName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newImageURL, setNewImageURL] = useState("");
    const { setShowNewProduct } = useContext(AppContext);

    async function handleClick(event) {
        event.preventDefault();
        const newProductData = {
            name: newProductName,
            price: newPrice,
            image: newImageURL
        };

        try {
            await addProduct(newProductData);
            setNewProductName("");
            setNewPrice("");
            setNewImageURL("");
            setShowNewProduct(false);
            refreshProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return (
        <div className="new-product">
            <input
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
            />

            <button onClick={handleClick}>Save</button>
        </div>
    );
}

export default NewProduct;
