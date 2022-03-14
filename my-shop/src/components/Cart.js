import React, { useEffect, useState } from "react";

const Cart = () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [items, setItems] = useState(cartFromLocalStorage);

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

  useEffect(()=>{
      localStorage.setItem('cart', JSON.stringify(items));
  },[items]);

  const getTotalSum = () => {
    return items.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };

  const removeFromCart = (id) => {
    
    //setItems(items.filter((product) => product !== productToRemove));
    setItems(items.filter((item) => item.id !== id));
   
    
  };

  const setQuantity = (product, amount) => {
    const newCart = [...items];
    newCart.find((item) => item._id === product._id).quantity = amount;
    setItems(newCart);
  };
  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      <h2>Products in cart</h2>

      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
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
                  <td>{item.user}</td>
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
                  <td><input type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        setQuantity(item, parseInt(e.target.value))
                      }
                    /></td>
                  
                      <td>{item.price * item.quantity}</td>
                     
                      <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(+item.id)}
                    >
                      Delete
                    </button>
                  </td>
                 
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>Total Cost:Lei {getTotalSum()}</div>
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