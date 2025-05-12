import React from "react";
import "../Styles/header.css";
import { CiSearch, CiSettings } from "react-icons/ci";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="/cryptobubbles.png" alt="" width={38} />
          <h1 className="h1">Crypto Bubbles</h1>
        </div>
        <div className="search">
          <div className="searchbox">
            <CiSearch size={28} />
            <input
              type="search"
              placeholder="Search Cryptocurrency"
              className="searchinput"
            />
          </div>
          <button>0-100</button>
          <button>currency</button>
          <button className="settingbtn"><CiSettings size={28} /></button>
        </div>
      </div>
    </>
  );
};

export default Header;
