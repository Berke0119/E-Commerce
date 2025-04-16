import React from 'react';

export default function AboutTopSection() {
  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white relative overflow-hidden">
      {/* Sol metin alanı */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        <div className="space-y-6 z-10 text-center md:text-left">
          <p className="text-base font-bold text-[#252B42]">ABOUT COMPANY</p>
          <h2 className="text-6xl font-bold text-[#252B42]">ABOUT US</h2>
          <p className="text-[#737373] text-xl max-w-[320px] mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-[#23A6F0] text-white px-5 py-3 rounded-md hover:bg-blue-600 transition">
              Get Quote Now
            </button>
          </div>
        </div>

        {/* Sağ görsel alanı */}
        <div className="relative w-full flex justify-center mt-10 md:mt-0">
          {/* Baloncuklar */}
          <div className="absolute w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[400px] xl:h-[400px] bg-[#FFE9EA] 
          rounded-full top-0 right-[20%] z-0"></div>
          <div className="absolute w-3 h-3 bg-[#977DF4] rounded-full bottom-[20%] left-[10%] z-0"></div>
          <div className="absolute w-[40px] h-[40px] bg-[#FFE9EA] rounded-full top-0 left-[10%] z-0"></div>
          <div className="absolute w-3 h-3 bg-[#977DF4] rounded-full top-[20%] right-[15%] z-0"></div>
          <div className="absolute w-5 h-5 bg-[#FFE9EA] rounded-full top-[50%] right-[12%] z-0"></div>
          {/* Kadın resmi */}
          <img
            src="/about.png"
            alt="About us"
            className="w-full max-w-3xl z-10"
          />
        </div>
      </div>
    </section>
  );
}
