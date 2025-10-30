
import React, { useEffect, useState } from 'react';

import Navbar from '../../components/navbar/Navbar';

import Footer from '../../components/footer/Footer';

import { bindPageClick, viewMedia } from '../../services/contentService';

import Loading from '../../components/loader/Loading';

function SeniorityList() {
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);
  
  const handleViewMedia = async (documentId) => {
    try {
      const response = await viewMedia(documentId.mediaId); // <-- this is now correct
      console.log("Response:", response);
  
      if (response.success) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("Media not found.");
      }
    } catch (error) {
      console.error("Error viewing media:", error);
    }
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bindPageClick('Seniority-list');
        const allSections = res?.data?.response?.sections || [];
        setSections(allSections);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
    <Navbar/>
    <div id='main-content'>
    <div className="container mt-2 FontSize rich-text-container table">
      <h6 className=" fw-bold mt-4">Seniority List :-</h6>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>S.no</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((item, index) => (
              <tr key={item.sectionId}>
                <td>{index + 1}</td>
               <td>
              {item.name || '-'}
                {item.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
     </td>
                <td>{new Date(item.createdOn).toLocaleDateString()}</td>
                <td>
                 <button
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleViewMedia(item.data?.documentId)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
                </td>
              </tr>
            ))}
            {sections.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No notifications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default SeniorityList;
