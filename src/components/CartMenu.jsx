import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { removeFromCart } from '../store/actions/cartActions';

export default function CartMenu() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.count);
  }, 0);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div 
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-4 z-50"
      style={{ marginTop: '0.75rem' }} // Hover alanında boşluk olmaması için
    >
      <div className="absolute w-full h-3 -top-3 bg-transparent"></div>
      <div className="px-4 py-2 border-b">
        <span className="text-sm font-bold text-[#252B42]">Sepetim ({cart.length} Ürün)</span>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3 p-4 border-b hover:bg-gray-50">
            <img 
              src={item.product.images[0].url} 
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 pr-2">
              <h4 className="text-sm font-bold text-[#252B42] line-clamp-1">{item.product.name}</h4>
              <div className="text-xs text-[#737373] mt-1">
                <span>Adet: {item.count}</span>
              </div>
              <div className="text-sm font-bold text-[#23A6F0] mt-1">
                {(item.product.price * item.count).toFixed(2)} TL
              </div>
            </div>
            <button 
              onClick={() => handleRemove(item.product.id)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-[#737373]" />
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 ? (
        <div className="px-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-[#252B42]">Toplam:</span>
            <span className="text-sm font-bold text-[#23A6F0]">{total.toFixed(2)} TL</span>
          </div>
          <Link 
            to="/cart"
            className="block w-full bg-[#23A6F0] text-white text-center py-2 rounded font-bold hover:bg-[#23A6F0]/90 transition"
          >
            Sepete Git
          </Link>
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-[#737373] text-sm">
          Sepetinizde ürün bulunmamaktadır.
        </div>
      )}
    </div>
  );
} 