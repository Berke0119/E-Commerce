import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const phoneRegex = /^(\+90|0)?5\d{9}$/;
const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
const taxNoRegex = /^T\d{10}$/;

const baseSchema = {
  name: yup.string().required('İsim zorunludur').min(3, 'İsim en az 3 karakter olmalıdır'),
  email: yup.string().required('E-posta zorunludur').email('Geçerli bir e-posta adresi giriniz'),
  password: yup
    .string()
    .required('Şifre zorunludur')
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/\d/, 'Şifre en az bir rakam içermelidir')
    .matches(/[^a-zA-Z0-9]/, 'Şifre en az bir özel karakter içermelidir'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Şifreler uyuşmuyor'),
  role_id: yup.string().required('Rol seçimi zorunludur'),
};

const storeSchema = {
  store: yup.object().shape({
    name: yup.string().required('Mağaza adı zorunludur').min(3, 'Mağaza adı en az 3 karakter olmalıdır'),
    phone: yup.string().matches(phoneRegex, 'Geçerli bir telefon numarası giriniz'),
    tax_no: yup.string().matches(taxNoRegex, 'Geçerli bir vergi numarası giriniz'),
    bank_account: yup.string().matches(ibanRegex, 'Geçerli bir IBAN giriniz'),
  }),
};

const fetchRoles = async () => {
  try {
    const res = await axiosInstance.get('/roles');
    return res.data;
  } catch (err) {
    console.error('Roles fetch failed:', err);
  }
}



export default function SignupPage() {
  const [selectedRoleCode, setSelectedRoleCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');


  const schema = yup.object().shape({
    ...baseSchema,
    ...(selectedRoleCode === '2' ? storeSchema : {}),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { data: roles, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (roles && roles.length > 0) {
      const customer = roles.find((r) => r.code === 'customer');
      if (customer) {
        setValue('role_id', customer.id.toString());
        setSelectedRoleCode(customer.code); // ✅ HATA VERMEZ
      }
    }
  }, [roles, setValue]);

  // onSubmit FONKSİYONUNU GÜNCELLE
  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      const payload =
        selectedRoleCode === 'store'
          ? {
            name: data.name,
            email: data.email,
            password: data.password,
            role_id: data.role_id,
            store: data.store,
          }
          : {
            name: data.name,
            email: data.email,
            password: data.password,
            role_id: data.role_id,
          };

      await axiosInstance.post('/signup', payload);
      toast.success('Hesabınız başarıyla oluşturuldu! Lütfen e-postanızı kontrol edin.', {
        onClose: () => {
          window.history.back(); 
        },
        autoClose: 3000, 
      });
    } catch (err) {
      const message =
        err.response?.data?.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white p-8 shadow rounded">
        <h2 className="text-2xl font-bold text-center mb-4">Hesap Oluştur</h2>
        <p className="text-center text-gray-500 mb-4">Zaten bir hesabınız var mı? <Link to="/login" className="text-blue-500 hover:text-blue-600">Giriş yap</Link></p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name')}
              placeholder="Adınız"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('email')}
              placeholder="E-posta"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Şifre"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Şifre tekrar"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <select
              {...register('role_id')}
              onChange={(e) => setSelectedRoleCode(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? <option value="">Rol yükleniyor...</option> :
                roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
            </select>
            {errors.role_id && <p className="text-red-500 text-sm mt-1">{errors.role_id.message}</p>}
          </div>

          {selectedRoleCode === '2' && (
            <div className="p-4 bg-gray-50 border rounded space-y-3">
              <div>
                <input
                  {...register('store.name')}
                  placeholder="Mağaza Adı"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.store?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('store.phone')}
                  placeholder="Telefon"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.store?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.phone.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('store.tax_no')}
                  placeholder="Vergi No"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.store?.tax_no && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.tax_no.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('store.bank_account')}
                  placeholder="IBAN"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.store?.bank_account && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.bank_account.message}</p>
                )}
              </div>
            </div>
          )}

          {serverError && (
            <p className="text-red-500 text-sm mt-2 text-center">{serverError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Kaydoluyor...' : 'Kaydol'}
          </button>
        </form>
      </div>
    </div>
  );
}
