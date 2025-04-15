import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchFilteredProducts } from '../store/actions/productThunks';
import ShopPagination from './ShopPagination';
const sortOptions = [
  { label: 'Popularity', value: 'sell_count:desc' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
];

const ShopProductList = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const {
    productList,
    offset,
    limit,
    total,
    filter,
    fetchState,
  } = useSelector((state) => state.product);

  const [selectedFilter, setSelectedFilter] = useState(filter);


  // URL ilk açıldığında çalışsın
  useEffect(() => {
    dispatch(fetchFilteredProducts({ categoryId, offset, limit, filter }));
  }, [dispatch, categoryId]);

  const onPageChange = (page) => {
    const newOffset = (page - 1) * limit;
    dispatch(fetchFilteredProducts({ categoryId, offset: newOffset, limit, filter }));
  };

  const handleFilterApply = () => {
    dispatch(fetchFilteredProducts({ categoryId, offset: 0, limit, filter: selectedFilter }));
  };

  return (
    <section className="px-4 md:px-20 py-10">
      <div className="flex flex-col justify-center md:flex-row md:justify-between items-center mb-6 flex-wrap gap-4">
        <p className="text-sm font-bold text-[#737373]">Showing {total} results</p>
        <div className="flex items-center gap-4">
          <select
            className="border py-3 px-4 rounded text-sm font-normal text-[#737373]"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option className="text-sm font-normal text-[#737373]" value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={handleFilterApply}
            className="bg-[#23A6F0] text-sm font-bold text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Ürün Grid */}
      {fetchState === 'FETCHING' ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <ShopPagination
        total={total}
        limit={limit}
        offset={offset}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default ShopProductList;
