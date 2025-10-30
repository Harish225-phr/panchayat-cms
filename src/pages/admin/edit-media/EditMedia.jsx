import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import { viewPageClick, addMedia, addNotification, viewMedia, sectionUpdate} from '../../../services/contentService';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useToast } from "../../../components/toster/Toast";

import Loading from '../../../components/loader/Loading';

import { Link } from 'react-router-dom';

// Thumbnail component to handle media display
const ThumbnailImage = ({ documentId }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThumbnail = async () => {
      if (!documentId?.mediaId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await viewMedia(documentId.mediaId);
        if (response.success && response.data) {
          const contentType = response.contentType || "image/jpeg";
          const blob = new Blob([response.data], { type: contentType });
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        }
      } catch (error) {
        console.error('Error loading thumbnail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();

    // Cleanup function to revoke the blob URL
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [documentId]);

  if (isLoading) {
    return <span style={{ fontSize: '12px', color: '#666' }}>Loading...</span>;
  }

  if (!imageSrc) {
    return <span style={{ fontSize: '12px', color: '#666' }}>No Image</span>;
  }

  return (
    <img
      src={imageSrc}
      alt="media thumbnail"
      style={{
        width: '60px',
        height: '40px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd',
      }}
    />
  );
};


  function Banner() {

  const location = useLocation();

  const slug = location.state?.slug;

  const pageId = location.state?.pageId;

  const { showToast } = useToast();

  const modalRef = useRef(null);

  const [bannerData, setBannerData] = useState([]);

  const [formData, setFormData] = useState({ name: '', file: '', description: '', textOverlay: '', link: '' });

  const [uploadedFileName, setUploadedFileName] = useState('');

  const [mediaResponse, setMediaResponse] = useState();

  const [loading, setLoading] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [updateSectionId, setUpdateSectionId] = useState(null);

  const [showModal, setShowModal] = useState(false); // New state for modal visibility

  const latestFetchId = useRef(0);

  const fetchBanner = useCallback(async () => {
        if (!pageId) return;
        setLoading(true);

  const currentFetchId = ++latestFetchId.current;
       try {
  const result = await viewPageClick(pageId);
       if (currentFetchId === latestFetchId.current) {
  const sections = result?.data?.response?.sections || [];
        setBannerData(sections);
      }
      } 
      catch (error) {
      console.error('Error fetching banners:', error);
      } 
     
     finally {
      if (currentFetchId === latestFetchId.current) setLoading(false);
      }
      }, [pageId]);

      useEffect(() => {
      setBannerData([]);
      fetchBanner();
      }, [fetchBanner, pageId]);

  const handleFileUpload = async (file) => {
      // Only allow images and videos
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        showToast('Only image and video files are allowed!', 'error');
        return;
      }
      setLoading(true);
      try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('category', 'HPPANCHAYAT');

      const result = await addMedia(uploadFormData);
      if (result.success) {
        setMediaResponse(result.data.response);
        setFormData(prev => ({ ...prev, file: result.data.response.fileName }));
        setUploadedFileName(result.data.response.fileName);
      } 
      else {
        showToast(result.message || 'File upload failed!', 'error');
        console.error('File upload failed');
      }
      } 
      catch (error) 
      {
      showToast(error.message || 'Error uploading file!', 'error');
      console.error('Error uploading file:', error);
      } 
      finally {
      setLoading(false);
      }
      };

const handleViewMedia = async (documentId) => {
  setLoading(true);
  try {
    const response = await viewMedia(documentId.mediaId);

    if (response.success && response.data) {
      const contentType = response.contentType || "image/jpeg";

      const blob = new Blob([response.data], { type: contentType });
      const url = URL.createObjectURL(blob);

      const win = window.open();
      if (win) {
        if (contentType.includes("video")) {
          win.document.write(`
            <html>
              <body style="margin:0">
                <video controls autoplay style="width:100%;height:100%">
                  <source src="${url}" type="${contentType}" />
                  Your browser does not support the video tag.
                </video>
              </body>
            </html>
          `);
        } else {
          win.document.write(`
            <html>
              <body style="margin:0">
                <img src="${url}" style="width:100%;height:auto" />
              </body>
            </html>
          `);
        }
      }

    } else {
      setLoading(false);
      alert("Media not found.");
    }
  } catch (error) {
    console.error("Error viewing media:", error);
  }  finally {
    setLoading(false); 
  }
};



  const handleChange = (e) => {
  const { name, type, value, checked, files } = e.target;
  if (name === 'file' && files.length > 0) {
    handleFileUpload(files[0]);
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
};

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
      const payload = {
        pageId,
        section: {
          name: formData.name,
          data: {
            subject: formData.file,
            documentId: mediaResponse,
            description: formData.description,
            status: 'ACTIVE',
            textOverlay: formData.textOverlay,
            link: formData.link
          },
          priority: '1'
        }
      };

      let result;
      if (isUpdating && updateSectionId) {
        payload.section.sectionId = updateSectionId;
        result = await sectionUpdate(payload);
      } else {
        result = await addNotification(payload);
      }

      if (result.success) {
        showToast(`Media ${isUpdating ? 'updated' : 'added'} successfully`, 'success');
        await fetchBanner();
        setFormData({ name: '', file: '', description: '', textOverlay: '', link: '' });
        setUploadedFileName('');
        setIsUpdating(false);
        setUpdateSectionId(null);
        const fileInput = document.querySelector('input[name="file"]');
        if (fileInput) fileInput.value = '';
        setShowModal(false); // Hide modal on success
        setTimeout(() => {
          document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
          document.body.classList.remove('modal-open');
          document.body.style = '';
        }, 300);
      } else {
        showToast(result.message || 'Failed to submit Media', 'error');
        console.error('Failed to submit Media');
      }
      } catch (error) {
      showToast(error.message || 'Error submitting Media', 'error');
      console.error('Error submitting Media:', error);
        } finally {
      setLoading(false);
        }
        };

const handleStatusToggle = async (section) => {
  const updatedStatus = section.data.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const payload = {
    pageId,
    section: {
      sectionId: section.sectionId,
      name: section.name,
      data: {
        ...section.data,
        status: updatedStatus,  
      },
      status: updatedStatus,
    },
    };

  try {
    const result = await sectionUpdate(payload);


    
    if (result?.message === 'Success') {
      setBannerData((prevSections) =>
        prevSections.map((sec) =>
          sec.sectionId === section.sectionId
            ? {
                ...sec,
                data: {
                  ...sec.data,
                  status: updatedStatus,
                },
              }
            : sec
        )
      );
    } else {
      showToast('Status update failed', 'error');
    }
  } finally {
    setLoading(false);
  }
};

const openEditModal = (section) => {
  setFormData({
    name: section.name || '',
    file: section.data?.subject || '',
    description: section.data?.description || '',
    textOverlay: section.data?.textOverlay || '',
    link: section.data?.link || ''
  });
  setUploadedFileName(section.data?.subject || '');
  setMediaResponse(section.data?.documentId || null);
  setIsUpdating(true);
  setUpdateSectionId(section.sectionId);
  setShowModal(true);
};



  return (
    <div className="container fontsize">
      {/* Modal - always present at top level */}
      <div className={`modal fade${showModal ? ' show d-block' : ''}`} id="bannerModal" tabIndex="-1" ref={modalRef} aria-hidden={!showModal} style={showModal ? { background: 'rgba(0,0,0,0.5)' } : {}}>
  <div className="modal-dialog">
    <form onSubmit={handleSubmit}>
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title">{isUpdating ? "Update" : "Add"} {slug}</h6>
          <button type="button" className="btn-close" onClick={() => {
            setShowModal(false);
            setFormData({ name: '', file: '', description: '' });
            setUploadedFileName('');
            setIsUpdating(false);
            setUpdateSectionId(null);
          }}></button>
        </div>
        <div className="modal-body ">
          <div className="mb-3">
            <label className="form-label fontsize">{slug} Name</label>
            <input type="text" placeholder="Enter Media Name" className="form-control fontsize" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          {/* If slug is 'banner', show extra fields for text overlay and link */}
          {slug === 'Banner' && (
            <>
              <div className="mb-3">
                <label className="form-label fontsize">Text Overlay</label>
                <input
                  type="text"
                  className="form-control fontsize"
                  name="textOverlay"
                  value={formData.textOverlay || ''}
                  onChange={handleChange}
                  placeholder="Enter text overlay"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fontsize">Link</label>
                <input
                  type="text"
                  className="form-control fontsize"
                  name="link"
                  value={formData.link || ''}
                  onChange={handleChange}
                  placeholder="Enter link (URL)"
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label fontsize">Choose {slug}</label>
            <input type="file" className="form-control fontsize" name="file" accept="image/*,video/*" onChange={handleChange} required={!isUpdating} />
          </div>
          <div className="mb-3">
            <label className="form-label fontsize">{slug} Description</label>
            <input
              type="text"
              className="form-control fontsize"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          {loading && <p className="text-primary fw-semibold fontsize">Please wait...</p>}
          {uploadedFileName && <p className="text-success fw-bold fontsize">Uploaded File: {uploadedFileName}</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary px-5 shadow-sm me-2 fontsize" onClick={() => {
            setShowModal(false);
            setFormData({ name: '', file: '', description: '' });
            setUploadedFileName('');
            setIsUpdating(false);
            setUpdateSectionId(null);
          }}>Close</button>
          <button type="submit" className="btn shadow-sm btn-primary px-5 fontsize">{isUpdating ? "Update" : "Submit"}</button>
        </div>
      </div>
    </form>
  </div>
</div>

      {/* Banner Table */}
      <div className="mt-4">
       <div className="d-flex justify-content-between align-items-center mb-3">
  {/* Left: Back Arrow + Heading */}
  <div className="d-flex align-items-center heading-shadow gap-2">
     <Link to="#"  onClick={() => setActiveTab('dashboard')}>
      <i className="fas fa-arrow-left fs-3 text-primary fw-bold me-2"></i>
    </Link>
    <h4 className="mb-0">{slug} Details</h4>
  </div>

  {/* Right: Add Media Button */}
  <button
    className="btn btn-primary fontsize px-4 py-2 shadow-sm"
    type="button"
    onClick={() => {
      setFormData({ name: '', file: '', description: '' });
      setUploadedFileName('');
      setMediaResponse(null);
      setIsUpdating(false);
      setUpdateSectionId(null);
      setShowModal(true);
    }}
  >
    Add {slug}
  </button>
</div>

        {loading ? (
          <Loading />
        ) : bannerData.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead className='table-primary'>
              <tr>
                <td>Sr</td>
                <td>Name</td>
                <td>Thumbnail</td>
                {slug === 'Banner' && <td>Text Overlay</td>}
                <td>Description</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {bannerData.map((section, index) => (
                <tr key={section.sectionId || index}>
                  <td>{index + 1}</td>
                  <td>{section.name}</td>
                 <td>
  {section.data?.documentId ? (
    <ThumbnailImage documentId={section.data.documentId} />
  ) : (
    <span style={{ fontSize: '12px', color: '#666' }}>No Image</span>
  )}
</td>
{slug === 'Banner' && <td>{section.data?.textOverlay || '--'}</td>}
               <td>{section.data.description ? section.data.description : '--'}</td>


       <td>
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      role="switch"
      id={`switch-${section.sectionId}`}
      checked={section.data?.status === 'ACTIVE'}
      onChange={() => handleStatusToggle(section)}
    />
  </div>
</td>




                  <td>
                    <div className="dropdown">
                         <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
                      <ul className="dropdown-menu">
                      <li>
                     {loading ? (
  <div className="dropdown-item custom-dropdown-btn border-bottom">
    <Loading />
  </div>
) : (
  <button
  className="dropdown-item d-flex align-items-center gap-2"
    onClick={() => handleViewMedia(section.data?.documentId)}
  >
  <i className="fas fa-eye"></i>
    View
  </button>
)}
                        </li>
                        <li>
                          <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() => openEditModal(section)}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">No Media available.</p>
        )}
      </div>
    </div>
  );
}

export default Banner;
