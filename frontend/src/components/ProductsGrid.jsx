import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import NewProduct from './NewProduct.jsx';
import '../styles/componentStyle/ProductsGrid.css';
import { fetchAllProducts, searchProducts } from '../../api.js';
import { SearchContext } from './context/SearchContext.jsx';
import { AppContext } from './context/addProductContext';

function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [productsVersion, setProductsVersion] = useState(0);
    const { searchTerm } = useContext(SearchContext);
    const { showNewProduct } = useContext(AppContext);

    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = searchTerm
                ? await searchProducts(searchTerm)
                : await fetchAllProducts();
            setProducts(fetchedProducts);
        };
        getProducts();
    }, [searchTerm, productsVersion]);

    const refreshProducts = () => {
        setProductsVersion((prev) => prev + 1);
    };

    return (
        <div className="productsGrid">
            {showNewProduct && <NewProduct refreshProducts={refreshProducts} />}
            {products.length > 0 ? (
                products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        refreshProducts={refreshProducts}
                    />
                ))
            ) : (
                <p>Loading products...</p>
            )}
        </div>
    );
}

export default ProductsGrid;
