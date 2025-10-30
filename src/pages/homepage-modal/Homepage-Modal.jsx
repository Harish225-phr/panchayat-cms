import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { bindPageClick } from '../../services/contentService';
import Loading from '../../components/loader/Loading';

function HomepageModal() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await bindPageClick('Modal');
        console.log("API Response:", response);
        if (response.success) {
          setContent(response?.data?.response?.data?.richText || "");
        } else {
          console.error("API Error:", response.message);
          setError(response.message || "Failed to fetch content");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Error fetching content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-edit me-2"></i>
                  Homepage Modal Content
                </h4>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="alert alert-info" role="alert">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Note:</strong> This content will appear in the modal that shows when users first visit the homepage.
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <h5 className="text-primary">
                          <i className="fas fa-eye me-2"></i>
                          Current Modal Content:
                        </h5>
                        <div className="border rounded p-3 bg-light rich-text-container">
                          <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <h5 className="text-success">
                          <i className="fas fa-desktop me-2"></i>
                          Modal Preview:
                        </h5>
                        <div className="border rounded p-3 bg-white shadow-sm">
                          <div className="modal-dialog-preview">
                            <div className="border rounded">
                              <div className="bg-light p-2 border-bottom d-flex justify-content-between align-items-center">
                                <strong>Modal Title</strong>
                                <button className="btn btn-sm btn-outline-secondary" disabled>×</button>
                              </div>
                              <div className="p-3" style={{ fontSize: '0.9em' }}>
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                              </div>
                              <div className="bg-light p-2 border-top text-end">
                                <button className="btn btn-sm btn-secondary me-2" disabled>Cancel</button>
                                <button className="btn btn-sm btn-primary" disabled>OK</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <div className="alert alert-warning" role="alert">
                        <i className="fas fa-tools me-2"></i>
                        To edit this content, please use the Admin panel's content management system.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomepageModal;