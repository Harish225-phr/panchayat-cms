import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { viewPageClick, addMedia, addNotification, viewMedia, sectionUpdate } from '../../../services/contentService';
import { useToast } from "../../../components/toster/Toast";
import Loading from '../../../components/loader/Loading';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';

function Notification({ setActiveTab }) {
  const location = useLocation();
  const pageId = location.state?.pageId;
  const { showToast } = useToast();

  const [mediaResponse, setMediaResponse] = useState();
  const [formData, setFormData] = useState({ name: '', file: null, isNew: false, type: '' });
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSectionId, setUpdateSectionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const latestFetchId = useRef(0);
  const slug = location.state?.slug;

  const fetchNotification = useCallback(async () => {
    if (!pageId) return;
    setLoading(true);
    const currentFetchId = ++latestFetchId.current;
    try {
      const result = await viewPageClick(pageId);
      if (currentFetchId === latestFetchId.current) {
        const sections = result?.data?.response?.sections || [];
        setNotificationData(sections);
      }
    } catch (error) {
      console.error('Error fetching notification:', error);
    } finally {
      if (currentFetchId === latestFetchId.current) {
        setLoading(false);
      }
    }
  }, [pageId]);

  useEffect(() => {
    setNotificationData([]);
    fetchNotification();
  }, [fetchNotification, pageId]);
  
  // Initialize modal
  useEffect(() => {
    if (modalRef.current) {
      // Make sure Bootstrap is properly loaded
      if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        // Initialize the modal
        new bootstrap.Modal(modalRef.current);
      }
    }
  }, []);

  const handleFileUpload = async (file) => {
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      showToast('Only PDF files are allowed!', 'error');
      // Reset file input
      const fileInput = document.querySelector('input[name="file"]');
      if (fileInput) fileInput.value = '';
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
      } else {
        showToast(result.message || 'File upload failed!', 'error');
        console.error('File upload failed:', result.message || 'Unknown error');
      }
    } catch (error) {
      showToast(error.message || 'Error uploading file!', 'error');
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMedia = async (documentId) => {
    setLoading(true);
    try {
      const response = await viewMedia(documentId.mediaId);
      if (response.success) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("Media not found.");
      }
    } catch (error) {
      console.error("Error viewing media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log('Handle change:', { name, value, type });
    if (name === 'file' && files.length > 0) {
      handleFileUpload(files[0]);
    } else {
      // setFormData(prev =>{
      //   const newFormData = { ...prev, [name]: type === 'checkbox' ? checked : value };
      //   console.log('Updated formData:', newFormData); // Add this for debugging
      //   return newFormData;
      // });
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
            status: 'ACTIVE',
            type: formData.type,
            isNew: formData.isNew
          },
          priority: '0.8'
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
        await fetchNotification();
        showToast(`Notification ${isUpdating ? 'updated' : 'added'} successfully!`, 'success');
        setFormData({ name: '', file: null, isNew: false, type: '' });
        setUploadedFileName('');
        setIsUpdating(false);
        setUpdateSectionId(null);
        const fileInput = document.querySelector('input[name="file"]');
        if (fileInput) fileInput.value = '';
        setShowModal(false);

        // Close modal - fixed method
       const dismissBtn = document.getElementById('notificationModalDismiss');
        if (dismissBtn) {
          dismissBtn.click();
        } else {
          // fallback: programmatic hide
          const modal = document.getElementById('notificationModal');
          if (modal) {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) bootstrapModal.hide();
          }
        }
      } else {
        showToast(result.message || `Failed to ${isUpdating ? 'update' : 'add'} notification`, 'error');
        console.error(`Failed to ${isUpdating ? 'update' : 'add'} notification:`, result.message);
      }
    } catch (error) {
      showToast(error.message || `Error ${isUpdating ? 'updating' : 'adding'} notification`, 'error');
      console.error(`Error ${isUpdating ? 'updating' : 'adding'} notification:`, error);
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
        data: { ...section.data, status: updatedStatus },
        status: updatedStatus,
      },
    };
    setLoading(true);
    try {
      const result = await sectionUpdate(payload);
      if (result?.message === 'Success') {
        setNotificationData(prevSections =>
          prevSections.map(sec =>
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
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (section) => {
    setFormData({
      name: section.name || '',
      file: section.data?.subject || '',
      isNew: section.data?.isNew || false,
      type: section.data?.type || ''
    });
    setUploadedFileName(section.data?.subject || '');
    setMediaResponse(section.data?.documentId || null);
    setIsUpdating(true);
    setUpdateSectionId(section.sectionId);
    
    // Open the modal using Bootstrap
    const modal = document.getElementById('notificationModal');
    if (modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  };

  return (
    <div className="container fontsize">
      {/* Modal */}
      <div className="modal fade" id="notificationModal" tabIndex="-1" ref={modalRef} aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isUpdating ? "Update" : "Add"} {slug}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close" 
                  onClick={() => {
                    setUploadedFileName('');
                    setFormData({ name: '', file: null, isNew: false, type: '' });
                    setIsUpdating(false);
                    setUpdateSectionId(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">{slug} Name</label>
                  <input type="text" className="form-control fontsize" placeholder={`Enter ${slug.toLowerCase()} name`} name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="isNew" name="isNew" checked={formData.isNew || false} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="isNew">Mark as New / Important</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Type</label>
                  <select className="form-control fontsize" name="type" value={formData.type || ''} onChange={handleChange} required style={{ appearance: 'menulist' }}>
                    <option value="">-- Select Type --</option>
                    <option value="latest">Latest</option>
                    <option value="circular">Notification</option>
                    {/* <option value="tender">Tender</option> */}
                    {/* <option value="vacancies">Vacancies</option> */}
                    <option value="reports">Act & Rules</option>
                    <option value="tender">Reports & Statistics WRC 2023</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Choose PDF File</label>
                  <input 
                    type="file" 
                    className="form-control fontsize" 
                    name="file" 
                    accept="application/pdf"
                    onChange={handleChange} 
                    required={!isUpdating} 
                  />
                  <small className="form-text text-muted">Only PDF files are allowed.</small>
                </div>
                {loading && <p className="text-primary fw-semibold">Please wait...</p>}
                {uploadedFileName && <p className="text-success fw-bold">Uploaded File: {uploadedFileName}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary px-5 shadow-sm me-2 fontsize" data-bs-dismiss="modal" onClick={() => {
                  setIsUpdating(false);
                  setUpdateSectionId(null);
                }}>Close</button>
                <button
                  type="button"
                  id="notificationModalDismiss"
                  data-bs-dismiss="modal"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />
                <button type="submit" className="btn shadow-sm btn-primary px-5 fontsize">{isUpdating ? "Update" : "Submit"}</button>
             
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Notification List */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center heading-shadow gap-2">
    
     <Link to="#"  onClick={() => setActiveTab('dashboard')}>
          <i className="fas fa-arrow-left fs-3 text-primary fw-bold me-2"></i>
        </Link>
    <h4 className="mb-0">{slug} Details</h4>
  </div>

          <button className="btn btn-primary fontsize px-4 py-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#notificationModal">Add Notification</button>
        </div>

        {loading ? (
          <Loading />
        ) : notificationData.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notificationData.map((section, index) => (
                <tr key={section.sectionId || index}>
                  <td>{index + 1}</td>
                  <td>{section.name}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={section.data.status === 'ACTIVE'}
                        onChange={() => handleStatusToggle(section)}
                      />
                    </div>
                  </td>
                      <td>
                    <div className="dropdown">
                      <button className="btn btn-white" type="button" data-bs-toggle="dropdown">
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
          <p className="mt-3 text-muted">No notifications found.</p>
        )}
      </div>
    </div>
  );
}

export default Notification;
