import React, { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/Navbar';

import Footer from '../../components/footer/Footer';

import { bindPageClick } from '../../services/contentService';

import Loading from '../../components/loader/Loading'

  function Privacy() {
      const [content, setContent] = useState("");

      const [isLoading, setIsLoading] = useState(false);

      const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
    setIsLoading(true); 
      try {
        const response = await bindPageClick('Privacy-policy'); 
        console.log("API Response:", response); // Log the API response
        if (response.success) {
          setContent(response?.data?.response?.data?.richText || ""); 
        }
        
        else {
          console.error("API Error:", response.message); 
          setError(response.message || "Failed to fetch content");
        }
        } 
        
        catch (err) {
        console.error("Fetch Error:", err); // Log fetch error
        setError(err.message || "Error fetching content");
        } 
        
        finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    };

    fetchContent();
    }, []);

    return (
    <>
      <Navbar />
      <div id='main-content'>
      <div className="container mt-4">
      {isLoading ? (
      <Loading />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="rich-text-container">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
