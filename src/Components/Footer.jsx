
import React from "react";
import {
    FaEnvelope,
    
    FaGooglePlay,
    FaApple,
    FaDownload,
    FaXTwitter,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { GrBitcoin } from "react-icons/gr";
import { IoLogoDiscord } from "react-icons/io5";


import "../Styles/footer.css"; // import the CSS file

const CryptoBubblesFooter = () => {
  return (
    <div className="footer-container">
      {/* Left Section */}
      <div className="footer-section">
        <div className="footer-logo">
          <img src="/cryptobubbles.png" alt="Crypto Bubbles" />
          <h2>Crypto Bubbles</h2>
        </div>
        <p>Crypto Bubbles is available as a website at cryptobubbles.net and as an app for your phone.</p>
        <p className="warning-text">No financial advice. Do your own research!</p>
        <p className="version-text">Version 2025-5-4-10-51</p>
      </div>

      {/* Center Section */}
      <div className="footer-section">
        <h3 className="footer-title">Links</h3>
        <div className="button-group">
          <FooterButton icon={<FaEnvelope />} label="E-Mail" />
          <FooterButton icon={<FaXTwitter />} label="X" />
          <FooterButton icon={<FaTelegramPlane />} label="Telegram" />
          <FooterButton icon={<FaGooglePlay />} label="Google Play" />
          <FooterButton icon={<FaApple />} label="App Store" />
          <FooterButton icon={<FaDownload />} label="Media Kit" />
        </div>
      </div>

      {/* Right Section */}
      <div className="footer-section">
        <h3 className="footer-title">Support my work</h3>
        <div className="button-group vertical">
          <FooterButton icon={<FaXTwitter />} label="Follow Crypto Bubbles on X" />
          <div className="platform-bar">
            Register on <SiBinance color="#F3BA2F" /> <GrBitcoin color="#F7931A"/>   </div>
          <div className="crypto-grid">
            {["BTC", "ETH", "BSC", "SOL", "XRP", "LTC", "XLM", "XMR"].map((coin) => (
              <div key={coin} className="crypto-box">{coin}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterButton = ({ icon, label }) => (
  <button className="footer-button">
    {icon}
    <span>{label}</span>
  </button>
);

export default CryptoBubblesFooter;
