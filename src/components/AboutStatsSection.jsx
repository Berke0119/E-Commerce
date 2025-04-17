import React from 'react';

export default function AboutStatsSection() {
  return (
    <section className="w-full px-6 md:px-20 py-20 bg-white">
      {/* Üst kısım metin */}
      <p className="text-sm text-[#E74040] font-normal mb-2 max-w-6xl mx-auto text-center md:text-left">Problems trying</p>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start gap-4 mb-28">
        <h3 className="text-2xl font-bold text-[#252B42] text-center md:text-left">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        </h3>
        <div className="md:w-1/2 text-[#737373] text-sm font-normal text-center md:text-left">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </div>
      </div>

      {/* İstatistik kutuları */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 text-center gap-14 mb-16">
        <div>
          <h4 className="text-6xl font-bold text-[#252B42] whitespace-nowrap">15K</h4>
          <p className="text-base font-bold text-[#737373] mt-1">Happy Customers</p>
        </div>
        <div>
          <h4 className="text-6xl font-bold text-[#252B42] whitespace-nowrap">150K</h4>
          <p className="text-base font-bold text-[#737373] mt-1">Monthly Visitors</p>
        </div>
        <div>
          <h4 className="text-6xl font-bold text-[#252B42] whitespace-nowrap">15</h4>
          <p className="text-base font-bold text-[#737373] mt-1">Countries Worldwide</p>
        </div>
        <div>
          <h4 className="text-6xl font-bold text-[#252B42] whitespace-nowrap">100+</h4>
          <p className="text-base font-bold text-[#737373] mt-1">Top Partners</p>
        </div>
      </div>
    </section>
  );
}
