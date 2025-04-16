import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions/productThunks';
import { Menu, X, User, ShoppingCart, Heart, Search } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import md5 from 'md5';
import axiosInstance from '../api/axiosInstance';
import { setUser } from '../store/actions/clientActions';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const user = useSelector((state) => state.client.user);
  const isAuthenticated = !!user?.email;

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleLogout = () => {
    dispatch(setUser({}));
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers['Authorization'];
    setIsUserMenuOpen(false);
  };

  const genderedCategories = categories.reduce(
    (acc, category) => {
      const gender = category.gender === 'k' ? 'Kadın' : 'Erkek';
      if (!acc[gender]) acc[gender] = [];
      acc[gender].push(category);
      return acc;
    },
    {}
  );

  return (
    <header className='w-full border-b'>
      {/* Header Top */}
      <div className='hidden lg:flex justify-between items-center bg-[#252B42] text-white text-sm leading-6 font-bold px-8 py-4'>
        <div className="flex items-center gap-6">
          <span>(225) 555-0118</span>
          <span>michelle.rivera@example.com</span>
        </div>
        <div className="text-center">
          <span>Follow Us and get a chance to win 80% off</span>
        </div>
        <div className="flex gap-4">
          <span>Follow Us :</span>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-youtube"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook"></i></a>
          <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-4 md:px-8'>
        <Link to='/' className='text-2xl font-bold text-[#252B42]'>Bandage</Link>

        {/* Sağ ikonlar - Mobil */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User size={16} className="text-gray-600" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2 border-b">
                      <img
                        src={`https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon`}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Giriş Yap / Kayıt Ol
                  </Link>
                )}
              </div>
            )}
          </div>
          <Search size={16} className="text-gray-600" />
          <ShoppingCart size={16} className="text-gray-600" />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-gray-600" /> : <Menu className="text-gray-600" />}
          </button>
        </div>

        <nav className='hidden md:flex gap-6 items-center'>
          <Link to='/' className='text-[#737373] font-bold text-sm hover:underline'>Home</Link>

          <div className="relative group" onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}>
            <span className="cursor-pointer text-[#737373] font-bold text-sm hover:underline">Shop</span>
            <div className={`absolute z-10 flex bg-white shadow-lg p-8 gap-24 left-0 top-full min-w-[300px] ${openDropdown ? 'block' : 'hidden'}`}>
              {Object.entries(genderedCategories).map(([genderName, items]) => (
                <div key={genderName}>
                  <h3 className="font-semibold mb-4 text-[#252B42]">{genderName}</h3>
                  <ul className="space-y-1">
                    {items.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title.toLowerCase()}/${cat.id}`}
                          className="text-[#737373] font-bold text-sm hover:underline"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Link to="/about" className=" text-[#737373] font-bold text-sm hover:underline">About</Link>
          <Link to="/contact" className="text-[#737373] font-bold text-sm hover:underline">Contact</Link>
        </nav>

        {/* Sağ ikonlar */}
        <div className="hidden md:flex gap-4 items-center text-sm text-[#23A6F0]">
          {/*<Link to="/login" className="flex items-center gap-1"><User size={16} /> Login / Register</Link>*/}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <img
                src={`https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon`}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-bold text-[#252B42]">{user.name}</span>

              <button
                onClick={() => {
                  dispatch(setUser({}));
                  localStorage.removeItem('token');
                  delete axiosInstance.defaults.headers['Authorization'];
                }}
                className="text-red-500 text-xs ml-2 underline font-bold"
              >
                Logout
              </button>


            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <User size={16} /> Login / Register
            </Link>
          )}

          <Search size={16} className="text-gray-600 hover:text-black cursor-pointer" />
          <ShoppingCart size={16} className="text-gray-600 hover:text-black cursor-pointer" />
          <Heart size={16} className="text-gray-600 hover:text-black cursor-pointer" />
        </div>

      </div>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 overflow-y-auto max-h-[80vh]">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-6 items-center font-medium text-xl text-[#737373]">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <div className="w-full text-center">
              <div onClick={() => setOpenDropdown(!openDropdown)}>
                <span>Shop</span>
              </div>
              {openDropdown && (
                <div className="pl-4 space-y-4 mt-4 bg-gray-50 py-4 rounded-lg border border-gray-100 mx-4 ">
                  {Object.entries(genderedCategories).map(([genderName, items]) => (
                    <div key={genderName} className="space-y-2">
                      <h3 className="text-[#252B42] font-medium border-b border-gray-200 pb-2 mx-4">{genderName}</h3>
                      <div className="pl-2 space-y-2">
                        {items.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title.toLowerCase()}/${cat.id}`}
                            className="block text-[#737373]"
                            onClick={() => setIsOpen(false)}
                          >
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}

    </header>
  )
}
