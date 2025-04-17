import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, X } from 'lucide-react';
import { removeFromCart, updateCartItemQuantity, setSelectedItems } from '../../store/actions/cartActions';

export default function CartTable() {
  const dispatch = useDispatch();
  const { cart, selectedItems } = useSelector((state) => state.cart);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity(productId, newQuantity));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckboxChange = (productId) => {
    const newSelectedItems = selectedItems.includes(productId)
      ? selectedItems.filter(id => id !== productId)
      : [...selectedItems, productId];
    dispatch(setSelectedItems(newSelectedItems));
  };

  const handleSelectAll = (e) => {
    const newSelectedItems = e.target.checked ? cart.map(item => item.product.id) : [];
    dispatch(setSelectedItems(newSelectedItems));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                checked={selectedItems.length === cart.length && cart.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#252B42] uppercase tracking-wider">
              Ürün
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#252B42] uppercase tracking-wider">
              Fiyat
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#252B42] uppercase tracking-wider">
              Adet
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#252B42] uppercase tracking-wider">
              Toplam
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#252B42] uppercase tracking-wider">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cart.map((item) => (
            <tr key={item.product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedItems.includes(item.product.id)}
                  onChange={() => handleCheckboxChange(item.product.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    className="h-16 w-16 object-cover rounded" 
                    src={item.product.images[0].url} 
                    alt={item.product.name} 
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-[#252B42]">{item.product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#252B42]">{item.product.price.toFixed(2)} TL</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center border rounded w-fit">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                    className="p-1 hover:bg-gray-100"
                    disabled={item.count <= 1}
                  >
                    <Minus size={16} className="text-[#737373]" />
                  </button>
                  <span className="px-4 py-1 text-sm font-medium text-[#252B42]">{item.count}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <Plus size={16} className="text-[#737373]" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-[#23A6F0]">
                  {(item.product.price * item.count).toFixed(2)} TL
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="text-[#737373] hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 