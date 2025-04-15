import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import ProductCard from './ProductCard';

const fetchBestSellerProducts = async () => {
  const response = await axiosInstance.get('/products?sort=sell_count:desc&limit=8');
  return response.data.products;
};

export default function BestSellerProducts() {

  const { data: bestsellers = [], isLoading, isError } = useQuery({
    queryKey: ['bestseller-products'],
    queryFn: fetchBestSellerProducts,
    staleTime: 1000 * 60 * 5, // 5 dakika cache
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;

  return (
    <section className='py-12 px-4 md:px-20'>
      <div className="text-center mb-10">
        <h4 className="text-xl text-[#737373] mb-2 font-normal">Featured Products</h4>
        <h2 className="text-2xl font-bold text-[#252B42]">BESTSELLER PRODUCTS</h2>
        <p className="text-sm text-[#737373] mt-2 font-normal">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
