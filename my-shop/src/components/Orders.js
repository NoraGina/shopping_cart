import React, {useState, useEffect} from 'react';
import {BASE_URL} from '../constants';

const Orders = ()=>{

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrders();
    }, []);

    const getOrders = () => {
        fetch(`${BASE_URL}/orders`, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((orders) => {
             setOrders(orders);
        })
        .catch((error) => console.log(error))
    }

    const deleteOrder = (id)=>{
    
        fetch(`${BASE_URL}/orders/${id}`,{
            method:"DELETE",
            headers: {
                'Content-type': 'application/json;',
            }  
        })
        .then(()=> getOrders())
        
        .catch(err => console.log(err));
      
    }

    return<div className="container-fluid" style={{ marginTop: "50px" }}>
            <table className="table table-success table-striped">
            <thead>
              <tr>
                  <th>Id</th>
                  <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {orders &&
                orders.map((order)=>{
                    return(
                        <tr key={order._id}>
                           <td>{order._id}</td> 
                           <td>{order.customer}</td>
                           <td>{order.currentDate}</td> 
                        <td>{order.orderItems.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <div>Producer:{item.producer}</div>
                                    <div>Model:{item.model}</div>
                                    <div>Price:{item.model}</div>
                                </div>
                            )
                        })}</td>
                        
                        
                        <td><button onClick={()=>deleteOrder(order._id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
}
export default Orders;