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
          <div>
            <select id="coinList">
              <option value="1-100">1-100</option>
              <option value="101-200">101-200</option>
              <option value="201-300">201-300</option>
              <option value="301-400">301-400</option>
              <option value="401-500">401-500</option>
              <option value="501-600">501-600</option>
              <option value="601-700">601-700</option>
              <option value="701-800">701-800</option>
              <option value="801-900">801-900</option>
              <option value="901-1000">901-1000</option>
            </select>
          </div>
          <div>
            {/* <label for="currencyList">Select Currency:</label> */}
            <select id="currencyList">
              <optgroup>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥) </option>
                <option value="CNY">CNY (¥)</option>
                <option value="INR">INR (₹) </option>
                <option value="AUD">AUD (A$)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="CHF">CHF (Fr) </option>
              </optgroup>
              <optgroup>
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="BNB">Binance </option>
                <option value="XRP">Ripple</option>
                <option value="SOL">Solana</option>
                <option value="USDT">Tether</option>
                <option value="USDC">USD Coin</option>
                <option value="DOGE"> Dogecoin</option>
                <option value="ADA">Cardano</option>
                <option value="AVAX">Avalanche</option>
              </optgroup>
            </select>
          </div>

          <button className="settingbtn">
            <CiSettings size={28} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
