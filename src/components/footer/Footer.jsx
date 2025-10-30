import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div >
      <div className="container-fluid  footer" >
        <div className="row p-5">
          {/* Column 1 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">PANCHAYATI RAJ</h5>
            Directorate of Panchayati Raj Department ,<br />
            Block No - 27, S D A Complex Kasumpti,  <br />
            Shimla-9 Himachal Pradesh (India)<br /><br />
            <p>
            Telephone: 0177-2623805<br></br>2623814,2623820
            <br />
            Email id: panchayatiraj-hp@gov.in
            </p>
          </div>
          {/* Column 2 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="footer-links">
             <li> <Link to="/privacy-policy">
                <i className="fa-solid fa-angle-right custom-icon"></i> Privacy Policy
                </Link></li>
              <li>
              <Link to="/terms-and-condition">
                <i className="fa-solid fa-angle-right custom-icon"></i> Terms & Conditions
              </Link></li>
              <li><Link to="/copyright-policy">
                <i className="fa-solid fa-angle-right custom-icon"></i> Copyright Policy
              </Link></li>
              <li><Link to="/accessibility-options">
                <i className="fa-solid fa-angle-right custom-icon"></i> Accessibility Options
              </Link></li>
              <li><Link to="/disclaimer">
                <i className="fa-solid fa-angle-right custom-icon"></i> Disclaimer
              </Link></li>
              {/* <li>
                <Link to="/tender"><i className="fa-solid fa-angle-right custom-icon"></i> Tender
                </Link> </li> */}
              {/* <li>
                <Link to="/training-materials"><i className="fa-solid fa-angle-right custom-icon"></i> Training Material
                </Link> </li> */}
              {/* <li>
                <Link to="/property-returns"><i className="fa-solid fa-angle-right custom-icon"></i> Property Returns
                </Link> </li> */}
              {/* <li>
                <Link to="/seniority-list"><i className="fa-solid fa-angle-right custom-icon"></i> Seniority list
                </Link> </li> */}
              {/* <li>
                <Link to="/panchayat-org"><i className="fa-solid fa-angle-right custom-icon"></i>  Organization of Panchayats
                </Link> </li> */}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">Important Links</h5>
            <ul className="footer-links">
              {/* <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> Panchayati Raj New Website
                </a>
              </li> */}
              <li>
                <a
                  href="https://himachal.nic.in/en-IN/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> State Government Portal
                </a>
              </li>
              <li>
                <a
                  href="http://sechimachal.nic.in/En/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> State Election Commission
                </a>
              </li>
              <li>
                <a
                  href="https://sic.hp.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> State Information Commission
                </a>
              </li>
              <li>
                <a
                  href="https://panchayat.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> Ministry of Panchayati Raj
                </a>
              </li>
              <li>
                <a
                  href="https://rural.gov.in/en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> Ministry of Rural Development
                </a>
              </li>
              <li>
                <a
                  href="https://rural.hp.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> H.P Rural Development Department
                </a>
              </li>
              <li>
                <a
                  href="https://hpprtim.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-angle-right custom-icon"></i> PRTI Mashobra
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
