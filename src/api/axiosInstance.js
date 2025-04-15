import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Eğer token varsa otomatik eklemek istersen sonra bu kısmı açarız
// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;
