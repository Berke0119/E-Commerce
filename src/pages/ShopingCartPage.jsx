import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from '../components/cart/CartTable';
import CartSummary from '../components/cart/CartSummary';

export default function ShopingCartPage() {
  const { cart } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl font-bold text-[#252B42] text-center">
          Sepetinizde ürün bulunmamaktadır
        </h1>
        <p className="text-[#737373] text-center">
          Alışverişe başlamak için aşağıdaki butonu kullanabilirsiniz.
        </p>
        <Link
          to="/shop"
          className="bg-[#23A6F0] text-white px-8 py-3 rounded font-bold hover:bg-[#23A6F0]/90 transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#252B42]">Sepetim</h1>
        <div className="text-sm font-bold">
          <Link to="/" className="text-[#252B42]">Ana Sayfa</Link>
          <span className="text-[#BDBDBD] mx-2">/</span>
          <span className="text-[#BDBDBD]">Sepetim</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <CartTable />
        </div>
        <div className="lg:w-80">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
