import React, {useEffect, useState} from "react";

const Cart = ()=>{
    const [items, setItems] = useState([]);

    

      useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        if (items) {
         setItems(items);
        }
      }, []);
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
            {items && items.map((item, index) =>{
                return<tr key={index}>
                <td>{item.user}</td>
                <td>{item.producer}</td>
                <td>{item.model}</td>
                <td><img src={item.image} alt={item.mdel} style={{ height:"200px"}}></img></td>
                <td>{item.price}</td>
                <td>{item.warranty}</td>
                <td>{item.rating} / 5</td>
                <td>{item.quantity}</td>
                </tr>
            })}
        </tbody>
       </table>
    </div>
}
export default Cart;