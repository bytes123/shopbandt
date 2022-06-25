import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <div className="sponsor">
        <div className="sponsor-items">
          <img src="https://cdn.tgdd.vn/Brand/1/logo-msi-149x40.png" />
        </div>
        <div className="sponsor-items">
          <img src="https://i.pinimg.com/736x/ff/02/54/ff0254764c9e980bb71d36a2ba58ae37--apple-logo-apples.jpg" />
        </div>
        <div className="sponsor-items">
          <img src="https://www.freepnglogos.com/uploads/-samsung-logo-transparent-9.png" />
        </div>
        <div className="sponsor-items">
          <img src="https://banner2.cleanpng.com/20180409/loq/kisspng-laptop-acer-aspire-computer-logo-lenovo-logo-5acb2cceeb7ae4.5444783215232647189646.jpg" />
        </div>
      </div>
      <div className="contact">
        <div className="contact-items">
          <a href="https://www.facebook.com/profile.php?id=100059070234959">
            {" "}
            <FaFacebookF />
          </a>
        </div>
        <div className="contact-items">
          <FaInstagram />
        </div>
        <div className="contact-items">
          <FiTwitter />
        </div>
      </div>
      <div className="author">
        Minh Tân - Quang Cường <br />
        2022
      </div>
    </div>
  );
}
