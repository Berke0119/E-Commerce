import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CreditCard, Package, Calendar, MapPin, User } from 'lucide-react';

export default function OrderHistoryPage() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axiosInstance.get('/order');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Siparişler yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#252B42] mb-8">Sipariş Geçmişi</h1>
        <div className="text-center py-12">
          <p className="text-[#737373]">Henüz siparişiniz bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#252B42] mb-8">Sipariş Geçmişi</h1>
      
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Sipariş Başlığı */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <Package size={18} className="text-[#23A6F0]" />
                  <span className="font-medium text-[#252B42]">Sipariş #{order.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#737373]" />
                  <span className="text-sm text-[#737373]">
                    {format(new Date(order.order_date), 'dd MMMM yyyy', { locale: tr })}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Sipariş Detayları */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Ödeme Bilgileri */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard size={18} className="text-[#23A6F0]" />
                    <h3 className="font-medium text-[#252B42]">Ödeme Bilgileri</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-[#737373]">
                      Kart Sahibi: <span className="text-[#252B42]">{order.card_name}</span>
                    </p>
                    <p className="text-[#737373]">
                      Kart Numarası: <span className="text-[#252B42]">**** **** **** {String(order.card_no).slice(-4)}</span>
                    </p>
                    <p className="text-[#737373]">
                      Son Kullanma: <span className="text-[#252B42]">{order.card_expire_month}/{order.card_expire_year}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Ürünler */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-[#252B42] mb-4">Ürünler</h3>
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      {product.images && product.images.length > 0 && (
                        <img 
                          src={product.images[0].url} 
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-[#252B42]">{product.name}</h4>
                        <p className="text-sm text-[#737373] mt-1">{product.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-[#737373]">Adet: {product.count}</p>
                          <p className="font-medium text-[#23A6F0]">{product.price.toFixed(2)} TL</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Toplam */}
              <div className="border-t mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#252B42]">Toplam Tutar</span>
                  <span className="font-bold text-xl text-[#23A6F0]">
                    {order.products.reduce((total, product) => total + (product.count * product.price), 0).toFixed(2)} TL
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
