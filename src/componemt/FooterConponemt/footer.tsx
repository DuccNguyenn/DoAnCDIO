import React from "react";
import "./footer.scss";
import Logo from "@/img/logo.png"
import Image from "next/image";
const footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-head">
          <div className="footer-head-input">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="footer-head-text">
            <h2>Sign up for new Customer, updates, surveys </h2>
          </div>
        </div>
        <div className="footer-body">
          <div className="footer-section">
            <div className="footer-logo">
              <Image src={Logo} className="img-logo" alt="logo"/>
              
            </div>
            <div className="footer-contact">
              <p>
                <strong>CONTACT</strong>
              </p>
              <p>Phone: 99988765</p>
              <p>Email: Greengrocery9@Gmail.Com</p>
            </div>
            
          </div>

          <div className="footer-section">
            <h4>SOCIAL MEDIA</h4>
            <p>📸 INSTAGRAM</p>
            <p>🐦 TWEETER</p>
            <p>📘 FACEBOOK</p>
          </div>

          <div className="footer-section">
            <h4>INFORMATION</h4>
            <p>About Us</p>
            <p>Blog</p>
            <p>Check Out</p>
            <p>Contact</p>
          </div>

          <div className="footer-section">
            <h4>MY ACCOUNTS</h4>
            <p>My Account</p>
            <p>Wish List</p>
            <p>Shopping Cart</p>
          </div>

          <div className="footer-section">
            <h4>CATEGORIES</h4>
            <p>Fresh Product</p>
            <p>Snacks</p>
            <p>Meat</p>
            <p>Drinks</p>
            <p>Vegetables</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
