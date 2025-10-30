import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { bindPageClick, viewMedia } from '../../../services/contentService';
import Loading from '../../../components/loader/Loading';

function Video() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await bindPageClick("Video");
      const sections = res?.data?.response?.sections;

      if (Array.isArray(sections) && sections.length > 0) {
        const promises = sections.map(async (section) => {
          const mediaId = section?.data?.documentId?.mediaId;
          const description = section?.data?.description || '-';
          const heading = section?.name || 'No Title';

          let videoUrl = null;
          if (mediaId) {
            const mediaRes = await viewMedia(mediaId);
            if (mediaRes.success) {
              const blob = new Blob([mediaRes.data], { type: 'video/mp4' });
              videoUrl = URL.createObjectURL(blob);
            }
          }

          return {
            videoUrl,
            heading,
            description,
          };
        });

        const videoList = await Promise.all(promises);
        const filteredVideos = videoList.filter(v => v.videoUrl); // only keep valid videos
        setVideos(filteredVideos);
      } else {
        setError("No video data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading video data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div id='main-content'>
      <div className="container mt-4">
        <h6 className="fw-bold p-2">Photo's & Video's Gallery</h6>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <Link to="/media" className="nav-link">PHOTO'S GALLERY</Link>
          </li>
          <li className="nav-item">
            <Link to="/video" className="nav-link active">VIDEO GALLERY</Link>
          </li>
        </ul>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Video's</h2>
        {
          isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row">
              {videos.map((video, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <video
                      className="card-img-top"
                      controls
                      style={{ height: '200px', objectFit: 'cover' }}
                      src={video.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="card-body">
                      <h5 className="card-title">{video.heading}</h5>
                      <p className="card-text">{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
      </div>

      <Footer />
    </>
  );
}

export default Video;
