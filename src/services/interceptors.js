
export function attachInterceptors(instance, getToken, withRedirect = false) {
  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log("Request interceptor is working!"); // Check if interceptor runs
      const token = getToken();
      if (token && !config.url.includes("login")) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

instance.interceptors.response.use(
  response => {
    console.log("Response interceptor is working!", response);
    return response;
  },
  error => {
    console.log("Error Interceptor Triggered");

    const isLoggedIn = !!sessionStorage.getItem('userRole'); // ya aapka token key
    const currentPath = window.location.pathname;

    // Network error ya status 0
    if (!error.response || error.response.status === 0) {
      if (currentPath === "/" || currentPath === "/home") {
        
      } else if (isLoggedIn) {
        sessionStorage.clear();
        window.location.href = "/panchayat/login";
      }
    } else if (error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/panchayat/login";
    }

    return Promise.reject(error);
  }
);

}
