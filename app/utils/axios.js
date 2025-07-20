import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://credify-wy50.onrender.com/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // console.error("Axios error:", error);
    return Promise.reject(error)
  },
)

export default axiosInstance
