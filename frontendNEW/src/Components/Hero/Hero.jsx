import React from "react";
import "./Hero.css";
import laptopindirim from "../../assets/laptopindirim.jpg";


const Hero = () => {
  return (
    <div className="hero">
      {/* <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div> */}
      {/* <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div> */}
        <img src={laptopindirim} alt="" />
    </div>
  );
};

export default Hero;
