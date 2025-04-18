import axiosInstance from '../../api/axiosInstance';
import { setAddressList } from './clientActions';

export const fetchAddressList = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/user/address');
    dispatch(setAddressList(response.data));
  } catch (error) {
    console.error('Adres listesi alınamadı:', error);
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  const response = await axiosInstance.post('/user/address', addressData);
  dispatch(fetchAddressList());
  return response.data;
};

export const updateAddress = (addressData) => async (dispatch) => {
  const response = await axiosInstance.put('/user/address', addressData);
  dispatch(fetchAddressList());
  return response.data;
};

export const deleteAddress = (addressId) => async (dispatch) => {
  const response = await axiosInstance.delete(`/user/address/${addressId}`);
  dispatch(fetchAddressList());
  return response.data;
}; 