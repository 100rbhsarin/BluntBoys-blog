import React from "react";
import Logo from "../../img/bluelogo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />

     
    
      <span>
        Made by  <b>Saurabh Sarin</b>.
      </span>


    </footer>
  );
};

export default Footer;