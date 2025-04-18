import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  cardHolderName: yup.string().required('Kart sahibi adı zorunludur'),
  cardNumber: yup
    .string()
    .matches(/^[0-9]{16}$/, 'Geçerli bir kart numarası giriniz')
    .required('Kart numarası zorunludur'),
  expiryMonth: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])$/, 'Geçerli bir ay giriniz (01-12)')
    .required('Son kullanma ayı zorunludur'),
  expiryYear: yup
    .string()
    .matches(/^20[2-9][0-9]$/, 'Geçerli bir yıl giriniz (2024-2099)')
    .required('Son kullanma yılı zorunludur'),
});

function CardForm({ onSubmit, initialData, onCancel}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      cardHolderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const baseInputClasses =
    'mt-1 block w-full rounded-md border bg-gray-50 px-3 py-2 shadow-sm ' +
    'focus:outline-none focus:ring-0 focus:border-[#23A6F0]';

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      {/* Kart Sahibi */}
      <div>
        <label
          htmlFor="cardHolderName"
          className="block text-sm font-medium text-[#252B42]"
        >
          Kart Sahibi
        </label>
        <input
          id="cardHolderName"
          type="text"
          {...register('cardHolderName')}
          className={baseInputClasses}
        />
        {errors.cardHolderName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.cardHolderName.message}
          </p>
        )}
      </div>

      {/* Kart Numarası */}
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-[#252B42]"
        >
          Kart Numarası
        </label>
        <input
          id="cardNumber"
          type="text"
          maxLength="16"
          placeholder="1234567890123456"
          {...register('cardNumber')}
          className={baseInputClasses}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Son Kullanma Tarihi */}
        <div>
          <label
            htmlFor="expiryMonth"
            className="block text-sm font-medium text-[#252B42]"
          >
            Son Kullanma Ay
          </label>
          <input
            id="expiryMonth"
            type="text"
            maxLength="2"
            placeholder="MM"
            {...register('expiryMonth')}
            className={baseInputClasses}
          />
          {errors.expiryMonth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.expiryMonth.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="expiryYear"
            className="block text-sm font-medium text-[#252B42]"
          >
            Son Kullanma Yıl
          </label>
          <input
            id="expiryYear"
            type="text"
            maxLength="4"
            placeholder="YYYY"
            {...register('expiryYear')}
            className={baseInputClasses}
          />
          {errors.expiryYear && (
            <p className="mt-1 text-sm text-red-600">
              {errors.expiryYear.message}
            </p>
          )}
        </div>
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

export default CardForm;