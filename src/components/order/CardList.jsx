import React from 'react';
import { Pencil, Trash2, CreditCard } from 'lucide-react';

function CardList({ cards, selectedCard, onSelect, onEdit, onDelete }) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#737373]">Henüz kayıtlı kartınız bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer
            ${selectedCard?.id === card.id ? 'ring-2 ring-[#23A6F0]' : ''}`}
          onClick={() => onSelect(card)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="text-[#23A6F0]" size={20} />
              <h3 className="text-lg font-semibold text-[#252B42]">
                **** {String(card.cardNumber || '').slice(-4)}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
                className="p-1.5 text-[#737373] hover:text-[#23A6F0] rounded-full hover:bg-gray-100"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="p-1.5 text-[#737373] hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#737373]">
            <p className="font-medium text-[#252B42]">{card.cardHolderName}</p>
            <p>Son Kullanma: {card.expiryMonth || '--'}/{card.expiryYear || '--'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardList;
