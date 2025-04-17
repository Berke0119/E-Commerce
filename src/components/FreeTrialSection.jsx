import React from 'react';

export default function FreeTrialSection() {
  return (
    <section className="w-full bg-white py-16 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#252B42]">
        Start your <span className="text-[#252B42]">14 days free trial</span>
      </h2>
      <p className="text-[#737373] mt-4 max-w-xl mx-auto text-sm md:text-base">
        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
      </p>

      <button className="mt-6 bg-[#23A6F0] text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition">
        Try it free now
      </button>

      <div className="flex justify-center items-center gap-6 mt-8 text-xl text-[#252B42]">
        <a href="#" className="hover:text-blue-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-blue-600">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="hover:text-pink-500">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-blue-700">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </section>
  );
}
