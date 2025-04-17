import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import ProductCard from './ProductCard';

// api.js ya da uygun bir util dosyası
export const fetchBestSellers = async (categoryId) => {
  const res = await axiosInstance.get('/products', {
    params: {
      sort: 'sell_count:desc',
      limit: 8,
      category: categoryId,
    },
  });
  // Burada res.data = { products: […], total: …, … }
  return res.data.products;    // <<< sadece dizi kısmını döndür
};


export default function BestSellerProductDetail({categoryId}) {

  const { data: bestsellers = [], isLoading, isError } = useQuery({
    queryKey: ['bestseller-products-category', categoryId],
    queryFn: () => fetchBestSellers(categoryId),
    staleTime: 1000 * 60 * 5, // 5 dakika cache
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;

  return (
    <section className='py-12 px-4 md:px-20 bg-[#FAFAFA]'>
      <div className='max-w-7xl mx-auto'>
        <div className="text-start mb-10">
          <h2 className="text-2xl font-bold text-[#252B42]">BESTSELLER PRODUCTS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
