import axios from "axios";
import { attachInterceptors } from "./interceptors"; // Import interceptors

const BASE_URL = 'https://ess-cms.techembryo.com';
// const BASE_URL = 'https://stgpanchayat.hp.gov.in';
// const BASE_URL = 'https://panchayat.hp.gov.in';
// const BASE_URL = 'https://10.126.102.121';
const BASE_URL_CMS = `${BASE_URL}/cms/api/`;
const BASE_URL_ESS = `${BASE_URL}/cms-users/api/auth/`;

const getToken = () => sessionStorage.getItem("token") || "";

// Common headers
const defaultHeaders = {
  "Content-Type": "application/json",
  "X-Channel-Id": "WEB",
  "Project": "HPPANCHAYAT",
  "Accept": "*/*",
};

const createAxiosInstance = (baseURL, withRedirect = false) => {
  const instance = axios.create({
    baseURL,
    headers: defaultHeaders,
  });

  attachInterceptors(instance, getToken, withRedirect);

  return instance;
};

//  Create both instances
const api = createAxiosInstance(BASE_URL); // For CMS
const essApi = createAxiosInstance(BASE_URL_ESS, true); // For Auth 

// API Endpoints
const apiEndpoints = {
  // CMS endpoints
  listPage: () => `${BASE_URL_CMS}pages/v1/list`,
  updatePage: () => `${BASE_URL_CMS}pages/v1/update`,
  viewPage: (id) => `${BASE_URL_CMS}pages/v1/view/${id}`,
  addPage: () => `${BASE_URL_CMS}pages/v1/add`,
  addMedia: () => `${BASE_URL_CMS}media/v1/add`,
  viewPageBySlug: (slug) => `${BASE_URL_CMS}pages/v1/view/slug/${slug}`,
  viewMedia: (documentId) => `${BASE_URL_CMS}media/v1/view/${documentId}`,
  addNotification: () => `${BASE_URL_CMS}pages/section/v1/add`,
  sectionUpdate: () => `${BASE_URL_CMS}pages/section/v1/update`,

  // Auth endpoints
  loginV1: () => `${BASE_URL_ESS}v1/login`,
  loginV2: () => `${BASE_URL_ESS}v2/login`,
};

export default { api, essApi, apiEndpoints };

