import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import Photodata from './Photodata';
import { Link } from 'react-router-dom';
import { bindPageClick, viewMedia } from '../../../services/contentService';
import Loading from '../../../components/loader/Loading';

function Media() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await bindPageClick("Images");
      const sections = res?.data?.response?.sections;

      if (Array.isArray(sections) && sections.length > 0) {
        const promises = sections.map(async (section) => {
          const mediaId = section?.data?.documentId?.mediaId;
          const description = section?.data?.description || '-';
          const heading = section?.name || 'No Title';

          let imageUrl = null;
          if (mediaId) {
            const mediaRes = await viewMedia(mediaId);
            if (mediaRes.success) {
              const blob = new Blob([mediaRes.data], { type: 'image/jpeg' });
              imageUrl = URL.createObjectURL(blob);
            }
          }

          return {
            imageUrl,
            heading,
            description,
          };
        });

        const photoList = await Promise.all(promises);
        const filteredPhotos = photoList.filter(p => p.imageUrl); // remove nulls
        setPhotos(filteredPhotos);
      } else {
        setError("No photo data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading photo data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Navbar />
      <div id='main-content'>
      <div className="container">
        <h6 className="fw-bold p-2 mt-4">Photo's & Video's Gallery</h6>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <span className="nav-link active">PHOTO'S GALLERY</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/video">VIDEO GALLERY</Link>
          </li>
        </ul>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Photo's</h2>
        {
          isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row">
              {photos.map((photo, index) => (
                <Photodata
                  key={index}
                  imageUrl={photo.imageUrl}
                  heading={photo.heading}
                  paragraph={photo.description}
                />
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

export default Media;
