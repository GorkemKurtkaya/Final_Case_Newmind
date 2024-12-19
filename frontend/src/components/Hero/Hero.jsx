import React from "react";
import "./Hero.css";
import { Carousel } from "antd";

// Console'da resim yollarını kontrol edin
import laptopindirim from "../../assets/laptopindirim.jpg";
import tabletindirim from "../../assets/tabletindirim.jpg";
import telefonindirim from "../../assets/telefonindirim.jpg";



const Hero = () => {
  return (
    <div className="hero">
      <Carousel arrows infinite={true} autoplay>
        <div>
          <img
            onClick={() => {
              window.location.href = "/notebook";
            }}
            src={laptopindirim}
            alt="Laptop İndirim"
          />
        </div>
        <div>
          <img
            onClick={() => {
              window.location.href = "/tablet";
            }}
            src={tabletindirim}
            alt="İndirim 2"
          />
        </div>
        <div>
          <img
            onClick={() => {
              window.location.href = "/phone";
            }}
            src={telefonindirim}
            alt="İndirim 3"

          />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;