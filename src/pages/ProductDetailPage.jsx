import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../store/actions/productThunks';
import ProductDetailOverview from '../components/ProductDetailOverview';
import BestSellerProductDetail from '../components/BestSellerProductDetail';
import TrustedBrands from '../components/TrustedBrands';

export default function ProductDetailPage() {

  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productDetail, loading } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  return (
    <div>
      {loading || !productDetail ? (
        <p>Loading...</p>
      ) : (
       <>
       <ProductDetailOverview product={productDetail}/>
       <BestSellerProductDetail categoryId={productDetail.category_id}/>
       <TrustedBrands/>
       </>
      )}
    </div>
  );
  
}
