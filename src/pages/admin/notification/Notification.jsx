import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import { viewPageClick, addMedia, addNotification, viewMedia, sectionUpdate } from '../../../services/contentService';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is imported

import { useToast } from "../../../components/toster/Toast";

import Loading from '../../../components/loader/Loading';

import { Link } from 'react-router-dom';

import "./Notification.css";

function Notification() {
  const location = useLocation();

    const slug = location.state?.slug || '';


  const pageId = location.state?.pageId;

  const { showToast } = useToast();

  const [mediaResponse, setMediaResponse] = useState();

  const [formData, setFormData] = useState({
    name: '',
    file: '',
    isNew: false
  });

  const [uploadedFileName, setUploadedFileName] = useState('');

  const [loading, setLoading] = useState(false);

  const [notificationData, setNotificationData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);

  const addModalRef = useRef(null);
  const updateModalRef = useRef(null);
  const modalRef = useRef(null);

  // To track latest fetch request
  const latestFetchId = useRef(0);

  const fetchNotification = useCallback(async () => {
    if (!pageId) return;

    setLoading(true);
    const currentFetchId = ++latestFetchId.current;
    try {
      const result = await viewPageClick(pageId);
      // Only update if this is the latest fetch
      if (currentFetchId === latestFetchId.current) {
        const sections = result?.data?.response?.sections || [];
        setNotificationData(sections);
      }
    } catch (error) {
      if (currentFetchId === latestFetchId.current) {
        console.error('Error fetching notification:', error);
      }
    } finally {
      if (currentFetchId === latestFetchId.current) {
        setLoading(false);
      }
    }
  }, [pageId]);

  useEffect(() => {
    // Reset notification data when pageId changes to avoid showing stale data
    setNotificationData([]);
    fetchNotification();
  }, [fetchNotification, pageId]);

  const handleFileUpload = async (file) => {
    // Only allow PDF files
    if (file.type !== 'application/pdf') {
      showToast('Only PDF files are allowed!', 'error');
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
        setFormData((prev) => ({ ...prev, file: result.data.response.fileName }));
        setUploadedFileName(result.data.response.fileName);
      } else {
        showToast(result.message || 'File upload failed!', 'error');
        console.error('File upload failed:', result.message || 'Unknown error');
      }
    } catch (error) {
      showToast(error.message || 'Error during file upload!', 'error');
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMedia = async (documentId) => {
     setLoading(true);
    try {
      const response = await viewMedia(documentId.mediaId); // <-- this is now correct
      console.log("Response:", response);

      if (response.success) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("Media not found.");
        setLoading(false); 
      }
    } catch (error) {
      console.error("Error viewing media:", error);
    }
    finally {
      setLoading(false);
        }
  };

 const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  if (name === 'file' && files.length > 0) {
    handleFileUpload(files[0]);
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }
};


  const openEditModal = (section) => {
    setFormData({
      name: section.name || '',
      file: section.data?.subject || '',
      isNew: section.data?.isNew || false
    });
    setUploadedFileName(section.data?.subject || '');
    setMediaResponse(section.data?.documentId || null);
    setIsEditing(true);
    setEditSectionId(section.sectionId);
    
    // Try to open modal using Bootstrap
    if (window.bootstrap && updateModalRef.current) {
      const modalInstance = window.bootstrap.Modal.getOrCreateInstance(updateModalRef.current);
      modalInstance.show();
    } else {
      // Fallback: directly manipulate modal classes
      const modal = updateModalRef.current;
      if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.id = 'update-modal-backdrop';
        document.body.appendChild(backdrop);
      }
    }
  };

  // Utility to fully close and reset add modal
  const closeAddModal = () => {
    setFormData({ name: '', file: '', isNew: false });
    setUploadedFileName('');
    setMediaResponse(null);
    const fileInput = document.querySelector('#addNotificationModal input[name="file"]');
    if (fileInput) fileInput.value = '';
    
    // Hide modal using Bootstrap
    if (addModalRef.current && window.bootstrap) {
      const modalInstance = window.bootstrap.Modal.getOrCreateInstance(addModalRef.current);
      modalInstance.hide();
    } else {
      // Fallback: manually hide modal
      const modal = addModalRef.current;
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
      }
    }
    
    // Clean up backdrop and body classes
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }, 300);
  };

  // Utility to fully close and reset update modal
  const closeUpdateModal = () => {
    setFormData({ name: '', file: '', isNew: false });
    setUploadedFileName('');
    setIsEditing(false);
    setEditSectionId(null);
    setMediaResponse(null);
    const fileInput = document.querySelector('#updateNotificationModal input[name="file"]');
    if (fileInput) fileInput.value = '';
    
    // Hide modal using Bootstrap
    if (updateModalRef.current && window.bootstrap) {
      const modalInstance = window.bootstrap.Modal.getOrCreateInstance(updateModalRef.current);
      modalInstance.hide();
    } else {
      // Fallback: manually hide modal
      const modal = updateModalRef.current;
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
      }
    }
    
    // Clean up backdrop and body classes
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }, 300);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await addNotification({
        pageId,
        section: {
          name: formData.name,
          data: {
            subject: formData.file,
            documentId: mediaResponse,
            status: 'ACTIVE',
            isNew: formData.isNew
          },
          status: 'ACTIVE',
          priority: 0.8,
        },
      });
      if (result.success) {
        await fetchNotification();
        showToast('Notification added successfully!', 'success');
        setTimeout(() => {
          closeAddModal();
        }, 100); // Small delay to ensure toast shows before modal closes
      } else {
        showToast(result.message || 'Failed to add notification!', 'error');
        console.error('Failed to add notification:', result.message);
      }
    } catch (error) {
      showToast(error.message || 'Error adding notification!', 'error');
      console.error('Error adding notification:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sectionUpdate({
        pageId,
        section: {
          sectionId: editSectionId,
          name: formData.name,
          data: {
            subject: formData.file,
            documentId: mediaResponse,
            status: 'ACTIVE',
            isNew: formData.isNew
          },
          status: 'ACTIVE',
          priority: 0.8,
        },
      });
      if (result.success) {
        await fetchNotification();
        showToast('Notification updated successfully!', 'success');
        setTimeout(() => {
          closeUpdateModal();
        }, 100); // Small delay to ensure toast shows before modal closes
      } else {
        showToast(result.message || 'Failed to update notification!', 'error');
        console.error('Failed to update notification:', result.message);
      }
    } catch (error) {
      showToast(error.message || 'Error updating notification!', 'error');
      console.error('Error updating notification:', error);
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
      setNotificationData((prevSections) =>
        prevSections.map((sec) =>
          sec.sectionId === section.sectionId
            ? {
                ...sec,
                data: {
                  ...sec.data,
                  status: updatedStatus,
                },
                status: updatedStatus,
              }
            : sec
        )
      );
    } 
  } catch (error) {
    console.error("Error updating notification status:", error);
  } finally {
    setLoading(false);
  }
};


  

  return (
    <div className="container fontsize">
      {/* Add Notification Modal */}
      <div
        className="modal"
        id="addNotificationModal"
        tabIndex="-1"
        ref={addModalRef}
        aria-labelledby="addNotificationModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form onSubmit={handleAddSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addNotificationModalLabel">
                  Add {slug} Notification
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeAddModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Notification Name</label>
                  <input
                    type="text"
                    className="form-control fontsize"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Notification Name'
                     pattern="^[A-Za-z0-9:.\- ]+$"
   title="Only letters, spaces, and hyphens are allowed"
                    required
                  />
                  <div className="mt-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isNewAdd"
                      name="isNew"
                      checked={formData.isNew || false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isNewAdd">
                      Mark as New / Important
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Choose File</label>
                  <input
                    type="file"
                    className="form-control fontsize"
                    name="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    required
                  />
                </div>
                {loading && (
                  <p className="text-primary fw-semibold Font-Size">Please wait...</p>
                )}
                {uploadedFileName && (
                  <p className="text-success fw-bold Font-Size">
                    Uploaded File: {uploadedFileName}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary px-5 shadow-sm me-2 fontsize"
                  data-bs-dismiss="modal"
                  onClick={closeAddModal}
                >
                  Close
                </button>
                <button type="submit" className="btn shadow-sm btn-primary px-5 fontsize">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Update Notification Modal */}
      <div
        className="modal"
        id="updateNotificationModal"
        tabIndex="-1"
        ref={updateModalRef}
        aria-labelledby="updateNotificationModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form onSubmit={handleUpdateSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateNotificationModalLabel">
                  Update {slug} Notification
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeUpdateModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Notification Name</label>
                  <input
                    type="text"
                    className="form-control fontsize"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Notification Name'
                                          pattern="^[A-Za-z\- ]+$"
   title="Only letters, spaces, and hyphens are allowed"
                    required
                  />
                  <div className="mt-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isNewUpdate"
                      name="isNew"
                      checked={formData.isNew || false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isNewUpdate">
                      Mark as New / Important
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Choose File</label>
                  <input
                    type="file"
                    className="form-control fontsize"
                    name="file"
                    accept="application/pdf"
                    onChange={handleChange}
                  />
                </div>
                {loading && (
                  <p className="text-primary fw-semibold Font-Size">Please wait...</p>
                )}
                {uploadedFileName && (
                  <p className="text-success fw-bold Font-Size">
                    Uploaded File: {uploadedFileName}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary px-5 shadow-sm me-2 fontsize"
                  data-bs-dismiss="modal"
                  onClick={closeUpdateModal}
                >
                  Close
                </button>
                <button type="submit" className="btn shadow-sm btn-primary px-5 fontsize">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Notification Data Table */}
      <div className="mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
  {/* Back Arrow + Heading */}
  <div className="d-flex align-items-center gap-2 heading-shadow" style={{ cursor: 'pointer' }}>
    <Link to="#"  onClick={() => setActiveTab('dashboard')}><i className="fas fa-arrow-left fs-3 text-primary fw-bold me-2"></i></Link>
    <h4 className="mb-0">{slug} Details</h4>
  </div>

  {/* Add Button */}
  <button
    className="btn btn-primary fontsize px-4 py-2 shadow-sm"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#addNotificationModal"
    onClick={() => {
      setFormData({ name: '', file: '', isNew: false });
      setUploadedFileName('');
      setMediaResponse(null);
      const fileInput = document.querySelector('#addNotificationModal input[name="file"]');
      if (fileInput) fileInput.value = '';
    }}
  >
    Add Notification
  </button>
</div>

        {loading ? (
          <Loading />
        ) : notificationData.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead className='table-primary'>
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
              className="btn btn-outline-primary btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
                      <ul className="dropdown-menu">
                      <li>
                        {loading ? (
                          <div className="dropdown-item custom-dropdown-btn">
                            <Loading />
                          </div>
                        ) : (
                          <button 
                            className="dropdown-item d-flex align-items-center gap-2 border-0 border-bottom"
                            onClick={() => handleViewMedia(section.data?.documentId)}
                          >
                            <i className="fas fa-eye"></i> View
                          </button>
                        )}
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2 pt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#updateNotificationModal"
                          onClick={() => openEditModal(section)}
                        >
                          <i className="fas fa-edit"></i>&nbsp;Edit
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
          <p className="mt-4">No notifications available.</p>
        )}
      </div>
    </div>
  );
}

export default Notification;
