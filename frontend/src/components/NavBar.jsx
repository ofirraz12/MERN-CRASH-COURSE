import React, {useContext} from 'react';
import '../styles/componentStyle/NavBar.css';
import { FaAddressCard, FaTasks, FaEnvelopeOpenText  } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { AppContext } from './context/addProductContext';

function NavBar() {
  const { setShowNewProduct } = useContext(AppContext);

  function handleAddClick() {
    setShowNewProduct(true);
}

  return (
    <div className='NavBar'>
        <nav className="nav">
        <input id="menu" type="checkbox" />
        <label htmlFor="menu">Menu</label>
        <ul className="menu">
            <li>
            <a href="#about">
                <span>About</span>
                <FaAddressCard aria-hidden="true" />
            </a>
            </li>
            <li>
            <a href="#projects">
                <span>Projects</span>
                <FaTasks aria-hidden="true" />
            </a>
            </li>
            <li>
            <a href="#Add" onClick={handleAddClick}>
                <span>Add</span>
                <IoMdAdd aria-hidden="true" />
            </a>
            </li>
            <li>
            <a href="#contact">
                <span>Contact</span>
                <FaEnvelopeOpenText aria-hidden="true" />
            </a>
            </li>
        </ul>
        </nav>
    </div>
  );
}

export default NavBar;
