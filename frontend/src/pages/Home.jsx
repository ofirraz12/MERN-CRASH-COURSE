import React, {useState, useRef, useEffect} from 'react';
import '../styles/Home.css'
import { CiSearch } from "react-icons/ci";
const searchIcon = <CiSearch />
import Header from '../components/HomeHeader.jsx'
import ProductsGrid from '../components/ProductsGrid.jsx';
import NavBar from '../components/NavBar.jsx'

function Home () { 
    return(
    <div className='Home'>
            <Header />
            <ProductsGrid />
            <NavBar />
    </div>
)}

export default Home;