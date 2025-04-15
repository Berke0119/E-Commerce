import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TopCategories = () => {
  const categories = useSelector((state) => state.product.categories);

  // En yüksek rating'e göre ilk 5 kategori
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="px-4 md:px-20 py-10 bg-[#FAFAFA]">
      <div className="flex flex-col justify-center gap-8 md:flex-row items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#252B42]">Shop</h2>
        <div className="font-bold text-sm text-[#BDBDBD]"><Link to="/" className="text-[#252B42] hover:text-[#23856D]">Home</Link> &gt; Shop</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topCategories.map((cat) => (
          <Link
            to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title.toLowerCase()}/${cat.id}`}
            key={cat.id}
            className="relative group rounded overflow-hidden cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.title}
              loading="lazy"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white font-semibold text-lg">
              {cat.gender === 'k' ? `Kadın ${cat.title}` : `Erkek ${cat.title}`}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
