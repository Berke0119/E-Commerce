import React from 'react';
import { Redo } from 'lucide-react';

export default function ContactCtaSection() {
  return (
    <section className="w-full py-20 px-4 bg-white text-center">
      <div className="flex flex-col items-center space-y-5 relative">
        <Redo
          size={70}
          strokeWidth={2.5}
          className="text-[#23A6F0] rotate-[80deg] mb-2"
        />

        <p className="text-base font-bold text-[#252B42] tracking-wide uppercase">
          We Can’t WAIT TO MEET YOU
        </p>
        <h2 className="text-6xl md:text-5xl font-extrabold text-[#252B42]">
          Let’s Talk
        </h2>
        <button className="mt-4 bg-[#23A6F0] text-white font-bold px-6 py-3 rounded hover:bg-blue-600 transition-all">
          Try it free now
        </button>
      </div>
    </section>
  );
}
