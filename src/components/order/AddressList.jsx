import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function AddressList({ addresses, onEdit, onDelete }) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#737373]">Henüz kayıtlı adresiniz bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#252B42]">{address.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(address)}
                className="p-1.5 text-[#737373] hover:text-[#23A6F0] rounded-full hover:bg-gray-100"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(address.id)}
                className="p-1.5 text-[#737373] hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#737373]">
            <p className="font-medium text-[#252B42]">{address.name}</p>
            <p>{address.phone}</p>
            <p>
              {address.neighborhood} Mah. {address.address}
            </p>
            <p>
              {address.district} / {address.city}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddressList; 