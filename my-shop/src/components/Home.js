import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { faStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/style.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "[]");
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/Login");
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`${BASE_URL}/products`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.log(error));
  };

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = [...cartItems];

    let itemInCart = newCart.find((item) => product._id === item._id);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="container-fluid " style={{ marginTop: "60px" }}>
      <h4>Hello {user?.fullName}</h4>
      <div className="row g-2">
        {products &&
          products.map((product) => {
            return (
              <div
                className="col-12  col-sm-6 col-md-5 col-lg-4 col-xl-3 "
                key={product._id}
              >
                <div
                  className="card h-100 "
                  style={{ borderRadius: "1em 1em 0 0" }}
                >
                  <div className="boxImg">
                    <img
                      src={product.image}
                      alt={product.mdel}
                      className="productImg"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title fw-bold">
                      <span
                        style={{ fontSize: "smaller", fontWeight: "lighter" }}
                      >
                        Producer:
                      </span>{" "}
                      {product.producer}
                    </h4>
                    <h5 className="card-title fw-bold">
                      <span
                        style={{ fontSize: "smaller", fontWeight: "lighter" }}
                      >
                        Model:
                      </span>{" "}
                      {product.model}
                    </h5>
                    <h5 className="card-title fw-bold">
                      <span
                        style={{ fontSize: "smaller", fontWeight: "lighter" }}
                      >
                        Price:
                      </span>{" "}
                      {product.price} Lei
                    </h5>
                    <p className="text-start">Warranty: {product.warranty}</p>
                    <p className="text-start">
                      Rating:
                      {Array(5)
                        .fill(0)
                        .map((_, index) => {
                          return (
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{
                                color:
                                  +product.rating >= index + 1
                                    ? "yellow"
                                    : "grey",
                              }}
                              key={index}
                            />
                          );
                        })}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => (user ? addToCart(product) : goHome())}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Home;
/*

//const [user, setUser] = useState({});
 // const loggedInUser = localStorage.getItem("user");
 useEffect(() => {
 
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    setUser(foundUser);
    
  }
}, [loggedInUser] );

const addToCart = (product) => {
      
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = [...cartItems];
    
    let itemInCart = newCart.find(
      (item) => product._id === item._id
    );
    const getNextId =()=> {
        let max = 0;
        
        for(let val of cartItems){
          if(val.id >=max){
            max = val.id;
          }
          
        }
        return max+1;
      }
    
        if (itemInCart) {
            itemInCart.quantity++;
          } else {
              const id = getNextId();
            itemInCart = {
              ...product,
              quantity: 1,
               user:user.email,
               id:id
            };
            newCart.push(itemInCart);
          }
          localStorage.setItem("cart", JSON.stringify(newCart));
    
  };

  const getNextId =()=> {
        let max = 0;
        
        for(let val of cartItems){
          if(val.id >=max){
            max = val.id;
          }
          
        }
        return max+1;
      }
    const id = getNextId();
 id:id
*/
