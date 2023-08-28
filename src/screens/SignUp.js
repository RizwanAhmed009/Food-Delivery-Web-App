import React, { useState } from "react";
import { Link, json } from "react-router-dom";

const SignUp = () => {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({name:credential.name,email:credential.email,password:credential.password,geolocation:credential.geolocation,}));
    try {
      let response = await fetch("http://localhost:8000/api/createUser", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
          geolocation: credential.geolocation,
        }),
      });

      const json = await response.json();
      console.log("this is json", json);
      if (!json.success) {
        alert("Enter valid credential");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const onChange = (e) => {
    // Check the event object in the console
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credential.name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credential.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credential.password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="adress">Address</label>
            <input
              type="text"
              className="form-control"
              id="adress"
              placeholder="Password"
              name="geolocation"
              value={credential.geolocation}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3btn btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already have user{" "}
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
