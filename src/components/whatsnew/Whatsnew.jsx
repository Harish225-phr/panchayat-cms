import React, {useState, useEffect} from "react";
import { Tab, Nav } from "react-bootstrap";

import { bindPageClick, viewMedia } from '../../services/contentService';

import Loading from '../../components/loader/Loading';


const Header = () => {
   const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
const [createdDates, setCreatedDates] = useState({}); 
// inside useEffect (with sections wala hi fetchData me)
useEffect(() => {
  const fetchData = async () => {
   try {
      const res = await bindPageClick("Minister-Images");
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
        const limitedPhotos = filteredPhotos.slice(0, 4); // limit to 4 photos
        setPhotos(limitedPhotos);
      } else {
        setError("No photo data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading photo data");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  
  const handleViewMedia = async (documentId) => {
    try {
      const response = await viewMedia(documentId.mediaId); // <-- this is now correct
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
  
  const handleItemClick = (item) => {
    if (item.data?.documentId) {
      handleViewMedia(item.data.documentId);
    }
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bindPageClick('Marquee');
        const allSections = res?.data?.response?.sections || [];
        setSections(allSections);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bindPageClick('Whats-New');
        const allSections = res?.data?.response?.sections || [];
        setSections(allSections);
        const datesMap = {};
        allSections.forEach(s => {
          if (s?.sectionId && s?.createdOn) datesMap[s.sectionId] = s.createdOn;
        });
        setCreatedDates(datesMap);
        if (Array.isArray(allSections) && allSections.length > 0) {
         const latest = allSections.reduce((max, s) => {
           if (!s?.createdOn) return max;
           return !max || new Date(s.createdOn) > new Date(max) ? s.createdOn : max;
         }, null);
         if (latest) {
           localStorage.setItem('whatsNewLastUpdated', latest);
         }
     }
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
    <section className="section__container feature__container fontsize" id="Whatsnew">
      <div>

<div id="main-content" className="bg-color text-white py-1 text-center">
  <div className="d-flex align-items-center">
    {/* Left fixed text */}
    <span className="text-white fw-semibold px-4 py-1 border-end border-light small text-nowrap">
      What's NEW In HP Panchayati Raj Department
    </span>

    {/* Marquee / Notification Slider */}
    <marquee
      className="flex-grow-1 text-white small"
      behavior="scroll"
      direction="left"
      scrollamount="4" /* speed: lower = slower */
      onmouseover="this.stop();" 
      onmouseout="this.start();"
    >
      {sections.length > 0 &&
        sections.map((item, index) => (
          <span
            key={`${item.sectionId}-${index}`}
            className="px-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleItemClick(item)}
          >
            📢 {item.name}
          </span>
        ))}
    </marquee>
  </div>
</div>



        {/* Main Content */}
        <div className="container-fluid mt-5 fontsize">
          <div className="row">
            {/* Left Profile */}
          {/* Right: Photos Section (Dynamic) */}
<div className="col-md-4">
  <div className="row g-3">
    {error ? (
      <div className="col-12">
        <p className="text-danger">{error}</p>
      </div>
    ) : photos.length > 0 ? (
      photos.map((photo, index) => (
        <div className="col-6" key={index}>
          <div className="card text-center h-100">
            <img
              src={photo.imageUrl}
              className="card-img-top"
              alt={photo.heading || "Minister Image"}
              style={{ height: '110px', width: '70%'}}
            />
            <div className="card-body p-2">
              <p className="text-muted mb-1 small">{photo.heading}</p>
              <p className="mb-0">{photo.description}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12">
        <p className="text-muted">No images available.</p>
      </div>
    )}
  </div>
</div>

            
           
            {/* Tabs Section */}
            <div className="col-md-8">
<Tab.Container defaultActiveKey="latest">
  <Nav variant="tabs" className="mb-3 FontSize12 fw-bold">
    <Nav.Item><Nav.Link eventKey="latest">Latest</Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link eventKey="circulars">Notifications</Nav.Link></Nav.Item>
    <Nav.Item><Nav.Link eventKey="reports">Act & Rules</Nav.Link></Nav.Item>
    {/* <Nav.Item><Nav.Link eventKey="tenders">Tenders</Nav.Link></Nav.Item> */}
    {/* <Nav.Item><Nav.Link eventKey="vacancies">vacancies</Nav.Link></Nav.Item> */}
    <Nav.Item><Nav.Link eventKey="tender">Reports</Nav.Link></Nav.Item>
  </Nav>

  <Tab.Content>
    {/* All your Tab.Pane blocks here */}
    {/* Example: */}
   <Tab.Pane eventKey="latest">
  <ul className="list-group mt-3 shadow-sm rounded">
    {sections.filter((s) => s.data?.type === "latest").map((section) => (
      <li key={section.sectionId} className="list-group-item" onClick={() => handleViewMedia(section.data?.documentId)} style={{ cursor: "pointer", fontSize: '0.9rem' }}>
        {section.name}
        {section.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
      </li>
    ))}
  </ul>
</Tab.Pane>

     <Tab.Pane eventKey="circulars">
      <ul className="list-group mt-3 shadow-sm rounded">
        {sections.filter((s) => s.data?.type === "circular").map((section) => (
          <li key={section.sectionId} className="list-group-item" onClick={() => handleViewMedia(section.data?.documentId)} style={{ cursor: "pointer" }}>
            {section.name}
            {section.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
          </li>

        ))}
      </ul>
    </Tab.Pane>
     <Tab.Pane eventKey="tenders">
      <ul className="list-group mt-3 shadow-sm rounded">
        {sections.filter((s) => s.data?.type === "tender").map((section) => (
      <li key={section.sectionId} className="list-group-item" onClick={() => handleViewMedia(section.data?.documentId)} style={{ cursor: "pointer" }}>
            {section.name}
            {section.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
          </li>
        ))}
      </ul>
    </Tab.Pane>
     <Tab.Pane eventKey="vacancies">
      <ul className="list-group mt-3 shadow-sm rounded">
        {sections.filter((s) => s.data?.type === "vacancies").map((section) => (
             <li key={section.sectionId} className="list-group-item" onClick={() => handleViewMedia(section.data?.documentId)} style={{ cursor: "pointer" }}>
            {section.name}
            {section.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
          </li>
        ))}
      </ul>
    </Tab.Pane>
     <Tab.Pane eventKey="reports">
      <ul className="list-group mt-3 shadow-sm rounded">
        {sections.filter((s) => s.data?.type === "reports").map((section) => (
      <li key={section.sectionId} className="list-group-item" onClick={() => handleViewMedia(section.data?.documentId)} style={{ cursor: "pointer" }}>
            {section.name}
            {section.data?.isNew && (
      <span className="badge rounded-pill bg-danger text-white ms-2" style={{ fontSize: '0.6rem' }}>
        NEW
       </span>
     )}
          </li>
        ))}
      </ul>
    </Tab.Pane>

    {/* Repeat for other eventKey values... */}
  </Tab.Content>
</Tab.Container>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
