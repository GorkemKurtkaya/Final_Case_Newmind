import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({username:"",email:"",password:""});

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login = async () => {
      let dataObj;
      await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Cookie'yi dahil et
      })
        .then((resp) => resp.json())
        .then((data) => { dataObj = data; });
    
      console.log(dataObj);
      if (dataObj.succeeded) {
        window.location.replace("/");
      } else {
        alert(dataObj.message);
      }
    };
    
    const signup = async () => {
      let dataObj;
      await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Cookie'yi dahil et
      })
        .then((resp) => resp.json())
        .then((data) => { dataObj = data; });
    
      if (dataObj.succeeded) {
        window.location.replace("/login");
      } else {
        alert(dataObj.message);
      }
    };

    return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="tabs">
            <button
              className={state === "Login" ? "active" : ""}
              onClick={() => setState("Login")}
            >
              Giriş Yap
            </button>
            <button
              className={state === "Sign Up" ? "active" : ""}
              onClick={() => setState("Sign Up")}
            >
              Üye Ol
            </button>
          </div>
  
          <h1>{state === "Login" ? "Giriş Yap" : "Üye Ol"}</h1>
  
          {/* Form alanları */}
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Adınız"
                name="name"
                value={formData.name}
                onChange={changeHandler}
              />
            )}
            <input
              type="email"
              placeholder="E-Posta Adresi"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            <input
              type="password"
              placeholder="Şifre"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>
  
          <button className="login-button" onClick={() => (state === "Login" ? login() : signup())}>
            {state === "Login" ? "GİRİŞ YAP" : "KAYIT OL"}
          </button>
  
        </div>
      </div>
    );
};

export default LoginSignup;
