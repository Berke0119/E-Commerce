import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CartSummary() {
  const { cart, selectedItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const selectedProducts = cart.filter(item => selectedItems.includes(item.product.id));
  
  const subtotal = selectedProducts.reduce((acc, item) => {
    return acc + (item.product.price * item.count);
  }, 0);

  const shipping = selectedProducts.length > 0 ? 29.90 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-bold text-[#252B42] mb-4">Sipariş Özeti</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#737373]">Seçili Ürün Sayısı:</span>
          <span className="font-medium text-[#252B42]">{selectedProducts.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#737373]">Ara Toplam:</span>
          <span className="font-medium text-[#252B42]">{subtotal.toFixed(2)} TL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#737373]">Kargo:</span>
          <span className="font-medium text-[#252B42]">{shipping.toFixed(2)} TL</span>
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between">
            <span className="font-bold text-[#252B42]">Toplam:</span>
            <span className="font-bold text-[#23A6F0]">{total.toFixed(2)} TL</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/order')}
        disabled={selectedProducts.length === 0}
        className="w-full bg-[#23A6F0] text-white py-3 rounded font-bold hover:bg-[#23A6F0]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siparişi Tamamla
      </button>
    </div>
  );
} 