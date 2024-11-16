import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/global.css';
import Home from "./pages/Home"
import { SearchProvider } from './components/context/SearchContext.jsx';
import { AppProvider } from './components/context/addProductContext.jsx';

function App() {
  return (
    <SearchProvider>
      <AppProvider>
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </Router>
      </AppProvider>
    </SearchProvider>
  );
}


export default App;
