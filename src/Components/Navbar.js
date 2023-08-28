import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Model from "../Model";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  const navigate = useNavigate();
  const handlelogOut = () => {
    localStorage.clear("authToken");
    navigate("/login");
  };
  const [cartview, setcartview] = useState(false);
  let data = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand">Food Points</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto ">
              {localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <div className="nav-link active fs-5" to="/">
                    Home
                  </div>
                  <div className="nav-link active fs-5" to="/">
                    My Orders
                  </div>
                </div>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-1"
                  onClick={() => setcartview(true)}
                >
                  MyCart{"  "}
                  <Badge badgeContent={data.length} color="primary"></Badge>
                </div>
                {cartview?<Model onClose={()=>setcartview(false)}><Cart/></Model>:null}
                <Link
                  className="btn bg-white text-danger mx-1"
                  onClick={handlelogOut}
                >
                  LogOut
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
