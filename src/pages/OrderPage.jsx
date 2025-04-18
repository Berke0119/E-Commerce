import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { fetchAddressList, addAddress, updateAddress, deleteAddress } from '../store/actions/addressThunks';
import { fetchCards, addCard, updateCard, deleteCard } from '../store/actions/cardThunks';
import { setCart, setSelectedItems } from '../store/actions/cartActions';
import AddressForm from '../components/order/AddressForm';
import AddressList from '../components/order/AddressList';
import CardForm from '../components/order/CardForm';
import CardList from '../components/order/CardList';
import OrderSummary from '../components/order/OrderSummary';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addressList, cardList } = useSelector((state) => state.client);
  const { cart, selectedItems } = useSelector((state) => state.cart);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchAddressList());
    dispatch(fetchCards());
  }, [dispatch]);

  // Adres işlemleri
  const handleAddAddress = async (addressData) => {
    try {
      dispatch(addAddress(addressData));
      setShowAddressForm(false);
      setSelectedAddress(null);
    } catch (error) {
      console.error('Adres eklenirken hata oluştu:', error);
    }
  };

  const handleUpdateAddress = async (addressData) => {
    try {
      await dispatch(updateAddress(addressData));
      setShowAddressForm(false);
      setSelectedAddress(null);
    } catch (error) {
      console.error('Adres güncellenirken hata oluştu:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      dispatch(deleteAddress(addressId));
      if (selectedAddress?.id === addressId) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error('Adres silinirken hata oluştu:', error);
    }
  };

  // Kart işlemleri
  const handleAddCard = async (cardData) => {
    try {
      dispatch(addCard(cardData));
      setShowCardForm(false);
      setSelectedCard(null);
    } catch (error) {
      console.error('Kart eklenirken hata oluştu:', error);
    }
  };

  const handleUpdateCard = async (cardData) => {
    try {
      await dispatch(updateCard(cardData));
      setShowCardForm(false);
      setSelectedCard(null);
    } catch (error) {
      console.error('Kart güncellenirken hata oluştu:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await dispatch(deleteCard(cardId));
      if (selectedCard?.id === cardId) {
        setSelectedCard(null);
      }
    } catch (error) {
      console.error('Kart silinirken hata oluştu:', error);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    console.log(card);
  };

  const handleCreateOrder = async (cvv) => {
    if (!cvv) {
      toast.error('Lütfen CVV numarasını giriniz', );
      return;
    }

    const selectedProducts = cart.filter(item => selectedItems.includes(item.product.id));
    
    const orderData = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: Number(selectedCard.cardNumber),
      card_name: selectedCard.cardHolderName,
      card_expire_month: selectedCard.expiryMonth,
      card_expire_year: selectedCard.expiryYear,
      card_ccv: Number(cvv),
      price: selectedProducts.reduce((acc, item) => acc + (item.product.price * item.count), 0),
      products: selectedProducts.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.name || ''
      }))
    };

    try {
      await axiosInstance.post('/order', orderData);
      // Sepeti ve seçili ürünleri sıfırla
      dispatch(setCart([]));
      dispatch(setSelectedItems([]));
      // Başarılı sipariş mesajı göster
      
        toast.success('Siparişiniz başarıyla oluşturuldu!');
      
      // Ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Sipariş oluşturulurken hata:', error);
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#252B42] mb-8">Sipariş Detayları</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-[#F8F9FA] p-1">
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected 
                  ? 'bg-white text-[#252B42] shadow'
                  : 'text-[#737373] hover:bg-white/[0.12] hover:text-[#252B42]'
                }`
              }>
                Adres Bilgileri
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected 
                  ? 'bg-white text-[#252B42] shadow'
                  : 'text-[#737373] hover:bg-white/[0.12] hover:text-[#252B42]'
                }`
              }>
                Ödeme Bilgileri
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-8">
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-[#252B42]">Adres Seçimi</h2>
                    <button
                      onClick={() => {
                        setShowAddressForm(true);
                        setSelectedAddress(null);
                      }}
                      className="bg-[#23A6F0] text-white px-4 py-2 rounded font-medium hover:bg-[#23A6F0]/90 transition"
                    >
                      Yeni Adres Ekle
                    </button>
                  </div>

                  {showAddressForm ? (
                    <AddressForm
                      onSubmit={selectedAddress ? handleUpdateAddress : handleAddAddress}
                      initialData={selectedAddress}
                      onCancel={() => {
                        setShowAddressForm(false);
                        setSelectedAddress(null);
                      }}
                    />
                  ) : (
                    <AddressList
                      addresses={addressList}
                      selectedAddress={selectedAddress}
                      onSelect={handleSelectAddress}
                      onEdit={(address) => {
                        setSelectedAddress(address);
                        setShowAddressForm(true);
                      }}
                      onDelete={handleDeleteAddress}
                    />
                  )}
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-[#252B42]">Kart Bilgileri</h2>
                    <button
                      onClick={() => {
                        setShowCardForm(true);
                        setSelectedCard(null);
                      }}
                      className="bg-[#23A6F0] text-white px-4 py-2 rounded font-medium hover:bg-[#23A6F0]/90 transition"
                    >
                      Yeni Kart Ekle
                    </button>
                  </div>

                  {showCardForm ? (
                    <CardForm
                      onSubmit={selectedCard ? handleUpdateCard : handleAddCard}
                      initialData={selectedCard}
                      onCancel={() => {
                        setShowCardForm(false);
                        setSelectedCard(null);
                      }}
                    />
                  ) : (
                    <CardList
                      cards={cardList}
                      selectedCard={selectedCard}
                      onSelect={handleSelectCard}
                      onEdit={(card) => {
                        setSelectedCard(card);
                        setShowCardForm(true);
                      }}
                      onDelete={handleDeleteCard}
                    />
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            selectedAddress={selectedAddress}
            selectedCard={selectedCard}
            onCreateOrder={handleCreateOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;