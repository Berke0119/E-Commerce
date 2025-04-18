import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    title: yup.string().required('Adres başlığı zorunludur'),
    name: yup.string().required('Ad Soyad zorunludur'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz')
      .required('Telefon numarası zorunludur'),
    city: yup.string().required('Şehir seçimi zorunludur'),
    district: yup.string().required('İlçe zorunludur'),
    neighborhood: yup.string().required('Mahalle zorunludur'),
    address: yup.string().required('Adres detayı zorunludur'),
  })
  .required();

const cities = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Şanlıurfa',
  'Mersin',
  'Diyarbakır',
  'Hatay',
  'Manisa',
  'Kocaeli',
  'Samsun',
  'Balıkesir',
  'Kahramanmaraş',
  'Van',
  'Aydın',
  'Denizli',
];

function AddressForm({ onSubmit, initialData, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: '',
      name: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: '',
    },
  });

  // Ortak input sınıfları
  const baseInputClasses =
    'mt-1 block w-full rounded-md border bg-gray-50 px-3 py-2 shadow-sm ' +
    'focus:outline-none focus:ring-0 focus:border-[#23A6F0]';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Adres Başlığı */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#252B42]"
          >
            Adres Başlığı
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={baseInputClasses}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Ad Soyad */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#252B42]"
          >
            Ad Soyad
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={baseInputClasses}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#252B42]"
          >
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="5XX XXX XXXX"
            {...register('phone')}
            className={baseInputClasses}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Şehir */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-[#252B42]"
          >
            İl
          </label>
          <select
            id="city"
            {...register('city')}
            className={baseInputClasses}
          >
            <option value="">Şehir Seçiniz</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* İlçe */}
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-[#252B42]"
          >
            İlçe
          </label>
          <input
            id="district"
            type="text"
            {...register('district')}
            className={baseInputClasses}
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* Mahalle */}
        <div>
          <label
            htmlFor="neighborhood"
            className="block text-sm font-medium text-[#252B42]"
          >
            Mahalle
          </label>
          <input
            id="neighborhood"
            type="text"
            {...register('neighborhood')}
            className={baseInputClasses}
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-600">
              {errors.neighborhood.message}
            </p>
          )}
        </div>
      </div>

      {/* Adres Detayı */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-[#252B42]"
        >
          Adres Detayı
        </label>
        <textarea
          id="address"
          rows={4}
          {...register('address')}
          placeholder="Sokak, bina ve kapı numarası"
          className={baseInputClasses}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Butonlar */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-[#737373] hover:text-[#252B42]"
        >
          İptal
        </button>
        <button
          type="submit"
          className="bg-[#23A6F0] text-white px-4 py-2 rounded font-medium hover:bg-[#23A6F0]/90 transition"
        >
          {initialData ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
