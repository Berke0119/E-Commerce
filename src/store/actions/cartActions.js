export const setCart = (payload) => ({ type: 'SET_CART', payload });
export const setPayment = (payload) => ({ type: 'SET_PAYMENT', payload });
export const setAddress = (payload) => ({ type: 'SET_ADDRESS', payload });
export const removeFromCart = (productId) => ({ type: 'REMOVE_FROM_CART', payload: productId });
export const updateCartItemQuantity = (productId, quantity) => ({ 
  type: 'UPDATE_CART_ITEM_QUANTITY', 
  payload: { productId, quantity } 
});
export const setSelectedItems = (selectedIds) => ({ 
  type: 'SET_SELECTED_ITEMS', 
  payload: selectedIds 
});
