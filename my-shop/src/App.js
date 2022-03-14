import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products";
import CreateProducts from './components/CreateProducts';
import Cart from './components/Cart';
import Home from './components/Home';


const App =()=>{
  const loggedUser = localStorage.getItem("user");
  
  //const userAdmin = loggedUser.includes("admin");
  return (
    <div className="App">
      <Header loggedUser={!!loggedUser}/>
      <Routes>
        <Route path='register' element={<Register/>}></Route>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        

        {!!loggedUser && <>
            
            <Route path="products" element={<Products />} />
            <Route path="create-product" element={<CreateProducts />} />
            <Route path="cart" element={<Cart />} />

          </>}
         
      </Routes>
    </div>
  );
}

export default App;
