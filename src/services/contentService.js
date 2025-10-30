import apiService from "../services/api"

const { api, apiEndpoints } = apiService;
// Fetch page list API
export const fetchPageList = async () => {
    try {
      const response = await api.get(apiEndpoints.listPage());
      if (response.data.statusCode === "ESS-000") {
        const pageList = response.data.response.map(page => ({
          pageId: page.pageId,
          ...page
        })); // Extract pageId and include it in the response
        return { success: true, data: pageList }; // Return the updated array
      } 
      
      else {
        return { success: false, message: "Failed to fetch page list" };
      }
    } catch (error) {
      console.error("Error fetching page list22:", error);
      const errorMessage = error.response?.data?.message || error.message || "Error fetching page list";
  
      console.error("Page List API Error: ", errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  
  // Fetch content update API
  export const updatePageClick = async (payload) => {
    try {
      console.log("Payload being sent to API:", payload); // Log the payload for debugging
      const response = await api.post(apiEndpoints.updatePage(), payload);
      console.log("API Response:", response); // Log the API response for debugging
      if (response.data.success) { 
        return { success: true, data: response.data };
      } 
      
      else {
        return { success: false, message: response.data.message || "Update failed" };
      }


     } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error updating content";
      console.error("Error in updatePageClick:", errorMessage);
      return { success: false, message: errorMessage };
    }

  };

  //view content API
  export const viewPageClick = async (id) => {
    console.log("Fetching details for pageId:", id);
    try {
      const response = await api.get(apiEndpoints.viewPage(id));
      console.log("API Response:", response); // Log the API response
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          message: response.data.message || "Failed to fetch content",
        };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error fetching content";
      console.error("Error in viewPageClick:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  
//bind content API
export const bindPageClick = async (slug) => {
  console.log("Fetching details for content:", slug);
  try {
    // Use the dynamic slug in the API URL
      const response = await api.get(apiEndpoints.viewPageBySlug(slug));
    console.log("API Response:", response); 
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to fetch content",
      };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error fetching content";
    console.error("Error in bindPageClick:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Add page API
export const addPageClick = async (payload) => {
  console.log("Calling addPage API with payload:", payload);
  try {
    const response = await api.post(apiEndpoints.addPage(), payload);
    console.log("API Response:", response); // Log the API response
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add page",
      };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error adding page";
    console.error("Error in addPageClick:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Add media API
export const addMedia = async (formData) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.post(apiEndpoints.addMedia(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': `Bearer ${token}`,
    },
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to upload media',
      };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Error uploading media';
    console.error('Error in addMedia:', errorMessage);
    return { success: false, message: errorMessage };
  }
};


// Add notification API
export const addNotification = async (payload) => {
  try {
    const response = await api.post(apiEndpoints.addNotification(), payload);
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add notification",
      };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error adding notification";
    console.error("Error in addNotification:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

//view media 
export const viewMedia = async (documentId) => {
  console.log("Fetching media blob for ID:", documentId);
  try {
    const response = await api.get(apiEndpoints.viewMedia(documentId), {
      responseType: "blob", 
    });

    if (response) {
      const contentType = response.headers['content-type'];  // 👈 media type
      return {
        success: true,
        data: response.data,
        contentType: contentType,
      };
    } else {
      return {
        success: false,
        message: "No data found",
      };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error fetching content";
    console.error("Error in viewMedia:", errorMessage);
    return { success: false, message: errorMessage };
  }
};


  // media notification update API
  export const sectionUpdate = async (payload) => {
    try {
      console.log("Payload being sent to API:", payload); // Log the payload for debugging
       const response = await api.post(apiEndpoints.sectionUpdate(), payload);
      console.log("API Response:", response); // Log the API response for debugging
      if (response.data.success) { 
        return { success: true, data: response.data };
      } 
      
      else {
        return { success: false, message: response.data.message || "Update failed" };
      }


     } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error updating content";
      console.error("Error in sectionUpdate:", errorMessage);
      return { success: false, message: errorMessage };
    }

  };