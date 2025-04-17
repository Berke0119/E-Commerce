const initialState = {
  cart: [],
  payment: {},
  address: {},
  selectedItems: [], // Seçili ürün ID'leri
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART': {
      const newItem = action.payload;
      // Aynı ürünü bul
      const existing = state.cart.find(
        (ci) => ci.product.id === newItem.product.id
      );
      if (existing) {
        // Varsa sayıyı artır, dizi öğesini güncelle
        return {
          ...state,
          cart: state.cart.map((ci) =>
            ci.product.id === newItem.product.id
              ? { ...ci, count: ci.count + newItem.count }
              : ci
          ),
        };
      } else {
        // Yoksa yeni satır ekle
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    }
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
        selectedItems: state.selectedItems.filter(id => id !== action.payload)
      };
    case 'SET_SELECTED_ITEMS':
      return {
        ...state,
        selectedItems: action.payload
      };
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
