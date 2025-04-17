// components/AboutWorkWithUs.jsx
import React from 'react';

export default function AboutWorkWithUs() {
  return (
    <section className="w-full flex flex-col lg:flex-row">
      {/* Sol Mavi Alan */}
      <div className="bg-blue-600 text-white flex-1 flex flex-col justify-center items-center lg:items-center px-6 py-16 sm:px-20 sm:py-24 lg:p-20 xl:p-32">
        <div className="w-full max-w-xl">
          <p className="uppercase text-sm tracking-wide mb-2 text-center lg:text-left">Work with us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">Now Let's grow Yours</h2>
          <p className="mb-6 text-sm leading-relaxed text-center lg:text-left">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="border border-white px-6 py-2 text-sm font-semibold rounded hover:bg-white hover:text-blue-600 transition">
              Button
            </button>
          </div>
        </div>
      </div>

      {/* Sağ Görsel */}
      <div className="hidden lg:block lg:w-1/2 xl:w-1/3">
        <img
          src="/about-right.jpg" 
          alt="About Right"
          className="w-full h-full object-cover min-h-[400px] xl:max-h-[600px] xl:object-fill"
        />
      </div>
    </section>
  );
}
