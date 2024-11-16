import React, { useState } from 'react';
import '../styles/componentStyle/product/Product.css';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteProduct } from '../../api.js';
import EditProduct from './EditProduct.jsx';

function Product({ product, refreshProducts }) {
    const [isEditing, setIsEditing] = useState(false);

    async function handleDelete() {
        try {
            await deleteProduct(product.id);
            refreshProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    return (
        <div className='product'>
            {isEditing ? (
                <EditProduct
                    product={product}
                    refreshProducts={refreshProducts}
                    onClose={() => setIsEditing(false)} 
                />
            ) : (
                <>
                    <img src={product.img_url} alt={product.name} />
                    <h1>{product.name}</h1>
                    <h2>${product.price}</h2>
                    <div className='productButtons'>
                        <button id='editProduct' onClick={() => setIsEditing(true)}>
                            <FaRegEdit />
                        </button>
                        <button id='deleteProduct' onClick={handleDelete}>
                            <MdDelete />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Product;
