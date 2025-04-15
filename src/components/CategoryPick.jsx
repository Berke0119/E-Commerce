import { useNavigate } from 'react-router-dom';

export default function CategoryPick() {
  const navigate = useNavigate();

  return (
    <section className='py-12 px-4 md:px-8 lg:px-20'>
      <div className='text-center mb-12'>
        <h2 className='text-2xl font-bold mb-2 text-[#252B42]'>EDITOR'S PICK</h2>
        <p className='font-medium text-[#737373] text-sm'>
          Problems trying to resolve the conflict between 
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-5 justify-center">
        {/* Sol büyük görsel - MEN */}
        <div 
          onClick={() => navigate('/shop/erkek')}
          className="relative cursor-pointer overflow-hidden w-full md:w-auto"
        >
          <img
            src="/pick-men.jpg"
            alt="MEN"
            className="h-[600px] object-cover object-top hover:scale-105 transition duration-300 w-full md:w-auto"
          />
          <div className="absolute bottom-6 left-6 bg-white py-2 px-8 md:px-4 lg:px-8 md:py-1.5 lg:py-2">
            <span className="text-[#252B42] text-base md:text-xs lg:text-base font-bold tracking-wider">
              MEN
            </span>
          </div>
        </div>

        {/* Orta görsel - WOMEN */}
        <div
          onClick={() => navigate('/shop/kadin')}
          className="relative cursor-pointer overflow-hidden w-full md:w-[300px]"
        >
          <img
            src="/pick-women.jpg"
            alt="WOMEN"
            className="h-[600px] object-cover object-top hover:scale-105 transition duration-300 w-full md:w-auto"
          />
          <div className="absolute bottom-6 left-6 bg-white py-2 px-8 md:px-4 lg:px-8 md:py-1.5 lg:py-2">
            <span className="text-[#252B42] text-base md:text-xs lg:text-base font-bold tracking-wider">
              WOMEN
            </span>
          </div>
        </div>

        {/* Sağ üst-alt görseller */}
        <div className="flex flex-col gap-5 w-full md:w-auto">
          {/* ACCESSORIES */}
          <div
            onClick={() => navigate('/shop/aksesuar')}
            className="relative cursor-pointer overflow-hidden"
          >
            <img
              src="/pick-accessories.jpg"
              alt="ACCESSORIES"
              className="h-[290px] object-cover object-top hover:scale-105 transition duration-300 w-full md:w-auto"
            />
            <div className="absolute bottom-6 left-6 bg-white py-2 px-6 md:px-3 lg:px-6 md:py-1.5 lg:py-2">
              <span className="text-[#252B42] text-base md:text-xs lg:text-base font-bold tracking-wider">
                ACCESSORIES
              </span>
            </div>
          </div>

          {/* KIDS */}
          <div
            onClick={() => navigate('/shop/cocuk')}
            className="relative cursor-pointer overflow-hidden"
          >
            <img
              src="/pick-kids.jpg"
              alt="KIDS"
              className="h-[290px] object-cover object-top hover:scale-105 transition duration-300 w-full md:w-auto"
            />
            <div className="absolute bottom-6 left-6 bg-white py-2 px-6 md:px-3 lg:px-6 md:py-1.5 lg:py-2">
              <span className="text-[#252B42] text-base md:text-xs lg:text-base font-bold tracking-wider">
                KIDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
