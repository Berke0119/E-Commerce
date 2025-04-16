// pages/LoginPage.jsx
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/authThunk';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    const response = await dispatch(loginUser(data));

    if (response.success) {
      toast.success('Giriş başarılı!');
      const redirectTo = location.state?.from || '/';
      setTimeout(() => navigate(redirectTo), 1000);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Giriş Yap</h2>
        <p className="text-center mb-6">Hesabınız yok mu? <Link to="/signup" className="text-blue-500">Hesap Oluştur</Link></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-posta"
              {...register('email', { required: 'E-posta zorunludur' })}
              className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifre"
              {...register('password', { required: 'Şifre zorunludur' })}
              className="w-full p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('rememberMe')} />
              Beni hatırla
            </label>
            <a href="#" className="text-blue-500">Şifremi unuttum?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
