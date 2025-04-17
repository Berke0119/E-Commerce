import React from 'react'

export default function ContactTopSection() {
  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white relative overflow-hidden">
      {/* Sol metin alanı */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="space-y-6 z-10 text-center md:text-left md:flex-1">
          <p className="text-base font-bold text-[#252B42]">CONTACT US</p>
          <h2 className="text-6xl font-bold text-[#252B42]">Get in touch with today!</h2>
          <p className="text-[#737373] text-xl max-w-[320px] mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale
          </p>
          <div className="flex flex-col gap-2 justify-center md:justify-start">
            <p className='text-[#252B42] text-2xl max-w-[320px] mx-auto md:mx-0'>Phone: +451 215 215</p>
            <p className='text-[#252B42] text-2xl max-w-[320px] mx-auto md:mx-0'>Fax: +451 215 215</p>
          </div>
        </div>

        {/* Sağ görsel alanı */}
        <div className="relative w-full md:w-1/2 flex justify-center mt-10 md:mt-0 md:-ml-10">
          {/* Baloncuklar */}
          <div className="absolute w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[400px] xl:h-[400px] bg-[#FFE9EA] 
          rounded-full top-0 right-[20%] z-0"></div>
          <div className="absolute w-3 h-3 bg-[#977DF4] rounded-full bottom-[20%] left-[10%] z-0"></div>
          <div className="absolute w-[40px] h-[40px] bg-[#FFE9EA] rounded-full top-0 left-[10%] z-0"></div>
          <div className="absolute w-3 h-3 bg-[#977DF4] rounded-full top-[20%] right-[15%] z-0"></div>
          <div className="absolute w-5 h-5 bg-[#FFE9EA] rounded-full top-[50%] right-[12%] z-0"></div>
          {/* Kadın resmi */}
          <img
            src="/contact.png"
            alt="Contact us"
            className="w-full max-w-3xl z-10"
          />
        </div>
      </div>
    </section>
  )
}
