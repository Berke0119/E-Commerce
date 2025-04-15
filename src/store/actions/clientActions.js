export const setUser = (payload) => ({ type: 'SET_USER', payload });
export const setRoles = (payload) => ({ type: 'SET_ROLES', payload });
export const setTheme = (payload) => ({ type: 'SET_THEME', payload });
export const setLanguage = (payload) => ({ type: 'SET_LANGUAGE', payload });

// Thunk action (roles gibi API'den çekilecek veri için örnek)
export const fetchRoles = () => async (dispatch) => {
  try {
    // await axios vs. burada kullanılacak
    const roles = ['admin', 'user']; // mock data
    dispatch(setRoles(roles));
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};
