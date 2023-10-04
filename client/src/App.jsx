import React from 'react'
import './App.css'
import { NavbarDefault } from './components/Nav/Navbar'
import Products from './components/Products/Products'
import {Toaster} from "react-hot-toast"

function App() {

  return (
    <div className="app-container">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <NavbarDefault/>
        <Products/>
    </div>
  )
}

export default App
