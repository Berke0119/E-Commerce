import { useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/clientActions';

function AppLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Axios'a token header ekle
    axiosInstance.defaults.headers['Authorization'] = token;

    // Verify isteği
    axiosInstance.get('/verify')
      .then(res => {
        dispatch(setUser(res.data));
        localStorage.setItem('token', token); // token'ı tazele
        axiosInstance.defaults.headers['Authorization'] = token;
      })
      .catch(() => {
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers['Authorization'];
      });
  }, [dispatch]);

  return null;
}

export default AppLoader;
