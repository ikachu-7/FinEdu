import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom
import log from "../../../assets/log.svg";
import reg from "../../../assets/undraw_finance_re_gnv2.svg";
import "./RegisterUser.css";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";
const RegUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
  });
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formDataLog, setFormDataLog] = useState({
    email: "",
    password: "",
  });

  const handleChangeLog = (e) => {
    const { name, value } = e.target;
    setFormDataLog((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dob: formData.dob, // Include the 'dob' field
        gender: formData.gender, // Include the 'gender' field
      };

      // Make a POST request to the specified endpoint
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/user/register",
        postData
      );

      // Check the response and display a success message
      if (response.status === 201) {
        alert("Registration Successfull. Please login to continue.");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleSubmitUserLog = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        email: formDataLog.email,
        password: formDataLog.password,
      };

      // Make a POST request to the specified endpoint
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/user/login",
        postData
      );

      // Check the response and display a success message
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/student/home");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMsg("Registration failed. Please try again.");
    }
  };

  return (
    <div className="containerReg">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmitUserLog} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="email"
                name="email"
                value={formDataLog.email}
                onChange={handleChangeLog}
                placeholder="E-mail"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="password"
                value={formDataLog.password}
                onChange={handleChangeLog}
                placeholder="Password"
              />
            </div>
            <input type="submit" defaultValue="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <NavLink to="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-twitter" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-google" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-linkedin-in" />
              </NavLink>
            </div>
          </form>
          <form onSubmit={handleSubmitUser} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone" />
              <input
                type="tel" // Use "tel" type for phone numbers
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-calendar" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-venus-mars" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
                style={{ marginTop: "-5px", marginBottom: "0px" }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <input type="submit" className="btn" defaultValue="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <NavLink to="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-twitter" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-google" />
              </NavLink>
              <NavLink to="#" className="social-icon">
                <i className="fab fa-linkedin-in" />
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              to="#"
              className="btn transparent"
              id="sign-up-btn"
              onClick={() =>
                document
                  .querySelector(".containerReg")
                  .classList.add("sign-up-mode")
              }
              style={{
                position: "relative",
                top: "80px",
                textAlign: "center",
              }}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              to="#"
              className="btn transparent"
              id="sign-in-btn"
              style={{
                position: "relative",
                top: "80px",
              }}
              onClick={() =>
                document
                  .querySelector(".containerReg")
                  .classList.remove("sign-up-mode")
              }
            >
              Sign in
            </button>
          </div>
          <img src={reg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RegUser;
