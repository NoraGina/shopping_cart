import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    fetch(`${BASE_URL}/orders`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => console.log(error));
  };

  const deleteOrder = (id) => {
    fetch(`${BASE_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;",
      },
    })
      .then(() => getOrders())

      .catch((err) => console.log(err));
  };

 

  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Status</th>
            <th>Requirements</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.customer}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>{order.currentDate}</td>
                  <td>{order.status}</td>
                  <td>{order.requirements}</td>
                  <td>
                    {order.orderItems.map((item) => {
                      return (
                        <div key={item._id}>
                          <span>Producer:</span>
                          <span>{item.producer}</span>
                          <span> Model:</span>
                          <span>{item.model}</span>

                          <span>
                            {
                              <img
                                src={item.image}
                                alt={item.mdel}
                                style={{ height: "100px" }}
                              ></img>
                            }
                          </span>
                          <span> Price:</span>
                          <span>{item.price}</span>
                          <span> Quantity:</span>
                          <span>{item.quantity}</span>
                        </div>
                      );
                    })}
                  </td>
                    <td> {order.total}</td>
                  <td>
                    <button onClick={() => deleteOrder(order._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Orders;
