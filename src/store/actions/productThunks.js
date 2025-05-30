import axiosInstance from '../../api/axiosInstance';
import { setProductList, setCategories, setFetchState, setOffset, setLimit, setFilter, setTotal, setProductDetailLoading, setProductDetail } from './productActions';

export const fetchProducts = () => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  try {
    const response = await axiosInstance.get('/products');
    dispatch(setProductList(response.data.products));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Product fetch error:', error);
    dispatch(setFetchState('FAILED'));
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Category fetch error:', error);
  }
};


export const fetchFilteredProducts = ({ categoryId, gender, offset = 0, limit = 12, filter = '' }) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  dispatch(setOffset(offset));
  dispatch(setLimit(limit));
  dispatch(setFilter(filter));

  try {
    let url = `/products?limit=${limit}&offset=${offset}`;
    if (categoryId) url += `&category=${categoryId}`;
    if (gender) url += `&gender=${gender}`;
    if (filter) url += `&sort=${filter}`;

    const res = await axiosInstance.get(url);

    if(res.data.products.length == 0){
      let zeroProductUrl = `/products?limit=${limit}&offset=${offset}`;
      const response = await axiosInstance.get(zeroProductUrl);
      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total || response.data.products.length));
      dispatch(setFetchState('FETCHED'));
    }else{
      dispatch(setProductList(res.data.products));
      dispatch(setTotal(res.data.total || res.data.products.length));
      dispatch(setFetchState('FETCHED'));
    }

  } catch (err) {
    console.error('Product fetch error:', err);
    dispatch(setFetchState('FAILED'));
  }
};


export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(setProductDetailLoading(true));
    const res = await axiosInstance.get(`/products/${id}`);
    dispatch(setProductDetail(res.data));
  } catch (err) {
    console.error('Ürün detayı alınamadı:', err);
  } finally {
    dispatch(setProductDetailLoading(false));
  }
};

