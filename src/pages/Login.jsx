import React, { useState } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState();
  const username = useRef();
  const password = useRef();

  // function validate(username, password) {
  //   if (username.trim().length < 3) {
  //     alert("Username is empty");
  //     return false;
  //   }

  //   if (password.trim().length < 3) {
  //     alert("Password is empty");
  //     return false;
  //   }

  //   return true
  // }

  function validate() {

    return true
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate(username, password);
    
    if (isValid) {
      const user = {
        username: username.current.value,
        password: password.current.value
      }

      setLoading(false);
      fetch('https://auth-rg69.onrender.com/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
          if (data.id) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', data);
            navigate("/")
          }
          if (data.message == "User Not found."){
            alert(data.message)
            username.current.focus();
          }

          if (data.message == "Invalid Password") {
            alert(data.message);
            password.current.focus();
          }

        username.current.value = ''
        password.current.value = ''
      })
      .catch(err => {
        console.log(err);
      })

    }
  }

  return (
    <>
      <h1 className="text-center">Login page</h1>
      <form className="w-50 mx-auto mt-5 d-flex flex-column gap-4">
        <input
          type="text"
          className="form-control"
          ref={username}
          placeholder="Enter username..."
        />
        <input
          type="number"
          className="form-control"
          ref={password}
          placeholder="Enter password..."
        />
        <button onClick={handleClick} className="btn btn-primary">
          {loading ? "Loading..." : "Login"}
        </button>
        <NavLink to="/register">Register</NavLink>
      </form>
    </>
  );
}

export default Login;
