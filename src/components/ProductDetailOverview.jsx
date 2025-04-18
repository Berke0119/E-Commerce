import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Heart, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCart } from '../store/actions/cartActions';
import { toast } from 'react-toastify';

export default function ProductDetailOverview({ product }) {
  const filledStars = Math.floor(product.rating); // dolu yıldız sayısı
  const totalStars = 5;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    dispatch(setCart({
      count: quantity,
      checked: true,
      product: product
    }));

    toast.success('Ürün sepete eklendi', {
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  return (
    <section className='bg-[#FAFAFA] py-10 w-full px-4 md:px-20'>
      <div className='flex justify-start items-center gap-4 max-w-7xl mx-auto mb-10'>
        <Link to={'/'} className='text-[#252B42] hover:text-[#252B42]/80 text-sm font-bold'>Home</Link>
        <span className='text-[#BDBDBD] text-sm font-bold'>&gt;</span>
        <span className='text-[#BDBDBD] text-sm font-bold'>Shop</span>
      </div>
      <div className="flex flex-col md:flex-row gap-10 max-w-7xl mx-auto">
        {/* Slider */}
        <div className="md:w-1/2">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            className="w-full rounded-lg"
          >
            {product.images.map((img) => (
              <SwiperSlide key={img.index}>
                <img
                  src={img.url}
                  alt={product.name}
                  className="w-full h-full object-fill rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail'lar */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img) => (
              <img
                key={img.index}
                src={img.url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Başlık */}
          <h1 className="text-3xl font-bold text-[#252B42]">
            {product.name}
          </h1>

          {/* Yıldızlar & İnceleme */}
          <div className="flex items-center gap-2">
            {[...Array(totalStars)].map((_, i) => (
              <i
                key={i}
                className={
                  i < filledStars
                    ? 'fas fa-star text-yellow-400'
                    : 'far fa-star text-gray-300'
                }
              />
            ))}
            <span className="text-sm text-[#737373] font-bold">
              {filledStars} Reviews
            </span>
          </div>

          {/* Fiyat */}
          <div className="text-2xl font-bold text-[#252B42]">
            ${product.price.toFixed(2)}
          </div>

          {/* Stok Durumu */}
          <div className="text-sm text-[#737373] font-bold">
            Availability:{' '}
            <span
              className={
                product.stock > 0 ? 'text-green-600 font-bold text-sm' : 'text-red-600 font-bold text-sm'
              }
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Açıklama */}
          <p className="text-[#858585] text-sm font-normal">{product.description}</p>

          <hr className="my-4" />

          {/* Renk Seçenekleri (örnek renkler) */}
          <div className="flex gap-3">
            <span className="w-6 h-6 bg-blue-400 rounded-full" />
            <span className="w-6 h-6 bg-green-400 rounded-full" />
            <span className="w-6 h-6 bg-orange-400 rounded-full" />
            <span className="w-6 h-6 bg-gray-800 rounded-full" />
          </div>

          {/* Butonlar */}
          <div className="flex flex-col gap-4 mt-4">
            {/* Miktar Seçici */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#737373] font-bold">Quantity:</span>
              <div className="flex items-center border border-[#BDBDBD] rounded">
                <button 
                  onClick={handleDecrease}
                  className="p-2 hover:bg-gray-100 transition"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} className="text-[#737373]" />
                </button>
                <span className="px-4 py-2 text-sm font-bold text-[#252B42]">{quantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="p-2 hover:bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} className="text-[#737373]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-[#23A6F0] text-white px-6 py-2 rounded hover:bg-[#23A6F0]/90 transition" onClick={addToCart}>
                Add to Cart
              </button>
              <button>
                <Heart size={24} className="text-[#737373] hover:text-red-500 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
);
}
