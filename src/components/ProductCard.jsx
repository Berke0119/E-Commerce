import { Link } from 'react-router-dom';
import { generateProductURL } from '../utils/productURLUtils';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {

  const { categories } = useSelector((state) => state.product);

  const url = generateProductURL(product, categories);

  return (
    <Link to={url} className="block cursor-pointer hover:scale-105 transition duration-300">
      <div className="border overflow-hidden text-center shadow hover:shadow-md transition duration-300 md:min-h-[500px] lg:min-h-[600px]">
        <img
          loading='lazy'  
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-auto object-cover mb-4"
        />
        <h3 className="font-bold text-sm text-[#252B42]">{product.name}</h3>
        <p className="font-bold text-sm text-[#737373] mb-2">{product.description}</p>
        <div className="text-sm mb-2">
          <span className="text-gray-400 line-through mr-2">
            ${(product.price * 1.5).toFixed(2)}
          </span>
          <span className="text-[#23856D] font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-center gap-1 mt-2 mb-4">
          {['bg-cyan-500', 'bg-orange-500', 'bg-red-600', 'bg-black'].map((color, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full ${color}`}></div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
