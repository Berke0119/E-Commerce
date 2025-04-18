import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function OrderSummary({ selectedAddress, selectedCard, onCreateOrder }) {
  const { cart, selectedItems } = useSelector((state) => state.cart);
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('');

  const selectedProducts = cart.filter(item => selectedItems.includes(item.product.id));
  
  const subtotal = selectedProducts.reduce((acc, item) => {
    return acc + (item.product.price * item.count);
  }, 0);

  const shipping = selectedProducts.length > 0 ? 29.90 : 0;
  const total = subtotal + shipping;

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
    if (value.length === 3) {
      setCvvError('');
    } else {
      setCvvError('CVV 3 haneli olmalıdır');
    }
  };

  const handleSubmit = () => {
    if (cvv.length !== 3) {
      setCvvError('CVV 3 haneli olmalıdır');
      return;
    }
    onCreateOrder(cvv);
  };

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

      <div className="space-y-4">
        {selectedAddress && (
          <div className="text-sm">
            <h3 className="font-semibold text-[#252B42] mb-2">Teslimat Adresi</h3>
            <p className="text-[#737373]">{selectedAddress.title}</p>
            <p className="text-[#737373]">{selectedAddress.name}</p>
            <p className="text-[#737373]">
              {selectedAddress.neighborhood} Mah. {selectedAddress.address}
            </p>
            <p className="text-[#737373]">
              {selectedAddress.district} / {selectedAddress.city}
            </p>
          </div>
        )}

        {selectedCard && (
          <div className="text-sm">
            <h3 className="font-semibold text-[#252B42] mb-2">Ödeme Bilgileri</h3>
            <p className="text-[#737373]">{selectedCard.cardHolderName}</p>
            <p className="text-[#737373]">
              **** **** **** {selectedCard.cardNumber.slice(-4)}
            </p>
            <div className="mt-2">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-[#252B42]"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3"
                placeholder="123"
                className="mt-1 block w-24 rounded-md border bg-gray-50 px-3 py-2 shadow-sm focus:outline-none focus:ring-0 focus:border-[#23A6F0]"
              />
              {cvvError && (
                <p className="mt-1 text-sm text-red-600">{cvvError}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAddress || !selectedCard || selectedProducts.length === 0 || cvv.length !== 3}
        className="w-full mt-6 bg-[#23A6F0] text-white py-3 rounded font-bold hover:bg-[#23A6F0]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ödeme Yap
      </button>
    </div>
  );
} 