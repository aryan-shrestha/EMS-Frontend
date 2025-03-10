import axios from "axios";

const localhost = "http://127.0.0.1:8000/api/v2/";

const axiosInstance = axios.create({
  baseURL: localhost,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token refresh automatically on 401 response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orginalRequest = error.config;
    if (error.response?.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${localhost}auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem("access", data.access);
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`;
          return axiosInstance(orginalRequest);
        } catch (refreshError) {
          console.error("Refresh token is invalid or expired");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
