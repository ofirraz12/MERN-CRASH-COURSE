// addProductContext.jsx
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [showNewProduct, setShowNewProduct] = useState(false);

    // Function to toggle visibility of the NewProduct component
    const toggleNewProduct = () => setShowNewProduct(prev => !prev);

    return (
        <AppContext.Provider value={{ showNewProduct, setShowNewProduct, toggleNewProduct }}>
            {children}
        </AppContext.Provider>
    );
};
