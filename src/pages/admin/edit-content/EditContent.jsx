import React, { useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useParams, useLocation } from "react-router-dom";

import { useToast } from "../../../components/toster/Toast";

import { viewPageClick, updatePageClick } from "../../../services/contentService";

import Loading from "../../../components/loader/Loading";

import { Link } from "react-router-dom";

import "./EditContent.css";

function EditContent() {
  const { slug } = useParams();

  const location = useLocation();

    const slugn = location.state?.slug || '';

  const pageId = location.state?.pageId;

  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [saving, setSaving] = useState(false);

   useEffect(() => {
    setContent("");     
    setLoading(true);  
    
  
        const fetchContent = async () => {
        try {
        const result = await viewPageClick(pageId);
        if (result.success) {
          setContent(result.data.response.data.richText || "");
        } 
        }

        catch (error) {
        console.error("Error fetching content:", error);
        } 

        finally {
        setLoading(false);  
        }
        };
  
        if (pageId) {
        fetchContent();
        }
        }, [pageId, location.key]);
  
       const handleSave = async () => {
       setSaving(true);
       try {
      const payload = {
        pageId: pageId,
        data: {
          richText: content,
        },
      };
  
      const response = await updatePageClick(payload);
      console.log("Full API Response:", response); 

      if (response?.message) {
        showToast("Data Updated successfully");
      } 

      else {
        showToast("Data update failed",);
      }
      } 

      catch (error) {
      console.error("Error saving content:", error);
      showToast("Error saving content. Please try again later.", "error");
      } 
      
      finally {
      setSaving(false);
      
      }
      };
  

  return (
    <>
  <div className="d-flex align-items-center gap-2 heading-shadow m-4" style={{ cursor: 'pointer' }}>
    <Link to="#"  onClick={() => setActiveTab('dashboard')}><i className="fas fa-arrow-left fs-3 text-primary fw-bold me-2"></i></Link>
    <h4 className="mb-0">{slugn} Details</h4>
  </div>
      <div className="editor-wrapper m-4">
         {loading ? (
         <Loading />   
          ) : (
         <CKEditor
         editor={ClassicEditor}
         data={content}
         disabled={!isEditing}
         onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);        
         }}/>
        )}
      </div>

      <div className="m-4">
        <button
           className="px-5 btn btn btn-secondary shadow-sm me-2 fontsize border"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button
          className="px-5 shadow-sm btn btn-primary px-5 fontsize"
          onClick={handleSave}
          disabled={!isEditing || saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default EditContent;
