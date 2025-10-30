import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Satyamav from '../../assets/Satyamav.jpg';
import Panchayati from '../../assets/Panchayati-logo.jpg';
import Digital from '../../assets/Digital-india.png';
import Logo from '../../assets/logo.png';
import './Navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Header = () => {
  const [currentLang, setCurrentLang] = useState("select");


useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const toggleLanguage = (newLang) => {
    const langCookie = `googtrans=/en/${newLang}`;
    document.cookie = `${langCookie}; path=/`;
    document.cookie = `${langCookie}; domain=panchayat.hp.gov.in; path=/`;
    document.cookie = `${langCookie}; domain=.panchayat.hp.gov.in; path=/`;
    document.cookie = `${langCookie}; domain=.hp.gov.in; path=/`;

    window.location.reload();
  };




  // Smoothly scrolls to the main content section
  const scrollToMainContent = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };






  return (
    <>
      {/* Top Bar */}
      <div className="col-12 container-fluid p-0 ">
        <div className="bg-color text-dark shadow-sm d-flex flex-wrap justify-content-between align-items-center px-3 border-bottom">

          {/* Left side: GOVT button */}
          <div className="mb-1 mb-sm-0 ">
            <button
              className="btn btn-outline-white btn-sm fw-bold me-2 FontSize10 text-white"
              id="topbutton"
            >
              GOVERNMENT OF HP
            </button>
          </div>

          {/* Right side: Action buttons */}
          <div className="d-flex flex-wrap align-items-center ">
            <button
              className="btn btn-outline-white btn-sm fw-bold me-2 FontSize10 text-white"
              id="topbutton"
              onClick={scrollToMainContent}
            >
              SKIP TO MAIN CONTENT
            </button>

           <select 
  className="" 
  style={{ width: "auto", fontSize: "0.85rem", fontWeight: "500" }} 
  value={currentLang} 
  onChange={(e) => toggleLanguage(e.target.value)}
>

  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>


       
          </div>
        </div>
      </div>


      {/* Logo Section */}
      <div className="container-fluid bg-white shadow-sm py-1 px-3 border-bottom">
        <div className="row align-items-center">

          {/* Left Logo */}
          <div className="col-auto">
            <img
              src={Logo}
              alt="Panchayati Logo"
              className="img-fluid"
              style={{ maxHeight: "90px", width: "auto" }}
            />
          </div>


          {/* Center Heading */}
          <div className="col text-center">
            <h5 className="mb-0 fw-bold text-uppercase" style={{ lineHeight: "1.2" }}>
              Panchayati Raj Department<br />
              <span className="fw-normal">Government of Himachal Pradesh</span>
            </h5>
          </div>

          {/* Right Logos */}
          <div className="col-auto d-flex align-items-center justify-content-end">
            <div className="col-auto">
              <img
                src={Panchayati}
                alt="Panchayati Logo"
                className="img-fluid"
                style={{ maxHeight: "70px", width: "auto" }}
              />
            </div>
          </div>


        </div>
      </div>



      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-color py-0 FontSize12">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse fw-bold" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {/* Home Link */}
              <li className="nav-item">
                <Link to="/" className="nav-link text-white" id="homeLink">
                  HOME
                </Link>
              </li>
              {/* Dropdowns */}
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="aboutDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  ABOUT US
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="aboutDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/about">ABOUT</Link>
                  <li className="dropend">
                    <a
                      href="#"
                      className="dropdown-item dropdown-toggle ms-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      WHO'S WHO
                    </a>
                    <ul className="dropdown-menu shadow rounded">
                      <li>
                        <Link className="dropdown-item ms-2" to="/organization-charts">
                          ORGANIZATION CHART
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <Link className="dropdown-item ms-2" to="/media">MEDIA</Link>
                  <Link className="dropdown-item ms-2" to="/login">LOGIN</Link>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="directoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  PROFILE
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="directoryDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/state">STATE</Link>
                  <Link className="dropdown-item ms-2" to="/department">DEPARTMENT</Link>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="directoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ANNOUNCEMENTS & CIRCULARS
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="directoryDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/notification">NOTIFICATIONS</Link>
                  <Link className="dropdown-item ms-2" to="/circulars">CIRCULARS/INSTRUCTIONS</Link>
                  <Link className="dropdown-item ms-2" to="/guidelines">GUIDELINES</Link>
                  <Link className="dropdown-item ms-2" to="/transfers">TRANSFERS/ADJUSTMENTS</Link>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="directoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  PUBLICATIONS
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="directoryDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/act">ACT & RULES</Link>
                  <Link className="dropdown-item ms-2" to="/trainingmaterial">TRAINING MATERIAL</Link>
                  <Link className="dropdown-item ms-2" to="/reports">REPORTS</Link>
                  <Link className="dropdown-item ms-2" to="/tender">TENDERS</Link>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="directoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  SCHEMES
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="directoryDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/cetralprogram">CENTRAL PROGRAMMES/SCHEMES</Link>
                  <Link className="dropdown-item ms-2" to="/stateprogram">STATE PROGRAMMES/SCHEMES</Link>
                  <Link className="dropdown-item ms-2" to="/otherprogram">OTHER PROGRAMMES/SCHEMES</Link>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="downloadDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  DOWNLOAD
                </a>

                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="downloadDropdown"
                  id="Dropdown"
                >
                  <li>
                    <Link className="dropdown-item ms-2" to="/directory">
                      DIRECTORY OF ERs OF PRIs
                    </Link>
                  </li>

                  {/* Parent Dropdown */}
                  <li className="dropend">
                    <a
                      href="#"
                      className="dropdown-item dropdown-toggle ms-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      OTHER IMPORTANT DOCUMENTS
                    </a>

                    {/* Child Dropdown */}
                    <ul className="dropdown-menu shadow rounded">
                      <li>
                        <Link className="dropdown-item ms-2" to="/panchayat-org">
                          ORGANIZATION OF PANCHAYATS
                        </Link>
                      </li>

                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  id="directoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  EMPLOYEE'S CORNER
                </a>
                <ul
                  className="dropdown-menu p-2 shadow rounded"
                  aria-labelledby="directoryDropdown"
                  id="Dropdown"

                >
                  <Link className="dropdown-item ms-2" to="/assets-and-liabilities">ASSETS AND LIABILITIES</Link>
                  <Link className="dropdown-item ms-2" to="/seniority-list">SENIORITY LIST OF THE EMPLOYEES</Link>
                  <Link className="dropdown-item ms-2" to="/r-and-p-rules">R & P RULES</Link>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white" id="homeLink">
                  CONTACT 
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link to="/rti" className="nav-link text-white" id="homeLink">
                  RTI
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <input type="text" className="search-field" placeholder="Search..." />
        </div>
      </nav>
    </>
  );
};

export default Header;
