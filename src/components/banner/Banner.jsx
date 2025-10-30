import React, { useState, useEffect } from "react";
import { bindPageClick, viewMedia } from "../../services/contentService";
import Loading from "../../components/loader/Loading";
import "./Banner.css";

// Banner component to display carousel banners
function Banner() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");

  // Fetch banners from API
const fetchBanners = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await bindPageClick("Banner");
    console.log("Response ===>", response);

    const sections = response?.data?.response?.sections;

    if (Array.isArray(sections) && sections.length > 0) {
      const imagePromises = sections.map(async (section) => {
        const mediaId = section?.data?.documentId?.mediaId;
        const text = section?.data?.textOverlay;
        const link = section?.data?.link;
        if (mediaId) {
          const mediaRes = await viewMedia(mediaId);
          if (mediaRes.success) {
            const blob = new Blob([mediaRes.data], { type: "image/jpeg" }); // or the correct contentType
            return { url: URL.createObjectURL(blob), text, link };
          }
        }
        return null;
      });

      const imageUrls = await Promise.all(imagePromises);
      const filteredUrls = imageUrls.filter(Boolean); // remove nulls if any
      setBanners(filteredUrls);
    } else {
      setError("No banners found");
    }
  } catch (err) {
    console.error("Error fetching banners:", err);
    setError(err.message || "Error fetching banners");
  } finally {
    setIsLoading(false);
  }
};



  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <>
     <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner rounded-0">
    {banners.map((banner, index) => (
      <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} style={{ position: "relative" }}>
        <img
          src={banner.url}
          className="d-block w-100"
          alt={`Slide ${index + 1}`}
          style={{
            height: "400px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {banner.text && (
          banner.link ? (
            <a
              href={banner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="banner-overlay-text"
            >
              {banner.text}
            </a>
          ) : (
            <div className="banner-overlay-text">{banner.text}</div>
          )
        )}
      </div>
    ))}
  </div>

  {/* Previous button */}
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  {/* Next button */}
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        </>
      )}
    </>
  );
}

export default Banner;