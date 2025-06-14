"use client";
import "@/Page/Customer/HomePage/homepage.scss";
import ImgSlider from "@/img/slider1.png";
import Image from "next/image";
import {
  CustomerServiceOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import Secure from "@/img/secure.png";
import Banner1 from "@/img/banner1.png";
import Banner2 from "@/img/banner2.png";

const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-blg">
          <div className="home-blg-title">
            <h1>
              Your Ultimate Online <span className="highlight">Grocery</span>
            </h1>
            <p>
              Experience grocery shopping and swift home delivery with our wide
              range of fresh produce and essentials
            </p>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div>
            <Image src={ImgSlider} alt="Slider" className="home-blg-img" />
          </div>
        </div>

        <div className="home-hotell">
          <div className="home-hotell-support">
            <CustomerServiceOutlined
              style={{ marginRight: "10px", fontSize: "25px" }}
            />
            <div className="home-hotell-support-text">
              <h4>Support 24/7</h4>
              <p>Dedicated support</p>
            </div>
          </div>
          <div className="home-hotell-payment">
            <SafetyCertificateOutlined
              style={{ marginRight: "10px", fontSize: "25px" }}
            />
            <div>
              <h4>Secure Payment</h4>
              <p>ensure your money is safe</p>
            </div>
          </div>
          <div className="home-hotell-refund">
            <SyncOutlined style={{ marginRight: "10px", fontSize: "25px" }} />
            <div>
              <h4>Refundable</h4>
              <p>Damage items can refund it</p>
            </div>
          </div>
          <div className="home-hotell-ship">
            <TruckOutlined style={{ marginRight: "10px", fontSize: "33px" }} />
            <div>
              <h4>Free Shipping</h4>
              <p>On order over</p>
            </div>
          </div>
        </div>

        <div className="home-banner">
          <div className="home-banner-container">
            <div className="home-banner-one">
              <Image src={Banner1} alt="Secure" className="home-banner1-img" />
              <div className="banner1-content">
                <p className="sale-label">SUMMER SALE</p>
                <h3>
                  <span className="discount">40% OFF</span>
                </h3>
                <h2 className="product-title">
                  Fresh Fruit<br></br>
                  <p className="product">%100</p>
                </h2>
                <button className="shop-btn">Shop Now ➤</button>
              </div>
            </div>

            <div className="home-banner-two">
              <div className="banner2-content">
                <h1>Fresh</h1> 
                <h1>Delivered</h1>
                <h1>Daily</h1>
              </div>
            <Image src={Banner2} alt="Secure" className="home-banner2-img" />
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default HomePage;
