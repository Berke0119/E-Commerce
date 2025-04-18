import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { fetchAddressList, addAddress, updateAddress, deleteAddress } from '../store/actions/addressThunks';
import AddressForm from '../components/order/AddressForm';
import AddressList from '../components/order/AddressList';

function OrderPage() {
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.client);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);

  const handleAddAddress = async (addressData) => {
    try {
      await dispatch(addAddress(addressData));
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
      await dispatch(deleteAddress(addressId));
    } catch (error) {
      console.error('Adres silinirken hata oluştu:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#252B42] mb-8">Sipariş Detayları</h1>
      
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
            <div className="p-4">
              <p className="text-[#737373]">Ödeme bilgileri yakında eklenecek...</p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default OrderPage; 