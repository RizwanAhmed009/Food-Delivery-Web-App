import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({ email: credential.email, password: credential.password })
    );
    try {
      let response = await fetch("http://localhost:8000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });

      const json = await response.json();
      console.log("this is json", json);
      if (!json.success) {
        alert("Enter valid credential");
      }
      if (json.success) {
        localStorage.setItem("userEmail",credential.email)
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
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

          <button type="submit" className="m-3btn btn btn-success">
            Login
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
