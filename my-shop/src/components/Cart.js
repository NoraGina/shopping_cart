import React, {useEffect, useState} from "react";

const Cart = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsFromLocalStorage();
      }, []);

    const getProductsFromLocalStorage = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart"));
    
        setProducts(cartItems);
      }
    return<div>
        <h2>Cart products:</h2>
       
        <table className="table table-success table-striped">
        <thead>
        <tr>
            <th>Customer</th>
            <th>Producer</th>
            <th>Model</th>
            <th>Image</th>
            <th>Price</th>
            <th>Warranty</th>
            <th>Rating</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
        </thead>
        <tbody>
            {products && products.map(product =>{
                return<tr key={product._id}>
                <td>{product.user}</td>
                <td>{product.producer}</td>
                <td>{product.model}</td>
                <td><img src={product.image} alt={product.mdel} style={{ height:"100px"}}></img></td>
                <td>{product.price}</td>
                <td>{product.warranty}</td>
                <td>{product.rating} / 5</td>
                <td>{product.quantity}</td>
                </tr>
            })}
        </tbody>
       </table>
    </div>
}
export default Cart;