import React, { useEffect, useState, useRef } from "react";

import { fetchPageList, addPageClick } from "../../../services/contentService";

import { useToast } from "../../../components/toster/Toast";

import Loading from "../../../components/loader/Loading";

import "./Publishcontent.css";

import { Link } from "react-router-dom";

import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components

function Publishcontent({ setActiveTab }) {
  const [pageList, setPageList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const isApiCalled = useRef(false);

  const [showModal, setShowModal] = useState(false);

  const initialFormData = {
    slug: "",
    description: "",
    type: "list",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Allow only letters, spaces, and hyphens for slug and description
    if (name === 'slug' || name === 'description') {
      const validPattern = /^[A-Za-z\s\-]*$/;
      if (validPattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      // If invalid characters are typed, don't update the state (character won't appear)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const titlePattern = /^[A-Za-z\s\-]+$/;
    const descriptionPattern = /^[A-Za-z\s\-]+$/;
    
    if (!formData.slug.trim()) {
      showToast("Title is required", "error");
      return false;
    }
    
    if (!titlePattern.test(formData.slug)) {
      showToast("Title can only contain letters, spaces, and hyphens", "error");
      return false;
    }
    
    if (!formData.description.trim()) {
      showToast("Description is required", "error");
      return false;
    }
    
    if (!descriptionPattern.test(formData.description)) {
      showToast("Description can only contain letters, spaces, and hyphens", "error");
      return false;
    }
    
    return true;
  };

  const handleAddPage = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const { id, ...payload } = formData;
      const result = await addPageClick(payload);

      if (result.success) {
        showToast("Page added successfully", "success");
        console.log("API Response:", result.data);

        setShowModal(false);
        setFormData(initialFormData);

        const updatedResult = await fetchPageList();

        if (updatedResult.success) {
          setPageList(updatedResult.data);
        } else {
          showToast("Failed to fetch updated list", "error");
        }
        }
        
        else {
        showToast("Failed to add page", "error");
        }
        } 
        
        catch (error) {
        console.error("Error adding page:", error);
        showToast("Error adding page", "error");
       }
       };

       useEffect(() => {
       if (!isApiCalled.current) {
      isApiCalled.current = true;
      const getPageList = async () => {
      setIsLoading(true);

      const result = await fetchPageList();

      setIsLoading(false);

        if (result.success) {
          setPageList(result.data);
        } else {
          showToast(result.message, "error");
        }
      };

      getPageList();
    }
  }, []);

  return (
    <div className="content-section active fontsize">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Publish Pages</h4>
        <button className="btn btn-primary fontsize px-4 py-2 shadow-sm" onClick={() => setShowModal(true)}>
          Add Page
        </button>
      </div>
      <p>Welcome to the Panchayati Raj Department Admin Panel.</p>

      {/* Modal for adding a new page */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setFormData(initialFormData); // Reset form data when modal is closed
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6">Add New Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="fontsize" onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="slug" 
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Enter Page Name (only letters, spaces, and hyphens allowed)"
                className="fontsize"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description (only letters, spaces, and hyphens allowed)"
                className="fontsize"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="fontsize"
              >
                <option value="list">List</option>
                <option value="object">Object</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         <Button
  variant="secondary"
  className="px-5 shadow-sm me-2 fontsize"
  onClick={() => {
    setShowModal(false);
    setFormData(initialFormData);
  }}
>
   Close
</Button>

<Button
  variant="primary"
  className="px-5 shadow-sm btn-primary px-5 fontsize"
  onClick={handleAddPage}
>
   Save
</Button>

        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <Loading />
      ) : (
       <table className="table table-bordered table-hover align-middle ">
  <thead className="table-primary">
    <tr>
      <td scope="col">S.No</td>
      <td scope="col">Page Name</td>
      <td scope="col">Description</td>
      <td scope="col">Action</td>
    </tr>
  </thead>
  <tbody>
    {pageList.map((page, index) => (
      <tr key={page.id || page.slug || index}>
        <td>{index + 1}</td>
        <td className="text-capitalize">{page.slug}</td>
        <td>{page.description}</td>
        <td>
          <div className="dropdown ">
            <button
              className="btn btn-outline-primary btn-sm "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end ">
              {(page.description !== "Media" &&
                page.description !== "Notifications" &&
                page.description !== "What's-NEW") && (
                <li>
                  <Link
                    to="#"
                    state={{ pageId: page.pageId, slug: page.slug }}
                    onClick={() => setActiveTab("edit-content")}
                     className="dropdown-item d-flex align-items-center gap-2 "
                  >
                     <i className="fas fa-eye"></i> View Content
                  </Link>
                </li>
              )}

              {page.description === "Media" && (
                <li>
                  <Link
                    to="#"
                    state={{ pageId: page.pageId, slug: page.slug }}
                    onClick={() => setActiveTab("edit-media")}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                        <i className="fas fa-eye"></i> View Media
                  </Link>
                </li>
              )}

              {page.description === "What's-NEW" && (
                <li>
                  <Link
                    to="#"
                    state={{ pageId: page.pageId, slug: page.slug }}
                    onClick={() => setActiveTab("Whats-NEW")}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                        <i className="fas fa-eye"></i> View What's New
                  </Link>
                </li>
              )}

              {page.description === "Notifications" && (
                <li>
                  <Link
                    to="#"
                    state={{ pageId: page.pageId, slug: page.slug }}
                    onClick={() => setActiveTab("notification")}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                       <i className="fas fa-eye"></i> View Notification
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
}

export default Publishcontent;
