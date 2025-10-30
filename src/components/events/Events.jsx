import React from "react";
import Event from "./Card-dat";
import RGSALOGO from './../../assets/RGSA-logo.png'
import CENTRALFINANCELOGO from './../../assets/Central-finance.svg'
import VIDEOLOGO from './../../assets/Video.png'
import BOOKS from './../../assets/Books-Publication.png'
import GUIDELINE from './../../assets/Guideline.png'
import MANUAL from './../../assets/Manual.png'
const Carddata = () => {
  return (
    <div className="container-fluid my-4">
      <div className="card-container mt-4 col-lg-13 col-md-12 mx-auto">
        <div class="row">
          <div class="col-sm-6 mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={RGSALOGO}
                  alt="RGSA Logo"
                  style={{ maxWidth: "25px" }}
                />
                <h5 class="card-title flex-grow-1">Rashtriya Gramin Swaraj Abhiyaan</h5>
                </div>
                <p class="card-text">
                  The Rashtriya Gram Swaraj Abhiyan (RGSA) aims to strengthen
                  the institutional and governance capacity of Panchayati Raj
                  Institutions. Its objective is to enable them to effectively
                  plan, implement, and monitor schemes for sustainable
                  development and local self-governance.
                </p>
                <div className="mt-auto">
                <a
                  href="https://rgsa.gov.in/
"
                  class="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6  mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                 <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={CENTRALFINANCELOGO}
                  alt="Central Finance Commission"
                  style={{ maxWidth: "80px"}}
                />
                <h5 class="card-title">Central Finance Commission</h5>
                </div>
               
                <p class="card-text flex-grow-1">
                  Central Finance Commission grants provide financial support to
                  Gram Panchayats in Himachal Pradesh for strengthening local
                  governance, improving basic services, and ensuring transparent
                  and accountable utilization of resources.
                </p>
                <div className="mt-auto">
                <a href="https://doe.gov.in/15th-finance-commission" class="btn btn-primary" target="_blank"
                  rel="noopener noreferrer">
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container mt-4 col-lg-13 col-md-12 mx-auto">
        <div class="row">
          <div class="col-sm-6 mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                 <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={VIDEOLOGO}
                  alt="Video Logo"
                  style={{ maxWidth: "25px" }}
                />
                <h5 class="card-title">Video Section</h5>
                </div>
                <p class="card-text flex-grow-1">
                  View videos on 9 themes of
                  Localisation of Sustainable Development Goals (LSDGs) showcasing efforts of
                  Panchayati Raj Institutions in strengthening local governance and sustainable
                  development
                </p>
                <div className="mt-auto">
                <a href="/video-section" class="btn btn-primary" target="_blank"
                  rel="noopener noreferrer">
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={GUIDELINE}
                  alt="Guidelines Logo"
                  style={{ maxWidth: "30px" }}
                />
                <h5 class="card-title">Guidelines for Gram Sabha</h5>
                </div>
                <p class="card-text flex-grow-1">
                  View various guidelines issued by the Department{" "}
                </p>
                <div className="mt-auto">
                <a href="/guidelines" class="btn btn-primary" target="_blank"
                  rel="noopener noreferrer">
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container mt-4 col-lg-13 col-md-12 mx-auto">
        <div class="row">
          <div class="col-sm-6 mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                   <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={MANUAL}
                  alt="Mannual Logo"
                  style={{ maxWidth: "30px" }}
                />
                <h5 class="card-title">Operational Manual for Gram Panchayats</h5>
                </div>
                <p class="card-text flex-grow-1">
                  This manual provides guidelines for the effective functioning
                  of Gram Panchayats, ensuring transparency, accountability, and
                  efficient delivery of services.
                </p>
                <div className="mt-auto">
                <a href="/operational-manual" class="btn btn-primary" target="_blank"
                  rel="noopener noreferrer">
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 mt-2">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
                 <div className="d-flex align-items-center mb-3 gap-4">
                  <img
                  src={BOOKS}
                  alt="Books Logo"
                  style={{ maxWidth: "30px" }}
                />
                <h5 class="card-title">Relevant Books and Publication</h5>
                </div>
                <p class="card-text flex-grow-1">
                  Explore books and publications related to Panchayati Raj,
                  governance, and rural development for reference and capacity
                  building
                </p>
                <div className="mt-auto">
                <a href="/trainingmaterial" class="btn btn-primary" target="_blank"
                  rel="noopener noreferrer">
                  View
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4 mt-4 align-items-stretch">
        {/* Left: Map Section */}
        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0 h-100 ">
            <Event
              title="🌐 Visit To:"
              data={[
                {
                  label: "Rashtriya Gram Swaraj Abhiyaan",
                  link: "https://rgsa.gov.in/",
                },
                {
                  label: "State Government Portal",
                  link: "https://himachal.nic.in/en-IN/",
                },
                {
                  label: "State Election Commission",
                  link: "https://sechimachal.nic.in/En/index.html",
                },
                {
                  label: "State Information Commission",
                  link: "https://sic.hp.gov.in/",
                },
                {
                  label: "Ministry of Panchayati Raj",
                  link: "https://panchayat.gov.in/",
                },
                {
                  label: "Ministry of Rural Development",
                  link: "https://rural.gov.in/en",
                },
                {
                  label: "H.P Rural Development Department",
                  link: "https://rural.hp.gov.in/",
                },
                { label: "PRTI Mashobra", link: "https://hpprtim.nic.in/" },
                {
                  label: "Online RTI HP",
                  link: "https://onlinerti.hp.gov.in/",
                },
                { label: "E-Office", link: "https://eoffice.hp.gov.in/" },
                { label: "S-Access VPN", link: "https://saccess.nic.in/" },
              ]}
              button="View More"
            />
          </div>
        </div>

        {/* Right: Important Docs + Visit To */}
        <div className="col-lg-8 col-md-12 h-100">
          <div className="row g-4">
            <div className="col-md-6 col-lg-5" style={{ height: "470px" }}>
              <Event
                title="📑 Important Documents"
                data={[
                  {
                    label: "Transfers/Adjustments",
                    link: " /transfers",
                  },
                  { label: "Act & Rules", link: " /act" },
                  {
                    label: "Notifications/Clarifications",
                    link: " /notification",
                  },
                  {
                    label: "Instructions/Circulars",
                    link: " /circulars",
                  },
                  { label: "Guidelines", link: " /guidelines" },
                  {
                    label: "Name & Number of the PRIs",
                    link: " /pri",
                  },
                  // { label: "Name of PRIs", link: "panchayat/pri-names" },
                  {
                    label: "Directory of ERs of PRIs",
                    link: " /directory",
                  },
                ]}
                button="View More"
              />
            </div>

            <div className="col-md-6 col-lg-7">
              <div className="card shadow-sm border-0 h-100 p-3">
                <div className="card-body text-center p-0 d-flex flex-column">
                  <h5 className="card-title mb-3 fw-bold">
                    📍 Location of SBMs CSCs in Himachal Pradesh
                  </h5>
                  <div className="flex-grow-1" style={{ minHeight: "300px" }}>
                    <iframe
                      id="map-iframe"
                      src="https://www.google.com/maps/d/embed?mid=1TldjHsPWo3yb3HgiU_UCQjHEPQEDl-w&ehbc=2E312F"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ border: 0, width: "100%", height: "100%" }}
                      title="SBM CSC Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - All cards in one row */}
      <div className="row mt-5 g-4">
        {[
          {
            title: "e-Panchayat Applications",
            data: [
              {
                label: "Local Government Directory",
                link: "https://lgdirectory.gov.in/",
              },
              { label: "GPDP", link: "https://gpdp.nic.in/" },
              { label: "E-Gram Swaraj", link: "https://egramswaraj.gov.in/" },
              { label: "Service Plus", link: "https://serviceonline.gov.in/" },
              {
                label: "Training Management Portal",
                link: "https://trainingonline.gov.in/",
              },
              // {
              //   label: "Ministry of RuRal Development",
              //   link: "https://rural.gov.in/en",
              // },
              {
                label: "Panchayat Nirnay",
                link: "https://meetingonline.gov.in/homepage",
              },
              {
                label: "Panchayat Advancement Index",
                link: "https://pai.gov.in/",
              },
              {
                label: "Samarth Panchayat",
                link: "https://samarthpanchayat.gov.in/",
              },
              {
                label: "SabhaSaar",
                link: "https://sabhasaar.panchayat.gov.in/",
              },
              { label: "PFMS", link: "https://pfms.nic.in/" },
            ],
          },
          {
            title: "State Specific Applications",
            data: [
              {
                label: "e-Pariwar Register",
                link: "https://eparivar.hp.gov.in/",
              },
              {
                label: "e-service Book (PMIS)",
                link: "https://genpmis.hp.nic.in/",
              },
              {
                label: "e-Salary",
                link: "https://himkosh.nic.in/CitizenService/Account/Login.aspx",
              },
              { label: "e-Samadhan", link: "https://esamadhan.nic.in/" },
              {
                label: "e-Gazette of H.P",
                link: "https://rajpatrahimachal.nic.in/",
              },
              {
                label: "State Election Commission",
                link: "https://sechimachal.nic.in/En/index.html",
              },
              {
                label: "e-Services of Panchayati Raj Department",
                link: "https://edistrict.hp.gov.in/pages/staticSite/serviceList.xhtml",
              },
              {
                label: "Sanction Management",
                link: "https://panchayatghartracker.hp.gov.in/",
              },
              { label: "HimAccess", link: "https://himaccess.hp.gov.in/" },
              {
                label: "Sarvatra Portal",
                link: "https://apar.hp.gov.in/HRMS/",
              },
              { label: "CM Helpline", link: "https://cmsankalp.hp.gov.in/" },
              { label: "HP Vidhan Sabha", link: "https://hpvs.neva.gov.in/" },
            ],
          },
          {
            title: "Useful Government Links",
            data: [
              {
                label: "National Portal of India",
                link: "https://www.india.gov.in/",
              },
              { label: "State Portal", link: "https://himachal.nic.in/en-IN/" },
              {
                label: "State Government Departments",
                link: "https://himachal.nic.in/en-IN/",
              },
              {
                label: "Ministry of Panchayati Raj",
                link: "https://panchayat.gov.in/",
              },
              {
                label: "Ministry of Rural Development",
                link: "https://rural.gov.in/en",
              },
              {
                label: "H.P. Rural Development Department",
                link: "https://himaajeevika.com/",
              },
              { label: "NIRD Hyderabad", link: "https://nirdpr.org.in/" },
              { label: "HIPA", link: "https://himachal.nic.in/hipa" },
              { label: "PRTI Mashobra", link: "https://hpprtim.nic.in/" },
              { label: "MGNREGA", link: "https://nrega.dord.gov.in/" },
            ],
          },
        ].map((block, idx) => (
          <div key={idx} className="col-lg-4 col-md-6">
            <Event title={block.title} data={block.data} button="View More" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carddata;
