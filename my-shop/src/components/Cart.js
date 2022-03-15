import React, { useEffect, useState } from "react";
import {BASE_URL} from '../constants';
import { useNavigate} from "react-router-dom";
const Cart = () => {
    
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  const [items, setItems] = useState(cartFromLocalStorage);

  let today = new Date(),
 date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

 
  const [order, setOrder] = useState({
    customer: user.email,
    orderItems: items,
    address: "",
    phone: "",
    currentDate: date
  });
  
 
  const [formErrors, setFormErrors] = useState(null);

  let navigate = useNavigate();

  const goToOrders = () => {
    navigate("/orders");
  };

  const onSubmit = () => {
    setFormErrors(null);
    
      let error= validateForm();
      if(error){
       setFormErrors(error);
       console.log("Form failed");
       return;
      }
    console.log("Validation successful")
    
          fetch(`${BASE_URL}/orders`, {
         method: "POST",
         body: JSON.stringify(order),
         headers: {
           "Content-type": "application/json;",
         },
       })
         .then((response) => response.json())
         .then((order) => console.log(order))
         .catch((error) => console.log(error));
         goToOrders();
        
  };

  const validateForm = () =>{
    let error = false;
   
    if(order.address === ''){
      error={
        name:"address", 
        message:"Address is required!"
      };
      return error;
    }
    if(order.phone === ''){
      error={
        name:"phone", 
        message:"Phone is required!"
      };
      return error;
    }
    
    return error;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const getTotalSum = () => {
    return items.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };

  const removeFromCart = (productToRemove) => {
    setItems(items.filter((item) => item !== productToRemove));
  };

  const setQuantity = (product, amount) => {
    const newCart = [...items];
    newCart.find((item) => item._id === product._id).quantity = amount;
    setItems(newCart);
  };
  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      {items.length === 0 ? (
        <div>
          <h3>No items in cart</h3>
        </div>
      ) : (
        <div>
          <h2>Products in cart</h2>
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Producer</th>
                <th>Model</th>
                <th>Image</th>
                <th>Price</th>
                <th>Warranty</th>
                <th>Rating</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>{item.producer}</td>
                      <td>{item.model}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.mdel}
                          style={{ height: "200px" }}
                        ></img>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.warranty}</td>
                      <td>{item.rating} / 5</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            setQuantity(item, parseInt(e.target.value))
                          }
                        />
                      </td>

                      <td>{item.price * item.quantity}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeFromCart(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              float: "right",
              marginBottom: "2px",
              paddingRight: "20px",
            }}
          >
            <h5>Total Cost:Lei {getTotalSum()}</h5>
          </div>
          <div className="container-md">
         
            <div className="input-group mb-2">
              <span className="input-group-text">
                Address City, County, Street, Number...
              </span>
              <textarea
                className="form-control"
                aria-label="Address City, County, Street, Number..."
                name="address"
                value={order.address}
                onChange={handleChange}
              ></textarea>
            </div>
            {formErrors && formErrors.name ==='address' ?
           <p style={{ color: "red" }}>{formErrors.message}</p>:null}
            <div className="input-group mb-3">
              <span className="input-group-text">Phone</span>
              <input
                type="text"
                name="phone"
                pattern="[0-9]*"
                minLength="10"
                className="form-control"
                placeholder="Enter phone number"
                aria-label="Phone"
                aria-describedby="basic-addon1"
                value={order.phone}
                  onChange={handleChange}
              />
            </div>
            {formErrors && formErrors.name ==='phone' ?
           <p style={{ color: "red" }}>{formErrors.message}</p>:null}
            <button type="button" className="btn btn-outline-success"  onClick={onSubmit}>
              Save order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
/*localStorage.setItem("cart", JSON.stringify(items));
useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, []);
*/
/* useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    getProductsFromLocalStorage();
  }, []);

  const getProductsFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    setItems(cartItems);
  }*/
//setItems(items.filter((product) => product !== productToRemove));
/*<input
                type="text"
                name="customer"
                className="form-control"
                aria-label="Customer"
                aria-describedby="basic-addon1"
                value={order.customer}
                  onChange={handleChange}
              />
           useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
     
    }
  }, [] );   
              
              */
