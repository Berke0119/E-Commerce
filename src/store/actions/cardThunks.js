import axiosInstance from '../../api/axiosInstance';
import { setCardList } from './clientActions';

// Kartları getir
export const fetchCards = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/user/card');
    // API'den gelen veriyi düzenle
    const formattedCards = response.data.map(card => ({
      id: card.id,
      cardNumber: card.card_no,
      cardHolderName: card.name_on_card,
      expiryMonth: card.expire_month,
      expiryYear: card.expire_year,
    }));
    dispatch(setCardList(formattedCards));
  } catch (error) {
    console.error('Kart listesi alınamadı:', error);
  }
};

// Yeni kart ekle
export const addCard = (cardData) => async (dispatch) => {
  try {
    // API'ye gönderilecek veriyi düzenle
    const apiCardData = {
      card_no: cardData.cardNumber,
      name_on_card: cardData.cardHolderName,
      expire_month: cardData.expiryMonth,
      expire_year: cardData.expiryYear,
    };
    const response = await axiosInstance.post('/user/card', apiCardData);
    dispatch(fetchCards());
    return response.data;
  } catch (error) {
    console.error('Kart eklenirken hata:', error);
    throw error;
  }
};

// Kart güncelle
export const updateCard = (cardData) => async (dispatch) => {
  try {
    // API'ye gönderilecek veriyi düzenle
    const apiCardData = {
      id: cardData.id,
      card_no: cardData.cardNumber,
      name_on_card: cardData.cardHolderName,
      expire_month: cardData.expiryMonth,
      expire_year: cardData.expiryYear,
    };
    const response = await axiosInstance.put('/user/card', apiCardData);
    dispatch(fetchCards());
    return response.data;
  } catch (error) {
    console.error('Kart güncellenirken hata:', error);
    throw error;
  }
};

// Kart sil
export const deleteCard = (cardId) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`/user/card/${cardId}`);
    dispatch(fetchCards());
    return response.data;
  } catch (error) {
    console.error('Kart silinirken hata:', error);
    throw error;
  }
};