import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Hero.css"; // Import styles

export default function Hero() {
  return (
    <>
      <div>
        <section className="hero bg-[#0e0e27] ">
          <div className="hero-container">
            <div className="hero-text">
              <h1 className="font-[mulish]">Experience Media Like Never Before</h1>
              <p className="font-[mulish] !text-base">
                Enjoy award-winning stereo beats with wireless listening freedom and sleek,
                streamlined with premium padded and delivering first-rate playback.
              </p>
              <button className="!bg-[#44448e] !text-white font-[mulish] !text-xl !rounded-full px-5">
                Our Products <span>→</span>
              </button>
            </div>

            <div className="hero-image">
              <img src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="Headphones" />
            </div>

            {/* <div className="social-links">
              <span></span>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
}
