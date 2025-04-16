import axiosInstance from '../../api/axiosInstance';
import { setUser} from '../actions/clientActions';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/login', credentials);
    const { email, name, role_id, token } = res.data;

    if (credentials.rememberMe) {
      localStorage.setItem('token', token);
    }

    dispatch(setUser({ email, name, role_id}));
    return { success: true };
  } catch (err) {
    const message = err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
    return { success: false, message };
  }
};
