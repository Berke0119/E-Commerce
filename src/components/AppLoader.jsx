import { useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/clientActions';

function AppLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(setUser({})); // Token yoksa user state'ini temizle
      delete axiosInstance.defaults.headers['Authorization'];
      return;
    }

    // Axios'a token header ekle
    axiosInstance.defaults.headers['Authorization'] = token;

    // Verify isteği
    axiosInstance.get('/verify')
      .then(res => {
        if (res.data) {
          dispatch(setUser(res.data));
          localStorage.setItem('token', token); // token'ı tazele
          axiosInstance.defaults.headers['Authorization'] = token;
        } else {
          throw new Error('Invalid response');
        }
      })
      .catch(() => {
        dispatch(setUser({})); // Hata durumunda user state'ini temizle
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers['Authorization'];
      });
  }, [dispatch]);

  return null;
}

export default AppLoader;
