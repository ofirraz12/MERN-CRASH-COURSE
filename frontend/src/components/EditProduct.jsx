import React, { useState } from 'react';
import { updateProduct } from '../../api';
import '../styles/componentStyle/product/EditProduct.css'

function EditProduct({ product, onClose, refreshProducts }) {
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedImageURL, setEditedImageURL] = useState(product.img_url);

    async function handleSave() {
        try {
            const updatedProduct = {
                name: editedName,
                price: editedPrice,
                img_URL: editedImageURL,
            };

            await updateProduct(product.id, updatedProduct);
            refreshProducts();
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    return (
        <div className="edit-product">
            <h1>name</h1>
            <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Product Name"
            />
            <h1>price</h1>
            <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                placeholder="Price"
            />
            <h1>URL</h1>
            <input
                type="text"
                value={editedImageURL}
                onChange={(e) => setEditedImageURL(e.target.value)}
                placeholder="Image URL"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default EditProduct;
