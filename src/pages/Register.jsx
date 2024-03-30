import React, { useState } from "react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const repassword = useRef();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate(username, email, password, repassword) {
    if (username.trim().length < 3) {
      alert("Username is empty");
      return false;
    }

    if (email.trim().length < 3) {
      alert("Email is empty");
      return false;
    }

    if (password.trim().length < 3) {
      alert("Password is empty");
      return false;
    }

    if (password != repassword) {
      alert('Repassword is empty')
    }

    const emailValid = validateEmail(email);
    if (!emailValid) {
      alert("Email is empty");
      return false;
    }

    return true
  }
  function validate() {

    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate(username, email, password);
    
    if (isValid) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }

      setLoading(true)
      fetch('https://auth-rg69.onrender.com/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data.message == "User registered successfully!") {
          navigate("/login")
        }

        if (data.message == "Failed! Email is already in use!") {
          alert(data.message);
          email.current.focus();
        }

        if (data.message == "Failed! Username is already in use!") {
          alert(data.message);
          username.current.focus();
        }

        username.current.value = ''
        email.current.value = ''
        password.current.value = ''
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); 
      })

    }
  }

  return (
    <>
      <h1 className="text-center">Register page</h1>
      <form className="w-50 mx-auto mt-5 d-flex flex-column gap-4">
        <input
          type="text"
          className="form-control"
          ref={username}
          placeholder="Enter username..."
        />
        <input
          type="email"
          className="form-control"
          ref={email}
          placeholder="Enter email..."
        />
        <input
          type="number"
          className="form-control"
          ref={password}
          placeholder="Enter password..."
        />
        <input
          type="number"
          className="form-control"
          ref={repassword}
          placeholder="Enter repassword..."
        />
        <button disabled = {loading ? true : false} onClick={handleClick} className="btn btn-primary">
          {loading ? "Loading..." : "Register"}
        </button>
        <NavLink to="/login">Login</NavLink>
      </form>
    </>
  );
}

export default Register;
